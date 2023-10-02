// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9I7w6Zq2nPefdP2784082iK9FlxS5C40",
  authDomain: "netflix-gpt-8299.firebaseapp.com",
  projectId: "netflix-gpt-8299",
  storageBucket: "netflix-gpt-8299.appspot.com",
  messagingSenderId: "649476243828",
  appId: "1:649476243828:web:609c7f9d1ebbffed652c21",
  measurementId: "G-S4BJEP8DF9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();