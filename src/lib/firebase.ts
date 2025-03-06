// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7eDyDAsx1ttHOEIhUp0fLCfnU_WoMT1g",
  authDomain: "lenzup-9419d.firebaseapp.com",
  projectId: "lenzup-9419d",
  storageBucket: "lenzup-9419d.firebasestorage.app",
  messagingSenderId: "471132027837",
  appId: "1:471132027837:web:84fb80031d6e0f0ac5f0d4",
  measurementId: "G-JWRFLZE1KL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
export const auth = getAuth(app);

// Fonction pour se connecter anonymement
export async function signInAnonymouslyAndSaveProfile() {
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
  
      // Sauvegarde du profil anonyme
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        createdAt: new Date(),
        anonymous: true
      }, { merge: true });
  
      console.log("Utilisateur anonyme connecté:", user.uid);
      return user;
    } catch (error) {
      console.error("Erreur lors de la connexion anonyme:", error);
      return null;
    }
  }
