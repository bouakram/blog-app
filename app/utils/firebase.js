// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "blog-app-a9c3c.firebaseapp.com",
  projectId: "blog-app-a9c3c",
  storageBucket: "blog-app-a9c3c.appspot.com",
  messagingSenderId: "1034143121811",
  appId: process.env.APPID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);