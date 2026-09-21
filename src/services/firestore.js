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
 * Firestore Database Service adhering to Canonical Structure (Section 23)
 */

export async function saveProjectToFirestore(project) {
  try {
    const docRef = doc(db, "projects", project.id);
    await setDoc(docRef, {
      ...project,
      updatedAt: serverTimestamp()
    }, { merge: true });
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

export async function savePublishedSiteToFirestore(slug, snapshotData) {
  try {
    const docRef = doc(db, "publishedSites", slug.toLowerCase());
    await setDoc(docRef, {
      ...snapshotData,
      updatedAt: serverTimestamp()
    });
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
