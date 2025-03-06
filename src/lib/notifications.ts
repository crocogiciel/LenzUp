// lib/notifications.ts
import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function requestPermission(userId: string) {
  try {
    const token = await getToken(messaging, { vapidKey: "VAPID_PUBLIC_KEY" });
    if (token) {
      await saveUserToken(userId, token);
    }
  } catch (error) {
    console.error("Permission refusée", error);
  }
}

export async function saveUserToken(userId: string, token: string) {
  await setDoc(doc(db, "users", userId), { notificationToken: token }, { merge: true });
}

