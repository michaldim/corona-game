import { initializeApp } from "firebase/app";

import {
    getFirestore, collection, onSnapshot, setDoc, addDoc, deleteDoc, doc, 
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
const database = getFirestore();
//const collectionRef = collection(database, 'users score');

const registerButton = document.querySelector("#register");
const registerFormContainer = document.querySelector("#registerFormContainer");
const registerForm = document.querySelector("#registerForm");
const registerFormInputFields = document.querySelectorAll('#registerFormContainer #registerForm input');
const registerFormPFields = document.querySelectorAll('#registerFormContainer #registerForm p');
const registerLastName = document.querySelector('#registerFormContainer #registerForm #lastName');
const registerFirstName = document.querySelector('#registerFormContainer #registerForm #firstName');
const lastNameP = document.querySelector('#registerFormContainer #registerForm #lastNameP');
const firstNameP = document.querySelector('#registerFormContainer #registerForm #firstNameP');
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
    signInForm.reset(); //cleaning the form
    registerFormContainer.style.display = 'none';
    registerForm.reset(); //cleaning the form
    closeX.style.display = 'none';
    //cleaning the background red color of the registerFormInputFields (if the user typed an error)
    registerFormInputFields.forEach(inputField => {
        inputField.classList.remove('invalid');
    });
    //cleaning the red color <p> tag of the registerFormInputFields (if the user typed an error)
    registerFormPFields.forEach(pField => {
        pField.classList.remove('invalid');
    });
});
    
//the regex of every registerForm input field
const reg = {
    firstName:/^[a-zA-Z]+((( - )|( -)|(- )|-| )?[a-zA-Z]+)*$/,
    lastName:/^[a-zA-Z]+((( - )|( -)|(- )|-| )?[a-zA-Z]+)*$/,
    nicknameRegisteredUser:/^[a-zA-Z0-9]+( ?(_|-|\.)? ?[a-zA-Z0-9]+)*$/,
    email:/^([\w\d\.-]+)@([\w\d-]+)\.([a-zA-Z]{2,12})(\.[a-zA-Z]{2,8})?$/,
    password:/^[\w\d-@\.]{8,20}$/
};


//adding red background and red text for errors in register form
registerFormInputFields.forEach(inputField => {

    const idInput = inputField.getAttribute('id'); //finding the id of the input 

    inputField.addEventListener("focusout", e => {

        if (inputField.getAttribute('id') !== 'submitRegisterForm') {
            //we will check if the value that the user entered match the fields' regex, with test() method.
            //first we will say what will happened if there isn't a match
            if(reg[e.target.name].test(e.target.value) == false) { //e.target.name is the name of the input field. e.target.value is the text the user entered
                if (e.target.value !== "") {
                    inputField.classList.add('invalid'); //the invalid class make the background of the input red
                    
                    //now we will say what to do with the <p> tag that fits the input
                    registerFormPFields.forEach(pField => {
                        if((inputField.getAttribute('name') == 'firstName' || inputField.getAttribute('name') == 'lastName') &&
                        ((registerLastName.classList.contains('invalid') == true) && (registerFirstName.classList.contains('invalid') == true))){
                            console.log('');
                        } else {
                            const idP = pField.getAttribute('id');//looking for the id of the <p> tags
                            if (idP == (idInput + 'P')) {         
                                pField.classList.add('invalid');
                            }
                        }
                    });
                }

            } else { //if the value that the user entered match the regex
                inputField.classList.remove('invalid');

                registerFormPFields.forEach(pField => {

                    if((inputField.getAttribute('name') == 'firstName' || inputField.getAttribute('name') == 'lastName') &&
                    ((registerLastName.classList.contains('invalid') == true) || (registerFirstName.classList.contains('invalid') == true))) {
                        console.log('');
                    } else if ((inputField.getAttribute('name') == 'firstName' || inputField.getAttribute('name') == 'lastName') &&
                    ((registerLastName.classList.contains('invalid') == false) && (registerFirstName.classList.contains('invalid') == false))) {
                        lastNameP.classList.remove('invalid');
                        firstNameP.classList.remove('invalid');
                    } else {
                        const idP = pField.getAttribute('id');//looking for the id of the <p> tags
                        if (idP == (idInput + 'P')) {
                            pField.classList.remove('invalid');
                        }
                    }
                });
            }

        } 
        
    });
});


registerForm.addEventListener('submit', e => {
    e.preventDefault();

    //a function that will return true if some of the inputs has 'invalid' class
    //afterwards it will check if some of the form's <p> tags has 'invalid' class
    const classListCheck = (element) => {
        return element.classList.contains('invalid');
    }

    //some() method works on array or NodeList, but registerFormInputFields and registerFormPFields
    //are HTML Collection, so first i'm changing them to an array and then I add some() method 
    if((Array.from(registerFormInputFields).some(classListCheck)) || (Array.from(registerFormPFields).some(classListCheck))){ //checking if some of the input fields contain 'invalid' class
        console.log('do nothing');
    } else {
        hourglass.style.display = 'block';
        const email = registerForm.email.value;
        const registeredNickname = registerForm.nicknameRegisteredUser.value;
        const password = registerForm.password.value;
        localStorage.setItem('name', registeredNickname);//adding the registeredNickname to the local storage

        createUserWithEmailAndPassword(auth, email, password)//firebase method
            .then((cred) => {
                registerForm.reset();//cleaning the form
                console.log (' user registered: ', cred.user);//new user's info
                hourglass.style.display = 'none';
                registerFormContainer.style.display = 'none';
                nicknameFormLabel.style.display = 'none';
                registerButton.style.display = 'none';
                signInButton.style.display = 'none';
                closeX.style.display = 'none';
                nicknameFormTextInput.style.display = 'none';
                button.style.fontSize = '17px';
                button.style.color = '#555';
                signOutButton.style.display = 'block';            

            })
            .then(() => updateProfile(auth.currentUser, { displayName: registeredNickname })) //updateProfile is a firebase method, which creates the user's displayName. Only "registeredNickname" is a varient that I created. 
            .then(() => {
                //setting a new doc (with user's Nickname and Score) to firebase database
                setDoc(doc(database, "users score", auth.currentUser.uid), { //inside of setDoc i'm writing: doc(getFirestore(), the collection's name, ID that I'm setting for this document)
                    Nickname: registeredNickname,
                    Score: 0,
                })
                localStorage.setItem('score', 0);//adding score to local storage
            })
            .then(() => {
                console.log ('nickname: ' + auth.currentUser.displayName + 
                            ' email: ' + auth.currentUser.email +
                            ' userID: ' + auth.currentUser.uid);
            })
            .catch(err => {
                hourglass.style.display = 'none';
                console.log(err.message);

                if (err.message.includes('network-request-failed')) {
                    //i'm putting the alert inside setTimeout, so it will work after 
                    //the hourglass disapperas and not before
                    setTimeout(() => {
                        alert("Network request failed, please check your internet connection or try again later.");
                    }, 300);
                } else if (err.message.includes('email-already-in-use')) {
                    setTimeout(() => {
                        alert("Email already in use.");
                    }, 300);
                } else if (err.message.includes('weak-password')) {
                    setTimeout(() => {
                        alert("Password should be at least 6 characters.");
                    }, 300);
                } else {
                    setTimeout(() => {
                        alert("There was a problem processing your request.");
                    }, 300);
                }
            });

        }
        
});


signInForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = signInForm.email.value;
    const password = signInForm.password.value;
    hourglass.style.display = 'block';

    signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
        hourglass.style.display = 'none';
        signInForm.reset(); //cleaning the form
        console.log('user signed in: ', cred.user, 'nickname: ', auth.currentUser.displayName);//cred.user shows us the user's details
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
                alert("Wrong password.");
            }, 300);
        } else if (err.message.includes('user-not-found')){
            setTimeout(() => {
                alert("User not found.");
            }, 300);
        } else if (err.message.includes('network-request-failed')){
            setTimeout(() => {
                alert("Network request failed.");
            }, 300);
        } else {
            setTimeout(() => {
                alert("Signing in error, please try again later.");
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



export { firebaseConfig, app, auth, database, registerButton, registerFormContainer, registerForm, registerFormInputFields, registerFormPFields, registerLastName, registerFirstName, lastNameP, firstNameP, signInButton, signInFormContainer, signInForm, closeX, nicknameFormLabel, nicknameFormTextInput, button, signOutButton, hourglass, reg };