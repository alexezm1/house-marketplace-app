// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZCN9soENF-F2iu6jsbWOn6Ko8aar5NJc",
  authDomain: "house-marketplace-app-d0803.firebaseapp.com",
  projectId: "house-marketplace-app-d0803",
  storageBucket: "house-marketplace-app-d0803.appspot.com",
  messagingSenderId: "130402567370",
  appId: "1:130402567370:web:fa593f6be461e6abc56033",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
