const tinyCircles = document.querySelectorAll('.tinyCircle');
const corona = document.querySelectorAll('.corona');
const tinyCircleContainer = document.querySelectorAll('.tinyCircleContainer');
const formLabel = document.querySelector('#instructions form label');
const formTextInput = document.querySelector('#instructions form #nickname');
const instructionsPTag = document.querySelector('#instructions p');
let nickname;
let stage = 0;


const instructions = document.querySelector('#instructions');


//starting the game
button.addEventListener("click", (e) => {
    
    e.preventDefault();//prevent refresh of the page due to the form

    stop = 0;
     
    //putting the nickname in local storage
    nickname = document.forms.nicknameForm.nickname.value;
    let localName = localStorage.getItem('name');

    if (nickname != ''){
        localStorage.setItem('name', nickname);
        localName = localStorage.getItem('name');
        console.log("Hello " +localName);
    } else if (nickname == ''){
        if (localName != null){
            console.log("Hello " +localName);
        } else {
            localName = '';
            console.log("Hello " + localName);
        }
    }

    //we will remove parts of the form that we won't need any more
    formLabel.style.display = 'none';
    formTextInput.style.display = 'none';
    

    //the corona appears
    corona.forEach(element => {
        element.style.display = 'block';
    })
    //the small circles of the corona appear
    tinyCircleContainer.forEach(element => {
        element.style.display = 'inline-block';
    })
    
    instructions.style.display = 'none';

    //the corona's eyes will get closed and turn/look to the other side
    topEyeshade.style.animation = 'shutTopEyeshade 2.5s 0.65s ease infinite normal';
    bottomEyeshade.style.animation = 'shutBottomEyeshade 2.5s 0.65s ease infinite normal';
    eyes.style.animation = 'turnEyes 5s 0.925s ease infinite normal'; 

    //the score section appears:
    header.style.display = 'flex';
    const score = document.querySelector('header span');
    let j = 0;
    score.textContent = j;

    //the timer appears
    const timer = document.querySelector('#timer');
    let seconds = secondsForEachStage[stage];//
    timer.textContent = seconds;  
    timer.style.animation = `timerGrows 1s ${seconds+1} ease normal`;


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


    figures.forEach(figure => {

        const currentFigure = document.querySelector('#'+figure);

        //adding a background image for each figure:
        currentFigure.style.background = `url('./images/${figure}.svg')`; 
        //putting the figures in different places at starting point
        currentFigure.style.top = Math.random()*(body.clientHeight - 56) + 'px'; //56 is the size of the figures. body.clientHeight gives the viewport size without the scroll bar
        currentFigure.style.left = Math.random()*(body.clientWidth - 56) + 'px'; //56 is the size of the figures.
        currentFigure.style.display = 'block';
        //starting to move the figures in different directions:
        move(figure);

        //function for clicking a figure
        const starsAndPoints = () => {
            currentFigure.removeEventListener('click', starsAndPoints);
            currentFigure.style.background = 'url(./images/stars.svg)';
            currentFigure.style.animation = 'fireworks 0.75s ease forwards normal';
            j += 10;
            score.textContent = j;
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



    //function that works after the user failed
    const failingProcedure = () => {

        stop = 1;   
                    
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
            } 
        })

        console.log ('you failed');
        //bringing back the instraction's box
        const bringingBackInstructions = () => {
            
            if(localName == ''){
                instructionsPTag.textContent = "You failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe.";
            } else {    
                instructionsPTag.textContent = localName + ',' + " you failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe."; 
            }

            instructions.style.opacity = '0';
            instructions.style.display = 'block';
            instructions.style.top = 'calc(30% + 4px)';
            instructions.style.animation = 'instructionsAppears 2.5s ease forwards normal';            
        }


        //changing back the figures to their original size, so they'll be ready for next level
        const sizingBackFigures = () => {
            figuresDivs.forEach(figureDiv => {
                figureDiv.style.animation = 'figureBecomesMini 1ms 1.7s 1 backwards reverse';
                figureDiv.style.animation = 'fireworks 1ms 1 backwards reverse';
                figureDiv.style.display = 'none';
            }) 
        }
        
        setTimeout(bringingBackInstructions, 2000);
        setTimeout(sizingBackFigures, 2000);

    }
   

    //function that checks if all the figures were clicked or if the time of the level ended
    const endLevelCheck = () => {
        if (figuresDivs.every(checkBackground)) {  //"every" returns true if the function returns true for all elements in the array (if all figures became stars)
            clearInterval(endLevel);
            stop = 1; //the stars will stop moving
            stage += 1;
            clearInterval(countDownInterval); //the clock will stop
            timer.style.animation = 'none';
            timer.style.animation = 'timerGrowsAgain 1s 1 ease normal';

            //resizing the fireworks to their original size, so they'll be ready for next level
            // figuresDivs.forEach(figureDiv => {
            //     figureDiv.style.animation = 'fireworks 1ms 0.75s 1 backwards reverse';
            //     figureDiv.style.display = 'none';
            // }) 
            
            //hiding the corona
            corona.forEach(element => {
                element.style.display = 'none';
            })
            
            //bringing back the instraction's box
            if(localName == ''){
                instructions.innerHTML = pAnon[stage]; //pAnon is the text appears in storyLine.js
            } else {
                instructions.innerHTML = localName + ',' + p[stage]; ////p is the text appears in storyLine.js
            }
            instructions.style.opacity = '0';
            instructions.style.display = 'block';
            instructions.style.animation = 'instructionsAppears 2s ease forwards normal';            


        } else if (seconds == 0 && figuresDivs.every(checkBackground) == false) { //if not all figures became stars and the seconds ended
            clearInterval(endLevel);
            clearInterval(countDownInterval); //the clock will stop
            failingProcedure();//function that brings the ambulances
            tinyCircles.forEach(circle => {
                circle.style.animation = `coronaColorsChange${stage} 2.5s linear forwards`; //corona starts to change color
            })
        }
    }


    const endLevel = setInterval(endLevelCheck, 1); 

});







