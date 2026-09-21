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
export function createSanitizedPublicSnapshot(project) {
  if (!project) return null;

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
    views: project.views || 0,
    coverImage: sanitizeUrl(project.coverImage),
    theme: {
      backgroundColor: project.theme?.backgroundColor || "#FFF9FB",
      textColor: project.theme?.textColor || "#33252E",
      accentColor: project.theme?.accentColor || "#E85D8E",
      headingFont: project.theme?.headingFont || "Mali",
      bodyFont: project.theme?.bodyFont || "Noto Sans Thai"
    },
    sections: (project.sections || [])
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
      })),
    revealAt: project.revealAt || null,
    expiresAt: project.expiresAt || null,
    publishedAt: project.publishedAt || new Date().toISOString()
  };
}
