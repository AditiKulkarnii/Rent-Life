import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsMbw9y56j86TK-wiopGSdpXMxx91LNJA",
  authDomain: "rentlife-1af46.firebaseapp.com",
  projectId: "rentlife-1af46",
  storageBucket: "rentlife-1af46.appspot.com",
  messagingSenderId: "373177692904",
  appId: "1:373177692904:web:76c7ab1359cbf125108f5d",
  measurementId: "G-6J49ZYCXP0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
console.log(storage);

export { db, storage };
