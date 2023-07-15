import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaLCzWRByKXe-4CUMjgLVhyGco3AO5aso",
  authDomain: "library-management-syste-6a4a5.firebaseapp.com",
  projectId: "library-management-syste-6a4a5",
  storageBucket: "library-management-syste-6a4a5.appspot.com",
  messagingSenderId: "894403144565",
  appId: "1:894403144565:web:bb4eb30596bc6e067d813c",
  measurementId: "G-LPRN5899V8"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
//export const provider = new createUserWithEmailAndPassword();
export const db = getFirestore(app);
