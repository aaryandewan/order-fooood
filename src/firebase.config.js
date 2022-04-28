import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC90PRfIgQHOVnygSnNjVCI8MspXzOcla4",
  authDomain: "order-fooood.firebaseapp.com",
  databaseURL: "https://order-fooood-default-rtdb.firebaseio.com",
  projectId: "order-fooood",
  storageBucket: "order-fooood.appspot.com",
  messagingSenderId: "428501343184",
  appId: "1:428501343184:web:f2a7400d09398110a177d5",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
