// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEnFTIE2dZIftjMyrF6pAg06yJ8V3ZNj0",
  authDomain: "webeventos-d3952.firebaseapp.com",
  projectId: "webeventos-d3952",
  storageBucket: "webeventos-d3952.appspot.com",
  messagingSenderId: "1010150740026",
  appId: "1:1010150740026:web:5826a91640cd08c7d1e503",
  measurementId: "G-XPZ56QC7ZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); 