// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ❌ Don't import auth again here!
// import { auth } from '../firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAi4mEbSwFzVHr8GR2pSvtN9hlJZNOJQ24",
  authDomain: "abhishek-portfolio-1090b.firebaseapp.com",
  projectId: "abhishek-portfolio-1090b",
  storageBucket: "abhishek-portfolio-1090b.firebasestorage.app",
  messagingSenderId: "189791546938",
  appId: "1:189791546938:web:e4ad208556ffc787ff0f03",
  measurementId: "G-N6XXG16JCL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
