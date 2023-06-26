// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
import {getAuth,connectAuthEmulator,signInWithEmailAndPassword }from 'firebase/auth';
import "firebase/auth"

// import firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REDIRECT_API_KEY,
//   authDomain: "cakehouse-fd544.firebaseapp.com",
//   projectId: "cakehouse-fd544",
//   storageBucket: "cakehouse-fd544.appspot.com",
//   messagingSenderId: "471114803633",
//   appId: "1:471114803633:web:f470fc16092ade19b7f590"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCIVLZPDTsZzn3XOXYqlil4X0gTiTj_f_c",
  authDomain: "cake-house-ad4d6.firebaseapp.com",
  projectId: "cake-house-ad4d6",
  storageBucket: "cake-house-ad4d6.appspot.com",
  messagingSenderId: "468563004121",
  appId: "1:468563004121:web:474f621de71bb0488c0cc8",
  measurementId: "G-N4HHTNHFPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
export const db =getFirestore(app);
// export const auth = getAuth(app);
export const auth = getAuth(app);

export const storage=getStorage(app);
export default app;
// const auth = firebase.auth();
// const fs=firebase.firestore();
// const storage = firebase.storage();
// export{auth, fs, st}