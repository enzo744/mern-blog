// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-6c455.firebaseapp.com",
  projectId: "mern-blog-6c455",
  storageBucket: "mern-blog-6c455.appspot.com",
  messagingSenderId: "216565221782",
  appId: "1:216565221782:web:b50fb8bb9bc12657b635b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);