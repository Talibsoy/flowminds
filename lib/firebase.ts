import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getStorage, Storage } from "firebase-admin/storage";

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
  ai_reply?: string;
};

export type IrisQueueItem = {
  id: string;
  key: string;
  service: string;
  content: string;
  created_at: string;
  posted: boolean;
};

export type Lead = {
  id: string;
  title: string;
  url: string;
  budget: string;
  description: string;
  score: number;
  proposal: string;
  status: string;
  created_at: string;
};

let _db: Firestore | null = null;
let _storage: Storage | null = null;

function initFirebase() {
  if (getApps().length === 0) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  }
}

export function getDb(): Firestore {
  if (!_db) {
    initFirebase();
    _db = getFirestore();
  }
  return _db;
}

export function getBucket() {
  if (!_storage) {
    initFirebase();
    _storage = getStorage();
  }
  return _storage.bucket();
}
