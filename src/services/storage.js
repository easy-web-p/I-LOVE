import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

/**
 * Upload a media file to Firebase Cloud Storage with progress tracking
 * @param {File} file - File object from input
 * @param {string} userId - User UID
 * @param {string} folder - Subfolder ('images' | 'audio' | 'covers')
 * @param {function} onProgress - Progress callback (0 - 100)
 * @returns {Promise<{ success: boolean, url?: string, path?: string, sizeBytes?: number, error?: string }>}
 */
export async function uploadMediaToStorage(file, userId, folder = "images", onProgress = null) {
  try {
    const ext = file.name ? file.name.split(".").pop() : "jpg";
    const timestamp = Date.now();
    const safeName = `${timestamp}_${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const storagePath = `users/${userId || "guest"}/${folder}/${safeName}`;
    const storageRef = ref(storage, storagePath);

    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type || "image/jpeg"
    });

    return new Promise((resolve) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (snapshot.totalBytes > 0) {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            if (onProgress) onProgress(progress);
          }
        },
        (error) => {
          console.warn("Firebase Storage upload error:", error);
          resolve({ success: false, error: error.message });
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve({
              success: true,
              url: downloadURL,
              path: storagePath,
              sizeBytes: file.size
            });
          } catch (urlErr) {
            resolve({ success: false, error: urlErr.message });
          }
        }
      );
    });
  } catch (err) {
    console.warn("uploadMediaToStorage exception:", err);
    return { success: false, error: err.message };
  }
}
