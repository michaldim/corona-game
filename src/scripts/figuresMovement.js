import { body, header, cursor, coronaCircle, eyes } from './cursorAndCorona';
import { secondsForEachStage, pFailure, pFailureAnon, p, pAnon } from './storyLine';


let stop = 0;
const stopWorking = (binary) => stop = binary; //we can't export "stop" as let, so we make
                                               //a function that we can export, and it'll
                                               //change the value of stop

const ourViewPortWidth = body.clientWidth; //clientWidth shows the width of the element we choose
const ourViewPortHeight = body.clientHeight;
console.log ('ourViewPortWidth: ' + ourViewPortWidth + ' ourViewPortHeight: ' +ourViewPortHeight)





//the button's event listener will call this function, which will move the figures in random directions
const move = (figure) => {
    //making randon integers for the figures to move in different directions
    let randomIntX = Math.floor(Math.random() * (2 - (-2) + 1)) -2; //this const will give a random integer between -2 and +2
    let randomIntY = Math.floor(Math.random() * (2 - (-2) + 1)) -2; //this const will give a random integer between -2 and +2
    if (randomIntX == 0 && randomIntY == 0){
        randomIntX = 2;
    }
   
    const currentFigure = document.querySelector('#'+figure);

    //the way the figures move
    const figureMovement = (randomIntX, randomIntY) => {
       
        if (stop == 1){
            clearInterval(movementInterval);
            return;
        }

        //4 rules for the corners' cases:
        if ((currentFigure.offsetTop <= 1) && (currentFigure.offsetLeft >= (body.clientWidth -56 - 1))) {
            currentFigure.style.top = ((ourViewPortHeight -56 - 2) + 'px');
            currentFigure.style.left = '2px';
        }
        else if ((currentFigure.offsetTop <= 1) && (currentFigure.offsetLeft <= 1)) {
            currentFigure.style.top = ((ourViewPortHeight -56 - 2) + 'px');
            currentFigure.style.left = ((ourViewPortWidth -56 -2) + 'px');
        }
        else if ((currentFigure.offsetTop >= (body.clientHeight -56 - 1)) && (currentFigure.offsetLeft <= 1)) {
            currentFigure.style.top = '2px';
            currentFigure.style.left = ((ourViewPortWidth -56 -2) + 'px');
        }
        else if ((currentFigure.offsetTop >= (body.clientHeight -56 - 1)) && (currentFigure.offsetLeft >= (body.clientWidth -56 - 1))) {
            currentFigure.style.top = '2px';
            currentFigure.style.left = '2px';
        }
        //four "if" rules for cases that the figures reach the screen edges:
        else if (currentFigure.offsetTop <= 1) { //offsetTop shows the location comparing to the father (the body). We need that offsetTop will be 0 or 1 (and not only offsetTop=0), because sometimes the figures do 2 steps (2 pixels) at a time
            currentFigure.style.top = ((ourViewPortHeight -56 - 2) + 'px');//Minus 2, because the figures will be stucked if we will send them to ourViewPortHeightMinus1 or ourViewPortHeight. And minus 56 because of the size of the figures (we want them to disappear at the edge of the screen and not 56px after it)
            currentFigure.style.left = (body.clientWidth -56 - parseInt(currentFigure.style.left)) + 'px';
        } 
        else if (currentFigure.offsetTop >= (body.clientHeight -56 - 1)) {
            currentFigure.style.top = '2px';
            currentFigure.style.left = (body.clientWidth -56 - parseInt(currentFigure.style.left)) + 'px';
        } 
        else if (currentFigure.offsetLeft <= 1) {
            currentFigure.style.left = ((ourViewPortWidth -56 -2) + 'px');
            currentFigure.style.top = (body.clientHeight -56 - parseInt(currentFigure.style.top)) + 'px';
        } 
        else if (currentFigure.offsetLeft >= (body.clientWidth -56 - 1)) {
            currentFigure.style.left = '2px';
            currentFigure.style.top = (body.clientHeight -56 - parseInt(currentFigure.style.top)) + 'px';
        } 
        //if the figure is not in the edge or in the corner,
        //then that's the way it will move on screen:
        else {
            currentFigure.style.top = parseInt(currentFigure.style.top) + randomIntY + 'px'; //the method parseInt takes only the number (and leaves out the string 'px' attached to it:) 
            currentFigure.style.left = parseInt(currentFigure.style.left) + randomIntX + 'px';
        }
        console.log(currentFigure.style.background + ' X: '+ currentFigure.style.left + ' Y: ' + currentFigure.style.top);

    }
    
    const movementInterval = setInterval(() => figureMovement(randomIntX, randomIntY), 20);

};


export { stopWorking, ourViewPortWidth, ourViewPortHeight, move };