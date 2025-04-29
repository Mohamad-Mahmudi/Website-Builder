// src/firebase/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// اطلاعات پروژه‌ی خودت رو اینجا قرار بده
const firebaseConfig = {
  apiKey: "AIzaSyD0N-TEST-KEY1234567890",
  authDomain: "test-project-12345.firebaseapp.com",
  projectId: "test-project-12345",
  storageBucket: "test-project-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
};

// اتصال به Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// گرفتن ماژول auth
const auth = getAuth(app);

// خروجی گرفتن
export { auth, signInWithEmailAndPassword };