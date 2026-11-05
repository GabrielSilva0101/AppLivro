import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyC_hVgobauAtrrd1msyQ85lUuf9hKm1tv8",
  authDomain: "applivro-98f8d.firebaseapp.com",
  projectId: "applivro-98f8d",
  storageBucket: "applivro-98f8d.firebasestorage.app",
  messagingSenderId: "981778629807",
  appId: "1:981778629807:web:39128f7936c12a0361005a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);