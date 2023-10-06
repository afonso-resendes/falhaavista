// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClCCv-8Aps58fOuYz-oVJ7h5v991sn8U8",
  authDomain: "falhaavista.firebaseapp.com",
  projectId: "falhaavista",
  storageBucket: "falhaavista.appspot.com",
  messagingSenderId: "205228395644",
  appId: "1:205228395644:web:1e33421758da2c925dcdf9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
