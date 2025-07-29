// lib/firebase.js

import { initializeApp, getApps } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your provided config
const firebaseConfig = {
  apiKey: "AIzaSyADd_2nimKEsFMik3GQwcgAazPzOCh_euo",
  authDomain: "profound-veld-302802.firebaseapp.com",
  projectId: "profound-veld-302802",
  storageBucket: "profound-veld-302802.firebasestorage.app",
  messagingSenderId: "572055504925",
  appId: "1:572055504925:web:61a64faeb6ab15fe8fdef4",
  measurementId: "G-MJY89P1CNW"
};


// Prevent reinitializing in development
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
