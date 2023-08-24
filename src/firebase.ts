// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDlE7VZB537qM0VnrBebY5PdOhW6fD1v0c",
  authDomain: "ing-software-24327.firebaseapp.com",
  projectId: "ing-software-24327",
  storageBucket: "ing-software-24327.appspot.com",
  messagingSenderId: "630258401056",
  appId: "1:630258401056:web:894967ff50bc56f76d2145",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getDatabase(app);