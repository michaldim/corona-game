const footer = document.querySelector('footer');
const button = document.querySelector('#instructions form #startButton');
const topEyeshade = document.querySelector('#topEyeshade');
const bottomEyeshade = document.querySelector('#bottomEyeshade');
let stop = 0;



const figures = []; //figure1, figure2...
const figuresDivs = [];
const ourViewPortWidth = body.clientWidth; //clientWidth shows the width of the element we choose
const ourViewPortHeight = body.clientHeight;
console.log ('ourViewPortWidth: ' + ourViewPortWidth + ' ourViewPortHeight: ' +ourViewPortHeight)

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
            return;
        }

        //four "if" rules for cases that the figures reach the screen edges:
        if (currentFigure.offsetTop <= 1) { //offsetTop shows the location comparing to the father (the body). We need that offsetTop will be 0 or 1 (and not only offsetTop=0), because sometimes the figures do 2 steps (2 pixels) at a time
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
        //now 4 rules for the corners' cases:
        else if ((currentFigure.offsetTop <= 1) && (currentFigure.offsetLeft >= (body.clientWidth -56 - 1))) {
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
        //if the figure is not in the edge or in the corner,
        //then that's the way it will move on screen:
        else {
            currentFigure.style.top = parseInt(currentFigure.style.top) + randomIntY + 'px'; //the method parseInt takes only the number (and leaves out the string 'px' attached to it:) 
            currentFigure.style.left = parseInt(currentFigure.style.left) + randomIntX + 'px';
        }
        console.log(currentFigure.style.background + ' X: '+ currentFigure.style.left + ' Y: ' + currentFigure.style.top);

    }
    
    setInterval(() => figureMovement(randomIntX, randomIntY), 20);

};


