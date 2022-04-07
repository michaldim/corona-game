import { initializeApp } from "firebase/app";

import {
    getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc, 
    query, where, orderBy, serverTimestamp, getDoc, updateDoc
} from "firebase/firestore";

import {
    getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword
} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAQ8bwV2MCpnsyTasXZLKns3os5dkR1de8",
    authDomain: "corona-game-fbf6d.firebaseapp.com",
    projectId: "corona-game-fbf6d",
    storageBucket: "corona-game-fbf6d.appspot.com",
    messagingSenderId: "26072350198",
    appId: "1:26072350198:web:09e9cc86fcf52eda1c1bd7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const registerButton = document.querySelector("#register");
const registerFormContainer = document.querySelector("#registerFormContainer");
const registerForm = document.querySelector("#registerForm");
const signInButton = document.querySelector('#signIn');
const signInFormContainer = document.querySelector('#signInFormContainer');
const signInForm = document.querySelector('#signInForm');
const closeX = document.querySelector(".x");
const nicknameFormLabel = document.querySelector('#instructions form label');
const nicknameFormTextInput = document.querySelector('#instructions form #nickname');
const button = document.querySelector('#instructions form #startButton');


registerButton.addEventListener("click", () => {
    registerFormContainer.style.display = 'block';
    closeX.style.display = 'block';
});


signInButton.addEventListener("click", () => {
    signInFormContainer.style.display = 'block';
    closeX.style.display = 'block';
});

closeX.addEventListener("click", () => {
    signInFormContainer.style.display = 'none';
    registerFormContainer.style.display = 'none';
    closeX.style.display = 'none';
});


registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = registerForm.email.value;
    const password = registerForm.password.value;
    const registeredNickname = registerForm.nicknameRegisteredUser.value;
    registerFormContainer.style.display = 'none';
    nicknameFormLabel.style.display = 'none';
    registerButton.style.display = 'none';
    signInButton.style.display = 'none';
    closeX.style.display = 'none';
    nicknameFormTextInput.style.display = 'none';
    button.style.fontSize = '17px';
    button.style.color = '#555';

    createUserWithEmailAndPassword(auth, email, password)//firebase method
        .then((cred) => {
            console.log('user created: ', cred.user);
        })
        .then(() => updateProfile(auth.currentUser, {//firebase method, which creates the user's displayName
            displayName: registeredNickname
        }))
        .then(() => {
            console.log ('nickname: ' + auth.currentUser.displayName + 
                        ' email: ' + auth.currentUser.email);
            if (auth.currentUser.displayName != null) {
                localStorage.setItem('name', auth.currentUser.displayName);
            }
        })
        .catch(err => {
            console.log(err.message)
        });
    


});


signInForm.addEventListener('submit', e => {
    e.preventDefault();
    signInFormContainer.style.display = 'none';
    nicknameFormLabel.style.display = 'none';
    nicknameFormTextInput.style.display = 'none';
    registerButton.style.display = 'none';
    signInButton.style.display = 'none';
    closeX.style.display = 'none';
    button.style.fontSize = '17px';
    button.style.color = '#555';
});



export { firebaseConfig, app, auth, registerButton, registerFormContainer, registerForm, signInButton, signInFormContainer, signInForm, closeX, nicknameFormLabel, nicknameFormTextInput, button };