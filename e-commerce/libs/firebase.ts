// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzRZrsmfVF8zSqy7hRhiZJb20oAkmued8",
  authDomain: "e-commerce-b2c9a.firebaseapp.com",
  projectId: "e-commerce-b2c9a",
  storageBucket: "e-commerce-b2c9a.appspot.com",
  messagingSenderId: "186199062472",
  appId: "1:186199062472:web:d93091f4fd79635cc8b2fd",
  measurementId: "G-PY0LY6QH2T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
