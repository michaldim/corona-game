const body = document.querySelector('body');
const header = document.querySelector('header');
const cursor = document.querySelector('.cursor');


document.addEventListener('mousemove', e => {
    //the location of the syringe cursor
    cursor.setAttribute("style", "top: " + (e.pageY + 4) + "px; left: " + (e.pageX - 5) + "px;");
});



const axis = [1, 2, 3, 4, 5, 6]; //for the lines that go out of the corona's center
//const axisDivs = []; //contains all the axisDivs of the corona
//const tinyCirclesContainersDivs = [];
const coronaCircle = document.querySelector('#circle');
let angle = 0;


axis.forEach(element => {
    //creating div for each corona axis
    const i = document.createElement("div");
    i.classList.add('corona', 'axis'); //adding class names for our div
    i.setAttribute('id', 'axis'+element); //adding id for our div
    body.insertBefore(i, coronaCircle.nextSibling);//putting "i" after coronaCircle
    //axisDivs.push(i); //putting our div inside axisDivs array
    i.style.transform = `rotateZ(${angle}deg)`;
    angle += 30;

    //creating div for each container (containers for the tiny circles)
    //these containers will have position: relative;
    const n = document.createElement("div");
    n.classList.add('corona', 'tinyCircleContainer'); //adding class names for our div
    n.setAttribute('id', 'tinyCircleContainer'+element); //adding id for our div
    body.insertBefore(n, header);//putting "n" at the top of the page, so it will be easier to put it on the big circle
    //tinyCirclesContainersDivs.push(n); //putting our div inside tinyCirclesContainersDivs array
    n.style.top = "calc(30% - 110px)"; //locating it at the center of the corona's big circle
    n.style.bottom = "calc(70% + 110px)"; 
    n.style.right = `calc(50% + ${10 + 22*(element -1)}px)`;   //locating each container at the location of the first container
    n.style.left = `calc(50% - ${10 + 22*(element -1)}px)`;  
    const containerAngle = 30 * (element - 1); 
    n.style.transform = `rotateZ(${containerAngle}deg)`; //changing the angle of each container, so each container will be located behind of each axis
    

    //creating div for each corona's tiny circle
    //these circles will have position: absolute; on their father (the container)
    const m = document.createElement("div");
    const l = document.createElement("div");//we need 12 tiny circles and we have only 6 containers
    m.classList.add('corona', 'tinyCircle');
    m.setAttribute('id', 'tinyCircle'+element);
    m.style.top = '0';
    m.style.right = '0';
    l.classList.add('corona', 'tinyCircle');
    l.setAttribute('id', 'tinyCircle'+(element+6));
    l.style.top = 'calc(100% - 24px)';
    l.style.right = '0';
    const currentContainer = document.querySelector(`#tinyCircleContainer${element}`);
    currentContainer.append(m); //puting each tinyCircle inside its right container
    currentContainer.append(l); //puting each tinyCircle inside its right container

});


//creating div for the corona's eyes
const eyes = document.createElement("div");
eyes.classList.add('eyes', 'corona');
document.querySelector('#tinyCircleContainer1').append(eyes);

////creating divs for the corona's eye shades
const z = document.createElement("div");
const y = document.createElement("div");
z.classList.add('corona', 'eyeShades');
y.classList.add('corona', 'eyeShades');
z.setAttribute('id', 'topEyeshade');
y.setAttribute('id', 'bottomEyeshade');
document.querySelector('#tinyCircleContainer1').append(z);
document.querySelector('#tinyCircleContainer1').append(y);


export { body, header, cursor, coronaCircle, eyes };
