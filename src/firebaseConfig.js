import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAHMNK3BsjGWB5mX4EB8STkAO0qGx4fBzc",
  authDomain: "kaan-kun.firebaseapp.com",
  projectId: "kaan-kun",
  storageBucket: "kaan-kun.appspot.com",
  messagingSenderId: "378747999337",
  appId: "1:378747999337:web:52a71f77f339ff81b73ef8",
  measurementId: "G-LS9ELZ7PV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
export { app };