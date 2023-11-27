// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth } from "firebase/auth";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmYyOc8UWEvGdUNbGRHHK-cG72Bh3s6RI",
  authDomain: "buildcom-c25b7.firebaseapp.com",
  projectId: "buildcom-c25b7",
  storageBucket: "buildcom-c25b7.appspot.com",
  messagingSenderId: "115189393568",
  appId: "1:115189393568:web:d0cb17e14b0be023db81c5",
  measurementId: "G-P7WMCMSZ08"
};

// Initialize Firebase
export const app1 = initializeApp(firebaseConfig);
export const database= getFirestore(app1);
export const auth = getAuth();
// initializeAuth(app1, {
//  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase