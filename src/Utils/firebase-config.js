// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrBihiplgBhrP5Q20SEvC4mVKxrJF5N9U",
  authDomain: "ecommerce-upv.firebaseapp.com",
  projectId: "ecommerce-upv",
  storageBucket: "ecommerce-upv.appspot.com",
  messagingSenderId: "458915745979",
  appId: "1:458915745979:web:1c21062425794e9286999e",
  measurementId: "G-ZYWP979XSE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;
export const auth = getAuth(app);