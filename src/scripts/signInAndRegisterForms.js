import { initializeApp } from "firebase/app";

import {
    getFirestore, collection, getDocs, onSnapshot, setDoc, addDoc, deleteDoc, doc, 
    query, where, orderBy, serverTimestamp, getDoc, updateDoc
} from "firebase/firestore";

import {
    getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged
} from "firebase/auth";

import { instructionsPTag, secondsForEachStage, figuresPerStage, pFailure, pFailureAnon, p, pAnon } from './storyLine';

import { instructions, medal, medalSpan, savedNickname } from './localStorage';

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
const collectionRef = collection(database, 'nicknamesCollection');


let currentStage = 0;
//I can't import "let currentStage = 0" because I can import only const variables,
//so I import the function usersCurrentStage, which will let signInAndRegisterForm.js know
//in which stage we are now (it will be called in every stage change from startGame.js)
const usersCurrentStage = (stage) => currentStage = stage; 

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
const closeX = document.querySelector(".x");//the X for signInFormContainer and registerFormContainer
const instructionsP = document.querySelector('#instructions p');
const nicknameForm = document.querySelector('#instructions form');
const nicknameFormLabel = document.querySelector('#instructions form label');
const nicknameFormTextInput = document.querySelector('#instructions form #nickname');
const instructionsH4 = document.querySelector('#instructions h4');
const button = document.querySelector('#instructions form #startButton');
const signOutButton = document.querySelector('#signOut');
const hourglass = document.querySelector('#hourglass');
const forgotPassword = document.querySelector('#signInFormContainer #signInForm p'); 
const forgotContainer = document.querySelector("#forgotContainer");
const forgotForm = document.querySelector("#forgotContainer #forgotForm");
const closeX2 = document.querySelector(".x2"); //the X for forgotContainer
const backToGame = document.querySelector('#backToGame');
const emailSent = document.querySelector('#emailSent');
const emailSentP = document.querySelector('#emailSent p');
const quit = document.querySelector('#quit');

const registerButtonEvent = () => {
    registerFormContainer.style.display = 'block';
    closeX.style.display = 'block';
}

registerButton.addEventListener("click", registerButtonEvent);

const signInButtonEvent = () => {
    signInFormContainer.style.display = 'block';
    closeX.style.display = 'block';
}

signInButton.addEventListener("click", signInButtonEvent);


closeX.addEventListener("click", () => {
    signInFormContainer.style.display = 'none';
    signInForm.reset(); //cleaning the form
    registerFormContainer.style.display = 'none';
    registerForm.reset(); //cleaning the form
    closeX.style.display = 'none';
    backToGame.style.display = 'none';
    //cleaning the background red color of the registerFormInputFields (if the user typed an error)
    registerFormInputFields.forEach(inputField => {
        inputField.classList.remove('invalid');
    });
    //cleaning the red color <p> tag of the registerFormInputFields (if the user typed an error)
    registerFormPFields.forEach(pField => {
        pField.classList.remove('invalid');
    });
});

quit.addEventListener('click', () => {
    location.reload()
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
    
    //a function that will return true if the inputs has 'invalid' class
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
        const password = registerForm.password.value;
        const registeredNickname = registerForm.nicknameRegisteredUser.value;
        const docRef = doc(database, 'nicknamesCollection', registeredNickname);


        //We wan't the Nickname to be unique, so we'll use getDoc in order to check if the
        //nicknamesCollection already has the registeredNickname in it
        getDoc(docRef) 
            .then((fireDoc) => { //fireDoc is the name that I gave to the doc, because I didn't want to confuse the browser with the doc function (that belongs to firebase)
                hourglass.style.display = 'none';
                if (fireDoc.data() == null) { //it means that there isn't any user with this Nickname
                    //so we'll continue with the registration of the new user:
                    createUserWithEmailAndPassword(auth, email, password)//firebase method
                        .then((cred) => {
                            console.log (' user registered: ', cred.user);//new user's info)
                            //localStorage.setItem('score', 0);//adding score to local storage
                            localStorage.setItem('name', registeredNickname);//adding the registeredNickname to the local storage
                            localStorage.setItem('bestScore', 0);
                            localStorage.setItem('score', 0);
                            medal.style.display = 'none';
                        })
                        .then(() => updateProfile(auth.currentUser, { displayName: registeredNickname })) //updateProfile is a firebase method, which creates the user's displayName. Only "registeredNickname" is a varient that I created. 
                        .then(() => {
                            document.forms.nicknameForm.nickname.setAttribute("value", auth.currentUser.displayName);//I defined that, so there won't be a mistake when the user will start playing
                            console.log ('nickname: ' + auth.currentUser.displayName + 
                                            ' email: ' + auth.currentUser.email +
                                            ' userID: ' + auth.currentUser.uid);
                        })
                        .then(() => {
                            //setting a new doc (with user's Nickname) to firebase database
                            setDoc(docRef, { 
                                Nickname: registeredNickname,
                            })
                            .then(() => {
                                console.log('We have set the new docs'); 
                            })
                            .catch(err => {  //catch for setDoc
                                console.log(err.message);
                                alert('There was a problem processing your request.');
                                hourglass.style.display = 'none';
                            })
                        })
                        .then(() => {
                            setDoc(doc(database, 'usersScore', auth.currentUser.displayName), { 
                                Score: 0,
                                Nickname: registeredNickname,
                            })
                            .then(() => {
                                console.log('We have set the other docs'); 
                                registerForm.reset();//cleaning the form
                                hourglass.style.display = 'none';
                                registerFormContainer.style.display = 'none';
                                nicknameFormLabel.style.display = 'none';
                                nicknameFormTextInput.style.display = 'none';
                                registerButton.style.display = 'none';
                                signInButton.style.display = 'none';
                                closeX.style.display = 'none'; 
                                instructionsPTag.textContent = registeredNickname + ', ' + p[currentStage];                
                                button.style.fontSize = '17px';
                                button.style.color = '#555';
                                signOutButton.style.display = 'block'; 
                            })
                            .catch(err => {  //catch for setDoc
                                console.log(err.message);
                                alert('There was a problem processing your request.');
                                hourglass.style.display = 'none';
                            })
                        })
                        .catch(err => {  //catch for createUserWithEmailAndPassword
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
                                    alert("Email already in use, please choose a different one.");
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
                    /////////////////////////////////////////
                } else { //if the Nickname already exists
                    console.log('Nickname already exists:', fireDoc.data());
                    alert('This nickname is already taken, please choose a different one');
                }
            })
            .catch(err => { //catch for getDoc
                console.log('Error message for getDoc:', err.message);
        
                hourglass.style.display = 'none';
                setTimeout(() => {
                    alert("There was a problem processing your request. Please try again later.");
                }, 300);
            })
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
        instructionsPTag.textContent = auth.currentUser.displayName + ', ' + p[currentStage];
        document.forms.nicknameForm.nickname.setAttribute("value", auth.currentUser.displayName);//I defined that, so there won't be a mistake when the user will start playing
        signInFormContainer.style.display = 'none';
        nicknameFormLabel.style.display = 'none';
        nicknameFormTextInput.style.display = 'none';
        registerButton.style.display = 'none';
        signInButton.style.display = 'none';
        signOutButton.style.display = 'block';
        closeX.style.display = 'none';
        button.style.fontSize = '17px';
        button.style.color = '#555';
        backToGame.style.display = 'none';
        medal.style.display = 'none';
        localStorage.clear();
        localStorage.getItem('score');//I'm doing it after clear(), because it cleans the score (so it won't appear if I'll do console.log())
        localStorage.getItem('bestScore');//I'm doing it after clear(), because it cleans the bestScore (so it won't appear if I'll do console.log())
        localStorage.setItem('name', auth.currentUser.displayName);//adding the registeredNickname to the local storage
        //Now I'll set the user's bestScore from firebase into the local storage
        getDoc(doc(database, 'usersScore', auth.currentUser.displayName))
            .then((docum) => {
                localStorage.setItem('bestScore', docum.data().Score);//adding the registeredNickname to the local storage
                
                //and if bestScore exists, I'll make it appear with the medal at the top of the screen
                if ((localStorage.getItem('bestScore') != null) && (localStorage.getItem('bestScore') != '') && (localStorage.getItem('bestScore') != 0)) {
                    medalSpan.textContent = localStorage.getItem('bestScore');
                    medal.style.display = 'block';
                } else { //if there aren't any scores
                    medal.style.display = 'none';
                }
            })
            .catch((err) => {
                console.log(err.message);
            })
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



//When the user click the sentance "Forgot your password?":
forgotPassword.addEventListener("click", () => {
    forgotContainer.style.display = 'block';
    signInFormContainer.style.display = 'none';
    closeX.style.display = 'none';
    closeX2.style.display = 'block'; //the X for forgotContainer
    backToGame.style.display = 'block';
});


closeX2.addEventListener("click", () => {
    forgotContainer.style.display = 'none';
    signInFormContainer.style.display = 'block';
    closeX.style.display = 'block';
    closeX2.style.display = 'none';
    backToGame.style.display = 'block';
    forgotForm.reset();
});

backToGame.addEventListener('click', () => {
    forgotContainer.style.display = 'none';
    signInFormContainer.style.display = 'none';
    closeX.style.display = 'none';
    closeX2.style.display = 'none';
    backToGame.style.display = 'none';
    forgotForm.reset();
});


forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const forgotEmailValue = forgotForm.email.value;
    console.log(forgotEmailValue);
    hourglass.style.display = 'block';
    emailSentP.classList.add('animationIsOn');
    emailSentP.classList.remove('animationRemoved');

    sendPasswordResetEmail(auth, forgotEmailValue)
    .then(() => {
        hourglass.style.display = 'none';
        // Password reset email sent!
        console.log("Email sent!");
        emailSent.style.display = 'flex';
        emailSentP.style.animation = 'emailSent 2.5s ease forwards normal'; 

        setTimeout(() => {
            emailSent.style.display = 'none';
            emailSentP.classList.add('animationRemoved');
            emailSentP.classList.remove('animationIsOn');//it will reset the emailSent animation
        }, 2500);

        forgotForm.reset();
        forgotContainer.style.display = 'none';
        signInFormContainer.style.display = 'block';
        closeX.style.display = 'block';
        closeX2.style.display = 'none'; //the X for forgotContainer
        backToGame.style.display = 'block';
    })
    .catch((error) => {
        hourglass.style.display = 'none';
        const errorMessage = error.message;
        console.log(error.message);
        if (error.message.includes('network-request-failed')) {
            //i'm putting the alert inside setTimeout, so it will work after 
            //the hourglass disapperas and not before
            setTimeout(() => {
                alert("Network request failed, please check your internet connection or try again later.");
            }, 300);
        } else if (error.message.includes('invalid-email')) {
            setTimeout(() => {
                alert("Invalid email, please verify your email below and resend it.");
            }, 300);
        } else if (error.message.includes('user-not-found')) {
            setTimeout(() => {
                alert("Account does not exist.");
            }, 300);
        } else {
            setTimeout(() => {
                alert("There was a problem processing your request.");
            }, 300);
        }
    });
});


signOutButton.addEventListener('click', () => {
    signOutButton.style.display = 'none';
    registerButton.style.display = 'inline-block';
    signInButton.style.display = 'inline-block';
    localStorage.clear(); //clears all localStorage items
    localStorage.getItem('name');//preventing the cleared name to appear in the console (if we will do console.log())
    localStorage.getItem('score');//preventing the cleared score to appear in the console (if we will do console.log())

    // if (unsubscribe != null) {
    //     unsubscribe();
    // }

    signOut(auth)
    .then (() => {
        console.log('the user logged out');
        instructionsPTag.textContent = pAnon[currentStage];
        medal.style.display = 'none';
        nicknameFormLabel.style.display = 'inline-block';
        nicknameFormLabel.style.right = '3px';
        nicknameFormTextInput.style.display = 'inline-block';
        button.style.fontSize = '14px';
        button.style.color = 'buttontext';
        document.forms.nicknameForm.nickname.setAttribute("value", '');
    })
    .catch(err => {
        console.log(err.message);
    })
});


//checking if the user signed in (it's important for cases where the user refreshes the page)
let status = 0;

onAuthStateChanged(auth, (user) => {
    if (user) { //if Auth user exists, we want the signOut button to be on, at the beginning of the game (instead of the register and signIn buttons)
        status = 1;
        console.log(status, user);
        registerButton.style.display = 'none';
        signInButton.style.display = 'none'; 
        signOutButton.style.display = 'block';
        instructionsPTag.textContent = auth.currentUser.displayName + ', ' + p[currentStage];
        nicknameFormLabel.style.display = 'none';
        nicknameFormTextInput.style.display = 'none';
        button.style.fontSize = '17px';
        button.style.color = '#555';
    } else { //if there isn't any user
        status = 0;
        console.log(status, user);
    }
})


//mediaQuery for phones and tablets
const mediaq1 = window.matchMedia('(orientation: portrait)');
//for cases when user loads the game on phone
const forPhonesAndTablets = (mq) => {
    if (mq.matches) {
        console.log('pp');
        registerButton.removeEventListener("click", registerButtonEvent);
        signInButton.removeEventListener("click", signInButtonEvent);
    }
}

forPhonesAndTablets(mediaq1);

//eventListener for state changes
mediaq1.addEventListener('change', (e) => {
    if (e.matches) {
        console.log('kkk');
        registerButton.removeEventListener("click", registerButtonEvent);
        signInButton.removeEventListener("click", signInButtonEvent);
    }
});

//I check with Navigator.userAgent if one of the words bellow exist. if one of them exists, then it means that the user is on a mobile/tablet device
//I took this code from https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    
    registerButton.removeEventListener("click", registerButtonEvent);
    signInButton.removeEventListener("click", signInButtonEvent);  
    instructionsP.style.display = 'none';
    nicknameForm.style.display = 'none';
    instructionsH4.style.display = 'block';
}





export { firebaseConfig, app, auth, database, usersCurrentStage, registerButton, registerFormContainer, registerForm, registerFormInputFields, registerFormPFields, registerLastName, registerFirstName, lastNameP, firstNameP, signInButton, signInFormContainer, signInForm, closeX, nicknameFormLabel, nicknameFormTextInput, button, signOutButton, hourglass, reg, status, quit };