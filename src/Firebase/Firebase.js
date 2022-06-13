import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const provider = new firebase.auth.GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyAD7QlKT9DmPHAUnxKt_PhV1UbVMg9Ks0g",
  authDomain: "fir-chat-41ecb.firebaseapp.com",
  databaseURL: "https://fir-chat-41ecb-default-rtdb.firebaseio.com",
  projectId: "fir-chat-41ecb",
  storageBucket: "fir-chat-41ecb.appspot.com",
  messagingSenderId: "264389748226",
  appId: "1:264389748226:web:82a0359c55d7da498a691b",
  measurementId: "G-PFDMW8ZYFC"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, provider, storage };
