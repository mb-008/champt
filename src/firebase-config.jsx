// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBwN5NyQKfPSrBwcapmfdtT3_nvLaEa4FQ",
    authDomain: "champt-b56f0.firebaseapp.com",
    projectId: "champt-b56f0",
    storageBucket: "champt-b56f0.appspot.com",
    messagingSenderId: "690537967485",
    appId: "1:690537967485:web:26a662bde278d4a5d5e614"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();