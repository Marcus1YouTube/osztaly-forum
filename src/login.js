import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { 
    getAuth, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

const loginForm = document.querySelector(".login-form");
const loginEmail = document.querySelector("#email");
const loginPassword = document.querySelector("#password");
const logoutBtt = document.querySelector(".logout");
const username = document.querySelector(".username");
const userContainer = document.querySelector(".user-container");

const firebaseConfig = {
  apiKey: "AIzaSyBMA0CgDo6ARk4g0Detf4AXRD69nfvde9o",
  authDomain: "osztaly-forum.firebaseapp.com",
  projectId: "osztaly-forum",
  storageBucket: "osztaly-forum.appspot.com",
  messagingSenderId: "611519638217",
  appId: "1:611519638217:web:ebc63a992cf79e7fdffb18",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        loginBtt.classList.add("hidden");
        userContainer.classList.remove("hidden");
        username.innerText = user.email;
    } else {
        return
    }
  });

logoutBtt.addEventListener("click", (e) => {
    signOut(auth);
    loginBtt.classList.remove("hidden");
    userContainer.classList.add("hidden");
});


loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
      .then((cred) => {
        console.log("felhasználó bejelentkeztetve", cred.user);
        loginForm.reset();
        // redirect to home page
        window.location.href = "./";
    })
        .catch((error) => {
            console.log("hiba: ", error.message);
        })
    })
  
