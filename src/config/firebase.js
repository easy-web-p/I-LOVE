import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC4NaWxmbLXxBxzHCvPbhRPoti8-3npSlY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ilove-25327.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ilove-25327",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ilove-25327.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "497224289813",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:497224289813:web:74c40e42502a944e0e081c",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-X8D5NQX8NT"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export { analytics };
export default app;
