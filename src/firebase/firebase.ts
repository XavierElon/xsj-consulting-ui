// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase//auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC14bKfPFgMgmJ7PO09Gsi0dpkwE0GvXno",
  authDomain: "xsj-consulting-ui-7c9e0.firebaseapp.com",
  projectId: "xsj-consulting-ui-7c9e0",
  storageBucket: "xsj-consulting-ui-7c9e0.appspot.com",
  messagingSenderId: "144214686445",
  appId: "1:144214686445:web:6769cbe4c47bc262dbeae4",
  measurementId: "G-50JHYVBK16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// Google Analytics
const analytics = getAnalytics(app);