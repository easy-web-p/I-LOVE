import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../config/firebase";

/**
 * Clean data to prevent undefined fields from breaking Firestore writes
 */
function sanitizeForFirestore(obj) {
  if (!obj || typeof obj !== "object") return obj;
  return JSON.parse(
    JSON.stringify(obj, (k, v) => (v === undefined ? null : v))
  );
}

// ==========================================
// 1. User Profiles (`users/{userId}`)
// ==========================================

export async function saveUserProfileToFirestore(userId, profileData) {
  try {
    const docRef = doc(db, "users", userId);
    const cleanData = sanitizeForFirestore({
      ...profileData,
      updatedAt: serverTimestamp()
    });
    await setDoc(docRef, cleanData, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn("Firestore saveUserProfile error:", error);
    return { success: false, error: error.message };
  }
}

export async function fetchUserProfileFromFirestore(userId) {
  try {
    const docRef = doc(db, "users", userId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { uid: snap.id, ...snap.data() };
    }
    return null;
  } catch (error) {
    console.warn("Firestore fetchUserProfile error:", error);
    return null;
  }
}

// ==========================================
// 2. Projects (`projects/{projectId}`)
// ==========================================

export async function saveProjectToFirestore(project) {
  try {
    const docRef = doc(db, "projects", project.id);
    const clean = sanitizeForFirestore({
      ...project,
      updatedAt: serverTimestamp()
    });
    await setDoc(docRef, clean, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn("Firestore saveProject error (fallback to local):", error);
    return { success: false, error: error.message };
  }
}

export async function fetchUserProjectsFromFirestore(userId) {
  try {
    const q = query(
      collection(db, "projects"),
      where("ownerId", "==", userId),
      orderBy("updatedAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn("Firestore fetchProjects error (fallback to local):", error);
    return null;
  }
}

export async function deleteProjectFromFirestore(projectId) {
  try {
    const docRef = doc(db, "projects", projectId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.warn("Firestore deleteProject error:", error);
    return { success: false, error: error.message };
  }
}

// ==========================================
// 3. Published Sites (`publishedSites/{slug}`)
// ==========================================

export async function savePublishedSiteToFirestore(slug, snapshotData) {
  try {
    const docRef = doc(db, "publishedSites", slug.toLowerCase());
    const clean = sanitizeForFirestore({
      ...snapshotData,
      status: snapshotData.status || "ACTIVE",
      updatedAt: serverTimestamp()
    });
    await setDoc(docRef, clean, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn("Firestore savePublishedSite error:", error);
    return { success: false, error: error.message };
  }
}

export async function fetchPublishedSiteFromFirestore(slug) {
  try {
    const docRef = doc(db, "publishedSites", slug.toLowerCase());
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.warn("Firestore fetchPublishedSite error:", error);
    return null;
  }
}

export async function unpublishSiteInFirestore(slug) {
  try {
    const docRef = doc(db, "publishedSites", slug.toLowerCase());
    await setDoc(docRef, { status: "DRAFT", updatedAt: serverTimestamp() }, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn("Firestore unpublishSite error:", error);
    return { success: false, error: error.message };
  }
}

// ==========================================
// 4. Memories (`memories/{memoryId}`)
// ==========================================

export async function saveMemoryToFirestore(memory, userId) {
  try {
    const docRef = doc(db, "memories", memory.id);
    const clean = sanitizeForFirestore({
      ...memory,
      ownerId: userId || memory.ownerId,
      updatedAt: serverTimestamp()
    });
    await setDoc(docRef, clean, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn("Firestore saveMemory error:", error);
    return { success: false, error: error.message };
  }
}

export async function fetchUserMemoriesFromFirestore(userId) {
  try {
    const q = query(
      collection(db, "memories"),
      where("ownerId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn("Firestore fetchMemories error (fallback to local):", error);
    return null;
  }
}

export async function deleteMemoryFromFirestore(memoryId) {
  try {
    const docRef = doc(db, "memories", memoryId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.warn("Firestore deleteMemory error:", error);
    return { success: false, error: error.message };
  }
}

// ==========================================
// 5. Important Dates (`users/{userId}/importantDates/{dateId}`)
// ==========================================

export async function saveImportantDateToFirestore(dateItem, userId) {
  try {
    if (!userId) return { success: false };
    const docRef = doc(db, "users", userId, "importantDates", dateItem.id);
    const clean = sanitizeForFirestore({
      ...dateItem,
      updatedAt: serverTimestamp()
    });
    await setDoc(docRef, clean, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn("Firestore saveImportantDate error:", error);
    return { success: false, error: error.message };
  }
}

export async function fetchUserImportantDatesFromFirestore(userId) {
  try {
    if (!userId) return null;
    const colRef = collection(db, "users", userId, "importantDates");
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.warn("Firestore fetchImportantDates error:", error);
    return null;
  }
}

export async function deleteImportantDateFromFirestore(dateId, userId) {
  try {
    if (!userId) return { success: false };
    const docRef = doc(db, "users", userId, "importantDates", dateId);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.warn("Firestore deleteImportantDate error:", error);
    return { success: false, error: error.message };
  }
}

// ==========================================
// 6. Admin User Management (`users` collection)
// ==========================================

export async function fetchAllUsersForAdmin() {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.docs.map((d) => ({ uid: d.id, ...d.data() }));
  } catch (error) {
    console.warn("Firestore fetchAllUsersForAdmin error:", error);
    return null;
  }
}

export async function updateUserRoleInFirestore(userId, newRole) {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, { role: newRole, updatedAt: serverTimestamp() }, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn("Firestore updateUserRole error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateUserStatusInFirestore(userId, newStatus) {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, { status: newStatus, updatedAt: serverTimestamp() }, { merge: true });
    return { success: true };
  } catch (error) {
    console.warn("Firestore updateUserStatus error:", error);
    return { success: false, error: error.message };
  }
}
