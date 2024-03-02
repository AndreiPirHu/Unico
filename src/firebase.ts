import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-mHaHvLOS5i79x3lQiYott0qjHfj1coQ",
  authDomain: "unico-1797c.firebaseapp.com",
  projectId: "unico-1797c",
  storageBucket: "unico-1797c.appspot.com",
  messagingSenderId: "745322272956",
  appId: "1:745322272956:web:84fc0d2ad7443a6ca858b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

export { db, auth };
