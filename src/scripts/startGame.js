//import style from '../css/cursor.css';
import '../css/cursor.css';
import figure1 from '../images/figure1.svg';
import figure2 from '../images/figure2.svg';
import figure3 from '../images/figure3.svg';
import figure4 from '../images/figure4.svg';
import figure5 from '../images/figure5.svg';
import figure6 from '../images/figure6.svg';
import figure7 from '../images/figure7.svg';
import figure8 from '../images/figure8.svg';
import figure9 from '../images/figure9.svg';
import figure10 from '../images/figure10.svg';
import figure11 from '../images/figure11.svg';
import figure12 from '../images/figure12.svg';
import figure13 from '../images/figure13.svg';
import figure14 from '../images/figure14.svg';
import figure15 from '../images/figure15.svg';
import figure16 from '../images/figure16.svg';
import figure17 from '../images/figure17.svg';
import figure18 from '../images/figure18.svg';
import figure19 from '../images/figure19.svg';
import figure20 from '../images/figure20.svg';
import stars from '../images/stars.svg';
import favicon from '../images/favicon.ico';
import { body, header, eyes } from './cursorAndCorona';
import { instructions, medal } from './localStorage';
import { auth, database, usersCurrentStage, nicknameFormLabel, nicknameFormTextInput, button, signOutButton, status, quit } from './signInAndRegisterForms';
import { instructionsPTag, secondsForEachStage, figuresPerStage, p, pAnon } from './storyLine';
import { stopWorking, ourViewPortWidth, move, trial } from './figuresMovement';
import { doc, updateDoc, orderBy, limit, query, collection, onSnapshot } from "firebase/firestore";
import { headline, mobile, bestPlayerName } from "./mobile";

const footer = document.querySelector('footer');
const topEyeshade = document.querySelector('#topEyeshade');
const bottomEyeshade = document.querySelector('#bottomEyeshade');
const tinyCircles = document.querySelectorAll('.tinyCircle');
const corona = document.querySelectorAll('.corona');
const tinyCircleContainer = document.querySelectorAll('.tinyCircleContainer');
const sign = document.querySelector('#sign');
const go = document.querySelector('#go');
let nickname;
let stage = 0;//will go inside the level tag
let figures = []; //figure1, figure2...
let figuresDivs = [];
let numsOfFigs = [];//for example: [1, 2, 3, 4, 5, 6, 7] depends on the max number of figures in each level
let userScore = 0;
const bonusArrow = document.querySelector('header #bonusArrow');
let speed; //figures' speed (Controls the frequency of the interval in the function move)
let currentLevelClicksSuccess = 0;
let failureSign;


const colRef = collection(database, 'usersScore');
const q = query(colRef, orderBy('Score', 'desc'), limit(1));//We'll get only the highest score
const bestPlayerNameSpan = document.querySelector('#instructions #bestPlayerName span');
const bestPlayerScore = document.querySelector('#instructions #bestPlayerScore');
const bestPlayerScoreSpan = document.querySelector('#instructions #bestPlayerScore span');

//Checking in firebase who is world's best player and putting it on home screen
onSnapshot(q, (snapshot) => {
    snapshot.docs.forEach((qDoc) => {
        if (mobile != 1) { //We wan't to see the best player only on laptops and desktops
            bestPlayerNameSpan.textContent = {...qDoc.data()}.Nickname;
            bestPlayerScoreSpan.textContent = {...qDoc.data()}.Score;
        }
    })
})


//starting the game
button.addEventListener("click", (e) => {
    
    e.preventDefault();//prevent refreshing the page (due to the form)

    signOutButton.style.display = 'none';
    medal.style.display = 'none';
    quit.style.display = 'none';
    headline.style.opacity = '0';
    bestPlayerName.style.display = 'none';

    //The trial figures at the home page will stop working
    Array.from(trial).forEach(element => {
        element.style.display = 'none'; 
        stopWorking(1);  
    });

    stopWorking(0);

    //filling up numsOfFigs array according to figuresPerStage array
    for (let z = 1; z <= figuresPerStage[stage]; z++){
        if ((stage == 4) && (z == 11 || z == 12 || z == 13 || z == 14)){ //We don't want the bats in stage 5
            console.log("");
        } else {
            numsOfFigs.push(z);
        }
    } 

    if (stage == 0) {
        if (failureSign == 1) {//If it is not the first time of stage 0, we will not have "Go!"
            go.style.display = 'none';
        } else { //If it is the first time of stage 0
            go.style.display = 'block';
            go.style.animation = `goGrows 1.35s ease normal`; 
            setTimeout(() => {
                go.style.display = 'none';
            }, 1350); 
        }   
    }
    

    //defining the figures' arrays
    numsOfFigs.forEach(num => {
        //adding figures into the figures array
        figures.push('figure'+num);
        
        //creating figures div tags in the html
        const i = document.createElement('div');
        i.classList.add('figures');
        i.setAttribute('id', 'figure'+num);
        body.insertBefore(i, footer);
        figuresDivs.push(i);

    });

    figures.forEach(figure => {

        const currentFigure = document.querySelector('#'+figure);

        //adding a background image for each figure:
        currentFigure.style.background = `url('./${figure}.svg')`; 
        //putting the figures in different places at starting point
        currentFigure.style.top = Math.random()*(body.clientHeight - 56) + 'px'; //56 is the size of the figures. body.clientHeight gives the viewport size without the scroll bar
        currentFigure.style.left = Math.random()*(body.clientWidth - 56) + 'px'; //56 is the size of the figures.
        currentFigure.style.display = 'block';
        //starting to move the figures in different directions:
        if (stage >= 5){
            speed = 'fast';
        } else {
            speed = 'regular';
        }
        move(currentFigure, speed);


        //function for clicking a figure
        const starsAndPoints = () => {
            currentFigure.removeEventListener('click', starsAndPoints);
            currentFigure.style.background = 'url(./stars.svg)';
            currentFigure.style.animation = 'fireworks 0.75s ease forwards normal';
            userScore += 10;
            currentLevelClicksSuccess += 1;
            score.textContent = userScore;
            localStorage.score = userScore;

            //deleting the figure from the DOM
            setTimeout(() => {
                currentFigure.remove(); 
            }, 751);
        }

        //adding eventListener for each figure and adjusting the score
        currentFigure.addEventListener('click', starsAndPoints);

        //function that prevents clicking on figures, while the ambulances come
        const preventClick = () => {
            currentFigure.removeEventListener('click', starsAndPoints);
        }

        //at the end of the stage the user won't be able to click the figures
        setTimeout(preventClick, secondsForEachStage[stage]*1000);

    })

     
    //putting the new nickname in local storage and removing best score of old users
    nickname = document.forms.nicknameForm.nickname.value;

    if ((nickname != '') && (nickname != null)) {
        if (localStorage.getItem('name') != nickname) {
            localStorage.removeItem('bestScore');
            localStorage.getItem('bestScore');//It's part of the removing method (We do it in order to prevent console.log to show the item that we have removed)
            localStorage.removeItem('score');
            localStorage.getItem('score');
            localStorage.setItem('name', nickname);
        } /*else {
            localStorage.setItem('name', nickname);
        }*/
    } else if ((nickname == '') || (nickname == null)) {
        if (stage == 0) {
            localStorage.clear();
            localStorage.getItem('name');
            localStorage.getItem('score');
            localStorage.getItem('bestScore');
        }
    }


    //we will remove parts of the form that we won't need any more
    nicknameFormLabel.style.display = 'none';
    nicknameFormTextInput.style.display = 'none';
    
    //we will remove signIn, signUp and quit buttons
    sign.style.display = 'none';
    quit.style.display = 'none';
    
    //we will make the button bigger and with lighter text color
    button.style.fontSize = '17px';
    button.style.color = '#555';

    //the corona appears
    if (stage == 0 && failureSign != 1) { //If we are on stage 0, for the first time, then the Corona will appear after the "Go!" will dissappear
        corona.forEach(element => {
            element.style.display = 'block';
            element.style.opacity = '0';
            element.style.animation = 'appears 0.3s 1.3s ease forwards normal';
        })

        //the small circles of the corona appear
        tinyCircleContainer.forEach(element => {
            element.style.display = 'inline-block';
            element.style.opacity = '0';
            element.style.animation = 'appears 0.3s 1.3s ease forwards normal';
        })

        setTimeout (() => {
            topEyeshade.style.opacity = '1';
            bottomEyeshade.style.opacity = '1';
        }, 1400);
        
    } else { //if it is not stage 0, the Corona will appear right away 

        corona.forEach(element => {
            element.style.display = 'block';
            element.style.opacity = '1';
            element.style.animation = 'appears 0s ease forwards normal';
        })

        //the small circles of the corona appear
        tinyCircleContainer.forEach(element => {
            element.style.display = 'inline-block';
            element.style.opacity = '1';
            element.style.animation = 'appears 0s ease forwards normal';
        })
    }

    //the corona's eyes will get closed and turn/look to the other side
    topEyeshade.style.animation = 'shutTopEyeshade 2.5s 0.65s ease infinite normal';
    bottomEyeshade.style.animation = 'shutBottomEyeshade 2.5s 0.65s ease infinite normal';
    eyes.style.animation = 'turnEyes 5s 0.925s ease infinite normal'; 

    
    instructions.style.display = 'none';

  
    //the score section appears:
    header.style.opacity = '0';
    header.style.display = 'flex'; 
    const score = document.querySelector('header #score span');
    score.textContent = userScore;
    let y = 0;
    //the next function will be called by: window.requestAnimationFrame(opacityChange);
    //and it will tell the browser that I wish to perform an animation with the opacity
    const opacityChange = () => {
        y = y + 0.03;
        header.style.opacity = `${y}`;

        if (header.style.opacity < '1'){
            requestAnimationFrame(opacityChange);
        }
    }

    window.requestAnimationFrame(opacityChange);


    //the timer appears
    const timer = document.querySelector('#timer');
    timer.style.animation = 'none';//in order to reset the animation of the end of the level
    timer.classList.add('animationIsOn');//bringing back the original className
    timer.classList.remove('animationRemoved');//a temporary className we added to the timer at the end of the level (now we're removing it)
    let seconds = secondsForEachStage[stage];
    timer.textContent = seconds;  
    timer.style.animation = `timerGrows 1s ${seconds+1} ease normal`;
    
    //the stage appears on screen
    const level = document.querySelector('header #level span');
    level.textContent = stage+1;

    //resetting the bonusArrow animation from the end of the level, so it'll be able to work again
    bonusArrow.style.animation = 'none';
    bonusArrow.classList.remove('animationRemoved');
    bonusArrow.classList.add('animationIsOn');


    //function that will be called from the countDown function 
    //and also from the check function
    const checkBackground = (figureDiv) => {
        return figureDiv.style.background.includes('stars.svg');
    }


    //countDown function for the timer and changing the corona's color when not all figures were clicked
    const countDown = () => {
        seconds = seconds - 1;  
        timer.textContent = seconds;
    }

    const countDownInterval = setInterval(countDown, 1000); //function for the timer

    
    let localName = localStorage.getItem('name');

    //function that works after the user failed
    const failingProcedure = () => {

        stopWorking(1);   
        failureSign = 1;//important for the "Go!" in level 0

        //making the color of the corona randomly different
        let h = Math.random() * 359; //the H og the hsl is 0-359
        let s = Math.floor(Math.random() * (80 - 26 + 1) + 26);//I decided that the percentage of the S in hsl will be between 26 and 80 (because i don't like min saturation and max saturation)
        let l = Math.floor(Math.random() * (75 - 35 + 1) + 35);//I decided that the percentage of the L in hsl will be between 35 and 75 (not too light and not too dark)
        tinyCircles.forEach(circle => {
            circle.style.background = `hsl(${h}, ${s}%, ${l}%)`;
        });   
        
        //removing the original class from the timer, resets its animation
        //and lets the animation work again next level (after adding the old className back)
        setTimeout(() => {
            timer.style.animation = 'none';
            timer.classList.add('animationRemoved');
            timer.classList.remove('animationIsOn');
        }, 1000);

            
        figuresDivs.forEach(figureDiv => {

            if (figureDiv.style.background.includes('figure')){
                figureDiv.style.top = parseInt(figureDiv.style.top) + 'px'; //the method parseInt takes only the number (and leaves out the string 'px' attached to it) 
                figureDiv.style.left = parseInt(figureDiv.style.left) + 'px';

                //creating ambulances and putting them 80px left to each figure
                const i = document.createElement('div');
                i.classList.add('ambulance');
                body.insertBefore(i, footer);
                i.style.position = 'absolute';
                i.style.top = figureDiv.style.top;
                i.style.left = (parseInt(figureDiv.style.left) - 80) + "px";


                const figureEntersAmbulance = () => {
                    let z = 0;
                    setInterval(() => {
                        if (z < 20){
                            figureDiv.style.top = parseInt(figureDiv.style.top) + 1 + 'px'
                            z += 1;
                        }
                    }, 5  
                    );
                }

                //moving the ambulance from the left of the figure towards the figure
                const movingAmbulance = () => {
                    if ( parseInt(i.style.left) < parseInt(figureDiv.style.left) ){
                        i.style.left = (parseInt(i.style.left) + 1) + 'px';
                    }
                }


                //movingAmbulancePart2 will call this function:
                const moveRight = () => {
                    i.style.left = (parseInt(i.style.left) + 1) + 'px';
                }
                
                //moving the ambulance from the figure to the right side of the screen
                const movingAmbulancePart2 = () => {
                    if(parseInt(i.style.left) < ourViewPortWidth){
                        const movingRight = setInterval(moveRight, 10);
                        i.style.animation = 'disappears 3s ease forwards normal';
                        setInterval(() => clearInterval(movingRight), 3000);
                    }
                }


                setTimeout(figureEntersAmbulance, 1200);
                figureDiv.style.animation = 'figureBecomesMini 0.5s 1.2s ease forwards normal';
                setInterval(movingAmbulance, 15);
                setTimeout(movingAmbulancePart2, 1700);
                //cleaning all figures and figures arrays after they entered the ambulance
                setTimeout(() => {
                    figuresDivs.forEach(figure => {
                        figure.remove();
                    })
                    figures = []; 
                    figuresDivs = [];
                    numsOfFigs = [];
                }, 1700);
                //cleaning the ambulances after they finished their work
                setTimeout(() => {
                    const ambulances = document.querySelectorAll('.ambulance');
                    ambulances.forEach(ambulance => {
                        ambulance.remove();
                    })
                }, 4700);
            } 
        })

        //bringing back the instraction's box
        const bringingBackInstructions = () => {
            
            if((localName == '') || (localName == null)){
                instructionsPTag.textContent = "You failed! A new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe.";
            } else {    
                instructionsPTag.textContent = localName + ',' + " you failed! A new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe."; 
            }

            instructions.style.opacity = '0';
            instructions.style.display = 'block';
            instructions.style.top = 'calc(30% + 4px)';
            instructions.style.animation = 'appears 2.5s ease forwards normal';
            quit.style.display = 'block';//quit button appears
            quit.style.animation = 'appears 2.5s ease forwards normal';           
        }
        
        setTimeout(bringingBackInstructions, 2000);

        
        userScore = userScore - (currentLevelClicksSuccess * 10);//Taking back the scores of this level
        currentLevelClicksSuccess = 0;
        localStorage.score = userScore;//Changing the scores back in the localStorage
    }
   

    //function that checks if all the figures were clicked or if the time of the level ended
    const endLevelCheck = () => {
        if (figuresDivs.every(checkBackground)) {  //"every" returns true if the function returns true for all elements in the array (if all figures became stars)
            clearInterval(endLevel);
            stopWorking(1); //the stars will stop moving
            stage += 1;
            usersCurrentStage(stage);//updating "currentStage" variable, which is located in signInAndRegisterForms.js 
            clearInterval(countDownInterval); //the clock will stop
            timer.style.animation = 'none';
            timer.classList.add('animationRemoved');
            timer.classList.remove('animationIsOn');//removing this class resets the animation for this element and lets us use it again after adding this class back

            //Stage 8 is the end of game
            if (stage == 8) {
                const fictive = document.querySelector('#fictive');
                const playAgainButton = document.querySelector('#instructions form button');
                instructions.style.top = '25%';
                bonusArrow.style.display = 'none';
                fictive.style.display = 'none';//Since I made "display: none;" to the bonusArrow, the timer in the header is not centered, so I also made "display: none" to the fictive div (and now the timer is centered)
                button.style.display = 'none'; 
                playAgainButton.style.display = 'block';
                playAgainButton.addEventListener('click', () => {
                    location.reload() //location.reload() reloads the current URL, like the Refresh button
                });
                bestPlayerName.style.display = 'block';
                bestPlayerScore.style.display = 'block';
                bestPlayerName.style.marginBottom = '0px';
                bestPlayerScore.style.marginBottom = '-60px';
                
                //adding a lot of fireworks
                figuresDivs.forEach(figureDiv => {
                    body.insertBefore(figureDiv, footer);
                    figureDiv.style.display = 'block';
                    figureDiv.style.zIndex = '8';
                    figureDiv.style.width = '56px';
                    figureDiv.style.height = '56px';
                    figureDiv.style.top = Math.random()*(body.clientHeight - 56) + 'px'; //56 is the size of the figures. body.clientHeight gives the viewport size without the scroll bar
                    figureDiv.style.left = Math.random()*(body.clientWidth - 56) + 'px'; //56 is the size of the figures.
                    figureDiv.style.animation = 'fireworks 2s ease forwards normal';
                })
            } else {
                //cleaning the figures arrays (in order to get ready for next level):
                setTimeout(() => {
                    figures = []; 
                    figuresDivs = [];
                    numsOfFigs = [];
                }, 751); //after the last firework ended its work
            }

            if (seconds != 0) {
                if (stage != 8){
                    timer.style.animation = `timerGrowsAgain 1s ${seconds} ease normal`;
                    bonusArrow.style.opacity = '1';
                    bonusArrow.style.animation = `arrowGrows 1s ${seconds} ease normal`;
                    bonusArrow.classList.add('animationRemoved');
                    bonusArrow.classList.remove('animationIsOn');//removing this class resets the animation for this element and lets us use it again after adding this class back
                    
                    setTimeout(() => {
                        bonusArrow.style.opacity = '0';
                    }, (seconds*1000));    
                }

                //in all stages:
                let bonus = (seconds * 10);
                const i = 1;
                let count = 0;
                setInterval(()=>{
                    count = count + i;
                    if (count <= bonus){
                        userScore += 1;
                        score.textContent = userScore;
                        localStorage.score = userScore;
                        if (localStorage.bestScore < userScore) {
                            localStorage.bestScore = userScore;

                            if (status == 1) { //if there is an Auth user
                                updateDoc(doc(database, 'usersScore', auth.currentUser.displayName), {
                                    Score: Number(localStorage.getItem('bestScore'))  //the info from the localStorage comes as a string, so I change it into a number
                                })
                                .then(() => {
                                    //console.log('');
                                })
                                .catch((err) => {
                                    console.log(err.message);
                                })
                            }
                            

                        }
                    } 
                }, 100);

            }

            //hiding the corona
            corona.forEach(element => {
                element.style.display = 'none';
            })
            
            //bringing back the instraction's box
            if((localName == '') || (localName == null)){
                instructionsPTag.textContent = pAnon[stage]; //pAnon is the text appears in storyLine.js
            } else {
                instructionsPTag.textContent = localName + ', ' + p[stage]; ////p is the text appears in storyLine.js
            }
            instructions.style.opacity = '0';
            instructions.style.display = 'block';
            instructions.style.animation = 'appears 2s ease forwards normal'; 
            quit.style.display = 'block';//quit button appears
            quit.style.animation = 'appears 2s ease forwards normal';

            //Defining the bestScore in the localStorage, after completing the level successfully
            if ((localStorage.bestScore == '') || (localStorage.bestScore == null)) {
                localStorage.bestScore = userScore;
            } else if (localStorage.bestScore < userScore) {
                localStorage.bestScore = userScore;
            }
            currentLevelClicksSuccess = 0;


        } else if (seconds == 0 && figuresDivs.every(checkBackground) == false) { //if not all figures became stars and the seconds ended
            clearInterval(endLevel);
            clearInterval(countDownInterval); //the clock will stop
            failingProcedure();//function that brings the ambulances
        }
    }


    const endLevel = setInterval(endLevelCheck, 1); 

});







