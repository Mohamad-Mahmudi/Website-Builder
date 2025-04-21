// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { setLogLevel } from "firebase/firestore";
setLogLevel("debug");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6c9SEmMgtE--HFxHM2_Z3m-jJiFGD4AQ",
  authDomain: "website-builder-2025.firebaseapp.com",
  projectId: "website-builder-2025",
  storageBucket: "website-builder-2025.firebasestorage.app",
  messagingSenderId: "137679594763",
  appId: "1:137679594763:web:37f8168026e6aa5146ae0e",
  measurementId: "G-569NMD0RN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth =getAuth(app);
export const db = getFirestore(app);