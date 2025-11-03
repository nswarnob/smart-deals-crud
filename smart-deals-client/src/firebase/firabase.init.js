// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAltZ7PlfqaRdfc0vyCT_gi7TcobVLJWs",
  authDomain: "smart-deals-a3496.firebaseapp.com",
  projectId: "smart-deals-a3496",
  storageBucket: "smart-deals-a3496.firebasestorage.app",
  messagingSenderId: "704976571371",
  appId: "1:704976571371:web:e8766c08863bfb505327ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);