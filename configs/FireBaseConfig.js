// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl0h3L0fnaEqL0495Gt7Tvle5-zM8YJMo",
  authDomain: "ai-travel-815b4.firebaseapp.com",
  projectId: "ai-travel-815b4",
  storageBucket: "ai-travel-815b4.firebaseapp.com",
  messagingSenderId: "761121922353",
  appId: "1:761121922353:web:501422d653fd2c2763a410",
  measurementId: "G-CYMVWWE515"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

