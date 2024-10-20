
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyDSz5nx3VoYgojiXPP5Pk1IRhkU5_SurVc",
  authDomain: "blog-8eef0.firebaseapp.com",
  projectId: "blog-8eef0",
  storageBucket: "blog-8eef0.appspot.com",
  messagingSenderId: "499820415210",
  appId: "1:499820415210:web:4d13ea752a7a6ace7daf93",
  measurementId: "G-DDQ8D1SJSW"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);