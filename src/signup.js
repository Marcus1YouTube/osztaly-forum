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
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

const signupForm = document.querySelector(".signup-form");
const signupEmail = document.querySelector("#email");
const signupPassword = document.querySelector("#password");
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

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
    .then((cred) => {
        console.log("felhasználó létrehozva", cred.user);
        signupForm.reset();
        // redirect to home page
        window.location.href = "./";
    })
    .catch((error) => {
        console.log("hiba: ", error.message);
    });
});
