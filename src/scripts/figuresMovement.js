import { body, header, cursor, coronaCircle, eyes } from './cursorAndCorona';
import { secondsForEachStage, pFailure, pFailureAnon, p, pAnon } from './storyLine';


const trial = document.querySelectorAll('.trial');

let stop = 0;
const stopWorking = (binary) => stop = binary; //we can't export "stop" as let, so we make
                                               //a function that we can export, and it'll
                                               //change the value of stop

let ourViewPortWidth = body.clientWidth; //clientWidth shows the width of the element we choose
//const ourViewPortHeight = body.clientHeight;
console.log ('ourViewPortWidth: ' + ourViewPortWidth + ' ourViewPortHeight: ' +body.clientHeight)

//If someone changes the screen size, we wan't to prevent bugs:
window.addEventListener('resize', () => {
    ourViewPortWidth = body.clientWidth;
});



//the button's event listener will call this function, which will move the figures in random directions
const move = (figure, speed) => {
    //making randon integers for the figures to move in different directions
    let randomIntX = Math.floor(Math.random() * (2 - (-2) + 1)) -2; //this const will give a random integer between -2 and +2
    let randomIntY = Math.floor(Math.random() * (2 - (-2) + 1)) -2; //this const will give a random integer between -2 and +2
    if (randomIntX == 0 && randomIntY == 0){
        randomIntX = 2;
    }
   
    //const currentFigure = document.querySelector('#'+figure);

    //the way the figures move
    const figureMovement = (randomIntX, randomIntY) => {
       
        if (stop == 1){
            clearInterval(movementInterval);
            return;
        }

        //4 rules for the corners' cases:
        if ((figure.offsetTop <= 1) && (figure.offsetLeft >= (body.clientWidth -56 - 1))) {
            figure.style.top = ((body.clientHeight -56 - 2) + 'px');
            figure.style.left = '2px';
        }
        else if ((figure.offsetTop <= 1) && (figure.offsetLeft <= 1)) {
            figure.style.top = ((body.clientHeight -56 - 2) + 'px');
            figure.style.left = ((ourViewPortWidth -56 -2) + 'px');
        }
        else if ((figure.offsetTop >= (body.clientHeight -56 - 1)) && (figure.offsetLeft <= 1)) {
            figure.style.top = '2px';
            figure.style.left = ((ourViewPortWidth -56 -2) + 'px');
        }
        else if ((figure.offsetTop >= (body.clientHeight -56 - 1)) && (figure.offsetLeft >= (body.clientWidth -56 - 1))) {
            figure.style.top = '2px';
            figure.style.left = '2px';
        }
        //four "if" rules for cases that the figures reach the screen edges:
        else if (figure.offsetTop <= 1) { //offsetTop shows the location comparing to the father (the body). We need that offsetTop will be 0 or 1 (and not only offsetTop=0), because sometimes the figures do 2 steps (2 pixels) at a time
            figure.style.top = ((body.clientHeight -56 - 2) + 'px');//Minus 2, because the figures will be stucked if we will send them to ourViewPortHeightMinus1 or ourViewPortHeight. And minus 56 because of the size of the figures (we want them to disappear at the edge of the screen and not 56px after it)
            figure.style.left = (body.clientWidth -56 - parseInt(figure.style.left)) + 'px';
        } 
        else if (figure.offsetTop >= (body.clientHeight -56 - 1)) {
            figure.style.top = '2px';
            figure.style.left = (body.clientWidth -56 - parseInt(figure.style.left)) + 'px';
        } 
        else if (figure.offsetLeft <= 1) {
            figure.style.left = ((ourViewPortWidth -56 -2) + 'px');
            figure.style.top = (body.clientHeight -56 - parseInt(figure.style.top)) + 'px';
        } 
        else if (figure.offsetLeft >= (body.clientWidth -56 - 1)) {
            figure.style.left = '2px';
            figure.style.top = (body.clientHeight -56 - parseInt(figure.style.top)) + 'px';
        } 
        //if the figure is not in the edge or in the corner,
        //then that's the way it will move on screen:
        else {
            figure.style.top = parseInt(figure.style.top) + randomIntY + 'px'; //the method parseInt takes only the number (and leaves out the string 'px' attached to it:) 
            figure.style.left = parseInt(figure.style.left) + randomIntX + 'px';
        }
        //console.log(figure.style.background + ' X: '+ figure.style.left + ' Y: ' + figure.style.top);

    }
    
    //now we'll call the figureMovement function, but the interval for this function
    //will be higher frequency for figures 11-14 (the bats). 
    let movementInterval;
    const batArray = [11, 12, 13, 14];
    //we will use some() method, which checks if  at least one element in the array
    //passes the test implemented inside some()
    if (batArray.some(element => figure.style.background.includes(element))) {
        movementInterval = setInterval(() => figureMovement(randomIntX, randomIntY), 9);
    } else if (speed == 'fast') { //for cases that are not bats
        movementInterval = setInterval(() => figureMovement(randomIntX, randomIntY), 12);
        console.log("going fast now");
    } else if (speed == 'slow') { //for cases that are not bats
        movementInterval = setInterval(() => figureMovement(randomIntX, randomIntY), 40);
    } else { //for cases that are not bats
        movementInterval = setInterval(() => figureMovement(randomIntX, randomIntY), 20);
    }
    

};


const slow = 'slow';

Array.from(trial).forEach(element => {
    element.style.top = Math.random()*(body.clientHeight - 56) + 'px'; //56 is the size of the figures. body.clientHeight gives the viewport size without the scroll bar
    element.style.left = Math.random()*(body.clientWidth - 56) + 'px'; //56 is the size of the figures.
    move(element, slow);
});


export { stopWorking, ourViewPortWidth, move, trial, slow };