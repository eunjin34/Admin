import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need
// import { getAnalytics } from 'firebase/analytics';
// import { getFirestore } from 'firebase/firestore';
import { getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// interface FirebaseConfig {
//   apiKey?: string;
//   authDomain?: string;
//   projectId?: string;
//   storageBucket?: string;
//   messagingSenderId?: string;
//   appId?: string;
//   measurementId?: string;
// }

const developmentConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY_DEV,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN_DEV,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID_DEV,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET_DEV,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID_DEV,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID_DEV,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID_DEV,
};

const productionConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY_PRO,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN_PRO,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID_PRO,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET_PRO,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID_PRO,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID_PRO,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID_PRO,
};

const firebaseConfig =
  process.env.NODE_ENV === "development" ? developmentConfig : productionConfig;
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
export const auth = getAuth(app);
export { app };
