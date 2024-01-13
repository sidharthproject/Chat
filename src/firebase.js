// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:String(import.meta.env.VITE_FIREBASE_API_KEY),
  authDomain:String(import.meta.env.VITE_FIREBASE_AUTH_URL),
  projectId:String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket:String(import.meta.env.VITE_FIREBASE_BUCKET_ID),
  messagingSenderId:String(import.meta.env.VITE_FIREBASE_SENDER_ID),
  appId:String(import.meta.env.VITE_FIREBASE_APP_ID),
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage()
export const db = getFirestore()