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
const passwordRegisterForm = document.querySelector("#registerFormContainer #registerForm #registeredPassword");
const signInButton = document.querySelector('#signIn');
const signInFormContainer = document.querySelector('#signInFormContainer');
const signInForm = document.querySelector('#signInForm');
const closeX = document.querySelector(".x");
const nicknameFormLabel = document.querySelector('#instructions form label');
const nicknameFormTextInput = document.querySelector('#instructions form #nickname');
const button = document.querySelector('#instructions form #startButton');
const signOutButton = document.querySelector('#signOut');
const hourglass = document.querySelector('#hourglass');


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


//registerForm password validation
passwordRegisterForm.addEventListener("blur", () => {
    if(passwordRegisterForm.value.length < 8) {
        alert("Password should be at least 8 characters");
    }
});
   

registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = registerForm.email.value;
    const registeredNickname = registerForm.nicknameRegisteredUser.value;
    const password = registerForm.password.value;
    registerFormContainer.style.display = 'none';
    nicknameFormLabel.style.display = 'none';
    registerButton.style.display = 'none';
    signInButton.style.display = 'none';
    closeX.style.display = 'none';
    nicknameFormTextInput.style.display = 'none';
    button.style.fontSize = '17px';
    button.style.color = '#555';

    signOutButton.style.display = 'block';
    localStorage.setItem('name', registeredNickname);//adding the registeredNickname to the local storage

    createUserWithEmailAndPassword(auth, email, password)//firebase method
        // .then(cred => {
        //     console.log('user created: ', cred.user);
        // })
        .then(() => updateProfile(auth.currentUser, {//firebase method, which creates the user's displayName
            displayName: registeredNickname
        }))
        .then(() => {
            console.log ('nickname: ' + auth.currentUser.displayName + 
                        ' email: ' + auth.currentUser.email);
        })
        .catch(err => {
            console.log(err.message);
        });

});


signInForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = signInForm.email.value;
    const password = signInForm.password.value;
    hourglass.style.display = 'block';

    signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
        hourglass.style.display = 'none';
        console.log('user signed in: ', cred.user, 'nickname: ', auth.currentUser.displayName);
        localStorage.setItem('name', auth.currentUser.displayName);//adding the registeredNickname to the local storage
        signInFormContainer.style.display = 'none';
        nicknameFormLabel.style.display = 'none';
        nicknameFormTextInput.style.display = 'none';
        registerButton.style.display = 'none';
        signInButton.style.display = 'none';
        signOutButton.style.display = 'block';
        closeX.style.display = 'none';
        button.style.fontSize = '17px';
        button.style.color = '#555';
    })
    .catch(err => {
        hourglass.style.display = 'none';
        console.log(err.message);

        if (err.message.includes('wrong-password')){
            //i'm putting the alert inside setTimeout, so it will work after 
            //the hourglass disapperas and not before
            setTimeout(() => {
                alert("Wrong password");
            }, 300);
        } else if (err.message.includes('user-not-found')){
            setTimeout(() => {
                alert("User not found");
            }, 300);
        } else if (err.message.includes('network-request-failed')){
            setTimeout(() => {
                alert("Network request failed");
            }, 300);
        } else {
            setTimeout(() => {
                alert("Signing in error, please try again later");
            }, 300);
        }

    })

});


signOutButton.addEventListener('click', () => {
    signOutButton.style.display = 'none';
    registerButton.style.display = 'inline-block';
    signInButton.style.display = 'inline-block';
    localStorage.removeItem('name');//removing the registeredNickname from local storage

    signOut(auth)
    .then (() => {
        console.log('the user logged out');
    })
    .catch(err => {
        console.log(err.message);
    })
});



export { firebaseConfig, app, auth, registerButton, registerFormContainer, registerForm, signInButton, signInFormContainer, signInForm, closeX, nicknameFormLabel, nicknameFormTextInput, button, signOutButton, hourglass };