import firebase from "firebase/compat/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDARc-gSJpXhb5_eFVE9mjNjySRwMvEPFs",
//   authDomain: "rent-a-life-981ad.firebaseapp.com",
//   projectId: "rent-a-life-981ad",
//   storageBucket: "rent-a-life-981ad.appspot.com",
//   messagingSenderId: "168764704844",
//   appId: "1:168764704844:web:41c7ca2bc064eb5eb0cce9",
//   measurementId: "G-YMWL7YZ67P",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBsMbw9y56j86TK-wiopGSdpXMxx91LNJA",
  authDomain: "rentlife-1af46.firebaseapp.com",
  projectId: "rentlife-1af46",
  storageBucket: "rentlife-1af46.appspot.com",
  messagingSenderId: "373177692904",
  appId: "1:373177692904:web:76c7ab1359cbf125108f5d",
  measurementId: "G-6J49ZYCXP0"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
