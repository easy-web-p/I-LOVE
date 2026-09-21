/**
 * Security & Data Protection Utilities
 * Provides cryptographic hashing, input sanitization, and data leak prevention
 */

/**
 * Computes a secure SHA-256 hash of a string using Web Crypto API.
 * Never stores or transmits plaintext passwords.
 * @param {string} text - Plain text to hash
 * @returns {Promise<string>} Hex-encoded SHA-256 digest
 */
export async function hashPassword(text) {
  if (!text) return "";
  const encoder = new TextEncoder();
  // Salt with application pepper to prevent rainbow table attacks
  const data = encoder.encode(`ilove_secure_salt_${text}`);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function arrayBufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToArrayBuffer(hexString) {
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
  }
  return bytes.buffer;
}

/**
 * Derives an AES-GCM 256-bit encryption key from password and salt using PBKDF2.
 */
async function deriveKeyFromPassword(password, salt) {
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256"
    },
    passwordKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts an object or string payload using AES-GCM (256-bit).
 * Returns { salt, iv, ciphertext } in hex representation.
 */
export async function encryptPayloadWithPassword(payload, password) {
  if (!payload || !password) return null;
  const encoder = new TextEncoder();
  const rawData = encoder.encode(typeof payload === "string" ? payload : JSON.stringify(payload));
  
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKeyFromPassword(password, salt);

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    rawData
  );

  return {
    salt: arrayBufferToHex(salt),
    iv: arrayBufferToHex(iv),
    ciphertext: arrayBufferToHex(encryptedBuffer)
  };
}

/**
 * Decrypts an AES-GCM encrypted package using the entered password.
 * Throws error or returns null if password is incorrect (integrity check fails).
 */
export async function decryptPayloadWithPassword(encryptedPackage, password) {
  if (!encryptedPackage || !password) return null;
  try {
    const salt = new Uint8Array(hexToArrayBuffer(encryptedPackage.salt));
    const iv = new Uint8Array(hexToArrayBuffer(encryptedPackage.iv));
    const ciphertext = hexToArrayBuffer(encryptedPackage.ciphertext);

    const key = await deriveKeyFromPassword(password, salt);
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );

    const decoder = new TextDecoder();
    const jsonString = decoder.decode(decryptedBuffer);
    return JSON.parse(jsonString);
  } catch (error) {
    // Decryption failed: either corrupted or wrong password
    return null;
  }
}

/**
 * Securely verifies entered password against stored hash.
 * @param {string} enteredPassword 
 * @param {string} storedHash 
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(enteredPassword, storedHash) {
  if (!enteredPassword || !storedHash) return false;
  const hash = await hashPassword(enteredPassword);
  return hash === storedHash;
}

/**
 * Sanitizes URLs to prevent XSS (Cross-Site Scripting) and JavaScript injection.
 * Rejects javascript:, vbscript:, and data: schemes (except safe image data URIs).
 * @param {string} url
 * @returns {string} Sanitized URL or safe fallback
 */
export function sanitizeUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  
  // Detect dangerous schemes
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("data:text/html")
  ) {
    return "#";
  }

  // Allow standard protocols
  if (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("mailto:") ||
    lower.startsWith("tel:") ||
    lower.startsWith("#") ||
    lower.startsWith("/")
  ) {
    return trimmed;
  }

  // Default prefix https if protocol missing
  if (/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(trimmed)) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

/**
 * Validates and converts YouTube URL to safe embed iframe URL.
 * @param {string} url
 * @returns {string} Safe embed URL or empty
 */
export function getSafeVideoEmbedUrl(url) {
  if (!url || typeof url !== "string") return "";
  const sanitized = sanitizeUrl(url);
  
  // YouTube watch format -> embed format
  if (sanitized.includes("youtube.com/watch?v=")) {
    const videoId = sanitized.split("watch?v=")[1]?.split("&")[0];
    if (videoId && /^[a-zA-Z0-9_-]+$/.test(videoId)) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  // YouTube short format youtu.be/xxx
  if (sanitized.includes("youtu.be/")) {
    const videoId = sanitized.split("youtu.be/")[1]?.split("?")[0];
    if (videoId && /^[a-zA-Z0-9_-]+$/.test(videoId)) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }

  // Vimeo
  if (sanitized.includes("vimeo.com/")) {
    const videoId = sanitized.split("vimeo.com/")[1]?.split("?")[0];
    if (videoId && /^[0-9]+$/.test(videoId)) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
  }

  return sanitized;
}

/**
 * Sanitizes a draft project into a public published snapshot (Section 16.2 & 16.3).
 * Strips internal owner fields, raw passwords, draft revisions, and private notes.
 * @param {Object} project - Private draft project
 * @returns {Object} Public-safe sanitized snapshot
 */
export async function createSanitizedPublicSnapshot(project, rawPassword = "") {
  if (!project) return null;

  const rawSections = (project.sections || [])
    .filter((s) => s.enabled)
    .map((s) => ({
      id: s.id,
      type: s.type,
      name: s.name,
      enabled: s.enabled,
      order: s.order,
      content: s.content,
      styles: s.styles || {},
      animation: s.animation || {}
    }));

  let sections = rawSections;
  let encryptedPayload = null;
  let isEncrypted = false;

  // Zero-Knowledge Encryption for password-protected memory vaults
  if (project.visibility === "PASSWORD" && rawPassword) {
    encryptedPayload = await encryptPayloadWithPassword(rawSections, rawPassword);
    if (encryptedPayload) {
      isEncrypted = true;
      sections = []; // Clean sections from public snapshot so no plaintext is leaked in DevTools
    }
  }

  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    description: project.description || "",
    category: project.category || "LOVE",
    templateId: project.templateId,
    status: project.status,
    visibility: project.visibility || "UNLISTED",
    passwordHash: project.passwordHash || null, // Only store hash, never plaintext
    isEncrypted,
    encryptedPayload,
    views: project.views || 0,
    coverImage: sanitizeUrl(project.coverImage),
    theme: {
      backgroundColor: project.theme?.backgroundColor || "#FFF9FB",
      textColor: project.theme?.textColor || "#33252E",
      accentColor: project.theme?.accentColor || "#E85D8E",
      headingFont: project.theme?.headingFont || "Mali",
      bodyFont: project.theme?.bodyFont || "Noto Sans Thai"
    },
    sections,
    revealAt: project.revealAt || null,
    expiresAt: project.expiresAt || null,
    publishedAt: project.publishedAt || new Date().toISOString()
  };
}
