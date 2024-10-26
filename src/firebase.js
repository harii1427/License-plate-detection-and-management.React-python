// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6jG8YzOmJkAU_QOM_FQV3WNlvSSn-LY0",
  authDomain: "license-44b13.firebaseapp.com",
  projectId: "license-44b13",
  storageBucket: "license-44b13.appspot.com",
  messagingSenderId: "377186272152",
  appId: "1:377186272152:web:cc456aacc0289dba4f21ed",
  measurementId: "G-KR8WSQ3H9Q"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
