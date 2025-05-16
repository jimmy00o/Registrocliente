// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZBWkWoNURiF8JL9NVugRiiOf4bpFMV6M",
  authDomain: "appgestionclientes-4d20a.firebaseapp.com",
  projectId: "appgestionclientes-4d20a",
  storageBucket: "appgestionclientes-4d20a.firebasestorage.app",
  messagingSenderId: "800483043650",
  appId: "1:800483043650:web:292023c77dde4d5db900db"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;