// src/firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAypgtdnQ476aPib-IkKfbE244DAT21NeE",
  authDomain: "infoyieldx-40656.firebaseapp.com",
  projectId: "infoyieldx-40656",
  storageBucket: "infoyieldx-40656.firebasestorage.app",
  messagingSenderId: "1046057234413",
  appId: "1:1046057234413:web:870784894c8452178f81e4",
  measurementId: "G-TJFH2REKZ4"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Export all needed functions
export { auth, provider, signInWithPopup, sendPasswordResetEmail };
