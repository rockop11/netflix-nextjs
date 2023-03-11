import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhUzOef1qAaKLFjjWAnQzxUSCF6419HoI",
  authDomain: "netflix-nextjs-6e9af.firebaseapp.com",
  databaseURL: "https://netflix-nextjs-6e9af-default-rtdb.firebaseio.com",
  projectId: "netflix-nextjs-6e9af",
  storageBucket: "netflix-nextjs-6e9af.appspot.com",
  messagingSenderId: "791317703242",
  appId: "1:791317703242:web:6be10a7a15e3bfaec154b3",
  measurementId: "G-HJP0KH4RRH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
