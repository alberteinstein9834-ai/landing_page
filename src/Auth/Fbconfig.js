
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdJZ9P9aPrCyoBi4iiL3fSc5Wy95rXDlw",
  authDomain: "usama-database-49cfc.firebaseapp.com",
  projectId: "usama-database-49cfc",
  storageBucket: "usama-database-49cfc.firebasestorage.app",
  messagingSenderId: "702959947668",
  appId: "1:702959947668:web:2769b9e2be2d0f8b4b0981",
  measurementId: "G-3PLHNF3VS2"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);