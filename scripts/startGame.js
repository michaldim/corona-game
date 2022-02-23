const tinyCircles = document.querySelectorAll('.tinyCircle');
let stage = 1;

//we start the game by clicking the start button
button.addEventListener("click", () => {

    //the score section appears:
    header.style.display = 'flex';
    const score = document.querySelector('header span');
    let j = 0;
    score.textContent = j;

    //the timer appears
    const timer = document.querySelector('#timer');
    timer.textContent = nums.length; //the number of figures from figuresMovement.js 
    let x = nums.length;
    timer.style.animation = `timerGrows 1s ${x+1} ease normal`;

    const countDown = () => {
        timer.textContent = x -1;
        x = x - 1;
        if (x == 3) {
            tinyCircles.forEach(circle => {
                circle.style.animation = `coronaColorsChange${stage} 3s linear forwards`;
            })
            stage +=1;
        } else if(x == 0) {
            clearInterval(countDownInterval);
            timer.style.animation = none;
        } 
 
    }

    const countDownInterval = setInterval(countDown, 1000);


    //the corona's eyes will get closed and turn/look to the other side
    topEyeshade.style.animation = 'shutTopEyeshade 2.5s 0.65s ease infinite normal';
    bottomEyeshade.style.animation = 'shutBottomEyeshade 2.5s 0.65s ease infinite normal';
    eyes.style.animation = 'turnEyes 5s 0.925s ease infinite normal';


    figures.forEach(figure => {

        const currentFigure = document.querySelector('#'+figure);

        //adding a background image for each figure:
        currentFigure.style.background = `url('./images/${figure}.svg')`; 
        //putting the figures in different places at starting point
        currentFigure.style.top = Math.random()*(body.clientHeight - 56) + 'px'; //56 is the size of the figures. body.clientHeight gives the viewport size without the scroll bar
        currentFigure.style.left = Math.random()*(body.clientWidth - 56) + 'px'; //56 is the size of the figures.
        //starting to move the figures in different directions:
        setTimeout(() => move(figure), 50);


        const starsAndPoints = () => {
            currentFigure.removeEventListener('click', starsAndPoints);
            currentFigure.style.background = 'url(./images/stars.svg)';
            currentFigure.style.animation = 'fireworks 0.75s ease forwards normal';
            j += 10;
            score.textContent = j;
        }

        //adding eventListener for each figure and adjusting the score
        currentFigure.addEventListener('click', starsAndPoints);

        
    })


    const check = () => {

        stop = 1;
     
        const checkBackground = (figureDiv) => {
            return figureDiv.style.background.includes('stars.svg');
        }
        
        if(figuresDivs.every(checkBackground)) {  //"every" returns true if the function returns true for all elements in the array
            console.log ('you made it!');
        } else {
            console.log ('you failed');
            
            figuresDivs.forEach(figureDiv => {

                if (figureDiv.style.background.includes('figure')){
                    figureDiv.style.top = parseInt(figureDiv.style.top) + 'px'; //the method parseInt takes only the number (and leaves out the string 'px' attached to it) 
                    figureDiv.style.left = parseInt(figureDiv.style.left) + 'px';

                    const i = document.createElement('div');
                    i.classList.add('ambulance');
                    body.insertBefore(i, footer);
                    i.style.position = 'absolute';
                    i.style.top = figureDiv.style.top;
                    i.style.left = (parseInt(figureDiv.style.left) - 80) + "px";


                    const figureEntersAmbulance = () => {
                        let z = 0;
                        setInterval(b => {
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
                            i.style.animation = 'ambulanceDisappear 3s ease forwards normal';
                        }
                    }


                    setTimeout(figureEntersAmbulance, 1200);
                    figureDiv.style.animation = 'figureBecomesMini 0.5s 1.2s ease forwards normal';
                    setInterval(movingAmbulance, 15);
                    setTimeout(movingAmbulancePart2, 1300);


                }
            })
            
            
        }
        
    }
   
    
    setTimeout(check, 10000); //after 10seconds we stop the current level and check how the user succeeded

});


