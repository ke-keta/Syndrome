import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyC0i9W6bWwDla5bPGSqxHLQ8z7Qt4uts0Q",
  authDomain: "shisha-book.firebaseapp.com",
  projectId: "shisha-book",
  storageBucket: "shisha-book.appspot.com",
  messagingSenderId: "553204798018",
  appId: "1:553204798018:web:3b2a8d5100402d500e13db",
  measurementId: "G-QVVHPWJV11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authenticationを初期化
const auth = getAuth(app);

export { auth };

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

