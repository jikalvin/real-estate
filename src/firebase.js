import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDssRqskiMfIYKPjZoSUsjT4o9BjV5mlOs",
  authDomain: "signal-clone-yt-build-23469.firebaseapp.com",
  projectId: "signal-clone-yt-build-23469",
  storageBucket: "signal-clone-yt-build-23469.appspot.com",
  messagingSenderId: "732943330828",
  appId: "1:732943330828:web:11972aaae95eb22c508829"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);