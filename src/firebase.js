// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REDIRECT_API_KEY,
  authDomain: "cakehouse-fd544.firebaseapp.com",
  projectId: "cakehouse-fd544",
  storageBucket: "cakehouse-fd544.appspot.com",
  messagingSenderId: "471114803633",
  appId: "1:471114803633:web:f470fc16092ade19b7f590"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
