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
  apiKey: "AIzaSyBDzzKQhvy0LuNB3rBTxdvSs70IdZp_jew",
  authDomain: "cakehouse-18ae5.firebaseapp.com",
  databaseURL: "https://cakehouse-18ae5-default-rtdb.firebaseio.com",
  projectId: "cakehouse-18ae5",
  storageBucket: "cakehouse-18ae5.appspot.com",
  messagingSenderId: "439841265200",
  appId: "1:439841265200:web:8905ac5945e5957a95fff5",
  measurementId: "G-FD7Z90K6Y8"
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