import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-uVbQUXjE2yV9JsWa7vusmdFDK3enByk",
  authDomain: "warehouse-eb59d.firebaseapp.com",
  projectId: "warehouse-eb59d",
  storageBucket: "warehouse-eb59d.appspot.com",
  messagingSenderId: "294913749084",
  appId: "1:294913749084:web:04809e243dbce29eeff699",
  measurementId: "G-4K1XX8L786",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
