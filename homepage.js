import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import{getFirestore, getDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBQ2rw5gIkbQmMQSkP_V8eglopnnF8JRLA",
    authDomain: "login-form-manah.firebaseapp.com",
    projectId: "login-form-manah",
    storageBucket: "login-form-manah.appspot.com",
    messagingSenderId: "407179802864",
    appId: "1:407179802864:web:46e07d5f94116ebbd56a35"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();
  const authButtons = document.getElementById('auth-buttons');
  const sideAuthButtons = document.getElementById('side-auth-buttons');
  const userMenu = document.getElementById('user-menu');
  const logoutButton = document.getElementById('logout');
  
  onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                document.getElementById('loggedUserFullName').innerText = userData.fullName;
                document.getElementById('loggedUserEmail').innerText = userData.email;

                // Update navigation bar
                authButtons.innerHTML = `<button id="side-logout">Logout</button>`;
                sideAuthButtons.innerHTML = `<button id="side-logout">Logout</button>`;
                document.getElementById('side-logout').addEventListener('click', logout);
                
                document.getElementById('avatar').addEventListener('click', toggleUserMenu);
            } else {
                console.log("No document found matching ID");
            }
        })
        .catch((error) => {
            console.log("Error getting document");
        });
    } else {
        authButtons.innerHTML = `<a class="get-started" href="login.html">Get Started</a>`;
        sideAuthButtons.innerHTML = `<a class="get-started" href="login.html">Get Started</a>`;
        console.log("User ID not found in local storage");
    }
});



  logoutButton.addEventListener('click', logout);

function logout() {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(() => {
        window.location.href = 'login.html';
    })
    .catch((error) => {
        console.error('Error signing out:', error);
    });
}

function toggleUserMenu() {
    userMenu.classList.toggle('hidden');
}
