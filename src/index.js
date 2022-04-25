import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { 
    getAuth, 
    onAuthStateChanged,
    signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMA0CgDo6ARk4g0Detf4AXRD69nfvde9o",
  authDomain: "osztaly-forum.firebaseapp.com",
  projectId: "osztaly-forum",
  storageBucket: "osztaly-forum.appspot.com",
  messagingSenderId: "611519638217",
  appId: "1:611519638217:web:ebc63a992cf79e7fdffb18",
};

const loginBtt = document.querySelector(".login-button");
const logoutBtt = document.querySelector(".logout");
const username = document.querySelector(".username");
const userContainer = document.querySelector(".user-container");


initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

let posts = [];

async function getPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    posts.push({ ...doc.data(), id: doc.id });
  });
  makePosts(posts);
}

getPosts();

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
    

function makePosts(posts) {
  posts.forEach((post) => {
    // post div
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    // post title
    const postTitle = document.createElement("h2");
    postTitle.classList.add("post-title");
    postTitle.align = "center";
    postTitle.innerText = post.title;

    // post header
    const postHeader = document.createElement("div");
    postHeader.classList.add("post-header");

    // post username
    const postUsername = document.createElement("p");
    postUsername.classList.add("username");
    postUsername.innerText = post.submitterUsername;

    // post date
    const postDate = document.createElement("p");
    postDate.classList.add("post-date");
    postDate.innerText = post.createdAt;

    // horizontal line
    const hr = document.createElement("hr");

    // post body
    const postBody = document.createElement("div");
    postBody.classList.add("post-body");
    postBody.innerHTML = post.body;

    // horizontal line
    const hr2 = document.createElement("hr");

    // post footer
    const postFooter = document.createElement("div");
    postFooter.classList.add("post-footer");

    // like button
    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");

    // like button icon (thumb_up) in a span with class "material-icons-outlined"
    const likeButtonIcon = document.createElement("span");
    likeButtonIcon.classList.add("material-icons-outlined");
    likeButtonIcon.innerText = "thumb_up";

    // like button text in a span with class "like-count"
    const likeButtonText = document.createElement("span");
    likeButtonText.classList.add("like-count");
    likeButtonText.innerText = post.likes;

    // append all to main element
    postDiv.appendChild(postTitle);
    postDiv.appendChild(postHeader);
    postHeader.appendChild(postUsername);
    postHeader.appendChild(postDate);
    postDiv.appendChild(hr);
    postDiv.appendChild(postBody);
    postDiv.appendChild(hr2);
    postDiv.appendChild(postFooter);
    postFooter.appendChild(likeButton);
    likeButton.appendChild(likeButtonIcon);
    likeButton.appendChild(likeButtonText);

    // append to main element
    document.querySelector("main").appendChild(postDiv);
  });
}
