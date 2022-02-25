const tinyCircles = document.querySelectorAll('.tinyCircle');
const secondsForEachStage = [8, 10, 10, 15, 10, 10, 15, 10, 15, 10];
let stage = 0;

//we start the game by clicking the start button
button.addEventListener("click", () => {
    let timeOnBeginning = Date.now(); 

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
        if (seconds == 0 && figuresDivs.every(checkBackground) == false) { //if not all figures have became stars
            clearInterval(countDownInterval);
            timer.style.animation = 'none';

            tinyCircles.forEach(circle => {
                circle.style.animation = `coronaColorsChange${stage} 2.5s linear forwards`; //corona starts to change color
            })

        } else if (seconds == 0 && figuresDivs.every(checkBackground) == true) { //all figures have became stars
            clearInterval(countDownInterval);
            timer.style.animation = 'none';
            stage += 1;
        } 
    }

    const countDownInterval = setInterval(countDown, 1000); //function for the timer


    figures.forEach(figure => {

        const currentFigure = document.querySelector('#'+figure);

        //adding a background image for each figure:
        currentFigure.style.background = `url('./images/${figure}.svg')`; 
        //putting the figures in different places at starting point
        currentFigure.style.top = Math.random()*(body.clientHeight - 56) + 'px'; //56 is the size of the figures. body.clientHeight gives the viewport size without the scroll bar
        currentFigure.style.left = Math.random()*(body.clientWidth - 56) + 'px'; //56 is the size of the figures.
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
        
        console.log ('you failed');
            
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


                const movingAmbulance = () => {
                    if ( parseInt(i.style.left) < parseInt(figureDiv.style.left) ){
                        i.style.left = (parseInt(i.style.left) + 1) + 'px';
                    }
                }


                const movingAmbulancePart2 = () => {
                    if(parseInt(i.style.left) < ourViewPortWidth){
                        setInterval(() => {
                            i.style.left = (parseInt(i.style.left) + 1) + 'px'; 
                        }, 10)
                        i.style.animation = 'ambulanceDisappears 3s ease forwards normal';
                    }
                }


                setTimeout(figureEntersAmbulance, 1200);
                figureDiv.style.animation = 'figureBecomesMini 0.5s 1.2s ease forwards normal';
                setInterval(movingAmbulance, 15);
                setTimeout(movingAmbulancePart2, 1300);


            }
        })
    }
   

    //function that checks if all the figures were clicked or if the time of the level ended
    const endLevelCheck = () => {
        const currentTime = Date.now();
        if (figuresDivs.every(checkBackground)) {  //"every" returns true if the function returns true for all elements in the array (if all figures became stars)
            clearInterval(endLevel);
            stop = 1; //the stars will stop moving
            clearInterval(countDownInterval); //the clock will stop
            timer.style.animation = 'none';
            timer.style.animation = 'timerGrowsAgain 1s 2 ease normal';
            console.log ('you made it!');
        } else if (currentTime >= (timeOnBeginning + secondsForEachStage[stage]*1000)) {
            clearInterval(endLevel);
            failingProcedure();
        }
    }


    const endLevel = setInterval(endLevelCheck, 1);
    

  

});


