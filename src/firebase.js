import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDWRplhSQUf62Ilfs8tokVWdhFMPpuJIZE",
  authDomain: "go-plus-eb6e1.firebaseapp.com",
  projectId: "go-plus-eb6e1",
  storageBucket: "go-plus-eb6e1.appspot.com",
  messagingSenderId: "851288690873",
  appId: "1:851288690873:web:bb25a0a3f45e5a708d4b68"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider  = new GoogleAuthProvider();
