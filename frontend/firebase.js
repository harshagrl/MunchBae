import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "munchbae-e3934.firebaseapp.com",
  projectId: "munchbae-e3934",
  storageBucket: "munchbae-e3934.firebasestorage.app",
  messagingSenderId: "721849212962",
  appId: "1:721849212962:web:49572df1e2d4f12dd92a7b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
