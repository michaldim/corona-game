/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/cursorAndCorona.js":
/*!****************************************!*\
  !*** ./src/scripts/cursorAndCorona.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "body": () => (/* binding */ body),
/* harmony export */   "coronaCircle": () => (/* binding */ coronaCircle),
/* harmony export */   "cursor": () => (/* binding */ cursor),
/* harmony export */   "eyes": () => (/* binding */ eyes),
/* harmony export */   "header": () => (/* binding */ header)
/* harmony export */ });
var body = document.querySelector('body');
var header = document.querySelector('header');
var cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', function (e) {
  //the location of the syringe cursor
  cursor.setAttribute("style", "top: " + (e.pageY + 4) + "px; left: " + (e.pageX - 5) + "px;");
});
var axis = [1, 2, 3, 4, 5, 6]; //for the lines that go out of the corona's center
//const axisDivs = []; //contains all the axisDivs of the corona
//const tinyCirclesContainersDivs = [];

var coronaCircle = document.querySelector('#circle');
var angle = 0;
axis.forEach(function (element) {
  //creating div for each corona axis
  var i = document.createElement("div");
  i.classList.add('corona', 'axis'); //adding class names for our div

  i.setAttribute('id', 'axis' + element); //adding id for our div

  body.insertBefore(i, coronaCircle.nextSibling); //putting "i" after coronaCircle
  //axisDivs.push(i); //putting our div inside axisDivs array

  i.style.transform = "rotateZ(".concat(angle, "deg)");
  angle += 30; //creating div for each container (containers for the tiny circles)
  //these containers will have position: relative;

  var n = document.createElement("div");
  n.classList.add('corona', 'tinyCircleContainer'); //adding class names for our div

  n.setAttribute('id', 'tinyCircleContainer' + element); //adding id for our div

  body.insertBefore(n, header); //putting "n" at the top of the page, so it will be easier to put it on the big circle
  //tinyCirclesContainersDivs.push(n); //putting our div inside tinyCirclesContainersDivs array

  n.style.top = "calc(30% - 110px)"; //locating it at the center of the corona's big circle

  n.style.bottom = "calc(70% + 110px)";
  n.style.right = "calc(50% + ".concat(10 + 22 * (element - 1), "px)"); //locating each container at the location of the first container

  n.style.left = "calc(50% - ".concat(10 + 22 * (element - 1), "px)");
  var containerAngle = 30 * (element - 1);
  n.style.transform = "rotateZ(".concat(containerAngle, "deg)"); //changing the angle of each container, so each container will be located behind of each axis
  //creating div for each corona's tiny circle
  //these circles will have position: absolute; on their father (the container)

  var m = document.createElement("div");
  var l = document.createElement("div"); //we need 12 tiny circles and we have only 6 containers

  m.classList.add('corona', 'tinyCircle');
  m.setAttribute('id', 'tinyCircle' + element);
  m.style.top = '0';
  m.style.right = '0';
  l.classList.add('corona', 'tinyCircle');
  l.setAttribute('id', 'tinyCircle' + (element + 6));
  l.style.top = 'calc(100% - 24px)';
  l.style.right = '0';
  var currentContainer = document.querySelector("#tinyCircleContainer".concat(element));
  currentContainer.append(m); //puting each tinyCircle inside its right container

  currentContainer.append(l); //puting each tinyCircle inside its right container
}); //creating div for the corona's eyes

var eyes = document.createElement("div");
eyes.classList.add('eyes', 'corona');
document.querySelector('#tinyCircleContainer1').append(eyes); ////creating divs for the corona's eye shades

var z = document.createElement("div");
var y = document.createElement("div");
z.classList.add('corona', 'eyeShades');
y.classList.add('corona', 'eyeShades');
z.setAttribute('id', 'topEyeshade');
y.setAttribute('id', 'bottomEyeshade');
document.querySelector('#tinyCircleContainer1').append(z);
document.querySelector('#tinyCircleContainer1').append(y);


/***/ }),

/***/ "./src/scripts/figuresMovement.js":
/*!****************************************!*\
  !*** ./src/scripts/figuresMovement.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "move": () => (/* binding */ move),
/* harmony export */   "ourViewPortHeight": () => (/* binding */ ourViewPortHeight),
/* harmony export */   "ourViewPortWidth": () => (/* binding */ ourViewPortWidth),
/* harmony export */   "stopWorking": () => (/* binding */ stopWorking)
/* harmony export */ });
/* harmony import */ var _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cursorAndCorona */ "./src/scripts/cursorAndCorona.js");
/* harmony import */ var _storyLine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storyLine */ "./src/scripts/storyLine.js");


var stop = 0;

var stopWorking = function stopWorking(binary) {
  return stop = binary;
}; //we can't export "stop" as let, so we make
//a function that we can export, and it'll
//change the value of stop


var ourViewPortWidth = _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientWidth; //clientWidth shows the width of the element we choose

var ourViewPortHeight = _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientHeight;
console.log('ourViewPortWidth: ' + ourViewPortWidth + ' ourViewPortHeight: ' + ourViewPortHeight); //the button's event listener will call this function, which will move the figures in random directions

var move = function move(figure, speed) {
  //making randon integers for the figures to move in different directions
  var randomIntX = Math.floor(Math.random() * (2 - -2 + 1)) - 2; //this const will give a random integer between -2 and +2

  var randomIntY = Math.floor(Math.random() * (2 - -2 + 1)) - 2; //this const will give a random integer between -2 and +2

  if (randomIntX == 0 && randomIntY == 0) {
    randomIntX = 2;
  }

  var currentFigure = document.querySelector('#' + figure); //the way the figures move

  var figureMovement = function figureMovement(randomIntX, randomIntY) {
    if (stop == 1) {
      clearInterval(movementInterval);
      return;
    } //4 rules for the corners' cases:


    if (currentFigure.offsetTop <= 1 && currentFigure.offsetLeft >= _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientWidth - 56 - 1) {
      currentFigure.style.top = ourViewPortHeight - 56 - 2 + 'px';
      currentFigure.style.left = '2px';
    } else if (currentFigure.offsetTop <= 1 && currentFigure.offsetLeft <= 1) {
      currentFigure.style.top = ourViewPortHeight - 56 - 2 + 'px';
      currentFigure.style.left = ourViewPortWidth - 56 - 2 + 'px';
    } else if (currentFigure.offsetTop >= _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientHeight - 56 - 1 && currentFigure.offsetLeft <= 1) {
      currentFigure.style.top = '2px';
      currentFigure.style.left = ourViewPortWidth - 56 - 2 + 'px';
    } else if (currentFigure.offsetTop >= _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientHeight - 56 - 1 && currentFigure.offsetLeft >= _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientWidth - 56 - 1) {
      currentFigure.style.top = '2px';
      currentFigure.style.left = '2px';
    } //four "if" rules for cases that the figures reach the screen edges:
    else if (currentFigure.offsetTop <= 1) {
      //offsetTop shows the location comparing to the father (the body). We need that offsetTop will be 0 or 1 (and not only offsetTop=0), because sometimes the figures do 2 steps (2 pixels) at a time
      currentFigure.style.top = ourViewPortHeight - 56 - 2 + 'px'; //Minus 2, because the figures will be stucked if we will send them to ourViewPortHeightMinus1 or ourViewPortHeight. And minus 56 because of the size of the figures (we want them to disappear at the edge of the screen and not 56px after it)

      currentFigure.style.left = _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientWidth - 56 - parseInt(currentFigure.style.left) + 'px';
    } else if (currentFigure.offsetTop >= _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientHeight - 56 - 1) {
      currentFigure.style.top = '2px';
      currentFigure.style.left = _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientWidth - 56 - parseInt(currentFigure.style.left) + 'px';
    } else if (currentFigure.offsetLeft <= 1) {
      currentFigure.style.left = ourViewPortWidth - 56 - 2 + 'px';
      currentFigure.style.top = _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientHeight - 56 - parseInt(currentFigure.style.top) + 'px';
    } else if (currentFigure.offsetLeft >= _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientWidth - 56 - 1) {
      currentFigure.style.left = '2px';
      currentFigure.style.top = _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__.body.clientHeight - 56 - parseInt(currentFigure.style.top) + 'px';
    } //if the figure is not in the edge or in the corner,
    //then that's the way it will move on screen:
    else {
      currentFigure.style.top = parseInt(currentFigure.style.top) + randomIntY + 'px'; //the method parseInt takes only the number (and leaves out the string 'px' attached to it:) 

      currentFigure.style.left = parseInt(currentFigure.style.left) + randomIntX + 'px';
    }

    console.log(currentFigure.style.background + ' X: ' + currentFigure.style.left + ' Y: ' + currentFigure.style.top);
  }; //now we'll call the figureMovement function, but the interval for this function
  //will be higher frequency for figures 11-14 (the bats). 


  var movementInterval;
  var batArray = [11, 12, 13, 14]; //we will use some() method, which checks if  at least one element in the array
  //passes the test implemented inside some()

  if (batArray.some(function (element) {
    return currentFigure.style.background.includes(element);
  })) {
    movementInterval = setInterval(function () {
      return figureMovement(randomIntX, randomIntY);
    }, 9);
  } else if (speed == 'fast') {
    movementInterval = setInterval(function () {
      return figureMovement(randomIntX, randomIntY);
    }, 12);
    console.log("going fast now");
  } else {
    movementInterval = setInterval(function () {
      return figureMovement(randomIntX, randomIntY);
    }, 20);
  }
};



/***/ }),

/***/ "./src/scripts/storyLine.js":
/*!**********************************!*\
  !*** ./src/scripts/storyLine.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "figuresPerStage": () => (/* binding */ figuresPerStage),
/* harmony export */   "p": () => (/* binding */ p),
/* harmony export */   "pAnon": () => (/* binding */ pAnon),
/* harmony export */   "pFailure": () => (/* binding */ pFailure),
/* harmony export */   "pFailureAnon": () => (/* binding */ pFailureAnon),
/* harmony export */   "secondsForEachStage": () => (/* binding */ secondsForEachStage)
/* harmony export */ });
/* harmony import */ var _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cursorAndCorona */ "./src/scripts/cursorAndCorona.js");

var secondsForEachStage = [11, 14, 13, 18, 13, 16, 20, 18]; // 

var figuresPerStage = [7, 10, 10, 14, 10, 20, 20, 20];
var pFailure = "you failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe";
var pFailureAnon = "You failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe";
var p = ["Vaccinate world's population and help fight the coronavirus disease. If you'll fail, a new variant will arrive...", "you made it! But the population grew and you need to vaccinate more people now!", "you made it again! Now lets see if you can do it even faster!", "great job! But bats are camming. Can you vaccinate them too?", "you are awesome! Now lets see if you can do it with people that are in a hurry!", "amazing work! Can you also vaccinate each person in only one second?", "the Corona can't beat you! Lets try it now with the bats and faster!", "you're almost at the end of your journy, only one stage to go!", "you did it! You saved humanity! You ended the coronavirus disease and made XXX point."];
var pAnon = ["Vaccinate world's population and help fight the coronavirus disease. If you'll fail, a new variant will arrive...", "You made it! But the population grew and you need to vaccinate more people now!", "You made it again! Now lets see if you can do it even faster!", "Great job! But bats are camming. Can you vaccinate them too?", "You are awesome! Now lets see if you can do it with people that are in a hurry!", "Amazing work! Can you also vaccinate each person in only one second?", "The Corona can't beat you! Lets try it now with the bats!", "You're almost at the end of your journy, only one stage to go!", "You did it! You saved humanity! You ended the coronavirus disease and made XXX point."];


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/cursor.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/cursor.css ***!
  \******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../images/arrow.svg */ "./src/images/arrow.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../images/syringe.svg */ "./src/images/syringe.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ../images/eyes.svg */ "./src/images/eyes.svg"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ../images/ambulance1.svg */ "./src/images/ambulance1.svg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*{\n\tbox-sizing: border-box;\n\tmargin: 0;\n}\n\nbody {\n  padding: 0;\n  height: 100vh;\n  cursor: none;\n  background-color: #3d3b3b;\n  color: white;\n  overflow: hidden;\n}\n\nheader {  \n  display: none;\n  justify-content: space-around;\n  flex-wrap: nowrap; /*in 1 line only*/\n  color: rgb(184, 238, 184);\n  text-align: center;\n  font-size: 40px;\n  font-family: Garamond, serif;\n  font-weight: bold;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  margin-right: auto;\n  margin-left: auto;\n  user-select: none; /*******************************************/\n  -moz-user-select: none; /*******************************************/\n  -webkit-user-select: none;/*******************************************/\n  -ms-user-select: none;/*******************************************/\n}\n\nheader div {\n  flex: 1;\n}\n\nheader div span {\n  font-size: 32px;\n  position: relative;\n  top: 1px;\n}\n\nheader #bonusArrow {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat center; \n  background-size: 60px Auto;\n  opacity: 0;\n  -webkit-transition: opacity 0.5s ease;\n  -moz-transition: opacity 0.5s ease;\n  -o-transition: opacity 0.5s ease;\n  -ms-transition: opacity 0.5s ease;\n}\n\nheader #bonusArrow p {\n  position: relative;\n  top: 100%;\n  font-size: 22px;\n  color: #58dcf7;\n}\n\n@keyframes timerGrows {\n  0% {transform: scale(1, 1)}\n  50% {transform: scale(1.5, 1.5)}\n  100% {transform: scale(1, 1)}\n}\n\n@keyframes timerGrowsAgain {\n  0% {transform: scale(1, 1)}\n  50% {transform: scale(1.5, 1.5)}\n  100% {transform: scale(1, 1)}\n}\n\n@keyframes arrowGrows {\n  0% {transform: scale(1, 1)}\n  50% {transform: scale(1.25, 1.25)}\n  100% {transform: scale(1, 1)}\n}\n\n.cursor {\n  width: 48px;\n  height: 48px;\n  position: absolute;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  -webkit-transform: rotateZ(100deg);\n          transform: rotateZ(100deg);\n  position: absolute;\n  pointer-events: none; /*This will make the syringe transparent to clicks. \n    It will make the real cursor to click what's under the syringe*/\n  z-index: 100;\n}\n\n#instructions {\n  display: block;\n\tbackground: linear-gradient(rgb(243, 243, 145) 30%, rgb(247, 247, 197));\n  color: black;\n  background: -webkit-linear-gradient(rgb(243, 243, 145) 30%, rgb(247, 247, 197));\n\tbackground: -webkit-gradient(linear, top, bottom, color-stop(30%, rgb(243, 243, 145)), color-stop(100%, rgb(247, 247, 197)));\n\tbackground: -moz-linear-gradient(rgb(243, 243, 145) 30%, rgb(247, 247, 197));\n\tbackground: -o-linear-gradient(rgb(243, 243, 145) 30%, rgb(247, 247, 197));\n\tbackground: -ms-linear-gradient(rgb(243, 243, 145) 30%, rgb(247, 247, 197));\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgb(243, 243, 145)', endColorstr='rgb(247, 247, 197)',GradientType=0 );\n  width: 50%;\n  padding: 10px;\n  border: 7px solid rgb(184, 184, 169);\n  text-align: center;\n  font-size: 40px;\n  font-family: Garamond, serif;\n  font-weight: bold;\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: 22%;\n  margin-right: auto;\n  margin-left: auto;\n  z-index: 10;\n}\n\n@keyframes instructionsAppears {\n  0% {opacity: 0}\n  100% {opacity: 1}\n}\n\n#instructions p {\n  user-select: none; /*******************************************/\n  -moz-user-select: none; /*******************************************/\n  -webkit-user-select: none;/*******************************************/\n  -ms-user-select: none;/*******************************************/\n}\n\nform {\n  margin-top: 20px;\n}\n\nform label {\n  font-weight: lighter;\n  font-size: 32px;\n  position: relative;\n  top: 3px;\n}\n \n.corona {\n  display: none;\n  user-select: none; /*******************************************/\n  -moz-user-select: none; /*******************************************/\n  -webkit-user-select: none;/*******************************************/\n  -ms-user-select: none;/*******************************************/\n}\n\n#circle {\n  width: 130px;\n  height: 130px;\n  border-radius: 50%;\n  background: rgb(243, 243, 145);\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: 30%;\n  bottom: 70%;\n  margin: auto;\n  z-index: 1;\n}\n\n.axis{\n  height: 184px;\n  width: 10px;\n  background: rgb(243, 243, 145);\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: 30%;\n  bottom: 70%;\n  margin: auto;\n}\n\n.tinyCircleContainer {\n  height:220px;\n  width:22px;\n  background: rgb(153, 116, 240, 0);\n  position: relative;\n  display: inline-block;\n  z-index: 2;\n}\n\n.tinyCircle {\n  height:24px;\n  width:24px;\n  border-radius: 50%;\n  background: rgb(245, 194, 100);\n  position: absolute;\n  transition: background 2.5s ease;\n  -webkit-transition: background 2.5s ease;\n  -moz-transition: background 2.5s ease;\n  -o-transition: background 2.5s ease;\n  -ms-transition: background 2.5s ease;\n}\n\n.eyes {\n  height: 40px;\n  width: 80px;\n  position: absolute;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  top: 76px;\n  right: -27px;\n  z-index: 3;\n}\n\n@keyframes turnEyes {\n  0% {transform: rotateZ(180deg); opacity: 1}\n  48% {transform: rotateZ(180deg); opacity: 1}\n  49% {transform: rotateZ(180deg); opacity: 0}\n  50% {transform: rotateZ(0deg); opacity: 0}\n  51% {transform: rotateZ(0deg); opacity: 1}\n  98% {transform: rotateZ(0deg); opacity: 1}\n  99% {transform: rotateZ(0deg); opacity: 0}\n  100% {transform: rotateZ(180deg); opacity: 0}\n}\n\n.eyeShades {\n  z-index: 4;\n  height: 20px;\n  width: 76px;\n  background: rgb(243, 243, 145);\n  position: absolute;\n  z-index: 4;\n  right: -25px;\n}\n\n#topEyeshade {\n  top: 58px;\n  animation: none; /*shutTopEyeshade 3s ease infinite normal;*/\n}\n\n#bottomEyeshade{\n  top: 116px;\n  animation: none; /*shutBottomEyeshade 3s ease infinite normal;*/\n}\n\n@keyframes shutTopEyeshade {\n  0% {top: 58px}\n  11% {top: 77px}\n  15% {top: 77px}\n  22% {top: 58px}\n  100% {top: 58px}\n}\n\n@keyframes shutBottomEyeshade {\n  0% {top: 116px}\n  11% {top: 96px}\n  15% {top: 96px}\n  22% {top: 116px}\n  100% {top: 116px}\n}\n\n.figures {\n  width: 56px;\n  height: 56px;\n  position: absolute;\n  z-index: 5;\n}\n\n@keyframes fireworks {\n  0% {width: 4px; height: 4px; opacity: 1;}\n  80% {width: 64px; height: 64px; opacity: 0.8;}\n  99% {width: 64px; height: 64px; opacity: 0;}\n  100% {width: 0px; height: 0px; opacity: 0;}\n}\n\n@keyframes figureBecomesMini {\n  0% {width: 56px; height: 56px; opacity: 1}\n  30% {width: 34px; height: 34px; opacity: 1}\n  100% {width: 0px; height: 0px; opacity: 0}\n}\n\n.ambulance {\n  width: 80px;\n  height: 80px;\n  z-index: 5;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n}\n\n@keyframes disappears {\n  0% {opacity: 1}\n  100% {opacity: 0}\n}\n\n\nfooter {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  display: none;\n}\n\n\n/*# sourceMappingURL=cursor.css.map */", "",{"version":3,"sources":["webpack://./src/css/cursor.scss","webpack://./src/css/cursor.css"],"names":[],"mappings":"AAAA;CCCC,sBDAY;CCCZ,SDAU;ACCX;;AAEA;EDCI,UAAO;EACV,aAAA;ECCC,YAAY;EDCd,yBAAQ;EACJ,YAAW;EACX,gBAAY;ACChB;;AAEA;EDCI,aAAU;EACV,6BAAoB;EAAE,iBAAA,EAAA,iBAAA;ECExB,yBAAyB;EDAvB,kBAAY;EACf,eAAA;ECEC,4BAA4B;EDA9B,iBAAO;EACH,kBAAY;EACf,MAAA;ECEC,QAAQ;EACR,OAAO;EACP,kBAAkB;EAClB,iBAAiB;EACjB,iBAAiB,EAAE,4CAA4C;EAC/D,sBAAsB,EAAE,4CAA4C;EACpE,yBAAyB,CAAC,4CAA4C;EACtE,qBAAqB,CAAC,4CAA4C;AACpE;;AAEA;EACE,OAAO;AACT;;AAEA;EACE,eAAe;EACf,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,oEAAuD;EACvD,0BAA0B;EAC1B,UAAU;EACV,qCAAqC;EACrC,kCAAkC;EAClC,gCAAgC;EAChC,iCAAiC;AACnC;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,IAAI,sBAAsB;EAC1B,KAAK,0BAA0B;EAC/B,MAAM,sBAAsB;AAC9B;;AAEA;EACE,IAAI,sBAAsB;EAC1B,KAAK,0BAA0B;EAC/B,MAAM,sBAAsB;AAC9B;;AAEA;EACE,IAAI,sBAAsB;EAC1B,KAAK,4BAA4B;EACjC,MAAM,sBAAsB;AAC9B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mDAAwC;EACxC,kCAAkC;UAC1B,0BAA0B;EAClC,kBAAkB;EAClB,oBAAoB,EAAE;mEAC2C;EACjE,YAAY;AACd;;AAEA;EACE,cAAc;CACf,uEAAuE;EACtE,YAAY;EACZ,+EAA+E;CAChF,4HAA4H;CAC5H,4EAA4E;CAC5E,0EAA0E;CAC1E,2EAA2E;EAC1E,yIAAyI;EACzI,UAAU;EACV,aAAa;EACb,oCAAoC;EACpC,kBAAkB;EAClB,eAAe;EACf,4BAA4B;EAC5B,iBAAiB;EACjB,kBAAkB;EAClB,QAAQ;EACR,OAAO;EACP,QAAQ;EACR,kBAAkB;EAClB,iBAAiB;EACjB,WAAW;AACb;;AAEA;EACE,IAAI,UAAU;EACd,MAAM,UAAU;AAClB;;AAEA;EACE,iBAAiB,EAAE,4CAA4C;EAC/D,sBAAsB,EAAE,4CAA4C;EACpE,yBAAyB,CAAC,4CAA4C;EACtE,qBAAqB,CAAC,4CAA4C;AACpE;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,eAAe;EACf,kBAAkB;EAClB,QAAQ;AACV;;AAEA;EACE,aAAa;EACb,iBAAiB,EAAE,4CAA4C;EAC/D,sBAAsB,EAAE,4CAA4C;EACpE,yBAAyB,CAAC,4CAA4C;EACtE,qBAAqB,CAAC,4CAA4C;AACpE;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,8BAA8B;EAC9B,kBAAkB;EAClB,QAAQ;EACR,OAAO;EACP,QAAQ;EACR,WAAW;EACX,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,WAAW;EACX,8BAA8B;EAC9B,kBAAkB;EAClB,QAAQ;EACR,OAAO;EACP,QAAQ;EACR,WAAW;EACX,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,UAAU;EACV,iCAAiC;EACjC,kBAAkB;EAClB,qBAAqB;EACrB,UAAU;AACZ;;AAEA;EACE,WAAW;EACX,UAAU;EACV,kBAAkB;EAClB,8BAA8B;EAC9B,kBAAkB;EAClB,gCAAgC;EAChC,wCAAwC;EACxC,qCAAqC;EACrC,mCAAmC;EACnC,oCAAoC;AACtC;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,mDAAqC;EACrC,SAAS;EACT,YAAY;EACZ,UAAU;AACZ;;AAEA;EACE,IAAI,0BAA0B,EAAE,UAAU;EAC1C,KAAK,0BAA0B,EAAE,UAAU;EAC3C,KAAK,0BAA0B,EAAE,UAAU;EAC3C,KAAK,wBAAwB,EAAE,UAAU;EACzC,KAAK,wBAAwB,EAAE,UAAU;EACzC,KAAK,wBAAwB,EAAE,UAAU;EACzC,KAAK,wBAAwB,EAAE,UAAU;EACzC,MAAM,0BAA0B,EAAE,UAAU;AAC9C;;AAEA;EACE,UAAU;EACV,YAAY;EACZ,WAAW;EACX,8BAA8B;EAC9B,kBAAkB;EAClB,UAAU;EACV,YAAY;AACd;;AAEA;EACE,SAAS;EACT,eAAe,EAAE,2CAA2C;AAC9D;;AAEA;EACE,UAAU;EACV,eAAe,EAAE,8CAA8C;AACjE;;AAEA;EACE,IAAI,SAAS;EACb,KAAK,SAAS;EACd,KAAK,SAAS;EACd,KAAK,SAAS;EACd,MAAM,SAAS;AACjB;;AAEA;EACE,IAAI,UAAU;EACd,KAAK,SAAS;EACd,KAAK,SAAS;EACd,KAAK,UAAU;EACf,MAAM,UAAU;AAClB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,IAAI,UAAU,EAAE,WAAW,EAAE,UAAU,CAAC;EACxC,KAAK,WAAW,EAAE,YAAY,EAAE,YAAY,CAAC;EAC7C,KAAK,WAAW,EAAE,YAAY,EAAE,UAAU,CAAC;EAC3C,MAAM,UAAU,EAAE,WAAW,EAAE,UAAU,CAAC;AAC5C;;AAEA;EACE,IAAI,WAAW,EAAE,YAAY,EAAE,UAAU;EACzC,KAAK,WAAW,EAAE,YAAY,EAAE,UAAU;EAC1C,MAAM,UAAU,EAAE,WAAW,EAAE,UAAU;AAC3C;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,UAAU;EACV,mDAA2C;AAC7C;;AAEA;EACE,IAAI,UAAU;EACd,MAAM,UAAU;AAClB;;;AAGA;EACE,iBAAiB;EACjB,sBAAsB;EACtB,yBAAyB;EACzB,qBAAqB;EACrB,aAAa;AACf;;;AAGA,qCAAqC","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/css/cursor.css":
/*!****************************!*\
  !*** ./src/css/cursor.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_cursor_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./cursor.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/cursor.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_cursor_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_cursor_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_cursor_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_cursor_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/images/ambulance1.svg":
/*!***********************************!*\
  !*** ./src/images/ambulance1.svg ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ambulance1.svg";

/***/ }),

/***/ "./src/images/arrow.svg":
/*!******************************!*\
  !*** ./src/images/arrow.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "arrow.svg";

/***/ }),

/***/ "./src/images/eyes.svg":
/*!*****************************!*\
  !*** ./src/images/eyes.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "eyes.svg";

/***/ }),

/***/ "./src/images/figure1.svg":
/*!********************************!*\
  !*** ./src/images/figure1.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure1.svg";

/***/ }),

/***/ "./src/images/figure10.svg":
/*!*********************************!*\
  !*** ./src/images/figure10.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure10.svg";

/***/ }),

/***/ "./src/images/figure11.svg":
/*!*********************************!*\
  !*** ./src/images/figure11.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure11.svg";

/***/ }),

/***/ "./src/images/figure12.svg":
/*!*********************************!*\
  !*** ./src/images/figure12.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure12.svg";

/***/ }),

/***/ "./src/images/figure13.svg":
/*!*********************************!*\
  !*** ./src/images/figure13.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure13.svg";

/***/ }),

/***/ "./src/images/figure14.svg":
/*!*********************************!*\
  !*** ./src/images/figure14.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure14.svg";

/***/ }),

/***/ "./src/images/figure15.svg":
/*!*********************************!*\
  !*** ./src/images/figure15.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure15.svg";

/***/ }),

/***/ "./src/images/figure16.svg":
/*!*********************************!*\
  !*** ./src/images/figure16.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure16.svg";

/***/ }),

/***/ "./src/images/figure17.svg":
/*!*********************************!*\
  !*** ./src/images/figure17.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure17.svg";

/***/ }),

/***/ "./src/images/figure18.svg":
/*!*********************************!*\
  !*** ./src/images/figure18.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure18.svg";

/***/ }),

/***/ "./src/images/figure19.svg":
/*!*********************************!*\
  !*** ./src/images/figure19.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure19.svg";

/***/ }),

/***/ "./src/images/figure2.svg":
/*!********************************!*\
  !*** ./src/images/figure2.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure2.svg";

/***/ }),

/***/ "./src/images/figure20.svg":
/*!*********************************!*\
  !*** ./src/images/figure20.svg ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure20.svg";

/***/ }),

/***/ "./src/images/figure3.svg":
/*!********************************!*\
  !*** ./src/images/figure3.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure3.svg";

/***/ }),

/***/ "./src/images/figure4.svg":
/*!********************************!*\
  !*** ./src/images/figure4.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure4.svg";

/***/ }),

/***/ "./src/images/figure5.svg":
/*!********************************!*\
  !*** ./src/images/figure5.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure5.svg";

/***/ }),

/***/ "./src/images/figure6.svg":
/*!********************************!*\
  !*** ./src/images/figure6.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure6.svg";

/***/ }),

/***/ "./src/images/figure7.svg":
/*!********************************!*\
  !*** ./src/images/figure7.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure7.svg";

/***/ }),

/***/ "./src/images/figure8.svg":
/*!********************************!*\
  !*** ./src/images/figure8.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure8.svg";

/***/ }),

/***/ "./src/images/figure9.svg":
/*!********************************!*\
  !*** ./src/images/figure9.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure9.svg";

/***/ }),

/***/ "./src/images/stars.svg":
/*!******************************!*\
  !*** ./src/images/stars.svg ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "stars.svg";

/***/ }),

/***/ "./src/images/syringe.svg":
/*!********************************!*\
  !*** ./src/images/syringe.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "syringe.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************************!*\
  !*** ./src/scripts/startGame.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_cursor_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/cursor.css */ "./src/css/cursor.css");
/* harmony import */ var _images_figure1_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../images/figure1.svg */ "./src/images/figure1.svg");
/* harmony import */ var _images_figure2_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../images/figure2.svg */ "./src/images/figure2.svg");
/* harmony import */ var _images_figure3_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/figure3.svg */ "./src/images/figure3.svg");
/* harmony import */ var _images_figure4_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../images/figure4.svg */ "./src/images/figure4.svg");
/* harmony import */ var _images_figure5_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../images/figure5.svg */ "./src/images/figure5.svg");
/* harmony import */ var _images_figure6_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../images/figure6.svg */ "./src/images/figure6.svg");
/* harmony import */ var _images_figure7_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../images/figure7.svg */ "./src/images/figure7.svg");
/* harmony import */ var _images_figure8_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../images/figure8.svg */ "./src/images/figure8.svg");
/* harmony import */ var _images_figure9_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../images/figure9.svg */ "./src/images/figure9.svg");
/* harmony import */ var _images_figure10_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../images/figure10.svg */ "./src/images/figure10.svg");
/* harmony import */ var _images_figure11_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../images/figure11.svg */ "./src/images/figure11.svg");
/* harmony import */ var _images_figure12_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../images/figure12.svg */ "./src/images/figure12.svg");
/* harmony import */ var _images_figure13_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../images/figure13.svg */ "./src/images/figure13.svg");
/* harmony import */ var _images_figure14_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../images/figure14.svg */ "./src/images/figure14.svg");
/* harmony import */ var _images_figure15_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../images/figure15.svg */ "./src/images/figure15.svg");
/* harmony import */ var _images_figure16_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../images/figure16.svg */ "./src/images/figure16.svg");
/* harmony import */ var _images_figure17_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../images/figure17.svg */ "./src/images/figure17.svg");
/* harmony import */ var _images_figure18_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../images/figure18.svg */ "./src/images/figure18.svg");
/* harmony import */ var _images_figure19_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../images/figure19.svg */ "./src/images/figure19.svg");
/* harmony import */ var _images_figure20_svg__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../images/figure20.svg */ "./src/images/figure20.svg");
/* harmony import */ var _images_stars_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../images/stars.svg */ "./src/images/stars.svg");
/* harmony import */ var _cursorAndCorona__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./cursorAndCorona */ "./src/scripts/cursorAndCorona.js");
/* harmony import */ var _storyLine__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./storyLine */ "./src/scripts/storyLine.js");
/* harmony import */ var _figuresMovement__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./figuresMovement */ "./src/scripts/figuresMovement.js");

























var footer = document.querySelector('footer');
var button = document.querySelector('#instructions form #startButton');
var topEyeshade = document.querySelector('#topEyeshade');
var bottomEyeshade = document.querySelector('#bottomEyeshade');
var tinyCircles = document.querySelectorAll('.tinyCircle');
var corona = document.querySelectorAll('.corona');
var tinyCircleContainer = document.querySelectorAll('.tinyCircleContainer');
var formLabel = document.querySelector('#instructions form label');
var formTextInput = document.querySelector('#instructions form #nickname');
var instructionsPTag = document.querySelector('#instructions p');
var nickname;
var stage = 0; //will go inside the level tag

var instructions = document.querySelector('#instructions');
var figures = []; //figure1, figure2...

var figuresDivs = [];
var numsOfFigs = []; //for example: [1, 2, 3, 4, 5, 6, 7] depends on the max number of figures in each level

var userScore = 0;
var bonusArrow = document.querySelector('header #bonusArrow');
var speed; //figures' speed (Controls the frequency of the interval in the function move)

instructions.style.display = 'none';
window.addEventListener('DOMContentLoaded', function (event) {
  instructions.style.display = 'block';
}); //starting the game

button.addEventListener("click", function (e) {
  e.preventDefault(); //prevent refreshing the page (due to the form)

  (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_24__.stopWorking)(0); //adding numbers to numsOfFigs array
  // if (stage == 5) {
  //     numsOfFigs.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 17, 18, 19, 20);
  // } else {
  //     for (let z = 1; z <= figuresPerStage[stage]; z++){
  //         numsOfFigs.push(z);
  //     } 
  // }

  for (var z = 1; z <= _storyLine__WEBPACK_IMPORTED_MODULE_23__.figuresPerStage[stage]; z++) {
    if (stage == 5 && (z == 11 || z == 12 || z == 13 || z == 14)) {
      console.log("");
    } else {
      numsOfFigs.push(z);
    }
  } //defining the figures' arrays


  numsOfFigs.forEach(function (num) {
    //adding figures into the figures array
    figures.push('figure' + num); //creating figures div tags in the html

    var i = document.createElement('div');
    i.classList.add('figures');
    i.setAttribute('id', 'figure' + num);
    _cursorAndCorona__WEBPACK_IMPORTED_MODULE_22__.body.insertBefore(i, footer);
    figuresDivs.push(i);
  }); //putting the nickname in local storage

  nickname = document.forms.nicknameForm.nickname.value;
  var localName = localStorage.getItem('name');

  if (nickname != '') {
    localStorage.setItem('name', nickname);
    localName = localStorage.getItem('name');
    console.log("Hello " + localName);
  } else if (nickname == '') {
    if (localName != null) {
      console.log("Hello " + localName);
    } else {
      localName = '';
      console.log("Hello " + localName);
    }
  } //we will remove parts of the form that we won't need any more


  formLabel.style.display = 'none';
  formTextInput.style.display = 'none'; //the corona appears

  corona.forEach(function (element) {
    element.style.display = 'block';
  }); //the small circles of the corona appear

  tinyCircleContainer.forEach(function (element) {
    element.style.display = 'inline-block';
  });
  instructions.style.display = 'none'; //the corona's eyes will get closed and turn/look to the other side

  topEyeshade.style.animation = 'shutTopEyeshade 2.5s 0.65s ease infinite normal';
  bottomEyeshade.style.animation = 'shutBottomEyeshade 2.5s 0.65s ease infinite normal';
  _cursorAndCorona__WEBPACK_IMPORTED_MODULE_22__.eyes.style.animation = 'turnEyes 5s 0.925s ease infinite normal'; //the score section appears:

  _cursorAndCorona__WEBPACK_IMPORTED_MODULE_22__.header.style.opacity = '0';
  _cursorAndCorona__WEBPACK_IMPORTED_MODULE_22__.header.style.display = 'flex';
  var score = document.querySelector('header #score span');
  score.textContent = userScore;
  var y = 0; //the next function will be called by: window.requestAnimationFrame(opacityChange);
  //and it will tell the browser that I wish to perform an animation with the opacity

  var opacityChange = function opacityChange() {
    y = y + 0.03;
    _cursorAndCorona__WEBPACK_IMPORTED_MODULE_22__.header.style.opacity = "".concat(y);

    if (_cursorAndCorona__WEBPACK_IMPORTED_MODULE_22__.header.style.opacity < '1') {
      requestAnimationFrame(opacityChange);
    }
  };

  window.requestAnimationFrame(opacityChange); //the timer appears

  var timer = document.querySelector('#timer');
  timer.style.animation = 'none'; //in order to reset the animation of the end of the level

  timer.classList.add('animationIsOn'); //bringing back the original className

  timer.classList.remove('animationRemoved'); //a temporary className we added to the timer at the end of the level (now we're removing it)

  var seconds = _storyLine__WEBPACK_IMPORTED_MODULE_23__.secondsForEachStage[stage];
  timer.textContent = seconds;
  timer.style.animation = "timerGrows 1s ".concat(seconds + 1, " ease normal"); //the stage appears on screen

  var level = document.querySelector('header #level span');
  level.textContent = stage + 1; //resetting the bonusArrow animation from the end of the level, so it'll be able to work again

  bonusArrow.style.animation = 'none';
  bonusArrow.classList.remove('animationRemoved');
  bonusArrow.classList.add('animationIsOn'); //function that will be called from the countDown function 
  //and also from the check function

  var checkBackground = function checkBackground(figureDiv) {
    return figureDiv.style.background.includes('stars.svg');
  }; //countDown function for the timer and changing the corona's color when not all figures were clicked


  var countDown = function countDown() {
    seconds = seconds - 1;
    timer.textContent = seconds;
  };

  var countDownInterval = setInterval(countDown, 1000); //function for the timer

  figures.forEach(function (figure) {
    var currentFigure = document.querySelector('#' + figure); //adding a background image for each figure:

    currentFigure.style.background = "url('./".concat(figure, ".svg')"); //putting the figures in different places at starting point

    currentFigure.style.top = Math.random() * (_cursorAndCorona__WEBPACK_IMPORTED_MODULE_22__.body.clientHeight - 56) + 'px'; //56 is the size of the figures. body.clientHeight gives the viewport size without the scroll bar

    currentFigure.style.left = Math.random() * (_cursorAndCorona__WEBPACK_IMPORTED_MODULE_22__.body.clientWidth - 56) + 'px'; //56 is the size of the figures.

    currentFigure.style.display = 'block'; //starting to move the figures in different directions:

    if (stage == 4 || stage == 6 || stage == 7) {
      speed = 'fast';
    } else {
      speed = 'regular';
    }

    (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_24__.move)(figure, speed); //function for clicking a figure

    var starsAndPoints = function starsAndPoints() {
      currentFigure.removeEventListener('click', starsAndPoints);
      currentFigure.style.background = 'url(./stars.svg)';
      currentFigure.style.animation = 'fireworks 0.75s ease forwards normal';
      userScore += 10;
      score.textContent = userScore; //deleting the figure from the DOM

      setTimeout(function () {
        currentFigure.remove();
      }, 751);
    }; //adding eventListener for each figure and adjusting the score


    currentFigure.addEventListener('click', starsAndPoints); //function that prevents clicking on figures, while the ambulances come

    var preventClick = function preventClick() {
      currentFigure.removeEventListener('click', starsAndPoints);
    }; //at the end of the stage the user won't be able to click the figures


    setTimeout(preventClick, _storyLine__WEBPACK_IMPORTED_MODULE_23__.secondsForEachStage[stage] * 1000);
  }); //function that works after the user failed

  var failingProcedure = function failingProcedure() {
    (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_24__.stopWorking)(1); //making the color of the corona randomly different

    var h = Math.random() * 359; //the H og the hsl is 0-359

    var s = Math.floor(Math.random() * (80 - 26 + 1) + 26); //I decided that the percentage of the S in hsl will be between 26 and 80 (because i don't like min saturation and max saturation)

    var l = Math.floor(Math.random() * (75 - 35 + 1) + 35); //I decided that the percentage of the L in hsl will be between 35 and 75 (not too light and not too dark)

    tinyCircles.forEach(function (circle) {
      circle.style.background = "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)");
    }); //removing the original class from the timer, resets its animation
    //and lets the animation work again next level (after adding the old className back)

    setTimeout(function () {
      timer.style.animation = 'none';
      timer.classList.add('animationRemoved');
      timer.classList.remove('animationIsOn');
    }, 1000);
    figuresDivs.forEach(function (figureDiv) {
      if (figureDiv.style.background.includes('figure')) {
        figureDiv.style.top = parseInt(figureDiv.style.top) + 'px'; //the method parseInt takes only the number (and leaves out the string 'px' attached to it) 

        figureDiv.style.left = parseInt(figureDiv.style.left) + 'px'; //creating ambulances and putting them 80px left to each figure

        var i = document.createElement('div');
        i.classList.add('ambulance');
        _cursorAndCorona__WEBPACK_IMPORTED_MODULE_22__.body.insertBefore(i, footer);
        i.style.position = 'absolute';
        i.style.top = figureDiv.style.top;
        i.style.left = parseInt(figureDiv.style.left) - 80 + "px";

        var figureEntersAmbulance = function figureEntersAmbulance() {
          var z = 0;
          setInterval(function () {
            if (z < 20) {
              figureDiv.style.top = parseInt(figureDiv.style.top) + 1 + 'px';
              z += 1;
            }
          }, 5);
        }; //moving the ambulance from the left of the figure towards the figure


        var movingAmbulance = function movingAmbulance() {
          if (parseInt(i.style.left) < parseInt(figureDiv.style.left)) {
            i.style.left = parseInt(i.style.left) + 1 + 'px';
          }
        }; //movingAmbulancePart2 will call this function:


        var moveRight = function moveRight() {
          i.style.left = parseInt(i.style.left) + 1 + 'px';
        }; //moving the ambulance from the figure to the right side of the screen


        var movingAmbulancePart2 = function movingAmbulancePart2() {
          if (parseInt(i.style.left) < _figuresMovement__WEBPACK_IMPORTED_MODULE_24__.ourViewPortWidth) {
            var movingRight = setInterval(moveRight, 10);
            i.style.animation = 'disappears 3s ease forwards normal';
            setInterval(function () {
              return clearInterval(movingRight);
            }, 3000);
          }
        };

        setTimeout(figureEntersAmbulance, 1200);
        figureDiv.style.animation = 'figureBecomesMini 0.5s 1.2s ease forwards normal';
        setInterval(movingAmbulance, 15);
        setTimeout(movingAmbulancePart2, 1700); //cleaning all figures and figures arrays after they entered the ambulance

        setTimeout(function () {
          figuresDivs.forEach(function (figure) {
            figure.remove();
          });
          figures = [];
          figuresDivs = [];
          numsOfFigs = [];
        }, 1700); //cleaning the ambulances after they finished their work

        setTimeout(function () {
          var ambulances = document.querySelectorAll('.ambulance');
          ambulances.forEach(function (ambulance) {
            ambulance.remove();
          });
        }, 4700);
      }
    }); //bringing back the instraction's box

    var bringingBackInstructions = function bringingBackInstructions() {
      if (localName == '') {
        instructionsPTag.textContent = "You failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe.";
      } else {
        instructionsPTag.textContent = localName + ',' + " you failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe.";
      }

      instructions.style.opacity = '0';
      instructions.style.display = 'block';
      instructions.style.top = 'calc(30% + 4px)';
      instructions.style.animation = 'instructionsAppears 2.5s ease forwards normal';
    };

    setTimeout(bringingBackInstructions, 2000);
  }; //function that checks if all the figures were clicked or if the time of the level ended


  var endLevelCheck = function endLevelCheck() {
    if (figuresDivs.every(checkBackground)) {
      //"every" returns true if the function returns true for all elements in the array (if all figures became stars)
      clearInterval(endLevel);
      (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_24__.stopWorking)(1); //the stars will stop moving

      stage += 1;
      clearInterval(countDownInterval); //the clock will stop

      timer.style.animation = 'none';
      timer.classList.add('animationRemoved');
      timer.classList.remove('animationIsOn'); //removing this class resets the animation for this element and lets us use it again after adding this class back

      if (seconds != 0) {
        timer.style.animation = "timerGrowsAgain 1s ".concat(seconds, " ease normal");
        bonusArrow.style.opacity = '1';
        bonusArrow.style.animation = "arrowGrows 1s ".concat(seconds, " ease normal");
        bonusArrow.classList.add('animationRemoved');
        bonusArrow.classList.remove('animationIsOn'); //removing this class resets the animation for this element and lets us use it again after adding this class back

        setTimeout(function () {
          bonusArrow.style.opacity = '0';
        }, seconds * 1000);
        var bonus = seconds * 10;
        var i = 1;
        var count = 0;
        setInterval(function () {
          count = count + i;

          if (count <= bonus) {
            userScore += 1;
            score.textContent = userScore;
          }
        }, 100);
      } //cleaning the figures arrays (in order to get ready for next level):


      setTimeout(function () {
        figures = [];
        figuresDivs = [];
        numsOfFigs = [];
      }, 751); //after the last firework ended its work
      //hiding the corona

      corona.forEach(function (element) {
        element.style.display = 'none';
      }); //bringing back the instraction's box

      if (localName == '') {
        instructionsPTag.textContent = _storyLine__WEBPACK_IMPORTED_MODULE_23__.pAnon[stage]; //pAnon is the text appears in storyLine.js
      } else {
        instructionsPTag.textContent = localName + ', ' + _storyLine__WEBPACK_IMPORTED_MODULE_23__.p[stage]; ////p is the text appears in storyLine.js
      }

      instructions.style.top = '22%';
      instructions.style.opacity = '0';
      instructions.style.display = 'block';
      instructions.style.animation = 'instructionsAppears 2s ease forwards normal';
    } else if (seconds == 0 && figuresDivs.every(checkBackground) == false) {
      //if not all figures became stars and the seconds ended
      clearInterval(endLevel);
      clearInterval(countDownInterval); //the clock will stop

      failingProcedure(); //function that brings the ambulances
    }
  };

  var endLevel = setInterval(endLevelCheck, 1);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NkIsR0FBN0I7QUFDQXBCLE1BQUFBLFlBQVksQ0FBQ3BGLEtBQWIsQ0FBbUIwRixPQUFuQixHQUE2QixPQUE3QjtBQUNBTixNQUFBQSxZQUFZLENBQUNwRixLQUFiLENBQW1CdUcsU0FBbkIsR0FBK0IsNkNBQS9CO0FBR0gsS0F6REQsTUF5RE8sSUFBSVEsT0FBTyxJQUFJLENBQVgsSUFBZ0J6QixXQUFXLENBQUNpRCxLQUFaLENBQWtCdEIsZUFBbEIsS0FBc0MsS0FBMUQsRUFBaUU7QUFBRTtBQUN0RTFFLE1BQUFBLGFBQWEsQ0FBQ2lHLFFBQUQsQ0FBYjtBQUNBakcsTUFBQUEsYUFBYSxDQUFDNkUsaUJBQUQsQ0FBYixDQUZvRSxDQUVsQzs7QUFDbENLLE1BQUFBLGdCQUFnQixHQUhvRCxDQUdqRDtBQUN0QjtBQUNKLEdBL0REOztBQWtFQSxNQUFNZSxRQUFRLEdBQUd4RixXQUFXLENBQUNzRixhQUFELEVBQWdCLENBQWhCLENBQTVCO0FBRUgsQ0F2V0QsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL3NyYy9zY3JpcHRzL2N1cnNvckFuZENvcm9uYS5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9zcmMvc2NyaXB0cy9maWd1cmVzTW92ZW1lbnQuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vc3JjL3NjcmlwdHMvc3RvcnlMaW5lLmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL3NyYy9jc3MvY3Vyc29yLmNzcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vc3JjL2Nzcy9jdXJzb3IuY3NzP2Q0MzEiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9zcmMvc2NyaXB0cy9zdGFydEdhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcbmNvbnN0IGN1cnNvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJzb3InKTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcclxuICAgIC8vdGhlIGxvY2F0aW9uIG9mIHRoZSBzeXJpbmdlIGN1cnNvclxyXG4gICAgY3Vyc29yLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwidG9wOiBcIiArIChlLnBhZ2VZICsgNCkgKyBcInB4OyBsZWZ0OiBcIiArIChlLnBhZ2VYIC0gNSkgKyBcInB4O1wiKTtcclxufSk7XHJcblxyXG5cclxuXHJcbmNvbnN0IGF4aXMgPSBbMSwgMiwgMywgNCwgNSwgNl07IC8vZm9yIHRoZSBsaW5lcyB0aGF0IGdvIG91dCBvZiB0aGUgY29yb25hJ3MgY2VudGVyXHJcbi8vY29uc3QgYXhpc0RpdnMgPSBbXTsgLy9jb250YWlucyBhbGwgdGhlIGF4aXNEaXZzIG9mIHRoZSBjb3JvbmFcclxuLy9jb25zdCB0aW55Q2lyY2xlc0NvbnRhaW5lcnNEaXZzID0gW107XHJcbmNvbnN0IGNvcm9uYUNpcmNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaXJjbGUnKTtcclxubGV0IGFuZ2xlID0gMDtcclxuXHJcblxyXG5heGlzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAvL2NyZWF0aW5nIGRpdiBmb3IgZWFjaCBjb3JvbmEgYXhpc1xyXG4gICAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpLmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICdheGlzJyk7IC8vYWRkaW5nIGNsYXNzIG5hbWVzIGZvciBvdXIgZGl2XHJcbiAgICBpLnNldEF0dHJpYnV0ZSgnaWQnLCAnYXhpcycrZWxlbWVudCk7IC8vYWRkaW5nIGlkIGZvciBvdXIgZGl2XHJcbiAgICBib2R5Lmluc2VydEJlZm9yZShpLCBjb3JvbmFDaXJjbGUubmV4dFNpYmxpbmcpOy8vcHV0dGluZyBcImlcIiBhZnRlciBjb3JvbmFDaXJjbGVcclxuICAgIC8vYXhpc0RpdnMucHVzaChpKTsgLy9wdXR0aW5nIG91ciBkaXYgaW5zaWRlIGF4aXNEaXZzIGFycmF5XHJcbiAgICBpLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVaKCR7YW5nbGV9ZGVnKWA7XHJcbiAgICBhbmdsZSArPSAzMDtcclxuXHJcbiAgICAvL2NyZWF0aW5nIGRpdiBmb3IgZWFjaCBjb250YWluZXIgKGNvbnRhaW5lcnMgZm9yIHRoZSB0aW55IGNpcmNsZXMpXHJcbiAgICAvL3RoZXNlIGNvbnRhaW5lcnMgd2lsbCBoYXZlIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGNvbnN0IG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbi5jbGFzc0xpc3QuYWRkKCdjb3JvbmEnLCAndGlueUNpcmNsZUNvbnRhaW5lcicpOyAvL2FkZGluZyBjbGFzcyBuYW1lcyBmb3Igb3VyIGRpdlxyXG4gICAgbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RpbnlDaXJjbGVDb250YWluZXInK2VsZW1lbnQpOyAvL2FkZGluZyBpZCBmb3Igb3VyIGRpdlxyXG4gICAgYm9keS5pbnNlcnRCZWZvcmUobiwgaGVhZGVyKTsvL3B1dHRpbmcgXCJuXCIgYXQgdGhlIHRvcCBvZiB0aGUgcGFnZSwgc28gaXQgd2lsbCBiZSBlYXNpZXIgdG8gcHV0IGl0IG9uIHRoZSBiaWcgY2lyY2xlXHJcbiAgICAvL3RpbnlDaXJjbGVzQ29udGFpbmVyc0RpdnMucHVzaChuKTsgLy9wdXR0aW5nIG91ciBkaXYgaW5zaWRlIHRpbnlDaXJjbGVzQ29udGFpbmVyc0RpdnMgYXJyYXlcclxuICAgIG4uc3R5bGUudG9wID0gXCJjYWxjKDMwJSAtIDExMHB4KVwiOyAvL2xvY2F0aW5nIGl0IGF0IHRoZSBjZW50ZXIgb2YgdGhlIGNvcm9uYSdzIGJpZyBjaXJjbGVcclxuICAgIG4uc3R5bGUuYm90dG9tID0gXCJjYWxjKDcwJSArIDExMHB4KVwiOyBcclxuICAgIG4uc3R5bGUucmlnaHQgPSBgY2FsYyg1MCUgKyAkezEwICsgMjIqKGVsZW1lbnQgLTEpfXB4KWA7ICAgLy9sb2NhdGluZyBlYWNoIGNvbnRhaW5lciBhdCB0aGUgbG9jYXRpb24gb2YgdGhlIGZpcnN0IGNvbnRhaW5lclxyXG4gICAgbi5zdHlsZS5sZWZ0ID0gYGNhbGMoNTAlIC0gJHsxMCArIDIyKihlbGVtZW50IC0xKX1weClgOyAgXHJcbiAgICBjb25zdCBjb250YWluZXJBbmdsZSA9IDMwICogKGVsZW1lbnQgLSAxKTsgXHJcbiAgICBuLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVaKCR7Y29udGFpbmVyQW5nbGV9ZGVnKWA7IC8vY2hhbmdpbmcgdGhlIGFuZ2xlIG9mIGVhY2ggY29udGFpbmVyLCBzbyBlYWNoIGNvbnRhaW5lciB3aWxsIGJlIGxvY2F0ZWQgYmVoaW5kIG9mIGVhY2ggYXhpc1xyXG4gICAgXHJcblxyXG4gICAgLy9jcmVhdGluZyBkaXYgZm9yIGVhY2ggY29yb25hJ3MgdGlueSBjaXJjbGVcclxuICAgIC8vdGhlc2UgY2lyY2xlcyB3aWxsIGhhdmUgcG9zaXRpb246IGFic29sdXRlOyBvbiB0aGVpciBmYXRoZXIgKHRoZSBjb250YWluZXIpXHJcbiAgICBjb25zdCBtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnN0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpOy8vd2UgbmVlZCAxMiB0aW55IGNpcmNsZXMgYW5kIHdlIGhhdmUgb25seSA2IGNvbnRhaW5lcnNcclxuICAgIG0uY2xhc3NMaXN0LmFkZCgnY29yb25hJywgJ3RpbnlDaXJjbGUnKTtcclxuICAgIG0uc2V0QXR0cmlidXRlKCdpZCcsICd0aW55Q2lyY2xlJytlbGVtZW50KTtcclxuICAgIG0uc3R5bGUudG9wID0gJzAnO1xyXG4gICAgbS5zdHlsZS5yaWdodCA9ICcwJztcclxuICAgIGwuY2xhc3NMaXN0LmFkZCgnY29yb25hJywgJ3RpbnlDaXJjbGUnKTtcclxuICAgIGwuc2V0QXR0cmlidXRlKCdpZCcsICd0aW55Q2lyY2xlJysoZWxlbWVudCs2KSk7XHJcbiAgICBsLnN0eWxlLnRvcCA9ICdjYWxjKDEwMCUgLSAyNHB4KSc7XHJcbiAgICBsLnN0eWxlLnJpZ2h0ID0gJzAnO1xyXG4gICAgY29uc3QgY3VycmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCN0aW55Q2lyY2xlQ29udGFpbmVyJHtlbGVtZW50fWApO1xyXG4gICAgY3VycmVudENvbnRhaW5lci5hcHBlbmQobSk7IC8vcHV0aW5nIGVhY2ggdGlueUNpcmNsZSBpbnNpZGUgaXRzIHJpZ2h0IGNvbnRhaW5lclxyXG4gICAgY3VycmVudENvbnRhaW5lci5hcHBlbmQobCk7IC8vcHV0aW5nIGVhY2ggdGlueUNpcmNsZSBpbnNpZGUgaXRzIHJpZ2h0IGNvbnRhaW5lclxyXG5cclxufSk7XHJcblxyXG5cclxuLy9jcmVhdGluZyBkaXYgZm9yIHRoZSBjb3JvbmEncyBleWVzXHJcbmNvbnN0IGV5ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5leWVzLmNsYXNzTGlzdC5hZGQoJ2V5ZXMnLCAnY29yb25hJyk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW55Q2lyY2xlQ29udGFpbmVyMScpLmFwcGVuZChleWVzKTtcclxuXHJcbi8vLy9jcmVhdGluZyBkaXZzIGZvciB0aGUgY29yb25hJ3MgZXllIHNoYWRlc1xyXG5jb25zdCB6ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuY29uc3QgeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbnouY2xhc3NMaXN0LmFkZCgnY29yb25hJywgJ2V5ZVNoYWRlcycpO1xyXG55LmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICdleWVTaGFkZXMnKTtcclxuei5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvcEV5ZXNoYWRlJyk7XHJcbnkuc2V0QXR0cmlidXRlKCdpZCcsICdib3R0b21FeWVzaGFkZScpO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGlueUNpcmNsZUNvbnRhaW5lcjEnKS5hcHBlbmQoeik7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW55Q2lyY2xlQ29udGFpbmVyMScpLmFwcGVuZCh5KTtcclxuXHJcblxyXG5leHBvcnQgeyBib2R5LCBoZWFkZXIsIGN1cnNvciwgY29yb25hQ2lyY2xlLCBleWVzIH07XHJcbiIsImltcG9ydCB7IGJvZHksIGhlYWRlciwgY3Vyc29yLCBjb3JvbmFDaXJjbGUsIGV5ZXMgfSBmcm9tICcuL2N1cnNvckFuZENvcm9uYSc7XHJcbmltcG9ydCB7IHNlY29uZHNGb3JFYWNoU3RhZ2UsIHBGYWlsdXJlLCBwRmFpbHVyZUFub24sIHAsIHBBbm9uIH0gZnJvbSAnLi9zdG9yeUxpbmUnO1xyXG5cclxuXHJcbmxldCBzdG9wID0gMDtcclxuY29uc3Qgc3RvcFdvcmtpbmcgPSAoYmluYXJ5KSA9PiBzdG9wID0gYmluYXJ5OyAvL3dlIGNhbid0IGV4cG9ydCBcInN0b3BcIiBhcyBsZXQsIHNvIHdlIG1ha2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2EgZnVuY3Rpb24gdGhhdCB3ZSBjYW4gZXhwb3J0LCBhbmQgaXQnbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZSB0aGUgdmFsdWUgb2Ygc3RvcFxyXG5cclxuY29uc3Qgb3VyVmlld1BvcnRXaWR0aCA9IGJvZHkuY2xpZW50V2lkdGg7IC8vY2xpZW50V2lkdGggc2hvd3MgdGhlIHdpZHRoIG9mIHRoZSBlbGVtZW50IHdlIGNob29zZVxyXG5jb25zdCBvdXJWaWV3UG9ydEhlaWdodCA9IGJvZHkuY2xpZW50SGVpZ2h0O1xyXG5jb25zb2xlLmxvZyAoJ291clZpZXdQb3J0V2lkdGg6ICcgKyBvdXJWaWV3UG9ydFdpZHRoICsgJyBvdXJWaWV3UG9ydEhlaWdodDogJyArb3VyVmlld1BvcnRIZWlnaHQpXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy90aGUgYnV0dG9uJ3MgZXZlbnQgbGlzdGVuZXIgd2lsbCBjYWxsIHRoaXMgZnVuY3Rpb24sIHdoaWNoIHdpbGwgbW92ZSB0aGUgZmlndXJlcyBpbiByYW5kb20gZGlyZWN0aW9uc1xyXG5jb25zdCBtb3ZlID0gKGZpZ3VyZSwgc3BlZWQpID0+IHtcclxuICAgIC8vbWFraW5nIHJhbmRvbiBpbnRlZ2VycyBmb3IgdGhlIGZpZ3VyZXMgdG8gbW92ZSBpbiBkaWZmZXJlbnQgZGlyZWN0aW9uc1xyXG4gICAgbGV0IHJhbmRvbUludFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMiAtICgtMikgKyAxKSkgLTI7IC8vdGhpcyBjb25zdCB3aWxsIGdpdmUgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIC0yIGFuZCArMlxyXG4gICAgbGV0IHJhbmRvbUludFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMiAtICgtMikgKyAxKSkgLTI7IC8vdGhpcyBjb25zdCB3aWxsIGdpdmUgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIC0yIGFuZCArMlxyXG4gICAgaWYgKHJhbmRvbUludFggPT0gMCAmJiByYW5kb21JbnRZID09IDApe1xyXG4gICAgICAgIHJhbmRvbUludFggPSAyO1xyXG4gICAgfVxyXG4gICBcclxuICAgIGNvbnN0IGN1cnJlbnRGaWd1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytmaWd1cmUpO1xyXG5cclxuICAgIC8vdGhlIHdheSB0aGUgZmlndXJlcyBtb3ZlXHJcbiAgICBjb25zdCBmaWd1cmVNb3ZlbWVudCA9IChyYW5kb21JbnRYLCByYW5kb21JbnRZKSA9PiB7XHJcbiAgICAgICBcclxuICAgICAgICBpZiAoc3RvcCA9PSAxKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtb3ZlbWVudEludGVydmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy80IHJ1bGVzIGZvciB0aGUgY29ybmVycycgY2FzZXM6XHJcbiAgICAgICAgaWYgKChjdXJyZW50RmlndXJlLm9mZnNldFRvcCA8PSAxKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0ID49IChib2R5LmNsaWVudFdpZHRoIC01NiAtIDEpKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICgob3VyVmlld1BvcnRIZWlnaHQgLTU2IC0gMikgKyAncHgnKTtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ID0gJzJweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChjdXJyZW50RmlndXJlLm9mZnNldFRvcCA8PSAxKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0IDw9IDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gKChvdXJWaWV3UG9ydEhlaWdodCAtNTYgLSAyKSArICdweCcpO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAoKG91clZpZXdQb3J0V2lkdGggLTU2IC0yKSArICdweCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPj0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIDEpKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0IDw9IDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gJzJweCc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICgob3VyVmlld1BvcnRXaWR0aCAtNTYgLTIpICsgJ3B4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChjdXJyZW50RmlndXJlLm9mZnNldFRvcCA+PSAoYm9keS5jbGllbnRIZWlnaHQgLTU2IC0gMSkpICYmIChjdXJyZW50RmlndXJlLm9mZnNldExlZnQgPj0gKGJvZHkuY2xpZW50V2lkdGggLTU2IC0gMSkpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gJzJweCc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICcycHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2ZvdXIgXCJpZlwiIHJ1bGVzIGZvciBjYXNlcyB0aGF0IHRoZSBmaWd1cmVzIHJlYWNoIHRoZSBzY3JlZW4gZWRnZXM6XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPD0gMSkgeyAvL29mZnNldFRvcCBzaG93cyB0aGUgbG9jYXRpb24gY29tcGFyaW5nIHRvIHRoZSBmYXRoZXIgKHRoZSBib2R5KS4gV2UgbmVlZCB0aGF0IG9mZnNldFRvcCB3aWxsIGJlIDAgb3IgMSAoYW5kIG5vdCBvbmx5IG9mZnNldFRvcD0wKSwgYmVjYXVzZSBzb21ldGltZXMgdGhlIGZpZ3VyZXMgZG8gMiBzdGVwcyAoMiBwaXhlbHMpIGF0IGEgdGltZVxyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICgob3VyVmlld1BvcnRIZWlnaHQgLTU2IC0gMikgKyAncHgnKTsvL01pbnVzIDIsIGJlY2F1c2UgdGhlIGZpZ3VyZXMgd2lsbCBiZSBzdHVja2VkIGlmIHdlIHdpbGwgc2VuZCB0aGVtIHRvIG91clZpZXdQb3J0SGVpZ2h0TWludXMxIG9yIG91clZpZXdQb3J0SGVpZ2h0LiBBbmQgbWludXMgNTYgYmVjYXVzZSBvZiB0aGUgc2l6ZSBvZiB0aGUgZmlndXJlcyAod2Ugd2FudCB0aGVtIHRvIGRpc2FwcGVhciBhdCB0aGUgZWRnZSBvZiB0aGUgc2NyZWVuIGFuZCBub3QgNTZweCBhZnRlciBpdClcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ID0gKGJvZHkuY2xpZW50V2lkdGggLTU2IC0gcGFyc2VJbnQoY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPj0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gJzJweCc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9IChib2R5LmNsaWVudFdpZHRoIC01NiAtIHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCkpICsgJ3B4JztcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA8PSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICgob3VyVmlld1BvcnRXaWR0aCAtNTYgLTIpICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wKSkgKyAncHgnO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0ID49IChib2R5LmNsaWVudFdpZHRoIC01NiAtIDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICcycHgnO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9IChib2R5LmNsaWVudEhlaWdodCAtNTYgLSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLnRvcCkpICsgJ3B4JztcclxuICAgICAgICB9IFxyXG4gICAgICAgIC8vaWYgdGhlIGZpZ3VyZSBpcyBub3QgaW4gdGhlIGVkZ2Ugb3IgaW4gdGhlIGNvcm5lcixcclxuICAgICAgICAvL3RoZW4gdGhhdCdzIHRoZSB3YXkgaXQgd2lsbCBtb3ZlIG9uIHNjcmVlbjpcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLnRvcCkgKyByYW5kb21JbnRZICsgJ3B4JzsgLy90aGUgbWV0aG9kIHBhcnNlSW50IHRha2VzIG9ubHkgdGhlIG51bWJlciAoYW5kIGxlYXZlcyBvdXQgdGhlIHN0cmluZyAncHgnIGF0dGFjaGVkIHRvIGl0OikgXHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9IHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCkgKyByYW5kb21JbnRYICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudEZpZ3VyZS5zdHlsZS5iYWNrZ3JvdW5kICsgJyBYOiAnKyBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgKyAnIFk6ICcgKyBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL25vdyB3ZSdsbCBjYWxsIHRoZSBmaWd1cmVNb3ZlbWVudCBmdW5jdGlvbiwgYnV0IHRoZSBpbnRlcnZhbCBmb3IgdGhpcyBmdW5jdGlvblxyXG4gICAgLy93aWxsIGJlIGhpZ2hlciBmcmVxdWVuY3kgZm9yIGZpZ3VyZXMgMTEtMTQgKHRoZSBiYXRzKS4gXHJcbiAgICBsZXQgbW92ZW1lbnRJbnRlcnZhbDtcclxuICAgIGNvbnN0IGJhdEFycmF5ID0gWzExLCAxMiwgMTMsIDE0XTtcclxuICAgIC8vd2Ugd2lsbCB1c2Ugc29tZSgpIG1ldGhvZCwgd2hpY2ggY2hlY2tzIGlmICBhdCBsZWFzdCBvbmUgZWxlbWVudCBpbiB0aGUgYXJyYXlcclxuICAgIC8vcGFzc2VzIHRoZSB0ZXN0IGltcGxlbWVudGVkIGluc2lkZSBzb21lKClcclxuICAgIGlmIChiYXRBcnJheS5zb21lKGVsZW1lbnQgPT4gY3VycmVudEZpZ3VyZS5zdHlsZS5iYWNrZ3JvdW5kLmluY2x1ZGVzKGVsZW1lbnQpKSkge1xyXG4gICAgICAgIG1vdmVtZW50SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiBmaWd1cmVNb3ZlbWVudChyYW5kb21JbnRYLCByYW5kb21JbnRZKSwgOSk7XHJcbiAgICB9IGVsc2UgaWYgKHNwZWVkID09ICdmYXN0Jykge1xyXG4gICAgICAgIG1vdmVtZW50SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiBmaWd1cmVNb3ZlbWVudChyYW5kb21JbnRYLCByYW5kb21JbnRZKSwgMTIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ29pbmcgZmFzdCBub3dcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1vdmVtZW50SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiBmaWd1cmVNb3ZlbWVudChyYW5kb21JbnRYLCByYW5kb21JbnRZKSwgMjApO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB7IHN0b3BXb3JraW5nLCBvdXJWaWV3UG9ydFdpZHRoLCBvdXJWaWV3UG9ydEhlaWdodCwgbW92ZSB9OyIsImltcG9ydCB7IGJvZHksIGhlYWRlciwgY3Vyc29yLCBjb3JvbmFDaXJjbGUsIGV5ZXMgfSBmcm9tICcuL2N1cnNvckFuZENvcm9uYSc7XHJcblxyXG5cclxuY29uc3Qgc2Vjb25kc0ZvckVhY2hTdGFnZSA9IFsxMSwgMTQsIDEzLCAxOCwgMTMsIDE2LCAyMCwgMThdO1xyXG4vLyBcclxuY29uc3QgZmlndXJlc1BlclN0YWdlID0gWzcsIDEwLCAxMCwgMTQsIDEwLCAyMCwgMjAsIDIwXTtcclxuXHJcbmNvbnN0IHBGYWlsdXJlID0gXCJ5b3UgZmFpbGVkIGFuZCBhIG5ldyB2YXJpYW50IGlzIHNwcmVhZGluZyBub3csIGJ1dCBkb24ndCB3b3JyeSwgeW91IGNhbiB0cnkgYWdhaW4gYW5kIHByZXZlbnQgYSB3b3JsZCBjYXRhc3Ryb3BoZVwiO1xyXG5jb25zdCBwRmFpbHVyZUFub24gPSBcIllvdSBmYWlsZWQgYW5kIGEgbmV3IHZhcmlhbnQgaXMgc3ByZWFkaW5nIG5vdywgYnV0IGRvbid0IHdvcnJ5LCB5b3UgY2FuIHRyeSBhZ2FpbiBhbmQgcHJldmVudCBhIHdvcmxkIGNhdGFzdHJvcGhlXCI7XHJcblxyXG5jb25zdCBwID0gW1xyXG5cIlZhY2NpbmF0ZSB3b3JsZCdzIHBvcHVsYXRpb24gYW5kIGhlbHAgZmlnaHQgdGhlIGNvcm9uYXZpcnVzIGRpc2Vhc2UuIElmIHlvdSdsbCBmYWlsLCBhIG5ldyB2YXJpYW50IHdpbGwgYXJyaXZlLi4uXCIsXHJcblwieW91IG1hZGUgaXQhIEJ1dCB0aGUgcG9wdWxhdGlvbiBncmV3IGFuZCB5b3UgbmVlZCB0byB2YWNjaW5hdGUgbW9yZSBwZW9wbGUgbm93IVwiLFxyXG5cInlvdSBtYWRlIGl0IGFnYWluISBOb3cgbGV0cyBzZWUgaWYgeW91IGNhbiBkbyBpdCBldmVuIGZhc3RlciFcIixcclxuXCJncmVhdCBqb2IhIEJ1dCBiYXRzIGFyZSBjYW1taW5nLiBDYW4geW91IHZhY2NpbmF0ZSB0aGVtIHRvbz9cIixcclxuXCJ5b3UgYXJlIGF3ZXNvbWUhIE5vdyBsZXRzIHNlZSBpZiB5b3UgY2FuIGRvIGl0IHdpdGggcGVvcGxlIHRoYXQgYXJlIGluIGEgaHVycnkhXCIsXHJcblwiYW1hemluZyB3b3JrISBDYW4geW91IGFsc28gdmFjY2luYXRlIGVhY2ggcGVyc29uIGluIG9ubHkgb25lIHNlY29uZD9cIixcclxuXCJ0aGUgQ29yb25hIGNhbid0IGJlYXQgeW91ISBMZXRzIHRyeSBpdCBub3cgd2l0aCB0aGUgYmF0cyBhbmQgZmFzdGVyIVwiLFxyXG5cInlvdSdyZSBhbG1vc3QgYXQgdGhlIGVuZCBvZiB5b3VyIGpvdXJueSwgb25seSBvbmUgc3RhZ2UgdG8gZ28hXCIsXHJcblwieW91IGRpZCBpdCEgWW91IHNhdmVkIGh1bWFuaXR5ISBZb3UgZW5kZWQgdGhlIGNvcm9uYXZpcnVzIGRpc2Vhc2UgYW5kIG1hZGUgWFhYIHBvaW50LlwiXHJcbl1cclxuXHJcbmNvbnN0IHBBbm9uID0gW1xyXG4gICAgXCJWYWNjaW5hdGUgd29ybGQncyBwb3B1bGF0aW9uIGFuZCBoZWxwIGZpZ2h0IHRoZSBjb3JvbmF2aXJ1cyBkaXNlYXNlLiBJZiB5b3UnbGwgZmFpbCwgYSBuZXcgdmFyaWFudCB3aWxsIGFycml2ZS4uLlwiLFxyXG4gICAgXCJZb3UgbWFkZSBpdCEgQnV0IHRoZSBwb3B1bGF0aW9uIGdyZXcgYW5kIHlvdSBuZWVkIHRvIHZhY2NpbmF0ZSBtb3JlIHBlb3BsZSBub3chXCIsXHJcbiAgICBcIllvdSBtYWRlIGl0IGFnYWluISBOb3cgbGV0cyBzZWUgaWYgeW91IGNhbiBkbyBpdCBldmVuIGZhc3RlciFcIixcclxuICAgIFwiR3JlYXQgam9iISBCdXQgYmF0cyBhcmUgY2FtbWluZy4gQ2FuIHlvdSB2YWNjaW5hdGUgdGhlbSB0b28/XCIsXHJcbiAgICBcIllvdSBhcmUgYXdlc29tZSEgTm93IGxldHMgc2VlIGlmIHlvdSBjYW4gZG8gaXQgd2l0aCBwZW9wbGUgdGhhdCBhcmUgaW4gYSBodXJyeSFcIixcclxuICAgIFwiQW1hemluZyB3b3JrISBDYW4geW91IGFsc28gdmFjY2luYXRlIGVhY2ggcGVyc29uIGluIG9ubHkgb25lIHNlY29uZD9cIixcclxuICAgIFwiVGhlIENvcm9uYSBjYW4ndCBiZWF0IHlvdSEgTGV0cyB0cnkgaXQgbm93IHdpdGggdGhlIGJhdHMhXCIsXHJcbiAgICBcIllvdSdyZSBhbG1vc3QgYXQgdGhlIGVuZCBvZiB5b3VyIGpvdXJueSwgb25seSBvbmUgc3RhZ2UgdG8gZ28hXCIsXHJcbiAgICBcIllvdSBkaWQgaXQhIFlvdSBzYXZlZCBodW1hbml0eSEgWW91IGVuZGVkIHRoZSBjb3JvbmF2aXJ1cyBkaXNlYXNlIGFuZCBtYWRlIFhYWCBwb2ludC5cIlxyXG5dXHJcblxyXG5leHBvcnQgeyBzZWNvbmRzRm9yRWFjaFN0YWdlLCBmaWd1cmVzUGVyU3RhZ2UsIHBGYWlsdXJlLCBwRmFpbHVyZUFub24sIHAsIHBBbm9uIH07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2ltYWdlcy9hcnJvdy5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9pbWFnZXMvc3lyaW5nZS5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuLi9pbWFnZXMvZXllcy5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuLi9pbWFnZXMvYW1idWxhbmNlMS5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqe1xcblxcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuXFx0bWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIHBhZGRpbmc6IDA7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgY3Vyc29yOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkM2IzYjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmhlYWRlciB7ICBcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogbm93cmFwOyAvKmluIDEgbGluZSBvbmx5Ki9cXG4gIGNvbG9yOiByZ2IoMTg0LCAyMzgsIDE4NCk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDQwcHg7XFxuICBmb250LWZhbWlseTogR2FyYW1vbmQsIHNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGxlZnQ6IDA7XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIHVzZXItc2VsZWN0OiBub25lOyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG59XFxuXFxuaGVhZGVyIGRpdiB7XFxuICBmbGV4OiAxO1xcbn1cXG5cXG5oZWFkZXIgZGl2IHNwYW4ge1xcbiAgZm9udC1zaXplOiAzMnB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAxcHg7XFxufVxcblxcbmhlYWRlciAjYm9udXNBcnJvdyB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIG5vLXJlcGVhdCBjZW50ZXI7IFxcbiAgYmFja2dyb3VuZC1zaXplOiA2MHB4IEF1dG87XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZTtcXG4gIC1tb3otdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XFxuICAtby10cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZTtcXG4gIC1tcy10cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZTtcXG59XFxuXFxuaGVhZGVyICNib251c0Fycm93IHAge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAxMDAlO1xcbiAgZm9udC1zaXplOiAyMnB4O1xcbiAgY29sb3I6ICM1OGRjZjc7XFxufVxcblxcbkBrZXlmcmFtZXMgdGltZXJHcm93cyB7XFxuICAwJSB7dHJhbnNmb3JtOiBzY2FsZSgxLCAxKX1cXG4gIDUwJSB7dHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuNSl9XFxuICAxMDAlIHt0cmFuc2Zvcm06IHNjYWxlKDEsIDEpfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHRpbWVyR3Jvd3NBZ2FpbiB7XFxuICAwJSB7dHJhbnNmb3JtOiBzY2FsZSgxLCAxKX1cXG4gIDUwJSB7dHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuNSl9XFxuICAxMDAlIHt0cmFuc2Zvcm06IHNjYWxlKDEsIDEpfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGFycm93R3Jvd3Mge1xcbiAgMCUge3RyYW5zZm9ybTogc2NhbGUoMSwgMSl9XFxuICA1MCUge3RyYW5zZm9ybTogc2NhbGUoMS4yNSwgMS4yNSl9XFxuICAxMDAlIHt0cmFuc2Zvcm06IHNjYWxlKDEsIDEpfVxcbn1cXG5cXG4uY3Vyc29yIHtcXG4gIHdpZHRoOiA0OHB4O1xcbiAgaGVpZ2h0OiA0OHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVaKDEwMGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IC8qVGhpcyB3aWxsIG1ha2UgdGhlIHN5cmluZ2UgdHJhbnNwYXJlbnQgdG8gY2xpY2tzLiBcXG4gICAgSXQgd2lsbCBtYWtlIHRoZSByZWFsIGN1cnNvciB0byBjbGljayB3aGF0J3MgdW5kZXIgdGhlIHN5cmluZ2UqL1xcbiAgei1pbmRleDogMTAwO1xcbn1cXG5cXG4jaW5zdHJ1Y3Rpb25zIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcblxcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2IoMjQzLCAyNDMsIDE0NSkgMzAlLCByZ2IoMjQ3LCAyNDcsIDE5NykpO1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQocmdiKDI0MywgMjQzLCAxNDUpIDMwJSwgcmdiKDI0NywgMjQ3LCAxOTcpKTtcXG5cXHRiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgdG9wLCBib3R0b20sIGNvbG9yLXN0b3AoMzAlLCByZ2IoMjQzLCAyNDMsIDE0NSkpLCBjb2xvci1zdG9wKDEwMCUsIHJnYigyNDcsIDI0NywgMTk3KSkpO1xcblxcdGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHJnYigyNDMsIDI0MywgMTQ1KSAzMCUsIHJnYigyNDcsIDI0NywgMTk3KSk7XFxuXFx0YmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KHJnYigyNDMsIDI0MywgMTQ1KSAzMCUsIHJnYigyNDcsIDI0NywgMTk3KSk7XFxuXFx0YmFja2dyb3VuZDogLW1zLWxpbmVhci1ncmFkaWVudChyZ2IoMjQzLCAyNDMsIDE0NSkgMzAlLCByZ2IoMjQ3LCAyNDcsIDE5NykpO1xcbiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoIHN0YXJ0Q29sb3JzdHI9J3JnYigyNDMsIDI0MywgMTQ1KScsIGVuZENvbG9yc3RyPSdyZ2IoMjQ3LCAyNDcsIDE5NyknLEdyYWRpZW50VHlwZT0wICk7XFxuICB3aWR0aDogNTAlO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlcjogN3B4IHNvbGlkIHJnYigxODQsIDE4NCwgMTY5KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG4gIGZvbnQtZmFtaWx5OiBHYXJhbW9uZCwgc2VyaWY7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMjIlO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICB6LWluZGV4OiAxMDtcXG59XFxuXFxuQGtleWZyYW1lcyBpbnN0cnVjdGlvbnNBcHBlYXJzIHtcXG4gIDAlIHtvcGFjaXR5OiAwfVxcbiAgMTAwJSB7b3BhY2l0eTogMX1cXG59XFxuXFxuI2luc3RydWN0aW9ucyBwIHtcXG4gIHVzZXItc2VsZWN0OiBub25lOyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG59XFxuXFxuZm9ybSB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG5mb3JtIGxhYmVsIHtcXG4gIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xcbiAgZm9udC1zaXplOiAzMnB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAzcHg7XFxufVxcbiBcXG4uY29yb25hIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTsgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lOyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxufVxcblxcbiNjaXJjbGUge1xcbiAgd2lkdGg6IDEzMHB4O1xcbiAgaGVpZ2h0OiAxMzBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJhY2tncm91bmQ6IHJnYigyNDMsIDI0MywgMTQ1KTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMzAlO1xcbiAgYm90dG9tOiA3MCU7XFxuICBtYXJnaW46IGF1dG87XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cXG4uYXhpc3tcXG4gIGhlaWdodDogMTg0cHg7XFxuICB3aWR0aDogMTBweDtcXG4gIGJhY2tncm91bmQ6IHJnYigyNDMsIDI0MywgMTQ1KTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMzAlO1xcbiAgYm90dG9tOiA3MCU7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi50aW55Q2lyY2xlQ29udGFpbmVyIHtcXG4gIGhlaWdodDoyMjBweDtcXG4gIHdpZHRoOjIycHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTUzLCAxMTYsIDI0MCwgMCk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB6LWluZGV4OiAyO1xcbn1cXG5cXG4udGlueUNpcmNsZSB7XFxuICBoZWlnaHQ6MjRweDtcXG4gIHdpZHRoOjI0cHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjQ1LCAxOTQsIDEwMCk7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDIuNXMgZWFzZTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYmFja2dyb3VuZCAyLjVzIGVhc2U7XFxuICAtbW96LXRyYW5zaXRpb246IGJhY2tncm91bmQgMi41cyBlYXNlO1xcbiAgLW8tdHJhbnNpdGlvbjogYmFja2dyb3VuZCAyLjVzIGVhc2U7XFxuICAtbXMtdHJhbnNpdGlvbjogYmFja2dyb3VuZCAyLjVzIGVhc2U7XFxufVxcblxcbi5leWVzIHtcXG4gIGhlaWdodDogNDBweDtcXG4gIHdpZHRoOiA4MHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKTtcXG4gIHRvcDogNzZweDtcXG4gIHJpZ2h0OiAtMjdweDtcXG4gIHotaW5kZXg6IDM7XFxufVxcblxcbkBrZXlmcmFtZXMgdHVybkV5ZXMge1xcbiAgMCUge3RyYW5zZm9ybTogcm90YXRlWigxODBkZWcpOyBvcGFjaXR5OiAxfVxcbiAgNDglIHt0cmFuc2Zvcm06IHJvdGF0ZVooMTgwZGVnKTsgb3BhY2l0eTogMX1cXG4gIDQ5JSB7dHJhbnNmb3JtOiByb3RhdGVaKDE4MGRlZyk7IG9wYWNpdHk6IDB9XFxuICA1MCUge3RyYW5zZm9ybTogcm90YXRlWigwZGVnKTsgb3BhY2l0eTogMH1cXG4gIDUxJSB7dHJhbnNmb3JtOiByb3RhdGVaKDBkZWcpOyBvcGFjaXR5OiAxfVxcbiAgOTglIHt0cmFuc2Zvcm06IHJvdGF0ZVooMGRlZyk7IG9wYWNpdHk6IDF9XFxuICA5OSUge3RyYW5zZm9ybTogcm90YXRlWigwZGVnKTsgb3BhY2l0eTogMH1cXG4gIDEwMCUge3RyYW5zZm9ybTogcm90YXRlWigxODBkZWcpOyBvcGFjaXR5OiAwfVxcbn1cXG5cXG4uZXllU2hhZGVzIHtcXG4gIHotaW5kZXg6IDQ7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICB3aWR0aDogNzZweDtcXG4gIGJhY2tncm91bmQ6IHJnYigyNDMsIDI0MywgMTQ1KTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDQ7XFxuICByaWdodDogLTI1cHg7XFxufVxcblxcbiN0b3BFeWVzaGFkZSB7XFxuICB0b3A6IDU4cHg7XFxuICBhbmltYXRpb246IG5vbmU7IC8qc2h1dFRvcEV5ZXNoYWRlIDNzIGVhc2UgaW5maW5pdGUgbm9ybWFsOyovXFxufVxcblxcbiNib3R0b21FeWVzaGFkZXtcXG4gIHRvcDogMTE2cHg7XFxuICBhbmltYXRpb246IG5vbmU7IC8qc2h1dEJvdHRvbUV5ZXNoYWRlIDNzIGVhc2UgaW5maW5pdGUgbm9ybWFsOyovXFxufVxcblxcbkBrZXlmcmFtZXMgc2h1dFRvcEV5ZXNoYWRlIHtcXG4gIDAlIHt0b3A6IDU4cHh9XFxuICAxMSUge3RvcDogNzdweH1cXG4gIDE1JSB7dG9wOiA3N3B4fVxcbiAgMjIlIHt0b3A6IDU4cHh9XFxuICAxMDAlIHt0b3A6IDU4cHh9XFxufVxcblxcbkBrZXlmcmFtZXMgc2h1dEJvdHRvbUV5ZXNoYWRlIHtcXG4gIDAlIHt0b3A6IDExNnB4fVxcbiAgMTElIHt0b3A6IDk2cHh9XFxuICAxNSUge3RvcDogOTZweH1cXG4gIDIyJSB7dG9wOiAxMTZweH1cXG4gIDEwMCUge3RvcDogMTE2cHh9XFxufVxcblxcbi5maWd1cmVzIHtcXG4gIHdpZHRoOiA1NnB4O1xcbiAgaGVpZ2h0OiA1NnB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogNTtcXG59XFxuXFxuQGtleWZyYW1lcyBmaXJld29ya3Mge1xcbiAgMCUge3dpZHRoOiA0cHg7IGhlaWdodDogNHB4OyBvcGFjaXR5OiAxO31cXG4gIDgwJSB7d2lkdGg6IDY0cHg7IGhlaWdodDogNjRweDsgb3BhY2l0eTogMC44O31cXG4gIDk5JSB7d2lkdGg6IDY0cHg7IGhlaWdodDogNjRweDsgb3BhY2l0eTogMDt9XFxuICAxMDAlIHt3aWR0aDogMHB4OyBoZWlnaHQ6IDBweDsgb3BhY2l0eTogMDt9XFxufVxcblxcbkBrZXlmcmFtZXMgZmlndXJlQmVjb21lc01pbmkge1xcbiAgMCUge3dpZHRoOiA1NnB4OyBoZWlnaHQ6IDU2cHg7IG9wYWNpdHk6IDF9XFxuICAzMCUge3dpZHRoOiAzNHB4OyBoZWlnaHQ6IDM0cHg7IG9wYWNpdHk6IDF9XFxuICAxMDAlIHt3aWR0aDogMHB4OyBoZWlnaHQ6IDBweDsgb3BhY2l0eTogMH1cXG59XFxuXFxuLmFtYnVsYW5jZSB7XFxuICB3aWR0aDogODBweDtcXG4gIGhlaWdodDogODBweDtcXG4gIHotaW5kZXg6IDU7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGRpc2FwcGVhcnMge1xcbiAgMCUge29wYWNpdHk6IDF9XFxuICAxMDAlIHtvcGFjaXR5OiAwfVxcbn1cXG5cXG5cXG5mb290ZXIge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcblxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWN1cnNvci5jc3MubWFwICovXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2Nzcy9jdXJzb3Iuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL2Nzcy9jdXJzb3IuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0NDQ0Msc0JEQVk7Q0NDWixTREFVO0FDQ1g7O0FBRUE7RURDSSxVQUFPO0VBQ1YsYUFBQTtFQ0NDLFlBQVk7RURDZCx5QkFBUTtFQUNKLFlBQVc7RUFDWCxnQkFBWTtBQ0NoQjs7QUFFQTtFRENJLGFBQVU7RUFDViw2QkFBb0I7RUFBRSxpQkFBQSxFQUFBLGlCQUFBO0VDRXhCLHlCQUF5QjtFREF2QixrQkFBWTtFQUNmLGVBQUE7RUNFQyw0QkFBNEI7RURBOUIsaUJBQU87RUFDSCxrQkFBWTtFQUNmLE1BQUE7RUNFQyxRQUFRO0VBQ1IsT0FBTztFQUNQLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsaUJBQWlCLEVBQUUsNENBQTRDO0VBQy9ELHNCQUFzQixFQUFFLDRDQUE0QztFQUNwRSx5QkFBeUIsQ0FBQyw0Q0FBNEM7RUFDdEUscUJBQXFCLENBQUMsNENBQTRDO0FBQ3BFOztBQUVBO0VBQ0UsT0FBTztBQUNUOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxvRUFBdUQ7RUFDdkQsMEJBQTBCO0VBQzFCLFVBQVU7RUFDVixxQ0FBcUM7RUFDckMsa0NBQWtDO0VBQ2xDLGdDQUFnQztFQUNoQyxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsU0FBUztFQUNULGVBQWU7RUFDZixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsSUFBSSxzQkFBc0I7RUFDMUIsS0FBSywwQkFBMEI7RUFDL0IsTUFB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LEVBQUUsMkNBQTJDO0FBQzlEOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGVBQWUsRUFBRSw4Q0FBOEM7QUFDakU7O0FBRUE7RUFDRSxJQUFJLFNBQVM7RUFDYixLQUFLLFNBQVM7RUFDZCxLQUFLLFNBQVM7RUFDZCxLQUFLLFNBQVM7RUFDZCxNQUFNLFNBQVM7QUFDakI7O0FBRUE7RUFDRSxJQUFJLFVBQVU7RUFDZCxLQUFLLFNBQVM7RUFDZCxLQUFLLFNBQVM7RUFDZCxLQUFLLFVBQVU7RUFDZixNQUFNLFVBQVU7QUFDbEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxJQUFJLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO0VBQ3hDLEtBQUssV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7RUFDN0MsS0FBSyxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztFQUMzQyxNQUFNLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO0FBQzVDOztBQUVBO0VBQ0UsSUFBSSxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVU7RUFDekMsS0FBSyxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVU7RUFDMUMsTUFBTSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVU7QUFDM0M7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLFVBQVU7RUFDVixtREFBMkM7QUFDN0M7O0FBRUE7RUFDRSxJQUFJLFVBQVU7RUFDZCxNQUFNLFVBQVU7QUFDbEI7OztBQUdBO0VBQ0UsaUJBQWlCO0VBQ2pCLHNCQUFzQjtFQUN0Qix5QkFBeUI7RUFDekIscUJBQXFCO0VBQ3JCLGFBQWE7QUFDZjs7O0FBR0EscUNBQXFDXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY3Vyc29yLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY3Vyc29yLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsImltcG9ydCBzdHlsZSBmcm9tICcuLi9jc3MvY3Vyc29yLmNzcyc7XHJcbmltcG9ydCBmaWd1cmUxIGZyb20gJy4uL2ltYWdlcy9maWd1cmUxLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUyIGZyb20gJy4uL2ltYWdlcy9maWd1cmUyLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUzIGZyb20gJy4uL2ltYWdlcy9maWd1cmUzLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU0IGZyb20gJy4uL2ltYWdlcy9maWd1cmU0LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU1IGZyb20gJy4uL2ltYWdlcy9maWd1cmU1LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU2IGZyb20gJy4uL2ltYWdlcy9maWd1cmU2LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU3IGZyb20gJy4uL2ltYWdlcy9maWd1cmU3LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU4IGZyb20gJy4uL2ltYWdlcy9maWd1cmU4LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU5IGZyb20gJy4uL2ltYWdlcy9maWd1cmU5LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxMCBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTAuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTExIGZyb20gJy4uL2ltYWdlcy9maWd1cmUxMS5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTIgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTEyLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxMyBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTMuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTE0IGZyb20gJy4uL2ltYWdlcy9maWd1cmUxNC5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTUgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTE1LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxNiBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTYuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTE3IGZyb20gJy4uL2ltYWdlcy9maWd1cmUxNy5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTggZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTE4LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxOSBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTkuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTIwIGZyb20gJy4uL2ltYWdlcy9maWd1cmUyMC5zdmcnO1xyXG5pbXBvcnQgc3RhcnMgZnJvbSAnLi4vaW1hZ2VzL3N0YXJzLnN2Zyc7XHJcbmltcG9ydCB7IGJvZHksIGhlYWRlciwgY3Vyc29yLCBjb3JvbmFDaXJjbGUsIGV5ZXMgfSBmcm9tICcuL2N1cnNvckFuZENvcm9uYSc7XHJcbmltcG9ydCB7IHNlY29uZHNGb3JFYWNoU3RhZ2UsIGZpZ3VyZXNQZXJTdGFnZSwgcEZhaWx1cmUsIHBGYWlsdXJlQW5vbiwgcCwgcEFub24gfSBmcm9tICcuL3N0b3J5TGluZSc7XHJcbmltcG9ydCB7IHN0b3BXb3JraW5nLCBvdXJWaWV3UG9ydFdpZHRoLCBvdXJWaWV3UG9ydEhlaWdodCwgbW92ZSB9IGZyb20gJy4vZmlndXJlc01vdmVtZW50JztcclxuXHJcblxyXG5jb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXInKTtcclxuY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBmb3JtICNzdGFydEJ1dHRvbicpO1xyXG5jb25zdCB0b3BFeWVzaGFkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b3BFeWVzaGFkZScpO1xyXG5jb25zdCBib3R0b21FeWVzaGFkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNib3R0b21FeWVzaGFkZScpO1xyXG5jb25zdCB0aW55Q2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW55Q2lyY2xlJyk7XHJcbmNvbnN0IGNvcm9uYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JvbmEnKTtcclxuY29uc3QgdGlueUNpcmNsZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW55Q2lyY2xlQ29udGFpbmVyJyk7XHJcbmNvbnN0IGZvcm1MYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMgZm9ybSBsYWJlbCcpO1xyXG5jb25zdCBmb3JtVGV4dElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBmb3JtICNuaWNrbmFtZScpO1xyXG5jb25zdCBpbnN0cnVjdGlvbnNQVGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBwJyk7XHJcbmxldCBuaWNrbmFtZTtcclxubGV0IHN0YWdlID0gMDsvL3dpbGwgZ28gaW5zaWRlIHRoZSBsZXZlbCB0YWdcclxuY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucycpO1xyXG5sZXQgZmlndXJlcyA9IFtdOyAvL2ZpZ3VyZTEsIGZpZ3VyZTIuLi5cclxubGV0IGZpZ3VyZXNEaXZzID0gW107XHJcbmxldCBudW1zT2ZGaWdzID0gW107Ly9mb3IgZXhhbXBsZTogWzEsIDIsIDMsIDQsIDUsIDYsIDddIGRlcGVuZHMgb24gdGhlIG1heCBudW1iZXIgb2YgZmlndXJlcyBpbiBlYWNoIGxldmVsXHJcbmxldCB1c2VyU2NvcmUgPSAwO1xyXG5jb25zdCBib251c0Fycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyICNib251c0Fycm93Jyk7XHJcbmxldCBzcGVlZDsgLy9maWd1cmVzJyBzcGVlZCAoQ29udHJvbHMgdGhlIGZyZXF1ZW5jeSBvZiB0aGUgaW50ZXJ2YWwgaW4gdGhlIGZ1bmN0aW9uIG1vdmUpXHJcblxyXG5cclxuaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIChldmVudCkgPT4ge1xyXG4gICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG59KTtcclxuXHJcblxyXG4vL3N0YXJ0aW5nIHRoZSBnYW1lXHJcbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIFxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpOy8vcHJldmVudCByZWZyZXNoaW5nIHRoZSBwYWdlIChkdWUgdG8gdGhlIGZvcm0pXHJcblxyXG4gICAgc3RvcFdvcmtpbmcoMCk7XHJcblxyXG4gICAgLy9hZGRpbmcgbnVtYmVycyB0byBudW1zT2ZGaWdzIGFycmF5XHJcbiAgICAvLyBpZiAoc3RhZ2UgPT0gNSkge1xyXG4gICAgLy8gICAgIG51bXNPZkZpZ3MucHVzaCgxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCk7XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICAgIGZvciAobGV0IHogPSAxOyB6IDw9IGZpZ3VyZXNQZXJTdGFnZVtzdGFnZV07IHorKyl7XHJcbiAgICAvLyAgICAgICAgIG51bXNPZkZpZ3MucHVzaCh6KTtcclxuICAgIC8vICAgICB9IFxyXG4gICAgLy8gfVxyXG4gICAgZm9yIChsZXQgeiA9IDE7IHogPD0gZmlndXJlc1BlclN0YWdlW3N0YWdlXTsgeisrKXtcclxuICAgICAgICBpZiAoKHN0YWdlID09IDUpICYmICh6ID09IDExIHx8IHogPT0gMTIgfHwgeiA9PSAxMyB8fCB6ID09IDE0KSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG51bXNPZkZpZ3MucHVzaCh6KTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAgIFxyXG4gICAgLy9kZWZpbmluZyB0aGUgZmlndXJlcycgYXJyYXlzXHJcbiAgICBudW1zT2ZGaWdzLmZvckVhY2gobnVtID0+IHtcclxuICAgICAgICAvL2FkZGluZyBmaWd1cmVzIGludG8gdGhlIGZpZ3VyZXMgYXJyYXlcclxuICAgICAgICBmaWd1cmVzLnB1c2goJ2ZpZ3VyZScrbnVtKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2NyZWF0aW5nIGZpZ3VyZXMgZGl2IHRhZ3MgaW4gdGhlIGh0bWxcclxuICAgICAgICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaS5jbGFzc0xpc3QuYWRkKCdmaWd1cmVzJyk7XHJcbiAgICAgICAgaS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2ZpZ3VyZScrbnVtKTtcclxuICAgICAgICBib2R5Lmluc2VydEJlZm9yZShpLCBmb290ZXIpO1xyXG4gICAgICAgIGZpZ3VyZXNEaXZzLnB1c2goaSk7XHJcblxyXG4gICAgfSk7XHJcbiAgICAgXHJcbiAgICAvL3B1dHRpbmcgdGhlIG5pY2tuYW1lIGluIGxvY2FsIHN0b3JhZ2VcclxuICAgIG5pY2tuYW1lID0gZG9jdW1lbnQuZm9ybXMubmlja25hbWVGb3JtLm5pY2tuYW1lLnZhbHVlO1xyXG4gICAgbGV0IGxvY2FsTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lJyk7XHJcblxyXG4gICAgaWYgKG5pY2tuYW1lICE9ICcnKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZScsIG5pY2tuYW1lKTtcclxuICAgICAgICBsb2NhbE5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG8gXCIgK2xvY2FsTmFtZSk7XHJcbiAgICB9IGVsc2UgaWYgKG5pY2tuYW1lID09ICcnKXtcclxuICAgICAgICBpZiAobG9jYWxOYW1lICE9IG51bGwpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvIFwiICtsb2NhbE5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2FsTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvIFwiICsgbG9jYWxOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy93ZSB3aWxsIHJlbW92ZSBwYXJ0cyBvZiB0aGUgZm9ybSB0aGF0IHdlIHdvbid0IG5lZWQgYW55IG1vcmVcclxuICAgIGZvcm1MYWJlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgZm9ybVRleHRJbnB1dC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgXHJcblxyXG4gICAgLy90aGUgY29yb25hIGFwcGVhcnNcclxuICAgIGNvcm9uYS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9KVxyXG4gICAgLy90aGUgc21hbGwgY2lyY2xlcyBvZiB0aGUgY29yb25hIGFwcGVhclxyXG4gICAgdGlueUNpcmNsZUNvbnRhaW5lci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgLy90aGUgY29yb25hJ3MgZXllcyB3aWxsIGdldCBjbG9zZWQgYW5kIHR1cm4vbG9vayB0byB0aGUgb3RoZXIgc2lkZVxyXG4gICAgdG9wRXllc2hhZGUuc3R5bGUuYW5pbWF0aW9uID0gJ3NodXRUb3BFeWVzaGFkZSAyLjVzIDAuNjVzIGVhc2UgaW5maW5pdGUgbm9ybWFsJztcclxuICAgIGJvdHRvbUV5ZXNoYWRlLnN0eWxlLmFuaW1hdGlvbiA9ICdzaHV0Qm90dG9tRXllc2hhZGUgMi41cyAwLjY1cyBlYXNlIGluZmluaXRlIG5vcm1hbCc7XHJcbiAgICBleWVzLnN0eWxlLmFuaW1hdGlvbiA9ICd0dXJuRXllcyA1cyAwLjkyNXMgZWFzZSBpbmZpbml0ZSBub3JtYWwnOyBcclxuXHJcbiAgICAvL3RoZSBzY29yZSBzZWN0aW9uIGFwcGVhcnM6XHJcbiAgICBoZWFkZXIuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgIGhlYWRlci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnOyBcclxuICAgIGNvbnN0IHNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyICNzY29yZSBzcGFuJyk7XHJcbiAgICBzY29yZS50ZXh0Q29udGVudCA9IHVzZXJTY29yZTtcclxuICAgIGxldCB5ID0gMDtcclxuICAgIC8vdGhlIG5leHQgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYnk6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUob3BhY2l0eUNoYW5nZSk7XHJcbiAgICAvL2FuZCBpdCB3aWxsIHRlbGwgdGhlIGJyb3dzZXIgdGhhdCBJIHdpc2ggdG8gcGVyZm9ybSBhbiBhbmltYXRpb24gd2l0aCB0aGUgb3BhY2l0eVxyXG4gICAgY29uc3Qgb3BhY2l0eUNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICB5ID0geSArIDAuMDM7XHJcbiAgICAgICAgaGVhZGVyLnN0eWxlLm9wYWNpdHkgPSBgJHt5fWA7XHJcblxyXG4gICAgICAgIGlmIChoZWFkZXIuc3R5bGUub3BhY2l0eSA8ICcxJyl7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShvcGFjaXR5Q2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShvcGFjaXR5Q2hhbmdlKTtcclxuXHJcblxyXG4gICAgLy90aGUgdGltZXIgYXBwZWFyc1xyXG4gICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGltZXInKTtcclxuICAgIHRpbWVyLnN0eWxlLmFuaW1hdGlvbiA9ICdub25lJzsvL2luIG9yZGVyIHRvIHJlc2V0IHRoZSBhbmltYXRpb24gb2YgdGhlIGVuZCBvZiB0aGUgbGV2ZWxcclxuICAgIHRpbWVyLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvbklzT24nKTsvL2JyaW5naW5nIGJhY2sgdGhlIG9yaWdpbmFsIGNsYXNzTmFtZVxyXG4gICAgdGltZXIuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW9uUmVtb3ZlZCcpOy8vYSB0ZW1wb3JhcnkgY2xhc3NOYW1lIHdlIGFkZGVkIHRvIHRoZSB0aW1lciBhdCB0aGUgZW5kIG9mIHRoZSBsZXZlbCAobm93IHdlJ3JlIHJlbW92aW5nIGl0KVxyXG4gICAgbGV0IHNlY29uZHMgPSBzZWNvbmRzRm9yRWFjaFN0YWdlW3N0YWdlXTtcclxuICAgIHRpbWVyLnRleHRDb250ZW50ID0gc2Vjb25kczsgIFxyXG4gICAgdGltZXIuc3R5bGUuYW5pbWF0aW9uID0gYHRpbWVyR3Jvd3MgMXMgJHtzZWNvbmRzKzF9IGVhc2Ugbm9ybWFsYDtcclxuICAgIFxyXG4gICAgLy90aGUgc3RhZ2UgYXBwZWFycyBvbiBzY3JlZW5cclxuICAgIGNvbnN0IGxldmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyICNsZXZlbCBzcGFuJyk7XHJcbiAgICBsZXZlbC50ZXh0Q29udGVudCA9IHN0YWdlKzE7XHJcblxyXG4gICAgLy9yZXNldHRpbmcgdGhlIGJvbnVzQXJyb3cgYW5pbWF0aW9uIGZyb20gdGhlIGVuZCBvZiB0aGUgbGV2ZWwsIHNvIGl0J2xsIGJlIGFibGUgdG8gd29yayBhZ2FpblxyXG4gICAgYm9udXNBcnJvdy5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7XHJcbiAgICBib251c0Fycm93LmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvblJlbW92ZWQnKTtcclxuICAgIGJvbnVzQXJyb3cuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uSXNPbicpO1xyXG5cclxuXHJcbiAgICAvL2Z1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgZnJvbSB0aGUgY291bnREb3duIGZ1bmN0aW9uIFxyXG4gICAgLy9hbmQgYWxzbyBmcm9tIHRoZSBjaGVjayBmdW5jdGlvblxyXG4gICAgY29uc3QgY2hlY2tCYWNrZ3JvdW5kID0gKGZpZ3VyZURpdikgPT4ge1xyXG4gICAgICAgIHJldHVybiBmaWd1cmVEaXYuc3R5bGUuYmFja2dyb3VuZC5pbmNsdWRlcygnc3RhcnMuc3ZnJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vY291bnREb3duIGZ1bmN0aW9uIGZvciB0aGUgdGltZXIgYW5kIGNoYW5naW5nIHRoZSBjb3JvbmEncyBjb2xvciB3aGVuIG5vdCBhbGwgZmlndXJlcyB3ZXJlIGNsaWNrZWRcclxuICAgIGNvbnN0IGNvdW50RG93biA9ICgpID0+IHtcclxuICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyAtIDE7ICBcclxuICAgICAgICB0aW1lci50ZXh0Q29udGVudCA9IHNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY291bnREb3duSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChjb3VudERvd24sIDEwMDApOyAvL2Z1bmN0aW9uIGZvciB0aGUgdGltZXJcclxuXHJcblxyXG4gICAgZmlndXJlcy5mb3JFYWNoKGZpZ3VyZSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRGaWd1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytmaWd1cmUpO1xyXG5cclxuICAgICAgICAvL2FkZGluZyBhIGJhY2tncm91bmQgaW1hZ2UgZm9yIGVhY2ggZmlndXJlOlxyXG4gICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUuYmFja2dyb3VuZCA9IGB1cmwoJy4vJHtmaWd1cmV9LnN2ZycpYDsgXHJcbiAgICAgICAgLy9wdXR0aW5nIHRoZSBmaWd1cmVzIGluIGRpZmZlcmVudCBwbGFjZXMgYXQgc3RhcnRpbmcgcG9pbnRcclxuICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9IE1hdGgucmFuZG9tKCkqKGJvZHkuY2xpZW50SGVpZ2h0IC0gNTYpICsgJ3B4JzsgLy81NiBpcyB0aGUgc2l6ZSBvZiB0aGUgZmlndXJlcy4gYm9keS5jbGllbnRIZWlnaHQgZ2l2ZXMgdGhlIHZpZXdwb3J0IHNpemUgd2l0aG91dCB0aGUgc2Nyb2xsIGJhclxyXG4gICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9IE1hdGgucmFuZG9tKCkqKGJvZHkuY2xpZW50V2lkdGggLSA1NikgKyAncHgnOyAvLzU2IGlzIHRoZSBzaXplIG9mIHRoZSBmaWd1cmVzLlxyXG4gICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgLy9zdGFydGluZyB0byBtb3ZlIHRoZSBmaWd1cmVzIGluIGRpZmZlcmVudCBkaXJlY3Rpb25zOlxyXG4gICAgICAgIGlmIChzdGFnZSA9PSA0IHx8IHN0YWdlID09IDYgfHwgc3RhZ2UgPT0gNyl7XHJcbiAgICAgICAgICAgIHNwZWVkID0gJ2Zhc3QnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNwZWVkID0gJ3JlZ3VsYXInO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtb3ZlKGZpZ3VyZSwgc3BlZWQpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvL2Z1bmN0aW9uIGZvciBjbGlja2luZyBhIGZpZ3VyZVxyXG4gICAgICAgIGNvbnN0IHN0YXJzQW5kUG9pbnRzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnNBbmRQb2ludHMpO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKC4vc3RhcnMuc3ZnKSc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUuYW5pbWF0aW9uID0gJ2ZpcmV3b3JrcyAwLjc1cyBlYXNlIGZvcndhcmRzIG5vcm1hbCc7XHJcbiAgICAgICAgICAgIHVzZXJTY29yZSArPSAxMDtcclxuICAgICAgICAgICAgc2NvcmUudGV4dENvbnRlbnQgPSB1c2VyU2NvcmU7XHJcbiAgICAgICAgICAgIC8vZGVsZXRpbmcgdGhlIGZpZ3VyZSBmcm9tIHRoZSBET01cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RmlndXJlLnJlbW92ZSgpOyBcclxuICAgICAgICAgICAgfSwgNzUxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYWRkaW5nIGV2ZW50TGlzdGVuZXIgZm9yIGVhY2ggZmlndXJlIGFuZCBhZGp1c3RpbmcgdGhlIHNjb3JlXHJcbiAgICAgICAgY3VycmVudEZpZ3VyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJzQW5kUG9pbnRzKTtcclxuXHJcbiAgICAgICAgLy9mdW5jdGlvbiB0aGF0IHByZXZlbnRzIGNsaWNraW5nIG9uIGZpZ3VyZXMsIHdoaWxlIHRoZSBhbWJ1bGFuY2VzIGNvbWVcclxuICAgICAgICBjb25zdCBwcmV2ZW50Q2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFyc0FuZFBvaW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2F0IHRoZSBlbmQgb2YgdGhlIHN0YWdlIHRoZSB1c2VyIHdvbid0IGJlIGFibGUgdG8gY2xpY2sgdGhlIGZpZ3VyZXNcclxuICAgICAgICBzZXRUaW1lb3V0KHByZXZlbnRDbGljaywgc2Vjb25kc0ZvckVhY2hTdGFnZVtzdGFnZV0qMTAwMCk7XHJcblxyXG4gICAgfSlcclxuXHJcblxyXG5cclxuICAgIC8vZnVuY3Rpb24gdGhhdCB3b3JrcyBhZnRlciB0aGUgdXNlciBmYWlsZWRcclxuICAgIGNvbnN0IGZhaWxpbmdQcm9jZWR1cmUgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIHN0b3BXb3JraW5nKDEpOyAgIFxyXG5cclxuICAgICAgICAvL21ha2luZyB0aGUgY29sb3Igb2YgdGhlIGNvcm9uYSByYW5kb21seSBkaWZmZXJlbnRcclxuICAgICAgICBsZXQgaCA9IE1hdGgucmFuZG9tKCkgKiAzNTk7IC8vdGhlIEggb2cgdGhlIGhzbCBpcyAwLTM1OVxyXG4gICAgICAgIGxldCBzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDgwIC0gMjYgKyAxKSArIDI2KTsvL0kgZGVjaWRlZCB0aGF0IHRoZSBwZXJjZW50YWdlIG9mIHRoZSBTIGluIGhzbCB3aWxsIGJlIGJldHdlZW4gMjYgYW5kIDgwIChiZWNhdXNlIGkgZG9uJ3QgbGlrZSBtaW4gc2F0dXJhdGlvbiBhbmQgbWF4IHNhdHVyYXRpb24pXHJcbiAgICAgICAgbGV0IGwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzUgLSAzNSArIDEpICsgMzUpOy8vSSBkZWNpZGVkIHRoYXQgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIEwgaW4gaHNsIHdpbGwgYmUgYmV0d2VlbiAzNSBhbmQgNzUgKG5vdCB0b28gbGlnaHQgYW5kIG5vdCB0b28gZGFyaylcclxuICAgICAgICB0aW55Q2lyY2xlcy5mb3JFYWNoKGNpcmNsZSA9PiB7XHJcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5iYWNrZ3JvdW5kID0gYGhzbCgke2h9LCAke3N9JSwgJHtsfSUpYDtcclxuICAgICAgICB9KTsgICBcclxuICAgICAgICBcclxuICAgICAgICAvL3JlbW92aW5nIHRoZSBvcmlnaW5hbCBjbGFzcyBmcm9tIHRoZSB0aW1lciwgcmVzZXRzIGl0cyBhbmltYXRpb25cclxuICAgICAgICAvL2FuZCBsZXRzIHRoZSBhbmltYXRpb24gd29yayBhZ2FpbiBuZXh0IGxldmVsIChhZnRlciBhZGRpbmcgdGhlIG9sZCBjbGFzc05hbWUgYmFjaylcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGltZXIuc3R5bGUuYW5pbWF0aW9uID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aW1lci5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb25SZW1vdmVkJyk7XHJcbiAgICAgICAgICAgIHRpbWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvbklzT24nKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGZpZ3VyZXNEaXZzLmZvckVhY2goZmlndXJlRGl2ID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChmaWd1cmVEaXYuc3R5bGUuYmFja2dyb3VuZC5pbmNsdWRlcygnZmlndXJlJykpe1xyXG4gICAgICAgICAgICAgICAgZmlndXJlRGl2LnN0eWxlLnRvcCA9IHBhcnNlSW50KGZpZ3VyZURpdi5zdHlsZS50b3ApICsgJ3B4JzsgLy90aGUgbWV0aG9kIHBhcnNlSW50IHRha2VzIG9ubHkgdGhlIG51bWJlciAoYW5kIGxlYXZlcyBvdXQgdGhlIHN0cmluZyAncHgnIGF0dGFjaGVkIHRvIGl0KSBcclxuICAgICAgICAgICAgICAgIGZpZ3VyZURpdi5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQoZmlndXJlRGl2LnN0eWxlLmxlZnQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0aW5nIGFtYnVsYW5jZXMgYW5kIHB1dHRpbmcgdGhlbSA4MHB4IGxlZnQgdG8gZWFjaCBmaWd1cmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnYW1idWxhbmNlJyk7XHJcbiAgICAgICAgICAgICAgICBib2R5Lmluc2VydEJlZm9yZShpLCBmb290ZXIpO1xyXG4gICAgICAgICAgICAgICAgaS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgICAgICAgICBpLnN0eWxlLnRvcCA9IGZpZ3VyZURpdi5zdHlsZS50b3A7XHJcbiAgICAgICAgICAgICAgICBpLnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoZmlndXJlRGl2LnN0eWxlLmxlZnQpIC0gODApICsgXCJweFwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWd1cmVFbnRlcnNBbWJ1bGFuY2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHogPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHogPCAyMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWd1cmVEaXYuc3R5bGUudG9wID0gcGFyc2VJbnQoZmlndXJlRGl2LnN0eWxlLnRvcCkgKyAxICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeiArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNSAgXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL21vdmluZyB0aGUgYW1idWxhbmNlIGZyb20gdGhlIGxlZnQgb2YgdGhlIGZpZ3VyZSB0b3dhcmRzIHRoZSBmaWd1cmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vdmluZ0FtYnVsYW5jZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHBhcnNlSW50KGkuc3R5bGUubGVmdCkgPCBwYXJzZUludChmaWd1cmVEaXYuc3R5bGUubGVmdCkgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KGkuc3R5bGUubGVmdCkgKyAxKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL21vdmluZ0FtYnVsYW5jZVBhcnQyIHdpbGwgY2FsbCB0aGlzIGZ1bmN0aW9uOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgbW92ZVJpZ2h0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGkuc3R5bGUubGVmdCA9IChwYXJzZUludChpLnN0eWxlLmxlZnQpICsgMSkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL21vdmluZyB0aGUgYW1idWxhbmNlIGZyb20gdGhlIGZpZ3VyZSB0byB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZpbmdBbWJ1bGFuY2VQYXJ0MiA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihwYXJzZUludChpLnN0eWxlLmxlZnQpIDwgb3VyVmlld1BvcnRXaWR0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vdmluZ1JpZ2h0ID0gc2V0SW50ZXJ2YWwobW92ZVJpZ2h0LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkuc3R5bGUuYW5pbWF0aW9uID0gJ2Rpc2FwcGVhcnMgM3MgZWFzZSBmb3J3YXJkcyBub3JtYWwnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiBjbGVhckludGVydmFsKG1vdmluZ1JpZ2h0KSwgMzAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZpZ3VyZUVudGVyc0FtYnVsYW5jZSwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICBmaWd1cmVEaXYuc3R5bGUuYW5pbWF0aW9uID0gJ2ZpZ3VyZUJlY29tZXNNaW5pIDAuNXMgMS4ycyBlYXNlIGZvcndhcmRzIG5vcm1hbCc7XHJcbiAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbChtb3ZpbmdBbWJ1bGFuY2UsIDE1KTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQobW92aW5nQW1idWxhbmNlUGFydDIsIDE3MDApO1xyXG4gICAgICAgICAgICAgICAgLy9jbGVhbmluZyBhbGwgZmlndXJlcyBhbmQgZmlndXJlcyBhcnJheXMgYWZ0ZXIgdGhleSBlbnRlcmVkIHRoZSBhbWJ1bGFuY2VcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ3VyZXNEaXZzLmZvckVhY2goZmlndXJlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlndXJlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlndXJlcyA9IFtdOyBcclxuICAgICAgICAgICAgICAgICAgICBmaWd1cmVzRGl2cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIG51bXNPZkZpZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIH0sIDE3MDApO1xyXG4gICAgICAgICAgICAgICAgLy9jbGVhbmluZyB0aGUgYW1idWxhbmNlcyBhZnRlciB0aGV5IGZpbmlzaGVkIHRoZWlyIHdvcmtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFtYnVsYW5jZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW1idWxhbmNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYW1idWxhbmNlcy5mb3JFYWNoKGFtYnVsYW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtYnVsYW5jZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSwgNDcwMCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy9icmluZ2luZyBiYWNrIHRoZSBpbnN0cmFjdGlvbidzIGJveFxyXG4gICAgICAgIGNvbnN0IGJyaW5naW5nQmFja0luc3RydWN0aW9ucyA9ICgpID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGxvY2FsTmFtZSA9PSAnJyl7XHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNQVGFnLnRleHRDb250ZW50ID0gXCJZb3UgZmFpbGVkIGFuZCBhIG5ldyB2YXJpYW50IGlzIHNwcmVhZGluZyBub3csIGJ1dCBkb24ndCB3b3JyeSwgeW91IGNhbiB0cnkgYWdhaW4gYW5kIHByZXZlbnQgYSB3b3JsZCBjYXRhc3Ryb3BoZS5cIjtcclxuICAgICAgICAgICAgfSBlbHNlIHsgICAgXHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNQVGFnLnRleHRDb250ZW50ID0gbG9jYWxOYW1lICsgJywnICsgXCIgeW91IGZhaWxlZCBhbmQgYSBuZXcgdmFyaWFudCBpcyBzcHJlYWRpbmcgbm93LCBidXQgZG9uJ3Qgd29ycnksIHlvdSBjYW4gdHJ5IGFnYWluIGFuZCBwcmV2ZW50IGEgd29ybGQgY2F0YXN0cm9waGUuXCI7IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUudG9wID0gJ2NhbGMoMzAlICsgNHB4KSc7XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS5hbmltYXRpb24gPSAnaW5zdHJ1Y3Rpb25zQXBwZWFycyAyLjVzIGVhc2UgZm9yd2FyZHMgbm9ybWFsJzsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0VGltZW91dChicmluZ2luZ0JhY2tJbnN0cnVjdGlvbnMsIDIwMDApO1xyXG4gICAgfVxyXG4gICBcclxuXHJcbiAgICAvL2Z1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIGFsbCB0aGUgZmlndXJlcyB3ZXJlIGNsaWNrZWQgb3IgaWYgdGhlIHRpbWUgb2YgdGhlIGxldmVsIGVuZGVkXHJcbiAgICBjb25zdCBlbmRMZXZlbENoZWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChmaWd1cmVzRGl2cy5ldmVyeShjaGVja0JhY2tncm91bmQpKSB7ICAvL1wiZXZlcnlcIiByZXR1cm5zIHRydWUgaWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBmb3IgYWxsIGVsZW1lbnRzIGluIHRoZSBhcnJheSAoaWYgYWxsIGZpZ3VyZXMgYmVjYW1lIHN0YXJzKVxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGVuZExldmVsKTtcclxuICAgICAgICAgICAgc3RvcFdvcmtpbmcoMSk7IC8vdGhlIHN0YXJzIHdpbGwgc3RvcCBtb3ZpbmdcclxuICAgICAgICAgICAgc3RhZ2UgKz0gMTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudERvd25JbnRlcnZhbCk7IC8vdGhlIGNsb2NrIHdpbGwgc3RvcFxyXG4gICAgICAgICAgICB0aW1lci5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRpbWVyLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvblJlbW92ZWQnKTtcclxuICAgICAgICAgICAgdGltZXIuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW9uSXNPbicpOy8vcmVtb3ZpbmcgdGhpcyBjbGFzcyByZXNldHMgdGhlIGFuaW1hdGlvbiBmb3IgdGhpcyBlbGVtZW50IGFuZCBsZXRzIHVzIHVzZSBpdCBhZ2FpbiBhZnRlciBhZGRpbmcgdGhpcyBjbGFzcyBiYWNrXHJcblxyXG4gICAgICAgICAgICBpZiAoc2Vjb25kcyAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lci5zdHlsZS5hbmltYXRpb24gPSBgdGltZXJHcm93c0FnYWluIDFzICR7c2Vjb25kc30gZWFzZSBub3JtYWxgO1xyXG5cclxuICAgICAgICAgICAgICAgIGJvbnVzQXJyb3cuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIGJvbnVzQXJyb3cuc3R5bGUuYW5pbWF0aW9uID0gYGFycm93R3Jvd3MgMXMgJHtzZWNvbmRzfSBlYXNlIG5vcm1hbGA7XHJcbiAgICAgICAgICAgICAgICBib251c0Fycm93LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvblJlbW92ZWQnKTtcclxuICAgICAgICAgICAgICAgIGJvbnVzQXJyb3cuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW9uSXNPbicpOy8vcmVtb3ZpbmcgdGhpcyBjbGFzcyByZXNldHMgdGhlIGFuaW1hdGlvbiBmb3IgdGhpcyBlbGVtZW50IGFuZCBsZXRzIHVzIHVzZSBpdCBhZ2FpbiBhZnRlciBhZGRpbmcgdGhpcyBjbGFzcyBiYWNrXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvbnVzQXJyb3cuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICAgICAgICAgIH0sIChzZWNvbmRzKjEwMDApKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYm9udXMgPSAoc2Vjb25kcyAqIDEwKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIHNldEludGVydmFsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSBjb3VudCArIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50IDw9IGJvbnVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlclNjb3JlICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gdXNlclNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2NsZWFuaW5nIHRoZSBmaWd1cmVzIGFycmF5cyAoaW4gb3JkZXIgdG8gZ2V0IHJlYWR5IGZvciBuZXh0IGxldmVsKTpcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmaWd1cmVzID0gW107IFxyXG4gICAgICAgICAgICAgICAgZmlndXJlc0RpdnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIG51bXNPZkZpZ3MgPSBbXTtcclxuICAgICAgICAgICAgfSwgNzUxKTsgLy9hZnRlciB0aGUgbGFzdCBmaXJld29yayBlbmRlZCBpdHMgd29ya1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9oaWRpbmcgdGhlIGNvcm9uYVxyXG4gICAgICAgICAgICBjb3JvbmEuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vYnJpbmdpbmcgYmFjayB0aGUgaW5zdHJhY3Rpb24ncyBib3hcclxuICAgICAgICAgICAgaWYobG9jYWxOYW1lID09ICcnKXtcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc1BUYWcudGV4dENvbnRlbnQgPSBwQW5vbltzdGFnZV07IC8vcEFub24gaXMgdGhlIHRleHQgYXBwZWFycyBpbiBzdG9yeUxpbmUuanNcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc1BUYWcudGV4dENvbnRlbnQgPSBsb2NhbE5hbWUgKyAnLCAnICsgcFtzdGFnZV07IC8vLy9wIGlzIHRoZSB0ZXh0IGFwcGVhcnMgaW4gc3RvcnlMaW5lLmpzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLnRvcCA9ICcyMiUnO1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUuYW5pbWF0aW9uID0gJ2luc3RydWN0aW9uc0FwcGVhcnMgMnMgZWFzZSBmb3J3YXJkcyBub3JtYWwnOyAgICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWNvbmRzID09IDAgJiYgZmlndXJlc0RpdnMuZXZlcnkoY2hlY2tCYWNrZ3JvdW5kKSA9PSBmYWxzZSkgeyAvL2lmIG5vdCBhbGwgZmlndXJlcyBiZWNhbWUgc3RhcnMgYW5kIHRoZSBzZWNvbmRzIGVuZGVkXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZW5kTGV2ZWwpO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGNvdW50RG93bkludGVydmFsKTsgLy90aGUgY2xvY2sgd2lsbCBzdG9wXHJcbiAgICAgICAgICAgIGZhaWxpbmdQcm9jZWR1cmUoKTsvL2Z1bmN0aW9uIHRoYXQgYnJpbmdzIHRoZSBhbWJ1bGFuY2VzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBlbmRMZXZlbCA9IHNldEludGVydmFsKGVuZExldmVsQ2hlY2ssIDEpOyBcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJoZWFkZXIiLCJjdXJzb3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInNldEF0dHJpYnV0ZSIsInBhZ2VZIiwicGFnZVgiLCJheGlzIiwiY29yb25hQ2lyY2xlIiwiYW5nbGUiLCJmb3JFYWNoIiwiZWxlbWVudCIsImkiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJzdHlsZSIsInRyYW5zZm9ybSIsIm4iLCJ0b3AiLCJib3R0b20iLCJyaWdodCIsImxlZnQiLCJjb250YWluZXJBbmdsZSIsIm0iLCJsIiwiY3VycmVudENvbnRhaW5lciIsImFwcGVuZCIsImV5ZXMiLCJ6IiwieSIsInNlY29uZHNGb3JFYWNoU3RhZ2UiLCJwRmFpbHVyZSIsInBGYWlsdXJlQW5vbiIsInAiLCJwQW5vbiIsInN0b3AiLCJzdG9wV29ya2luZyIsImJpbmFyeSIsIm91clZpZXdQb3J0V2lkdGgiLCJjbGllbnRXaWR0aCIsIm91clZpZXdQb3J0SGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiY29uc29sZSIsImxvZyIsIm1vdmUiLCJmaWd1cmUiLCJzcGVlZCIsInJhbmRvbUludFgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21JbnRZIiwiY3VycmVudEZpZ3VyZSIsImZpZ3VyZU1vdmVtZW50IiwiY2xlYXJJbnRlcnZhbCIsIm1vdmVtZW50SW50ZXJ2YWwiLCJvZmZzZXRUb3AiLCJvZmZzZXRMZWZ0IiwicGFyc2VJbnQiLCJiYWNrZ3JvdW5kIiwiYmF0QXJyYXkiLCJzb21lIiwiaW5jbHVkZXMiLCJzZXRJbnRlcnZhbCIsImZpZ3VyZXNQZXJTdGFnZSIsImZpZ3VyZTEiLCJmaWd1cmUyIiwiZmlndXJlMyIsImZpZ3VyZTQiLCJmaWd1cmU1IiwiZmlndXJlNiIsImZpZ3VyZTciLCJmaWd1cmU4IiwiZmlndXJlOSIsImZpZ3VyZTEwIiwiZmlndXJlMTEiLCJmaWd1cmUxMiIsImZpZ3VyZTEzIiwiZmlndXJlMTQiLCJmaWd1cmUxNSIsImZpZ3VyZTE2IiwiZmlndXJlMTciLCJmaWd1cmUxOCIsImZpZ3VyZTE5IiwiZmlndXJlMjAiLCJzdGFycyIsImZvb3RlciIsImJ1dHRvbiIsInRvcEV5ZXNoYWRlIiwiYm90dG9tRXllc2hhZGUiLCJ0aW55Q2lyY2xlcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb3JvbmEiLCJ0aW55Q2lyY2xlQ29udGFpbmVyIiwiZm9ybUxhYmVsIiwiZm9ybVRleHRJbnB1dCIsImluc3RydWN0aW9uc1BUYWciLCJuaWNrbmFtZSIsInN0YWdlIiwiaW5zdHJ1Y3Rpb25zIiwiZmlndXJlcyIsImZpZ3VyZXNEaXZzIiwibnVtc09mRmlncyIsInVzZXJTY29yZSIsImJvbnVzQXJyb3ciLCJkaXNwbGF5Iiwid2luZG93IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsInB1c2giLCJudW0iLCJmb3JtcyIsIm5pY2tuYW1lRm9ybSIsInZhbHVlIiwibG9jYWxOYW1lIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInNldEl0ZW0iLCJhbmltYXRpb24iLCJvcGFjaXR5Iiwic2NvcmUiLCJ0ZXh0Q29udGVudCIsIm9wYWNpdHlDaGFuZ2UiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJ0aW1lciIsInJlbW92ZSIsInNlY29uZHMiLCJsZXZlbCIsImNoZWNrQmFja2dyb3VuZCIsImZpZ3VyZURpdiIsImNvdW50RG93biIsImNvdW50RG93bkludGVydmFsIiwic3RhcnNBbmRQb2ludHMiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCIsInByZXZlbnRDbGljayIsImZhaWxpbmdQcm9jZWR1cmUiLCJoIiwicyIsImNpcmNsZSIsInBvc2l0aW9uIiwiZmlndXJlRW50ZXJzQW1idWxhbmNlIiwibW92aW5nQW1idWxhbmNlIiwibW92ZVJpZ2h0IiwibW92aW5nQW1idWxhbmNlUGFydDIiLCJtb3ZpbmdSaWdodCIsImFtYnVsYW5jZXMiLCJhbWJ1bGFuY2UiLCJicmluZ2luZ0JhY2tJbnN0cnVjdGlvbnMiLCJlbmRMZXZlbENoZWNrIiwiZXZlcnkiLCJlbmRMZXZlbCIsImJvbnVzIiwiY291bnQiXSwic291cmNlUm9vdCI6IiJ9