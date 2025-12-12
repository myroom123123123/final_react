// Firebase config and initialization for Firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChw3jxTeUZiXET_G6A_xSekig5BywK5fo",
  authDomain: "holidaytime-5a6f0.firebaseapp.com",
  projectId: "holidaytime-5a6f0",
  storageBucket: "holidaytime-5a6f0.appspot.com",
  messagingSenderId: "408475057572",
  appId: "1:408475057572:web:c9841002770b9923935531",
  measurementId: "G-2XWHB50KYS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
