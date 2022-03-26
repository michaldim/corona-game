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
/* harmony export */   "p": () => (/* binding */ p),
/* harmony export */   "pAnon": () => (/* binding */ pAnon),
/* harmony export */   "pFailure": () => (/* binding */ pFailure),
/* harmony export */   "pFailureAnon": () => (/* binding */ pFailureAnon),
/* harmony export */   "secondsForEachStage": () => (/* binding */ secondsForEachStage)
/* harmony export */ });
/* harmony import */ var _cursorAndCorona__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cursorAndCorona */ "./src/scripts/cursorAndCorona.js");

var secondsForEachStage = [11, 14, 13, 18, 13, 11, 16, 11, 16, 11];
var pFailure = "you failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe";
var pFailureAnon = "You failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe";
var p = ["Vaccinate world's population and help fight the coronavirus disease. If you'll fail, a new variant will arrive...", "you made it! But the population grew and you need to vaccinate more people now!", "you made it again! Now lets see if you can do it even faster!", "great job! But bats are camming. Can you vaccinate them too?", "you are awesome! Now lets see if you can do it with people that are in a hurry!"];
var pAnon = ["Vaccinate world's population and help fight the coronavirus disease. If you'll fail, a new variant will arrive...", "You made it! But the population grew and you need to vaccinate more people now!", "You made it again! Now lets see if you can do it even faster!", "Great job! But bats are camming. Can you vaccinate them too?", "You are awesome! Now lets see if you can do it with people that are in a hurry!"];


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
___CSS_LOADER_EXPORT___.push([module.id, "*{\n\tbox-sizing: border-box;\n\tmargin: 0;\n}\n\nbody {\n  padding: 0;\n  height: 100vh;\n  cursor: none;\n  background-color: #3d3b3b;\n  color: white;\n  overflow: hidden;\n}\n\nheader {  \n  display: none;\n  justify-content: space-around;\n  flex-wrap: nowrap; /*in 1 line only*/\n  color: rgb(184, 238, 184);\n  text-align: center;\n  font-size: 40px;\n  font-family: Garamond, serif;\n  font-weight: bold;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  margin-right: auto;\n  margin-left: auto;\n  user-select: none; /*******************************************/\n  -moz-user-select: none; /*******************************************/\n  -webkit-user-select: none;/*******************************************/\n  -ms-user-select: none;/*******************************************/\n}\n\nheader div {\n  flex: 1;\n}\n\nheader div span {\n  font-size: 32px;\n  position: relative;\n  top: 1px;\n}\n\nheader #bonusArrow {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat center; \n  background-size: 60px Auto;\n  opacity: 0;\n  -webkit-transition: opacity 0.5s ease;\n  -moz-transition: opacity 0.5s ease;\n  -o-transition: opacity 0.5s ease;\n  -ms-transition: opacity 0.5s ease;\n}\n\nheader #bonusArrow p {\n  position: relative;\n  top: 100%;\n  font-size: 22px;\n  color: #58dcf7;\n}\n\n@keyframes timerGrows {\n  0% {transform: scale(1, 1)}\n  50% {transform: scale(1.5, 1.5)}\n  100% {transform: scale(1, 1)}\n}\n\n@keyframes timerGrowsAgain {\n  0% {transform: scale(1, 1)}\n  50% {transform: scale(1.5, 1.5)}\n  100% {transform: scale(1, 1)}\n}\n\n@keyframes arrowGrows {\n  0% {transform: scale(1, 1)}\n  50% {transform: scale(1.25, 1.25)}\n  100% {transform: scale(1, 1)}\n}\n\n.cursor {\n  width: 48px;\n  height: 48px;\n  position: absolute;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  -webkit-transform: rotateZ(100deg);\n          transform: rotateZ(100deg);\n  position: absolute;\n  pointer-events: none; /*This will make the syringe transparent to clicks. \n    It will make the real cursor to click what's under the syringe*/\n  z-index: 100;\n}\n\n#instructions {\n\tbackground: linear-gradient(rgb(243, 243, 145) 30%, rgb(247, 247, 197));\n  color: black;\n  background: -webkit-linear-gradient(rgb(243, 243, 145) 30%, rgb(247, 247, 197));\n\tbackground: -webkit-gradient(linear, top, bottom, color-stop(30%, rgb(243, 243, 145)), color-stop(100%, rgb(247, 247, 197)));\n\tbackground: -moz-linear-gradient(rgb(243, 243, 145) 30%, rgb(247, 247, 197));\n\tbackground: -o-linear-gradient(rgb(243, 243, 145) 30%, rgb(247, 247, 197));\n\tbackground: -ms-linear-gradient(rgb(243, 243, 145) 30%, rgb(247, 247, 197));\n  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='rgb(243, 243, 145)', endColorstr='rgb(247, 247, 197)',GradientType=0 );\n  width: 50%;\n  padding: 10px;\n  border: 7px solid rgb(184, 184, 169);\n  text-align: center;\n  font-size: 40px;\n  font-family: Garamond, serif;\n  font-weight: bold;\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: 22%;\n  margin-right: auto;\n  margin-left: auto;\n  z-index: 10;\n}\n\n@keyframes instructionsAppears {\n  0% {opacity: 0}\n  100% {opacity: 1}\n}\n\n#instructions p {\n  user-select: none; /*******************************************/\n  -moz-user-select: none; /*******************************************/\n  -webkit-user-select: none;/*******************************************/\n  -ms-user-select: none;/*******************************************/\n}\n\nform {\n  margin-top: 20px;\n}\n\nform label {\n  font-weight: lighter;\n  font-size: 32px;\n  position: relative;\n  top: 3px;\n}\n \n.corona {\n  display: none;\n  user-select: none; /*******************************************/\n  -moz-user-select: none; /*******************************************/\n  -webkit-user-select: none;/*******************************************/\n  -ms-user-select: none;/*******************************************/\n}\n\n#circle {\n  width: 130px;\n  height: 130px;\n  border-radius: 50%;\n  background: rgb(243, 243, 145);\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: 30%;\n  bottom: 70%;\n  margin: auto;\n  z-index: 1;\n}\n\n.axis{\n  height: 184px;\n  width: 10px;\n  background: rgb(243, 243, 145);\n  position: absolute;\n  right: 0;\n  left: 0;\n  top: 30%;\n  bottom: 70%;\n  margin: auto;\n}\n\n.tinyCircleContainer {\n  height:220px;\n  width:22px;\n  background: rgb(153, 116, 240, 0);\n  position: relative;\n  display: inline-block;\n  z-index: 2;\n}\n\n.tinyCircle {\n  height:24px;\n  width:24px;\n  border-radius: 50%;\n  background: rgb(245, 194, 100);\n  position: absolute;\n  transition: background 2.5s ease;\n  -webkit-transition: background 2.5s ease;\n  -moz-transition: background 2.5s ease;\n  -o-transition: background 2.5s ease;\n  -ms-transition: background 2.5s ease;\n}\n\n.eyes {\n  height: 40px;\n  width: 80px;\n  position: absolute;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ");\n  top: 76px;\n  right: -27px;\n  z-index: 3;\n}\n\n@keyframes turnEyes {\n  0% {transform: rotateZ(180deg); opacity: 1}\n  48% {transform: rotateZ(180deg); opacity: 1}\n  49% {transform: rotateZ(180deg); opacity: 0}\n  50% {transform: rotateZ(0deg); opacity: 0}\n  51% {transform: rotateZ(0deg); opacity: 1}\n  98% {transform: rotateZ(0deg); opacity: 1}\n  99% {transform: rotateZ(0deg); opacity: 0}\n  100% {transform: rotateZ(180deg); opacity: 0}\n}\n\n.eyeShades {\n  z-index: 4;\n  height: 20px;\n  width: 76px;\n  background: rgb(243, 243, 145);\n  position: absolute;\n  z-index: 4;\n  right: -25px;\n}\n\n#topEyeshade {\n  top: 58px;\n  animation: none; /*shutTopEyeshade 3s ease infinite normal;*/\n}\n\n#bottomEyeshade{\n  top: 116px;\n  animation: none; /*shutBottomEyeshade 3s ease infinite normal;*/\n}\n\n@keyframes shutTopEyeshade {\n  0% {top: 58px}\n  11% {top: 77px}\n  15% {top: 77px}\n  22% {top: 58px}\n  100% {top: 58px}\n}\n\n@keyframes shutBottomEyeshade {\n  0% {top: 116px}\n  11% {top: 96px}\n  15% {top: 96px}\n  22% {top: 116px}\n  100% {top: 116px}\n}\n\n.figures {\n  width: 56px;\n  height: 56px;\n  position: absolute;\n  z-index: 5;\n}\n\n@keyframes fireworks {\n  0% {width: 4px; height: 4px; opacity: 1;}\n  80% {width: 64px; height: 64px; opacity: 0.8;}\n  99% {width: 64px; height: 64px; opacity: 0;}\n  100% {width: 0px; height: 0px; opacity: 0;}\n}\n\n@keyframes figureBecomesMini {\n  0% {width: 56px; height: 56px; opacity: 1}\n  30% {width: 34px; height: 34px; opacity: 1}\n  100% {width: 0px; height: 0px; opacity: 0}\n}\n\n.ambulance {\n  width: 80px;\n  height: 80px;\n  z-index: 5;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ");\n}\n\n@keyframes disappears {\n  0% {opacity: 1}\n  100% {opacity: 0}\n}\n\n\nfooter {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n  display: none;\n}\n\n\n/*# sourceMappingURL=cursor.css.map */", "",{"version":3,"sources":["webpack://./src/css/cursor.scss","webpack://./src/css/cursor.css"],"names":[],"mappings":"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","sourceRoot":""}]);
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

/***/ "./src/images/figure2.svg":
/*!********************************!*\
  !*** ./src/images/figure2.svg ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "figure2.svg";

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
/* harmony import */ var _images_stars_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../images/stars.svg */ "./src/images/stars.svg");
/* harmony import */ var _cursorAndCorona__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./cursorAndCorona */ "./src/scripts/cursorAndCorona.js");
/* harmony import */ var _storyLine__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./storyLine */ "./src/scripts/storyLine.js");
/* harmony import */ var _figuresMovement__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./figuresMovement */ "./src/scripts/figuresMovement.js");



















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
//starting the game

button.addEventListener("click", function (e) {
  e.preventDefault(); //prevent refreshing the page (due to the form)

  (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_18__.stopWorking)(0); //adding numbers to numsOfFigs array (usually it is two figures less then the number of seconds)

  if (stage == 0 || stage == 1 || stage == 3) {
    for (var z = 1; z <= _storyLine__WEBPACK_IMPORTED_MODULE_17__.secondsForEachStage[stage] - 4; z++) {
      numsOfFigs.push(z);
    }
  } else if (stage == 2 || stage == 4) {
    for (var _z = 1; _z <= _storyLine__WEBPACK_IMPORTED_MODULE_17__.secondsForEachStage[stage] - 3; _z++) {
      numsOfFigs.push(_z);
    }
  } else {
    for (var _z2 = 1; _z2 <= _storyLine__WEBPACK_IMPORTED_MODULE_17__.secondsForEachStage[stage] - 2; _z2++) {
      numsOfFigs.push(_z2);
    } // if (stage == 2){
    //     numsOfFigs.push(secondsForEachStage[stage]);//in level 2 the number of figures equall to the number of seconds
    // }

  } //defining the figures' arrays


  numsOfFigs.forEach(function (num) {
    //adding figures into the figures array
    figures.push('figure' + num); //creating figures div tags in the html

    var i = document.createElement('div');
    i.classList.add('figures');
    i.setAttribute('id', 'figure' + num);
    _cursorAndCorona__WEBPACK_IMPORTED_MODULE_16__.body.insertBefore(i, footer);
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
  _cursorAndCorona__WEBPACK_IMPORTED_MODULE_16__.eyes.style.animation = 'turnEyes 5s 0.925s ease infinite normal'; //the score section appears:

  _cursorAndCorona__WEBPACK_IMPORTED_MODULE_16__.header.style.opacity = '0';
  _cursorAndCorona__WEBPACK_IMPORTED_MODULE_16__.header.style.display = 'flex';
  var score = document.querySelector('header #score span');
  score.textContent = userScore;
  var y = 0; //the next function will be called by: window.requestAnimationFrame(opacityChange);
  //and it will tell the browser that I wish to perform an animation with the opacity

  var opacityChange = function opacityChange() {
    y = y + 0.03;
    _cursorAndCorona__WEBPACK_IMPORTED_MODULE_16__.header.style.opacity = "".concat(y);

    if (_cursorAndCorona__WEBPACK_IMPORTED_MODULE_16__.header.style.opacity < '1') {
      requestAnimationFrame(opacityChange);
    }
  };

  window.requestAnimationFrame(opacityChange); //the timer appears

  var timer = document.querySelector('#timer');
  timer.style.animation = 'none'; //in order to reset the animation of the end of the level

  timer.classList.add('animationIsOn'); //bringing back the original className

  timer.classList.remove('animationRemoved'); //a temporary className we added to the timer at the end of the level (now we're removing it)

  var seconds = _storyLine__WEBPACK_IMPORTED_MODULE_17__.secondsForEachStage[stage];
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

    currentFigure.style.top = Math.random() * (_cursorAndCorona__WEBPACK_IMPORTED_MODULE_16__.body.clientHeight - 56) + 'px'; //56 is the size of the figures. body.clientHeight gives the viewport size without the scroll bar

    currentFigure.style.left = Math.random() * (_cursorAndCorona__WEBPACK_IMPORTED_MODULE_16__.body.clientWidth - 56) + 'px'; //56 is the size of the figures.

    currentFigure.style.display = 'block'; //starting to move the figures in different directions:

    if (stage == 4) {
      speed = 'fast';
    } else {
      speed = 'regular';
    }

    (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_18__.move)(figure, speed); //function for clicking a figure

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


    setTimeout(preventClick, _storyLine__WEBPACK_IMPORTED_MODULE_17__.secondsForEachStage[stage] * 1000);
  }); //function that works after the user failed

  var failingProcedure = function failingProcedure() {
    (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_18__.stopWorking)(1); //making the color of the corona randomly different

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
        _cursorAndCorona__WEBPACK_IMPORTED_MODULE_16__.body.insertBefore(i, footer);
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
          if (parseInt(i.style.left) < _figuresMovement__WEBPACK_IMPORTED_MODULE_18__.ourViewPortWidth) {
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
      (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_18__.stopWorking)(1); //the stars will stop moving

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
        instructionsPTag.textContent = _storyLine__WEBPACK_IMPORTED_MODULE_17__.pAnon[stage]; //pAnon is the text appears in storyLine.js
      } else {
        instructionsPTag.textContent = localName + ', ' + _storyLine__WEBPACK_IMPORTED_MODULE_17__.p[stage]; ////p is the text appears in storyLine.js
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxNQUFBQSxhQUFhLENBQUN5RixRQUFELENBQWI7QUFDQXpGLE1BQUFBLGFBQWEsQ0FBQ3FFLGlCQUFELENBQWIsQ0FGb0UsQ0FFbEM7O0FBQ2xDSyxNQUFBQSxnQkFBZ0IsR0FIb0QsQ0FHakQ7QUFDdEI7QUFDSixHQS9ERDs7QUFrRUEsTUFBTWUsUUFBUSxHQUFHaEYsV0FBVyxDQUFDOEUsYUFBRCxFQUFnQixDQUFoQixDQUE1QjtBQUVILENBMVdELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9zcmMvc2NyaXB0cy9jdXJzb3JBbmRDb3JvbmEuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vc3JjL3NjcmlwdHMvZmlndXJlc01vdmVtZW50LmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL3NyYy9zY3JpcHRzL3N0b3J5TGluZS5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9zcmMvY3NzL2N1cnNvci5jc3MiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL3NyYy9jc3MvY3Vyc29yLmNzcz9kNDMxIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vc3JjL3NjcmlwdHMvc3RhcnRHYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG5jb25zdCBjdXJzb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3Vyc29yJyk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XHJcbiAgICAvL3RoZSBsb2NhdGlvbiBvZiB0aGUgc3lyaW5nZSBjdXJzb3JcclxuICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInRvcDogXCIgKyAoZS5wYWdlWSArIDQpICsgXCJweDsgbGVmdDogXCIgKyAoZS5wYWdlWCAtIDUpICsgXCJweDtcIik7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5jb25zdCBheGlzID0gWzEsIDIsIDMsIDQsIDUsIDZdOyAvL2ZvciB0aGUgbGluZXMgdGhhdCBnbyBvdXQgb2YgdGhlIGNvcm9uYSdzIGNlbnRlclxyXG4vL2NvbnN0IGF4aXNEaXZzID0gW107IC8vY29udGFpbnMgYWxsIHRoZSBheGlzRGl2cyBvZiB0aGUgY29yb25hXHJcbi8vY29uc3QgdGlueUNpcmNsZXNDb250YWluZXJzRGl2cyA9IFtdO1xyXG5jb25zdCBjb3JvbmFDaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2lyY2xlJyk7XHJcbmxldCBhbmdsZSA9IDA7XHJcblxyXG5cclxuYXhpcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgLy9jcmVhdGluZyBkaXYgZm9yIGVhY2ggY29yb25hIGF4aXNcclxuICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaS5jbGFzc0xpc3QuYWRkKCdjb3JvbmEnLCAnYXhpcycpOyAvL2FkZGluZyBjbGFzcyBuYW1lcyBmb3Igb3VyIGRpdlxyXG4gICAgaS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2F4aXMnK2VsZW1lbnQpOyAvL2FkZGluZyBpZCBmb3Igb3VyIGRpdlxyXG4gICAgYm9keS5pbnNlcnRCZWZvcmUoaSwgY29yb25hQ2lyY2xlLm5leHRTaWJsaW5nKTsvL3B1dHRpbmcgXCJpXCIgYWZ0ZXIgY29yb25hQ2lyY2xlXHJcbiAgICAvL2F4aXNEaXZzLnB1c2goaSk7IC8vcHV0dGluZyBvdXIgZGl2IGluc2lkZSBheGlzRGl2cyBhcnJheVxyXG4gICAgaS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWigke2FuZ2xlfWRlZylgO1xyXG4gICAgYW5nbGUgKz0gMzA7XHJcblxyXG4gICAgLy9jcmVhdGluZyBkaXYgZm9yIGVhY2ggY29udGFpbmVyIChjb250YWluZXJzIGZvciB0aGUgdGlueSBjaXJjbGVzKVxyXG4gICAgLy90aGVzZSBjb250YWluZXJzIHdpbGwgaGF2ZSBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBjb25zdCBuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG4uY2xhc3NMaXN0LmFkZCgnY29yb25hJywgJ3RpbnlDaXJjbGVDb250YWluZXInKTsgLy9hZGRpbmcgY2xhc3MgbmFtZXMgZm9yIG91ciBkaXZcclxuICAgIG4uc2V0QXR0cmlidXRlKCdpZCcsICd0aW55Q2lyY2xlQ29udGFpbmVyJytlbGVtZW50KTsgLy9hZGRpbmcgaWQgZm9yIG91ciBkaXZcclxuICAgIGJvZHkuaW5zZXJ0QmVmb3JlKG4sIGhlYWRlcik7Ly9wdXR0aW5nIFwiblwiIGF0IHRoZSB0b3Agb2YgdGhlIHBhZ2UsIHNvIGl0IHdpbGwgYmUgZWFzaWVyIHRvIHB1dCBpdCBvbiB0aGUgYmlnIGNpcmNsZVxyXG4gICAgLy90aW55Q2lyY2xlc0NvbnRhaW5lcnNEaXZzLnB1c2gobik7IC8vcHV0dGluZyBvdXIgZGl2IGluc2lkZSB0aW55Q2lyY2xlc0NvbnRhaW5lcnNEaXZzIGFycmF5XHJcbiAgICBuLnN0eWxlLnRvcCA9IFwiY2FsYygzMCUgLSAxMTBweClcIjsgLy9sb2NhdGluZyBpdCBhdCB0aGUgY2VudGVyIG9mIHRoZSBjb3JvbmEncyBiaWcgY2lyY2xlXHJcbiAgICBuLnN0eWxlLmJvdHRvbSA9IFwiY2FsYyg3MCUgKyAxMTBweClcIjsgXHJcbiAgICBuLnN0eWxlLnJpZ2h0ID0gYGNhbGMoNTAlICsgJHsxMCArIDIyKihlbGVtZW50IC0xKX1weClgOyAgIC8vbG9jYXRpbmcgZWFjaCBjb250YWluZXIgYXQgdGhlIGxvY2F0aW9uIG9mIHRoZSBmaXJzdCBjb250YWluZXJcclxuICAgIG4uc3R5bGUubGVmdCA9IGBjYWxjKDUwJSAtICR7MTAgKyAyMiooZWxlbWVudCAtMSl9cHgpYDsgIFxyXG4gICAgY29uc3QgY29udGFpbmVyQW5nbGUgPSAzMCAqIChlbGVtZW50IC0gMSk7IFxyXG4gICAgbi5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWigke2NvbnRhaW5lckFuZ2xlfWRlZylgOyAvL2NoYW5naW5nIHRoZSBhbmdsZSBvZiBlYWNoIGNvbnRhaW5lciwgc28gZWFjaCBjb250YWluZXIgd2lsbCBiZSBsb2NhdGVkIGJlaGluZCBvZiBlYWNoIGF4aXNcclxuICAgIFxyXG5cclxuICAgIC8vY3JlYXRpbmcgZGl2IGZvciBlYWNoIGNvcm9uYSdzIHRpbnkgY2lyY2xlXHJcbiAgICAvL3RoZXNlIGNpcmNsZXMgd2lsbCBoYXZlIHBvc2l0aW9uOiBhYnNvbHV0ZTsgb24gdGhlaXIgZmF0aGVyICh0aGUgY29udGFpbmVyKVxyXG4gICAgY29uc3QgbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsvL3dlIG5lZWQgMTIgdGlueSBjaXJjbGVzIGFuZCB3ZSBoYXZlIG9ubHkgNiBjb250YWluZXJzXHJcbiAgICBtLmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICd0aW55Q2lyY2xlJyk7XHJcbiAgICBtLnNldEF0dHJpYnV0ZSgnaWQnLCAndGlueUNpcmNsZScrZWxlbWVudCk7XHJcbiAgICBtLnN0eWxlLnRvcCA9ICcwJztcclxuICAgIG0uc3R5bGUucmlnaHQgPSAnMCc7XHJcbiAgICBsLmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICd0aW55Q2lyY2xlJyk7XHJcbiAgICBsLnNldEF0dHJpYnV0ZSgnaWQnLCAndGlueUNpcmNsZScrKGVsZW1lbnQrNikpO1xyXG4gICAgbC5zdHlsZS50b3AgPSAnY2FsYygxMDAlIC0gMjRweCknO1xyXG4gICAgbC5zdHlsZS5yaWdodCA9ICcwJztcclxuICAgIGNvbnN0IGN1cnJlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjdGlueUNpcmNsZUNvbnRhaW5lciR7ZWxlbWVudH1gKTtcclxuICAgIGN1cnJlbnRDb250YWluZXIuYXBwZW5kKG0pOyAvL3B1dGluZyBlYWNoIHRpbnlDaXJjbGUgaW5zaWRlIGl0cyByaWdodCBjb250YWluZXJcclxuICAgIGN1cnJlbnRDb250YWluZXIuYXBwZW5kKGwpOyAvL3B1dGluZyBlYWNoIHRpbnlDaXJjbGUgaW5zaWRlIGl0cyByaWdodCBjb250YWluZXJcclxuXHJcbn0pO1xyXG5cclxuXHJcbi8vY3JlYXRpbmcgZGl2IGZvciB0aGUgY29yb25hJ3MgZXllc1xyXG5jb25zdCBleWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuZXllcy5jbGFzc0xpc3QuYWRkKCdleWVzJywgJ2Nvcm9uYScpO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGlueUNpcmNsZUNvbnRhaW5lcjEnKS5hcHBlbmQoZXllcyk7XHJcblxyXG4vLy8vY3JlYXRpbmcgZGl2cyBmb3IgdGhlIGNvcm9uYSdzIGV5ZSBzaGFkZXNcclxuY29uc3QgeiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbmNvbnN0IHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG56LmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICdleWVTaGFkZXMnKTtcclxueS5jbGFzc0xpc3QuYWRkKCdjb3JvbmEnLCAnZXllU2hhZGVzJyk7XHJcbnouc2V0QXR0cmlidXRlKCdpZCcsICd0b3BFeWVzaGFkZScpO1xyXG55LnNldEF0dHJpYnV0ZSgnaWQnLCAnYm90dG9tRXllc2hhZGUnKTtcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbnlDaXJjbGVDb250YWluZXIxJykuYXBwZW5kKHopO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGlueUNpcmNsZUNvbnRhaW5lcjEnKS5hcHBlbmQoeSk7XHJcblxyXG5cclxuZXhwb3J0IHsgYm9keSwgaGVhZGVyLCBjdXJzb3IsIGNvcm9uYUNpcmNsZSwgZXllcyB9O1xyXG4iLCJpbXBvcnQgeyBib2R5LCBoZWFkZXIsIGN1cnNvciwgY29yb25hQ2lyY2xlLCBleWVzIH0gZnJvbSAnLi9jdXJzb3JBbmRDb3JvbmEnO1xyXG5pbXBvcnQgeyBzZWNvbmRzRm9yRWFjaFN0YWdlLCBwRmFpbHVyZSwgcEZhaWx1cmVBbm9uLCBwLCBwQW5vbiB9IGZyb20gJy4vc3RvcnlMaW5lJztcclxuXHJcblxyXG5sZXQgc3RvcCA9IDA7XHJcbmNvbnN0IHN0b3BXb3JraW5nID0gKGJpbmFyeSkgPT4gc3RvcCA9IGJpbmFyeTsgLy93ZSBjYW4ndCBleHBvcnQgXCJzdG9wXCIgYXMgbGV0LCBzbyB3ZSBtYWtlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hIGZ1bmN0aW9uIHRoYXQgd2UgY2FuIGV4cG9ydCwgYW5kIGl0J2xsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIHZhbHVlIG9mIHN0b3BcclxuXHJcbmNvbnN0IG91clZpZXdQb3J0V2lkdGggPSBib2R5LmNsaWVudFdpZHRoOyAvL2NsaWVudFdpZHRoIHNob3dzIHRoZSB3aWR0aCBvZiB0aGUgZWxlbWVudCB3ZSBjaG9vc2VcclxuY29uc3Qgb3VyVmlld1BvcnRIZWlnaHQgPSBib2R5LmNsaWVudEhlaWdodDtcclxuY29uc29sZS5sb2cgKCdvdXJWaWV3UG9ydFdpZHRoOiAnICsgb3VyVmlld1BvcnRXaWR0aCArICcgb3VyVmlld1BvcnRIZWlnaHQ6ICcgK291clZpZXdQb3J0SGVpZ2h0KVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vdGhlIGJ1dHRvbidzIGV2ZW50IGxpc3RlbmVyIHdpbGwgY2FsbCB0aGlzIGZ1bmN0aW9uLCB3aGljaCB3aWxsIG1vdmUgdGhlIGZpZ3VyZXMgaW4gcmFuZG9tIGRpcmVjdGlvbnNcclxuY29uc3QgbW92ZSA9IChmaWd1cmUsIHNwZWVkKSA9PiB7XHJcbiAgICAvL21ha2luZyByYW5kb24gaW50ZWdlcnMgZm9yIHRoZSBmaWd1cmVzIHRvIG1vdmUgaW4gZGlmZmVyZW50IGRpcmVjdGlvbnNcclxuICAgIGxldCByYW5kb21JbnRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDIgLSAoLTIpICsgMSkpIC0yOyAvL3RoaXMgY29uc3Qgd2lsbCBnaXZlIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiAtMiBhbmQgKzJcclxuICAgIGxldCByYW5kb21JbnRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDIgLSAoLTIpICsgMSkpIC0yOyAvL3RoaXMgY29uc3Qgd2lsbCBnaXZlIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiAtMiBhbmQgKzJcclxuICAgIGlmIChyYW5kb21JbnRYID09IDAgJiYgcmFuZG9tSW50WSA9PSAwKXtcclxuICAgICAgICByYW5kb21JbnRYID0gMjtcclxuICAgIH1cclxuICAgXHJcbiAgICBjb25zdCBjdXJyZW50RmlndXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycrZmlndXJlKTtcclxuXHJcbiAgICAvL3RoZSB3YXkgdGhlIGZpZ3VyZXMgbW92ZVxyXG4gICAgY29uc3QgZmlndXJlTW92ZW1lbnQgPSAocmFuZG9tSW50WCwgcmFuZG9tSW50WSkgPT4ge1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKHN0b3AgPT0gMSl7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobW92ZW1lbnRJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vNCBydWxlcyBmb3IgdGhlIGNvcm5lcnMnIGNhc2VzOlxyXG4gICAgICAgIGlmICgoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPD0gMSkgJiYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA+PSAoYm9keS5jbGllbnRXaWR0aCAtNTYgLSAxKSkpIHtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSAoKG91clZpZXdQb3J0SGVpZ2h0IC01NiAtIDIpICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICcycHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPD0gMSkgJiYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA8PSAxKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICgob3VyVmlld1BvcnRIZWlnaHQgLTU2IC0gMikgKyAncHgnKTtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ID0gKChvdXJWaWV3UG9ydFdpZHRoIC01NiAtMikgKyAncHgnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoKGN1cnJlbnRGaWd1cmUub2Zmc2V0VG9wID49IChib2R5LmNsaWVudEhlaWdodCAtNTYgLSAxKSkgJiYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA8PSAxKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICcycHgnO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAoKG91clZpZXdQb3J0V2lkdGggLTU2IC0yKSArICdweCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPj0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIDEpKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0ID49IChib2R5LmNsaWVudFdpZHRoIC01NiAtIDEpKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICcycHgnO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAnMnB4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9mb3VyIFwiaWZcIiBydWxlcyBmb3IgY2FzZXMgdGhhdCB0aGUgZmlndXJlcyByZWFjaCB0aGUgc2NyZWVuIGVkZ2VzOlxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0VG9wIDw9IDEpIHsgLy9vZmZzZXRUb3Agc2hvd3MgdGhlIGxvY2F0aW9uIGNvbXBhcmluZyB0byB0aGUgZmF0aGVyICh0aGUgYm9keSkuIFdlIG5lZWQgdGhhdCBvZmZzZXRUb3Agd2lsbCBiZSAwIG9yIDEgKGFuZCBub3Qgb25seSBvZmZzZXRUb3A9MCksIGJlY2F1c2Ugc29tZXRpbWVzIHRoZSBmaWd1cmVzIGRvIDIgc3RlcHMgKDIgcGl4ZWxzKSBhdCBhIHRpbWVcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSAoKG91clZpZXdQb3J0SGVpZ2h0IC01NiAtIDIpICsgJ3B4Jyk7Ly9NaW51cyAyLCBiZWNhdXNlIHRoZSBmaWd1cmVzIHdpbGwgYmUgc3R1Y2tlZCBpZiB3ZSB3aWxsIHNlbmQgdGhlbSB0byBvdXJWaWV3UG9ydEhlaWdodE1pbnVzMSBvciBvdXJWaWV3UG9ydEhlaWdodC4gQW5kIG1pbnVzIDU2IGJlY2F1c2Ugb2YgdGhlIHNpemUgb2YgdGhlIGZpZ3VyZXMgKHdlIHdhbnQgdGhlbSB0byBkaXNhcHBlYXIgYXQgdGhlIGVkZ2Ugb2YgdGhlIHNjcmVlbiBhbmQgbm90IDU2cHggYWZ0ZXIgaXQpXHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9IChib2R5LmNsaWVudFdpZHRoIC01NiAtIHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCkpICsgJ3B4JztcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0VG9wID49IChib2R5LmNsaWVudEhlaWdodCAtNTYgLSAxKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICcycHgnO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAoYm9keS5jbGllbnRXaWR0aCAtNTYgLSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQpKSArICdweCc7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50RmlndXJlLm9mZnNldExlZnQgPD0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAoKG91clZpZXdQb3J0V2lkdGggLTU2IC0yKSArICdweCcpO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9IChib2R5LmNsaWVudEhlaWdodCAtNTYgLSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLnRvcCkpICsgJ3B4JztcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA+PSAoYm9keS5jbGllbnRXaWR0aCAtNTYgLSAxKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAnMnB4JztcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSAoYm9keS5jbGllbnRIZWlnaHQgLTU2IC0gcGFyc2VJbnQoY3VycmVudEZpZ3VyZS5zdHlsZS50b3ApKSArICdweCc7XHJcbiAgICAgICAgfSBcclxuICAgICAgICAvL2lmIHRoZSBmaWd1cmUgaXMgbm90IGluIHRoZSBlZGdlIG9yIGluIHRoZSBjb3JuZXIsXHJcbiAgICAgICAgLy90aGVuIHRoYXQncyB0aGUgd2F5IGl0IHdpbGwgbW92ZSBvbiBzY3JlZW46XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gcGFyc2VJbnQoY3VycmVudEZpZ3VyZS5zdHlsZS50b3ApICsgcmFuZG9tSW50WSArICdweCc7IC8vdGhlIG1ldGhvZCBwYXJzZUludCB0YWtlcyBvbmx5IHRoZSBudW1iZXIgKGFuZCBsZWF2ZXMgb3V0IHRoZSBzdHJpbmcgJ3B4JyBhdHRhY2hlZCB0byBpdDopIFxyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQpICsgcmFuZG9tSW50WCArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRGaWd1cmUuc3R5bGUuYmFja2dyb3VuZCArICcgWDogJysgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ICsgJyBZOiAnICsgY3VycmVudEZpZ3VyZS5zdHlsZS50b3ApO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9ub3cgd2UnbGwgY2FsbCB0aGUgZmlndXJlTW92ZW1lbnQgZnVuY3Rpb24sIGJ1dCB0aGUgaW50ZXJ2YWwgZm9yIHRoaXMgZnVuY3Rpb25cclxuICAgIC8vd2lsbCBiZSBoaWdoZXIgZnJlcXVlbmN5IGZvciBmaWd1cmVzIDExLTE0ICh0aGUgYmF0cykuIFxyXG4gICAgbGV0IG1vdmVtZW50SW50ZXJ2YWw7XHJcbiAgICBjb25zdCBiYXRBcnJheSA9IFsxMSwgMTIsIDEzLCAxNF07XHJcbiAgICAvL3dlIHdpbGwgdXNlIHNvbWUoKSBtZXRob2QsIHdoaWNoIGNoZWNrcyBpZiAgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIGFycmF5XHJcbiAgICAvL3Bhc3NlcyB0aGUgdGVzdCBpbXBsZW1lbnRlZCBpbnNpZGUgc29tZSgpXHJcbiAgICBpZiAoYmF0QXJyYXkuc29tZShlbGVtZW50ID0+IGN1cnJlbnRGaWd1cmUuc3R5bGUuYmFja2dyb3VuZC5pbmNsdWRlcyhlbGVtZW50KSkpIHtcclxuICAgICAgICBtb3ZlbWVudEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gZmlndXJlTW92ZW1lbnQocmFuZG9tSW50WCwgcmFuZG9tSW50WSksIDkpO1xyXG4gICAgfSBlbHNlIGlmIChzcGVlZCA9PSAnZmFzdCcpIHtcclxuICAgICAgICBtb3ZlbWVudEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gZmlndXJlTW92ZW1lbnQocmFuZG9tSW50WCwgcmFuZG9tSW50WSksIDEyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdvaW5nIGZhc3Qgbm93XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtb3ZlbWVudEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gZmlndXJlTW92ZW1lbnQocmFuZG9tSW50WCwgcmFuZG9tSW50WSksIDIwKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxufTtcclxuXHJcblxyXG5leHBvcnQgeyBzdG9wV29ya2luZywgb3VyVmlld1BvcnRXaWR0aCwgb3VyVmlld1BvcnRIZWlnaHQsIG1vdmUgfTsiLCJpbXBvcnQgeyBib2R5LCBoZWFkZXIsIGN1cnNvciwgY29yb25hQ2lyY2xlLCBleWVzIH0gZnJvbSAnLi9jdXJzb3JBbmRDb3JvbmEnO1xyXG5cclxuXHJcbmNvbnN0IHNlY29uZHNGb3JFYWNoU3RhZ2UgPSBbMTEsIDE0LCAxMywgMTgsIDEzLCAxMSwgMTYsIDExLCAxNiwgMTFdO1xyXG5cclxuY29uc3QgcEZhaWx1cmUgPSBcInlvdSBmYWlsZWQgYW5kIGEgbmV3IHZhcmlhbnQgaXMgc3ByZWFkaW5nIG5vdywgYnV0IGRvbid0IHdvcnJ5LCB5b3UgY2FuIHRyeSBhZ2FpbiBhbmQgcHJldmVudCBhIHdvcmxkIGNhdGFzdHJvcGhlXCI7XHJcbmNvbnN0IHBGYWlsdXJlQW5vbiA9IFwiWW91IGZhaWxlZCBhbmQgYSBuZXcgdmFyaWFudCBpcyBzcHJlYWRpbmcgbm93LCBidXQgZG9uJ3Qgd29ycnksIHlvdSBjYW4gdHJ5IGFnYWluIGFuZCBwcmV2ZW50IGEgd29ybGQgY2F0YXN0cm9waGVcIjtcclxuXHJcbmNvbnN0IHAgPSBbXHJcblwiVmFjY2luYXRlIHdvcmxkJ3MgcG9wdWxhdGlvbiBhbmQgaGVscCBmaWdodCB0aGUgY29yb25hdmlydXMgZGlzZWFzZS4gSWYgeW91J2xsIGZhaWwsIGEgbmV3IHZhcmlhbnQgd2lsbCBhcnJpdmUuLi5cIixcclxuXCJ5b3UgbWFkZSBpdCEgQnV0IHRoZSBwb3B1bGF0aW9uIGdyZXcgYW5kIHlvdSBuZWVkIHRvIHZhY2NpbmF0ZSBtb3JlIHBlb3BsZSBub3chXCIsXHJcblwieW91IG1hZGUgaXQgYWdhaW4hIE5vdyBsZXRzIHNlZSBpZiB5b3UgY2FuIGRvIGl0IGV2ZW4gZmFzdGVyIVwiLFxyXG5cImdyZWF0IGpvYiEgQnV0IGJhdHMgYXJlIGNhbW1pbmcuIENhbiB5b3UgdmFjY2luYXRlIHRoZW0gdG9vP1wiLFxyXG5cInlvdSBhcmUgYXdlc29tZSEgTm93IGxldHMgc2VlIGlmIHlvdSBjYW4gZG8gaXQgd2l0aCBwZW9wbGUgdGhhdCBhcmUgaW4gYSBodXJyeSFcIixcclxuXVxyXG5cclxuY29uc3QgcEFub24gPSBbXHJcbiAgICBcIlZhY2NpbmF0ZSB3b3JsZCdzIHBvcHVsYXRpb24gYW5kIGhlbHAgZmlnaHQgdGhlIGNvcm9uYXZpcnVzIGRpc2Vhc2UuIElmIHlvdSdsbCBmYWlsLCBhIG5ldyB2YXJpYW50IHdpbGwgYXJyaXZlLi4uXCIsXHJcbiAgICBcIllvdSBtYWRlIGl0ISBCdXQgdGhlIHBvcHVsYXRpb24gZ3JldyBhbmQgeW91IG5lZWQgdG8gdmFjY2luYXRlIG1vcmUgcGVvcGxlIG5vdyFcIixcclxuICAgIFwiWW91IG1hZGUgaXQgYWdhaW4hIE5vdyBsZXRzIHNlZSBpZiB5b3UgY2FuIGRvIGl0IGV2ZW4gZmFzdGVyIVwiLFxyXG4gICAgXCJHcmVhdCBqb2IhIEJ1dCBiYXRzIGFyZSBjYW1taW5nLiBDYW4geW91IHZhY2NpbmF0ZSB0aGVtIHRvbz9cIixcclxuICAgIFwiWW91IGFyZSBhd2Vzb21lISBOb3cgbGV0cyBzZWUgaWYgeW91IGNhbiBkbyBpdCB3aXRoIHBlb3BsZSB0aGF0IGFyZSBpbiBhIGh1cnJ5IVwiLF1cclxuXHJcbmV4cG9ydCB7IHNlY29uZHNGb3JFYWNoU3RhZ2UsIHBGYWlsdXJlLCBwRmFpbHVyZUFub24sIHAsIHBBbm9uIH07IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2ltYWdlcy9hcnJvdy5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9pbWFnZXMvc3lyaW5nZS5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuLi9pbWFnZXMvZXllcy5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyA9IG5ldyBVUkwoXCIuLi9pbWFnZXMvYW1idWxhbmNlMS5zdmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqe1xcblxcdGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuXFx0bWFyZ2luOiAwO1xcbn1cXG5cXG5ib2R5IHtcXG4gIHBhZGRpbmc6IDA7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgY3Vyc29yOiBub25lO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzNkM2IzYjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxufVxcblxcbmhlYWRlciB7ICBcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIGZsZXgtd3JhcDogbm93cmFwOyAvKmluIDEgbGluZSBvbmx5Ki9cXG4gIGNvbG9yOiByZ2IoMTg0LCAyMzgsIDE4NCk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDQwcHg7XFxuICBmb250LWZhbWlseTogR2FyYW1vbmQsIHNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICByaWdodDogMDtcXG4gIGxlZnQ6IDA7XFxuICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICBtYXJnaW4tbGVmdDogYXV0bztcXG4gIHVzZXItc2VsZWN0OiBub25lOyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG59XFxuXFxuaGVhZGVyIGRpdiB7XFxuICBmbGV4OiAxO1xcbn1cXG5cXG5oZWFkZXIgZGl2IHNwYW4ge1xcbiAgZm9udC1zaXplOiAzMnB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAxcHg7XFxufVxcblxcbmhlYWRlciAjYm9udXNBcnJvdyB7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpIG5vLXJlcGVhdCBjZW50ZXI7IFxcbiAgYmFja2dyb3VuZC1zaXplOiA2MHB4IEF1dG87XFxuICBvcGFjaXR5OiAwO1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZTtcXG4gIC1tb3otdHJhbnNpdGlvbjogb3BhY2l0eSAwLjVzIGVhc2U7XFxuICAtby10cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZTtcXG4gIC1tcy10cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZTtcXG59XFxuXFxuaGVhZGVyICNib251c0Fycm93IHAge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAxMDAlO1xcbiAgZm9udC1zaXplOiAyMnB4O1xcbiAgY29sb3I6ICM1OGRjZjc7XFxufVxcblxcbkBrZXlmcmFtZXMgdGltZXJHcm93cyB7XFxuICAwJSB7dHJhbnNmb3JtOiBzY2FsZSgxLCAxKX1cXG4gIDUwJSB7dHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuNSl9XFxuICAxMDAlIHt0cmFuc2Zvcm06IHNjYWxlKDEsIDEpfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHRpbWVyR3Jvd3NBZ2FpbiB7XFxuICAwJSB7dHJhbnNmb3JtOiBzY2FsZSgxLCAxKX1cXG4gIDUwJSB7dHJhbnNmb3JtOiBzY2FsZSgxLjUsIDEuNSl9XFxuICAxMDAlIHt0cmFuc2Zvcm06IHNjYWxlKDEsIDEpfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGFycm93R3Jvd3Mge1xcbiAgMCUge3RyYW5zZm9ybTogc2NhbGUoMSwgMSl9XFxuICA1MCUge3RyYW5zZm9ybTogc2NhbGUoMS4yNSwgMS4yNSl9XFxuICAxMDAlIHt0cmFuc2Zvcm06IHNjYWxlKDEsIDEpfVxcbn1cXG5cXG4uY3Vyc29yIHtcXG4gIHdpZHRoOiA0OHB4O1xcbiAgaGVpZ2h0OiA0OHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gIC13ZWJraXQtdHJhbnNmb3JtOiByb3RhdGVaKDEwMGRlZyk7XFxuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlWigxMDBkZWcpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7IC8qVGhpcyB3aWxsIG1ha2UgdGhlIHN5cmluZ2UgdHJhbnNwYXJlbnQgdG8gY2xpY2tzLiBcXG4gICAgSXQgd2lsbCBtYWtlIHRoZSByZWFsIGN1cnNvciB0byBjbGljayB3aGF0J3MgdW5kZXIgdGhlIHN5cmluZ2UqL1xcbiAgei1pbmRleDogMTAwO1xcbn1cXG5cXG4jaW5zdHJ1Y3Rpb25zIHtcXG5cXHRiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQocmdiKDI0MywgMjQzLCAxNDUpIDMwJSwgcmdiKDI0NywgMjQ3LCAxOTcpKTtcXG4gIGNvbG9yOiBibGFjaztcXG4gIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KHJnYigyNDMsIDI0MywgMTQ1KSAzMCUsIHJnYigyNDcsIDI0NywgMTk3KSk7XFxuXFx0YmFja2dyb3VuZDogLXdlYmtpdC1ncmFkaWVudChsaW5lYXIsIHRvcCwgYm90dG9tLCBjb2xvci1zdG9wKDMwJSwgcmdiKDI0MywgMjQzLCAxNDUpKSwgY29sb3Itc3RvcCgxMDAlLCByZ2IoMjQ3LCAyNDcsIDE5NykpKTtcXG5cXHRiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudChyZ2IoMjQzLCAyNDMsIDE0NSkgMzAlLCByZ2IoMjQ3LCAyNDcsIDE5NykpO1xcblxcdGJhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudChyZ2IoMjQzLCAyNDMsIDE0NSkgMzAlLCByZ2IoMjQ3LCAyNDcsIDE5NykpO1xcblxcdGJhY2tncm91bmQ6IC1tcy1saW5lYXItZ3JhZGllbnQocmdiKDI0MywgMjQzLCAxNDUpIDMwJSwgcmdiKDI0NywgMjQ3LCAxOTcpKTtcXG4gIGZpbHRlcjogcHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KCBzdGFydENvbG9yc3RyPSdyZ2IoMjQzLCAyNDMsIDE0NSknLCBlbmRDb2xvcnN0cj0ncmdiKDI0NywgMjQ3LCAxOTcpJyxHcmFkaWVudFR5cGU9MCApO1xcbiAgd2lkdGg6IDUwJTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBib3JkZXI6IDdweCBzb2xpZCByZ2IoMTg0LCAxODQsIDE2OSk7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDQwcHg7XFxuICBmb250LWZhbWlseTogR2FyYW1vbmQsIHNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDIyJTtcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgei1pbmRleDogMTA7XFxufVxcblxcbkBrZXlmcmFtZXMgaW5zdHJ1Y3Rpb25zQXBwZWFycyB7XFxuICAwJSB7b3BhY2l0eTogMH1cXG4gIDEwMCUge29wYWNpdHk6IDF9XFxufVxcblxcbiNpbnN0cnVjdGlvbnMgcCB7XFxuICB1c2VyLXNlbGVjdDogbm9uZTsgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lOyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxufVxcblxcbmZvcm0ge1xcbiAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuZm9ybSBsYWJlbCB7XFxuICBmb250LXdlaWdodDogbGlnaHRlcjtcXG4gIGZvbnQtc2l6ZTogMzJweDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogM3B4O1xcbn1cXG4gXFxuLmNvcm9uYSB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7IC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTsgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lOy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbn1cXG5cXG4jY2lyY2xlIHtcXG4gIHdpZHRoOiAxMzBweDtcXG4gIGhlaWdodDogMTMwcHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjQzLCAyNDMsIDE0NSk7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDMwJTtcXG4gIGJvdHRvbTogNzAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgei1pbmRleDogMTtcXG59XFxuXFxuLmF4aXN7XFxuICBoZWlnaHQ6IDE4NHB4O1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjQzLCAyNDMsIDE0NSk7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICByaWdodDogMDtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDMwJTtcXG4gIGJvdHRvbTogNzAlO1xcbiAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cXG4udGlueUNpcmNsZUNvbnRhaW5lciB7XFxuICBoZWlnaHQ6MjIwcHg7XFxuICB3aWR0aDoyMnB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDE1MywgMTE2LCAyNDAsIDApO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgei1pbmRleDogMjtcXG59XFxuXFxuLnRpbnlDaXJjbGUge1xcbiAgaGVpZ2h0OjI0cHg7XFxuICB3aWR0aDoyNHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgYmFja2dyb3VuZDogcmdiKDI0NSwgMTk0LCAxMDApO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAyLjVzIGVhc2U7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGJhY2tncm91bmQgMi41cyBlYXNlO1xcbiAgLW1vei10cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDIuNXMgZWFzZTtcXG4gIC1vLXRyYW5zaXRpb246IGJhY2tncm91bmQgMi41cyBlYXNlO1xcbiAgLW1zLXRyYW5zaXRpb246IGJhY2tncm91bmQgMi41cyBlYXNlO1xcbn1cXG5cXG4uZXllcyB7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICB3aWR0aDogODBweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzJfX18gKyBcIik7XFxuICB0b3A6IDc2cHg7XFxuICByaWdodDogLTI3cHg7XFxuICB6LWluZGV4OiAzO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHR1cm5FeWVzIHtcXG4gIDAlIHt0cmFuc2Zvcm06IHJvdGF0ZVooMTgwZGVnKTsgb3BhY2l0eTogMX1cXG4gIDQ4JSB7dHJhbnNmb3JtOiByb3RhdGVaKDE4MGRlZyk7IG9wYWNpdHk6IDF9XFxuICA0OSUge3RyYW5zZm9ybTogcm90YXRlWigxODBkZWcpOyBvcGFjaXR5OiAwfVxcbiAgNTAlIHt0cmFuc2Zvcm06IHJvdGF0ZVooMGRlZyk7IG9wYWNpdHk6IDB9XFxuICA1MSUge3RyYW5zZm9ybTogcm90YXRlWigwZGVnKTsgb3BhY2l0eTogMX1cXG4gIDk4JSB7dHJhbnNmb3JtOiByb3RhdGVaKDBkZWcpOyBvcGFjaXR5OiAxfVxcbiAgOTklIHt0cmFuc2Zvcm06IHJvdGF0ZVooMGRlZyk7IG9wYWNpdHk6IDB9XFxuICAxMDAlIHt0cmFuc2Zvcm06IHJvdGF0ZVooMTgwZGVnKTsgb3BhY2l0eTogMH1cXG59XFxuXFxuLmV5ZVNoYWRlcyB7XFxuICB6LWluZGV4OiA0O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgd2lkdGg6IDc2cHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjQzLCAyNDMsIDE0NSk7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiA0O1xcbiAgcmlnaHQ6IC0yNXB4O1xcbn1cXG5cXG4jdG9wRXllc2hhZGUge1xcbiAgdG9wOiA1OHB4O1xcbiAgYW5pbWF0aW9uOiBub25lOyAvKnNodXRUb3BFeWVzaGFkZSAzcyBlYXNlIGluZmluaXRlIG5vcm1hbDsqL1xcbn1cXG5cXG4jYm90dG9tRXllc2hhZGV7XFxuICB0b3A6IDExNnB4O1xcbiAgYW5pbWF0aW9uOiBub25lOyAvKnNodXRCb3R0b21FeWVzaGFkZSAzcyBlYXNlIGluZmluaXRlIG5vcm1hbDsqL1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHNodXRUb3BFeWVzaGFkZSB7XFxuICAwJSB7dG9wOiA1OHB4fVxcbiAgMTElIHt0b3A6IDc3cHh9XFxuICAxNSUge3RvcDogNzdweH1cXG4gIDIyJSB7dG9wOiA1OHB4fVxcbiAgMTAwJSB7dG9wOiA1OHB4fVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIHNodXRCb3R0b21FeWVzaGFkZSB7XFxuICAwJSB7dG9wOiAxMTZweH1cXG4gIDExJSB7dG9wOiA5NnB4fVxcbiAgMTUlIHt0b3A6IDk2cHh9XFxuICAyMiUge3RvcDogMTE2cHh9XFxuICAxMDAlIHt0b3A6IDExNnB4fVxcbn1cXG5cXG4uZmlndXJlcyB7XFxuICB3aWR0aDogNTZweDtcXG4gIGhlaWdodDogNTZweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDU7XFxufVxcblxcbkBrZXlmcmFtZXMgZmlyZXdvcmtzIHtcXG4gIDAlIHt3aWR0aDogNHB4OyBoZWlnaHQ6IDRweDsgb3BhY2l0eTogMTt9XFxuICA4MCUge3dpZHRoOiA2NHB4OyBoZWlnaHQ6IDY0cHg7IG9wYWNpdHk6IDAuODt9XFxuICA5OSUge3dpZHRoOiA2NHB4OyBoZWlnaHQ6IDY0cHg7IG9wYWNpdHk6IDA7fVxcbiAgMTAwJSB7d2lkdGg6IDBweDsgaGVpZ2h0OiAwcHg7IG9wYWNpdHk6IDA7fVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGZpZ3VyZUJlY29tZXNNaW5pIHtcXG4gIDAlIHt3aWR0aDogNTZweDsgaGVpZ2h0OiA1NnB4OyBvcGFjaXR5OiAxfVxcbiAgMzAlIHt3aWR0aDogMzRweDsgaGVpZ2h0OiAzNHB4OyBvcGFjaXR5OiAxfVxcbiAgMTAwJSB7d2lkdGg6IDBweDsgaGVpZ2h0OiAwcHg7IG9wYWNpdHk6IDB9XFxufVxcblxcbi5hbWJ1bGFuY2Uge1xcbiAgd2lkdGg6IDgwcHg7XFxuICBoZWlnaHQ6IDgwcHg7XFxuICB6LWluZGV4OiA1O1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyArIFwiKTtcXG59XFxuXFxuQGtleWZyYW1lcyBkaXNhcHBlYXJzIHtcXG4gIDAlIHtvcGFjaXR5OiAxfVxcbiAgMTAwJSB7b3BhY2l0eTogMH1cXG59XFxuXFxuXFxuZm9vdGVyIHtcXG4gIHVzZXItc2VsZWN0OiBub25lO1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5cXG4vKiMgc291cmNlTWFwcGluZ1VSTD1jdXJzb3IuY3NzLm1hcCAqL1wiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9jc3MvY3Vyc29yLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9jc3MvY3Vyc29yLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtDQ0NDLHNCREFZO0NDQ1osU0RBVTtBQ0NYOztBQUVBO0VEQ0ksVUFBTztFQUNWLGFBQUE7RUNDQyxZQUFZO0VEQ2QseUJBQVE7RUFDSixZQUFXO0VBQ1gsZ0JBQVk7QUNDaEI7O0FBRUE7RURDSSxhQUFVO0VBQ1YsNkJBQW9CO0VBQUUsaUJBQUEsRUFBQSxpQkFBQTtFQ0V4Qix5QkFBeUI7RURBdkIsa0JBQVk7RUFDZixlQUFBO0VDRUMsNEJBQTRCO0VEQTlCLGlCQUFPO0VBQ0gsa0JBQVk7RUFDZixNQUFBO0VDRUMsUUFBUTtFQUNSLE9BQU87RUFDUCxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGlCQUFpQixFQUFFLDRDQUE0QztFQUMvRCxzQkFBc0IsRUFBRSw0Q0FBNEM7RUFDcEUseUJBQXlCLENBQUMsNENBQTRDO0VBQ3RFLHFCQUFxQixDQUFDLDRDQUE0QztBQUNwRTs7QUFFQTtFQUNFLE9BQU87QUFDVDs7QUFFQTtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsUUFBUTtBQUNWOztBQUVBO0VBQ0Usb0VBQXVEO0VBQ3ZELDBCQUEwQjtFQUMxQixVQUFVO0VBQ1YscUNBQXFDO0VBQ3JDLGtDQUFrQztFQUNsQyxnQ0FBZ0M7RUFDaEMsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxlQUFlO0VBQ2YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLElBQUksc0JBQXNCO0VBQzFCLEtBQUssMEJBQTBCO0VBQy9CLE1BQU0sc0JBQXNCO0FBQzlCOztBQUVBO0VBQ0UsSUFBSSxzQkFBc0I7RUFDMUIsS0FBSywwQkFBMEI7RUFDL0IsTUFBTSxz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LFNBQVM7RUFDYixLQUFLLFNBQVM7RUFDZCxLQUFLLFNBQVM7RUFDZCxLQUFLLFNBQVM7RUFDZCxNQUFNLFNBQVM7QUFDakI7O0FBRUE7RUFDRSxJQUFJLFVBQVU7RUFDZCxLQUFLLFNBQVM7RUFDZCxLQUFLLFNBQVM7RUFDZCxLQUFLLFVBQVU7RUFDZixNQUFNLFVBQVU7QUFDbEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSxJQUFJLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO0VBQ3hDLEtBQUssV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUM7RUFDN0MsS0FBSyxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztFQUMzQyxNQUFNLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO0FBQzVDOztBQUVBO0VBQ0UsSUFBSSxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVU7RUFDekMsS0FBSyxXQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVU7RUFDMUMsTUFBTSxVQUFVLEVBQUUsV0FBVyxFQUFFLFVBQVU7QUFDM0M7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLFVBQVU7RUFDVixtREFBMkM7QUFDN0M7O0FBRUE7RUFDRSxJQUFJLFVBQVU7RUFDZCxNQUFNLFVBQVU7QUFDbEI7OztBQUdBO0VBQ0UsaUJBQWlCO0VBQ2pCLHNCQUFzQjtFQUN0Qix5QkFBeUI7RUFDekIscUJBQXFCO0VBQ3JCLGFBQWE7QUFDZjs7O0FBR0EscUNBQXFDXCIsXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY3Vyc29yLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vY3Vyc29yLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsImltcG9ydCBzdHlsZSBmcm9tICcuLi9jc3MvY3Vyc29yLmNzcyc7XHJcbmltcG9ydCBmaWd1cmUxIGZyb20gJy4uL2ltYWdlcy9maWd1cmUxLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUyIGZyb20gJy4uL2ltYWdlcy9maWd1cmUyLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUzIGZyb20gJy4uL2ltYWdlcy9maWd1cmUzLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU0IGZyb20gJy4uL2ltYWdlcy9maWd1cmU0LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU1IGZyb20gJy4uL2ltYWdlcy9maWd1cmU1LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU2IGZyb20gJy4uL2ltYWdlcy9maWd1cmU2LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU3IGZyb20gJy4uL2ltYWdlcy9maWd1cmU3LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU4IGZyb20gJy4uL2ltYWdlcy9maWd1cmU4LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU5IGZyb20gJy4uL2ltYWdlcy9maWd1cmU5LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxMCBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTAuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTExIGZyb20gJy4uL2ltYWdlcy9maWd1cmUxMS5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTIgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTEyLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxMyBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTMuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTE0IGZyb20gJy4uL2ltYWdlcy9maWd1cmUxNC5zdmcnO1xyXG5pbXBvcnQgc3RhcnMgZnJvbSAnLi4vaW1hZ2VzL3N0YXJzLnN2Zyc7XHJcbmltcG9ydCB7IGJvZHksIGhlYWRlciwgY3Vyc29yLCBjb3JvbmFDaXJjbGUsIGV5ZXMgfSBmcm9tICcuL2N1cnNvckFuZENvcm9uYSc7XHJcbmltcG9ydCB7IHNlY29uZHNGb3JFYWNoU3RhZ2UsIHBGYWlsdXJlLCBwRmFpbHVyZUFub24sIHAsIHBBbm9uIH0gZnJvbSAnLi9zdG9yeUxpbmUnO1xyXG5pbXBvcnQgeyBzdG9wV29ya2luZywgb3VyVmlld1BvcnRXaWR0aCwgb3VyVmlld1BvcnRIZWlnaHQsIG1vdmUgfSBmcm9tICcuL2ZpZ3VyZXNNb3ZlbWVudCc7XHJcblxyXG5cclxuY29uc3QgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJyk7XHJcbmNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMgZm9ybSAjc3RhcnRCdXR0b24nKTtcclxuY29uc3QgdG9wRXllc2hhZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdG9wRXllc2hhZGUnKTtcclxuY29uc3QgYm90dG9tRXllc2hhZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYm90dG9tRXllc2hhZGUnKTtcclxuY29uc3QgdGlueUNpcmNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGlueUNpcmNsZScpO1xyXG5jb25zdCBjb3JvbmEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29yb25hJyk7XHJcbmNvbnN0IHRpbnlDaXJjbGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGlueUNpcmNsZUNvbnRhaW5lcicpO1xyXG5jb25zdCBmb3JtTGFiZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5zdHJ1Y3Rpb25zIGZvcm0gbGFiZWwnKTtcclxuY29uc3QgZm9ybVRleHRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMgZm9ybSAjbmlja25hbWUnKTtcclxuY29uc3QgaW5zdHJ1Y3Rpb25zUFRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMgcCcpO1xyXG5sZXQgbmlja25hbWU7XHJcbmxldCBzdGFnZSA9IDA7Ly93aWxsIGdvIGluc2lkZSB0aGUgbGV2ZWwgdGFnXHJcbmNvbnN0IGluc3RydWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMnKTtcclxubGV0IGZpZ3VyZXMgPSBbXTsgLy9maWd1cmUxLCBmaWd1cmUyLi4uXHJcbmxldCBmaWd1cmVzRGl2cyA9IFtdO1xyXG5sZXQgbnVtc09mRmlncyA9IFtdOy8vZm9yIGV4YW1wbGU6IFsxLCAyLCAzLCA0LCA1LCA2LCA3XSBkZXBlbmRzIG9uIHRoZSBtYXggbnVtYmVyIG9mIGZpZ3VyZXMgaW4gZWFjaCBsZXZlbFxyXG5sZXQgdXNlclNjb3JlID0gMDtcclxuY29uc3QgYm9udXNBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlciAjYm9udXNBcnJvdycpO1xyXG5sZXQgc3BlZWQ7IC8vZmlndXJlcycgc3BlZWQgKENvbnRyb2xzIHRoZSBmcmVxdWVuY3kgb2YgdGhlIGludGVydmFsIGluIHRoZSBmdW5jdGlvbiBtb3ZlKVxyXG5cclxuXHJcbi8vc3RhcnRpbmcgdGhlIGdhbWVcclxuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7Ly9wcmV2ZW50IHJlZnJlc2hpbmcgdGhlIHBhZ2UgKGR1ZSB0byB0aGUgZm9ybSlcclxuXHJcbiAgICBzdG9wV29ya2luZygwKTtcclxuXHJcbiAgICAvL2FkZGluZyBudW1iZXJzIHRvIG51bXNPZkZpZ3MgYXJyYXkgKHVzdWFsbHkgaXQgaXMgdHdvIGZpZ3VyZXMgbGVzcyB0aGVuIHRoZSBudW1iZXIgb2Ygc2Vjb25kcylcclxuICAgIGlmIChzdGFnZSA9PSAwIHx8IHN0YWdlID09IDEgfHwgc3RhZ2UgPT0gMykge1xyXG4gICAgICAgIGZvciAobGV0IHogPSAxOyB6IDw9IChzZWNvbmRzRm9yRWFjaFN0YWdlW3N0YWdlXSAtIDQpOyB6Kyspe1xyXG4gICAgICAgICAgICBudW1zT2ZGaWdzLnB1c2goeik7XHJcbiAgICAgICAgfSBcclxuICAgIH0gZWxzZSBpZiAoc3RhZ2UgPT0gMiB8fCBzdGFnZSA9PSA0KSB7XHJcbiAgICAgICAgZm9yIChsZXQgeiA9IDE7IHogPD0gKHNlY29uZHNGb3JFYWNoU3RhZ2Vbc3RhZ2VdIC0gMyk7IHorKyl7XHJcbiAgICAgICAgICAgIG51bXNPZkZpZ3MucHVzaCh6KTtcclxuICAgICAgICB9IFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBmb3IgKGxldCB6ID0gMTsgeiA8PSAoc2Vjb25kc0ZvckVhY2hTdGFnZVtzdGFnZV0gLSAyKTsgeisrKXtcclxuICAgICAgICAgICAgbnVtc09mRmlncy5wdXNoKHopO1xyXG4gICAgICAgIH0gICBcclxuICAgICAgICAvLyBpZiAoc3RhZ2UgPT0gMil7XHJcbiAgICAgICAgLy8gICAgIG51bXNPZkZpZ3MucHVzaChzZWNvbmRzRm9yRWFjaFN0YWdlW3N0YWdlXSk7Ly9pbiBsZXZlbCAyIHRoZSBudW1iZXIgb2YgZmlndXJlcyBlcXVhbGwgdG8gdGhlIG51bWJlciBvZiBzZWNvbmRzXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuXHJcbiAgICAvL2RlZmluaW5nIHRoZSBmaWd1cmVzJyBhcnJheXNcclxuICAgIG51bXNPZkZpZ3MuZm9yRWFjaChudW0gPT4ge1xyXG4gICAgICAgIC8vYWRkaW5nIGZpZ3VyZXMgaW50byB0aGUgZmlndXJlcyBhcnJheVxyXG4gICAgICAgIGZpZ3VyZXMucHVzaCgnZmlndXJlJytudW0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vY3JlYXRpbmcgZmlndXJlcyBkaXYgdGFncyBpbiB0aGUgaHRtbFxyXG4gICAgICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBpLmNsYXNzTGlzdC5hZGQoJ2ZpZ3VyZXMnKTtcclxuICAgICAgICBpLnNldEF0dHJpYnV0ZSgnaWQnLCAnZmlndXJlJytudW0pO1xyXG4gICAgICAgIGJvZHkuaW5zZXJ0QmVmb3JlKGksIGZvb3Rlcik7XHJcbiAgICAgICAgZmlndXJlc0RpdnMucHVzaChpKTtcclxuXHJcbiAgICB9KTtcclxuICAgICBcclxuICAgIC8vcHV0dGluZyB0aGUgbmlja25hbWUgaW4gbG9jYWwgc3RvcmFnZVxyXG4gICAgbmlja25hbWUgPSBkb2N1bWVudC5mb3Jtcy5uaWNrbmFtZUZvcm0ubmlja25hbWUudmFsdWU7XHJcbiAgICBsZXQgbG9jYWxOYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWUnKTtcclxuXHJcbiAgICBpZiAobmlja25hbWUgIT0gJycpe1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCduYW1lJywgbmlja25hbWUpO1xyXG4gICAgICAgIGxvY2FsTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lJyk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyBcIiArbG9jYWxOYW1lKTtcclxuICAgIH0gZWxzZSBpZiAobmlja25hbWUgPT0gJycpe1xyXG4gICAgICAgIGlmIChsb2NhbE5hbWUgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG8gXCIgK2xvY2FsTmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbG9jYWxOYW1lID0gJyc7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG8gXCIgKyBsb2NhbE5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL3dlIHdpbGwgcmVtb3ZlIHBhcnRzIG9mIHRoZSBmb3JtIHRoYXQgd2Ugd29uJ3QgbmVlZCBhbnkgbW9yZVxyXG4gICAgZm9ybUxhYmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBmb3JtVGV4dElucHV0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBcclxuXHJcbiAgICAvL3RoZSBjb3JvbmEgYXBwZWFyc1xyXG4gICAgY29yb25hLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH0pXHJcbiAgICAvL3RoZSBzbWFsbCBjaXJjbGVzIG9mIHRoZSBjb3JvbmEgYXBwZWFyXHJcbiAgICB0aW55Q2lyY2xlQ29udGFpbmVyLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICB9KVxyXG4gICAgXHJcbiAgICBpbnN0cnVjdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICAvL3RoZSBjb3JvbmEncyBleWVzIHdpbGwgZ2V0IGNsb3NlZCBhbmQgdHVybi9sb29rIHRvIHRoZSBvdGhlciBzaWRlXHJcbiAgICB0b3BFeWVzaGFkZS5zdHlsZS5hbmltYXRpb24gPSAnc2h1dFRvcEV5ZXNoYWRlIDIuNXMgMC42NXMgZWFzZSBpbmZpbml0ZSBub3JtYWwnO1xyXG4gICAgYm90dG9tRXllc2hhZGUuc3R5bGUuYW5pbWF0aW9uID0gJ3NodXRCb3R0b21FeWVzaGFkZSAyLjVzIDAuNjVzIGVhc2UgaW5maW5pdGUgbm9ybWFsJztcclxuICAgIGV5ZXMuc3R5bGUuYW5pbWF0aW9uID0gJ3R1cm5FeWVzIDVzIDAuOTI1cyBlYXNlIGluZmluaXRlIG5vcm1hbCc7IFxyXG5cclxuICAgIC8vdGhlIHNjb3JlIHNlY3Rpb24gYXBwZWFyczpcclxuICAgIGhlYWRlci5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgaGVhZGVyLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7IFxyXG4gICAgY29uc3Qgc2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIgI3Njb3JlIHNwYW4nKTtcclxuICAgIHNjb3JlLnRleHRDb250ZW50ID0gdXNlclNjb3JlO1xyXG4gICAgbGV0IHkgPSAwO1xyXG4gICAgLy90aGUgbmV4dCBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBieTogd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShvcGFjaXR5Q2hhbmdlKTtcclxuICAgIC8vYW5kIGl0IHdpbGwgdGVsbCB0aGUgYnJvd3NlciB0aGF0IEkgd2lzaCB0byBwZXJmb3JtIGFuIGFuaW1hdGlvbiB3aXRoIHRoZSBvcGFjaXR5XHJcbiAgICBjb25zdCBvcGFjaXR5Q2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgIHkgPSB5ICsgMC4wMztcclxuICAgICAgICBoZWFkZXIuc3R5bGUub3BhY2l0eSA9IGAke3l9YDtcclxuXHJcbiAgICAgICAgaWYgKGhlYWRlci5zdHlsZS5vcGFjaXR5IDwgJzEnKXtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9wYWNpdHlDaGFuZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9wYWNpdHlDaGFuZ2UpO1xyXG5cclxuXHJcbiAgICAvL3RoZSB0aW1lciBhcHBlYXJzXHJcbiAgICBjb25zdCB0aW1lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW1lcicpO1xyXG4gICAgdGltZXIuc3R5bGUuYW5pbWF0aW9uID0gJ25vbmUnOy8vaW4gb3JkZXIgdG8gcmVzZXQgdGhlIGFuaW1hdGlvbiBvZiB0aGUgZW5kIG9mIHRoZSBsZXZlbFxyXG4gICAgdGltZXIuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uSXNPbicpOy8vYnJpbmdpbmcgYmFjayB0aGUgb3JpZ2luYWwgY2xhc3NOYW1lXHJcbiAgICB0aW1lci5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpb25SZW1vdmVkJyk7Ly9hIHRlbXBvcmFyeSBjbGFzc05hbWUgd2UgYWRkZWQgdG8gdGhlIHRpbWVyIGF0IHRoZSBlbmQgb2YgdGhlIGxldmVsIChub3cgd2UncmUgcmVtb3ZpbmcgaXQpXHJcbiAgICBsZXQgc2Vjb25kcyA9IHNlY29uZHNGb3JFYWNoU3RhZ2Vbc3RhZ2VdO1xyXG4gICAgdGltZXIudGV4dENvbnRlbnQgPSBzZWNvbmRzOyAgXHJcbiAgICB0aW1lci5zdHlsZS5hbmltYXRpb24gPSBgdGltZXJHcm93cyAxcyAke3NlY29uZHMrMX0gZWFzZSBub3JtYWxgO1xyXG4gICAgXHJcbiAgICAvL3RoZSBzdGFnZSBhcHBlYXJzIG9uIHNjcmVlblxyXG4gICAgY29uc3QgbGV2ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIgI2xldmVsIHNwYW4nKTtcclxuICAgIGxldmVsLnRleHRDb250ZW50ID0gc3RhZ2UrMTtcclxuXHJcbiAgICAvL3Jlc2V0dGluZyB0aGUgYm9udXNBcnJvdyBhbmltYXRpb24gZnJvbSB0aGUgZW5kIG9mIHRoZSBsZXZlbCwgc28gaXQnbGwgYmUgYWJsZSB0byB3b3JrIGFnYWluXHJcbiAgICBib251c0Fycm93LnN0eWxlLmFuaW1hdGlvbiA9ICdub25lJztcclxuICAgIGJvbnVzQXJyb3cuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW9uUmVtb3ZlZCcpO1xyXG4gICAgYm9udXNBcnJvdy5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb25Jc09uJyk7XHJcblxyXG5cclxuICAgIC8vZnVuY3Rpb24gdGhhdCB3aWxsIGJlIGNhbGxlZCBmcm9tIHRoZSBjb3VudERvd24gZnVuY3Rpb24gXHJcbiAgICAvL2FuZCBhbHNvIGZyb20gdGhlIGNoZWNrIGZ1bmN0aW9uXHJcbiAgICBjb25zdCBjaGVja0JhY2tncm91bmQgPSAoZmlndXJlRGl2KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZpZ3VyZURpdi5zdHlsZS5iYWNrZ3JvdW5kLmluY2x1ZGVzKCdzdGFycy5zdmcnKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9jb3VudERvd24gZnVuY3Rpb24gZm9yIHRoZSB0aW1lciBhbmQgY2hhbmdpbmcgdGhlIGNvcm9uYSdzIGNvbG9yIHdoZW4gbm90IGFsbCBmaWd1cmVzIHdlcmUgY2xpY2tlZFxyXG4gICAgY29uc3QgY291bnREb3duID0gKCkgPT4ge1xyXG4gICAgICAgIHNlY29uZHMgPSBzZWNvbmRzIC0gMTsgIFxyXG4gICAgICAgIHRpbWVyLnRleHRDb250ZW50ID0gc2Vjb25kcztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb3VudERvd25JbnRlcnZhbCA9IHNldEludGVydmFsKGNvdW50RG93biwgMTAwMCk7IC8vZnVuY3Rpb24gZm9yIHRoZSB0aW1lclxyXG5cclxuXHJcbiAgICBmaWd1cmVzLmZvckVhY2goZmlndXJlID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgY3VycmVudEZpZ3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK2ZpZ3VyZSk7XHJcblxyXG4gICAgICAgIC8vYWRkaW5nIGEgYmFja2dyb3VuZCBpbWFnZSBmb3IgZWFjaCBmaWd1cmU6XHJcbiAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5iYWNrZ3JvdW5kID0gYHVybCgnLi8ke2ZpZ3VyZX0uc3ZnJylgOyBcclxuICAgICAgICAvL3B1dHRpbmcgdGhlIGZpZ3VyZXMgaW4gZGlmZmVyZW50IHBsYWNlcyBhdCBzdGFydGluZyBwb2ludFxyXG4gICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gTWF0aC5yYW5kb20oKSooYm9keS5jbGllbnRIZWlnaHQgLSA1NikgKyAncHgnOyAvLzU2IGlzIHRoZSBzaXplIG9mIHRoZSBmaWd1cmVzLiBib2R5LmNsaWVudEhlaWdodCBnaXZlcyB0aGUgdmlld3BvcnQgc2l6ZSB3aXRob3V0IHRoZSBzY3JvbGwgYmFyXHJcbiAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ID0gTWF0aC5yYW5kb20oKSooYm9keS5jbGllbnRXaWR0aCAtIDU2KSArICdweCc7IC8vNTYgaXMgdGhlIHNpemUgb2YgdGhlIGZpZ3VyZXMuXHJcbiAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAvL3N0YXJ0aW5nIHRvIG1vdmUgdGhlIGZpZ3VyZXMgaW4gZGlmZmVyZW50IGRpcmVjdGlvbnM6XHJcbiAgICAgICAgaWYgKHN0YWdlID09IDQpe1xyXG4gICAgICAgICAgICBzcGVlZCA9ICdmYXN0JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzcGVlZCA9ICdyZWd1bGFyJztcclxuICAgICAgICB9XHJcbiAgICAgICAgbW92ZShmaWd1cmUsIHNwZWVkKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9mdW5jdGlvbiBmb3IgY2xpY2tpbmcgYSBmaWd1cmVcclxuICAgICAgICBjb25zdCBzdGFyc0FuZFBvaW50cyA9ICgpID0+IHtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJzQW5kUG9pbnRzKTtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCguL3N0YXJzLnN2ZyknO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmFuaW1hdGlvbiA9ICdmaXJld29ya3MgMC43NXMgZWFzZSBmb3J3YXJkcyBub3JtYWwnO1xyXG4gICAgICAgICAgICB1c2VyU2NvcmUgKz0gMTA7XHJcbiAgICAgICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gdXNlclNjb3JlO1xyXG4gICAgICAgICAgICAvL2RlbGV0aW5nIHRoZSBmaWd1cmUgZnJvbSB0aGUgRE9NXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5yZW1vdmUoKTsgXHJcbiAgICAgICAgICAgIH0sIDc1MSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2FkZGluZyBldmVudExpc3RlbmVyIGZvciBlYWNoIGZpZ3VyZSBhbmQgYWRqdXN0aW5nIHRoZSBzY29yZVxyXG4gICAgICAgIGN1cnJlbnRGaWd1cmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFyc0FuZFBvaW50cyk7XHJcblxyXG4gICAgICAgIC8vZnVuY3Rpb24gdGhhdCBwcmV2ZW50cyBjbGlja2luZyBvbiBmaWd1cmVzLCB3aGlsZSB0aGUgYW1idWxhbmNlcyBjb21lXHJcbiAgICAgICAgY29uc3QgcHJldmVudENsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnNBbmRQb2ludHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hdCB0aGUgZW5kIG9mIHRoZSBzdGFnZSB0aGUgdXNlciB3b24ndCBiZSBhYmxlIHRvIGNsaWNrIHRoZSBmaWd1cmVzXHJcbiAgICAgICAgc2V0VGltZW91dChwcmV2ZW50Q2xpY2ssIHNlY29uZHNGb3JFYWNoU3RhZ2Vbc3RhZ2VdKjEwMDApO1xyXG5cclxuICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICAvL2Z1bmN0aW9uIHRoYXQgd29ya3MgYWZ0ZXIgdGhlIHVzZXIgZmFpbGVkXHJcbiAgICBjb25zdCBmYWlsaW5nUHJvY2VkdXJlID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBzdG9wV29ya2luZygxKTsgICBcclxuXHJcbiAgICAgICAgLy9tYWtpbmcgdGhlIGNvbG9yIG9mIHRoZSBjb3JvbmEgcmFuZG9tbHkgZGlmZmVyZW50XHJcbiAgICAgICAgbGV0IGggPSBNYXRoLnJhbmRvbSgpICogMzU5OyAvL3RoZSBIIG9nIHRoZSBoc2wgaXMgMC0zNTlcclxuICAgICAgICBsZXQgcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg4MCAtIDI2ICsgMSkgKyAyNik7Ly9JIGRlY2lkZWQgdGhhdCB0aGUgcGVyY2VudGFnZSBvZiB0aGUgUyBpbiBoc2wgd2lsbCBiZSBiZXR3ZWVuIDI2IGFuZCA4MCAoYmVjYXVzZSBpIGRvbid0IGxpa2UgbWluIHNhdHVyYXRpb24gYW5kIG1heCBzYXR1cmF0aW9uKVxyXG4gICAgICAgIGxldCBsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDc1IC0gMzUgKyAxKSArIDM1KTsvL0kgZGVjaWRlZCB0aGF0IHRoZSBwZXJjZW50YWdlIG9mIHRoZSBMIGluIGhzbCB3aWxsIGJlIGJldHdlZW4gMzUgYW5kIDc1IChub3QgdG9vIGxpZ2h0IGFuZCBub3QgdG9vIGRhcmspXHJcbiAgICAgICAgdGlueUNpcmNsZXMuZm9yRWFjaChjaXJjbGUgPT4ge1xyXG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuYmFja2dyb3VuZCA9IGBoc2woJHtofSwgJHtzfSUsICR7bH0lKWA7XHJcbiAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9yZW1vdmluZyB0aGUgb3JpZ2luYWwgY2xhc3MgZnJvbSB0aGUgdGltZXIsIHJlc2V0cyBpdHMgYW5pbWF0aW9uXHJcbiAgICAgICAgLy9hbmQgbGV0cyB0aGUgYW5pbWF0aW9uIHdvcmsgYWdhaW4gbmV4dCBsZXZlbCAoYWZ0ZXIgYWRkaW5nIHRoZSBvbGQgY2xhc3NOYW1lIGJhY2spXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRpbWVyLnN0eWxlLmFuaW1hdGlvbiA9ICdub25lJztcclxuICAgICAgICAgICAgdGltZXIuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uUmVtb3ZlZCcpO1xyXG4gICAgICAgICAgICB0aW1lci5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpb25Jc09uJyk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICBmaWd1cmVzRGl2cy5mb3JFYWNoKGZpZ3VyZURpdiA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlndXJlRGl2LnN0eWxlLmJhY2tncm91bmQuaW5jbHVkZXMoJ2ZpZ3VyZScpKXtcclxuICAgICAgICAgICAgICAgIGZpZ3VyZURpdi5zdHlsZS50b3AgPSBwYXJzZUludChmaWd1cmVEaXYuc3R5bGUudG9wKSArICdweCc7IC8vdGhlIG1ldGhvZCBwYXJzZUludCB0YWtlcyBvbmx5IHRoZSBudW1iZXIgKGFuZCBsZWF2ZXMgb3V0IHRoZSBzdHJpbmcgJ3B4JyBhdHRhY2hlZCB0byBpdCkgXHJcbiAgICAgICAgICAgICAgICBmaWd1cmVEaXYuc3R5bGUubGVmdCA9IHBhcnNlSW50KGZpZ3VyZURpdi5zdHlsZS5sZWZ0KSArICdweCc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jcmVhdGluZyBhbWJ1bGFuY2VzIGFuZCBwdXR0aW5nIHRoZW0gODBweCBsZWZ0IHRvIGVhY2ggZmlndXJlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBpLmNsYXNzTGlzdC5hZGQoJ2FtYnVsYW5jZScpO1xyXG4gICAgICAgICAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoaSwgZm9vdGVyKTtcclxuICAgICAgICAgICAgICAgIGkuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgICAgICAgICAgaS5zdHlsZS50b3AgPSBmaWd1cmVEaXYuc3R5bGUudG9wO1xyXG4gICAgICAgICAgICAgICAgaS5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KGZpZ3VyZURpdi5zdHlsZS5sZWZ0KSAtIDgwKSArIFwicHhcIjtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlndXJlRW50ZXJzQW1idWxhbmNlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB6ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6IDwgMjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlndXJlRGl2LnN0eWxlLnRvcCA9IHBhcnNlSW50KGZpZ3VyZURpdi5zdHlsZS50b3ApICsgMSArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHogKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUgIFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9tb3ZpbmcgdGhlIGFtYnVsYW5jZSBmcm9tIHRoZSBsZWZ0IG9mIHRoZSBmaWd1cmUgdG93YXJkcyB0aGUgZmlndXJlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZpbmdBbWJ1bGFuY2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBwYXJzZUludChpLnN0eWxlLmxlZnQpIDwgcGFyc2VJbnQoZmlndXJlRGl2LnN0eWxlLmxlZnQpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkuc3R5bGUubGVmdCA9IChwYXJzZUludChpLnN0eWxlLmxlZnQpICsgMSkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9tb3ZpbmdBbWJ1bGFuY2VQYXJ0MiB3aWxsIGNhbGwgdGhpcyBmdW5jdGlvbjpcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVSaWdodCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpLnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoaS5zdHlsZS5sZWZ0KSArIDEpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9tb3ZpbmcgdGhlIGFtYnVsYW5jZSBmcm9tIHRoZSBmaWd1cmUgdG8gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbW92aW5nQW1idWxhbmNlUGFydDIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoaS5zdHlsZS5sZWZ0KSA8IG91clZpZXdQb3J0V2lkdGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb3ZpbmdSaWdodCA9IHNldEludGVydmFsKG1vdmVSaWdodCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLnN0eWxlLmFuaW1hdGlvbiA9ICdkaXNhcHBlYXJzIDNzIGVhc2UgZm9yd2FyZHMgbm9ybWFsJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gY2xlYXJJbnRlcnZhbChtb3ZpbmdSaWdodCksIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmaWd1cmVFbnRlcnNBbWJ1bGFuY2UsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgZmlndXJlRGl2LnN0eWxlLmFuaW1hdGlvbiA9ICdmaWd1cmVCZWNvbWVzTWluaSAwLjVzIDEuMnMgZWFzZSBmb3J3YXJkcyBub3JtYWwnO1xyXG4gICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwobW92aW5nQW1idWxhbmNlLCAxNSk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KG1vdmluZ0FtYnVsYW5jZVBhcnQyLCAxNzAwKTtcclxuICAgICAgICAgICAgICAgIC8vY2xlYW5pbmcgYWxsIGZpZ3VyZXMgYW5kIGZpZ3VyZXMgYXJyYXlzIGFmdGVyIHRoZXkgZW50ZXJlZCB0aGUgYW1idWxhbmNlXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWd1cmVzRGl2cy5mb3JFYWNoKGZpZ3VyZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ3VyZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpZ3VyZXMgPSBbXTsgXHJcbiAgICAgICAgICAgICAgICAgICAgZmlndXJlc0RpdnMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBudW1zT2ZGaWdzID0gW107XHJcbiAgICAgICAgICAgICAgICB9LCAxNzAwKTtcclxuICAgICAgICAgICAgICAgIC8vY2xlYW5pbmcgdGhlIGFtYnVsYW5jZXMgYWZ0ZXIgdGhleSBmaW5pc2hlZCB0aGVpciB3b3JrXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbWJ1bGFuY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFtYnVsYW5jZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFtYnVsYW5jZXMuZm9yRWFjaChhbWJ1bGFuY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbWJ1bGFuY2UucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sIDQ3MDApO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vYnJpbmdpbmcgYmFjayB0aGUgaW5zdHJhY3Rpb24ncyBib3hcclxuICAgICAgICBjb25zdCBicmluZ2luZ0JhY2tJbnN0cnVjdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihsb2NhbE5hbWUgPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zUFRhZy50ZXh0Q29udGVudCA9IFwiWW91IGZhaWxlZCBhbmQgYSBuZXcgdmFyaWFudCBpcyBzcHJlYWRpbmcgbm93LCBidXQgZG9uJ3Qgd29ycnksIHlvdSBjYW4gdHJ5IGFnYWluIGFuZCBwcmV2ZW50IGEgd29ybGQgY2F0YXN0cm9waGUuXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zUFRhZy50ZXh0Q29udGVudCA9IGxvY2FsTmFtZSArICcsJyArIFwiIHlvdSBmYWlsZWQgYW5kIGEgbmV3IHZhcmlhbnQgaXMgc3ByZWFkaW5nIG5vdywgYnV0IGRvbid0IHdvcnJ5LCB5b3UgY2FuIHRyeSBhZ2FpbiBhbmQgcHJldmVudCBhIHdvcmxkIGNhdGFzdHJvcGhlLlwiOyBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLnRvcCA9ICdjYWxjKDMwJSArIDRweCknO1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUuYW5pbWF0aW9uID0gJ2luc3RydWN0aW9uc0FwcGVhcnMgMi41cyBlYXNlIGZvcndhcmRzIG5vcm1hbCc7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQoYnJpbmdpbmdCYWNrSW5zdHJ1Y3Rpb25zLCAyMDAwKTtcclxuICAgIH1cclxuICAgXHJcblxyXG4gICAgLy9mdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiBhbGwgdGhlIGZpZ3VyZXMgd2VyZSBjbGlja2VkIG9yIGlmIHRoZSB0aW1lIG9mIHRoZSBsZXZlbCBlbmRlZFxyXG4gICAgY29uc3QgZW5kTGV2ZWxDaGVjayA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZmlndXJlc0RpdnMuZXZlcnkoY2hlY2tCYWNrZ3JvdW5kKSkgeyAgLy9cImV2ZXJ5XCIgcmV0dXJucyB0cnVlIGlmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgZm9yIGFsbCBlbGVtZW50cyBpbiB0aGUgYXJyYXkgKGlmIGFsbCBmaWd1cmVzIGJlY2FtZSBzdGFycylcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChlbmRMZXZlbCk7XHJcbiAgICAgICAgICAgIHN0b3BXb3JraW5nKDEpOyAvL3RoZSBzdGFycyB3aWxsIHN0b3AgbW92aW5nXHJcbiAgICAgICAgICAgIHN0YWdlICs9IDE7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY291bnREb3duSW50ZXJ2YWwpOyAvL3RoZSBjbG9jayB3aWxsIHN0b3BcclxuICAgICAgICAgICAgdGltZXIuc3R5bGUuYW5pbWF0aW9uID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aW1lci5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb25SZW1vdmVkJyk7XHJcbiAgICAgICAgICAgIHRpbWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvbklzT24nKTsvL3JlbW92aW5nIHRoaXMgY2xhc3MgcmVzZXRzIHRoZSBhbmltYXRpb24gZm9yIHRoaXMgZWxlbWVudCBhbmQgbGV0cyB1cyB1c2UgaXQgYWdhaW4gYWZ0ZXIgYWRkaW5nIHRoaXMgY2xhc3MgYmFja1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlY29uZHMgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGltZXIuc3R5bGUuYW5pbWF0aW9uID0gYHRpbWVyR3Jvd3NBZ2FpbiAxcyAke3NlY29uZHN9IGVhc2Ugbm9ybWFsYDtcclxuXHJcbiAgICAgICAgICAgICAgICBib251c0Fycm93LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBib251c0Fycm93LnN0eWxlLmFuaW1hdGlvbiA9IGBhcnJvd0dyb3dzIDFzICR7c2Vjb25kc30gZWFzZSBub3JtYWxgO1xyXG4gICAgICAgICAgICAgICAgYm9udXNBcnJvdy5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb25SZW1vdmVkJyk7XHJcbiAgICAgICAgICAgICAgICBib251c0Fycm93LmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvbklzT24nKTsvL3JlbW92aW5nIHRoaXMgY2xhc3MgcmVzZXRzIHRoZSBhbmltYXRpb24gZm9yIHRoaXMgZWxlbWVudCBhbmQgbGV0cyB1cyB1c2UgaXQgYWdhaW4gYWZ0ZXIgYWRkaW5nIHRoaXMgY2xhc3MgYmFja1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBib251c0Fycm93LnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgICAgICAgICB9LCAoc2Vjb25kcyoxMDAwKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJvbnVzID0gKHNlY29uZHMgKiAxMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpID0gMTtcclxuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gY291bnQgKyBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA8PSBib251cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJTY29yZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZS50ZXh0Q29udGVudCA9IHVzZXJTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jbGVhbmluZyB0aGUgZmlndXJlcyBhcnJheXMgKGluIG9yZGVyIHRvIGdldCByZWFkeSBmb3IgbmV4dCBsZXZlbCk6XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmlndXJlcyA9IFtdOyBcclxuICAgICAgICAgICAgICAgIGZpZ3VyZXNEaXZzID0gW107XHJcbiAgICAgICAgICAgICAgICBudW1zT2ZGaWdzID0gW107XHJcbiAgICAgICAgICAgIH0sIDc1MSk7IC8vYWZ0ZXIgdGhlIGxhc3QgZmlyZXdvcmsgZW5kZWQgaXRzIHdvcmtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaGlkaW5nIHRoZSBjb3JvbmFcclxuICAgICAgICAgICAgY29yb25hLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2JyaW5naW5nIGJhY2sgdGhlIGluc3RyYWN0aW9uJ3MgYm94XHJcbiAgICAgICAgICAgIGlmKGxvY2FsTmFtZSA9PSAnJyl7XHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNQVGFnLnRleHRDb250ZW50ID0gcEFub25bc3RhZ2VdOyAvL3BBbm9uIGlzIHRoZSB0ZXh0IGFwcGVhcnMgaW4gc3RvcnlMaW5lLmpzXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNQVGFnLnRleHRDb250ZW50ID0gbG9jYWxOYW1lICsgJywgJyArIHBbc3RhZ2VdOyAvLy8vcCBpcyB0aGUgdGV4dCBhcHBlYXJzIGluIHN0b3J5TGluZS5qc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS50b3AgPSAnMjIlJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmFuaW1hdGlvbiA9ICdpbnN0cnVjdGlvbnNBcHBlYXJzIDJzIGVhc2UgZm9yd2FyZHMgbm9ybWFsJzsgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA9PSAwICYmIGZpZ3VyZXNEaXZzLmV2ZXJ5KGNoZWNrQmFja2dyb3VuZCkgPT0gZmFsc2UpIHsgLy9pZiBub3QgYWxsIGZpZ3VyZXMgYmVjYW1lIHN0YXJzIGFuZCB0aGUgc2Vjb25kcyBlbmRlZFxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGVuZExldmVsKTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudERvd25JbnRlcnZhbCk7IC8vdGhlIGNsb2NrIHdpbGwgc3RvcFxyXG4gICAgICAgICAgICBmYWlsaW5nUHJvY2VkdXJlKCk7Ly9mdW5jdGlvbiB0aGF0IGJyaW5ncyB0aGUgYW1idWxhbmNlc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3QgZW5kTGV2ZWwgPSBzZXRJbnRlcnZhbChlbmRMZXZlbENoZWNrLCAxKTsgXHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6WyJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaGVhZGVyIiwiY3Vyc29yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzZXRBdHRyaWJ1dGUiLCJwYWdlWSIsInBhZ2VYIiwiYXhpcyIsImNvcm9uYUNpcmNsZSIsImFuZ2xlIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJpIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJuIiwidG9wIiwiYm90dG9tIiwicmlnaHQiLCJsZWZ0IiwiY29udGFpbmVyQW5nbGUiLCJtIiwibCIsImN1cnJlbnRDb250YWluZXIiLCJhcHBlbmQiLCJleWVzIiwieiIsInkiLCJzZWNvbmRzRm9yRWFjaFN0YWdlIiwicEZhaWx1cmUiLCJwRmFpbHVyZUFub24iLCJwIiwicEFub24iLCJzdG9wIiwic3RvcFdvcmtpbmciLCJiaW5hcnkiLCJvdXJWaWV3UG9ydFdpZHRoIiwiY2xpZW50V2lkdGgiLCJvdXJWaWV3UG9ydEhlaWdodCIsImNsaWVudEhlaWdodCIsImNvbnNvbGUiLCJsb2ciLCJtb3ZlIiwiZmlndXJlIiwic3BlZWQiLCJyYW5kb21JbnRYIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tSW50WSIsImN1cnJlbnRGaWd1cmUiLCJmaWd1cmVNb3ZlbWVudCIsImNsZWFySW50ZXJ2YWwiLCJtb3ZlbWVudEludGVydmFsIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsInBhcnNlSW50IiwiYmFja2dyb3VuZCIsImJhdEFycmF5Iiwic29tZSIsImluY2x1ZGVzIiwic2V0SW50ZXJ2YWwiLCJmaWd1cmUxIiwiZmlndXJlMiIsImZpZ3VyZTMiLCJmaWd1cmU0IiwiZmlndXJlNSIsImZpZ3VyZTYiLCJmaWd1cmU3IiwiZmlndXJlOCIsImZpZ3VyZTkiLCJmaWd1cmUxMCIsImZpZ3VyZTExIiwiZmlndXJlMTIiLCJmaWd1cmUxMyIsImZpZ3VyZTE0Iiwic3RhcnMiLCJmb290ZXIiLCJidXR0b24iLCJ0b3BFeWVzaGFkZSIsImJvdHRvbUV5ZXNoYWRlIiwidGlueUNpcmNsZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29yb25hIiwidGlueUNpcmNsZUNvbnRhaW5lciIsImZvcm1MYWJlbCIsImZvcm1UZXh0SW5wdXQiLCJpbnN0cnVjdGlvbnNQVGFnIiwibmlja25hbWUiLCJzdGFnZSIsImluc3RydWN0aW9ucyIsImZpZ3VyZXMiLCJmaWd1cmVzRGl2cyIsIm51bXNPZkZpZ3MiLCJ1c2VyU2NvcmUiLCJib251c0Fycm93IiwicHJldmVudERlZmF1bHQiLCJwdXNoIiwibnVtIiwiZm9ybXMiLCJuaWNrbmFtZUZvcm0iLCJ2YWx1ZSIsImxvY2FsTmFtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwiZGlzcGxheSIsImFuaW1hdGlvbiIsIm9wYWNpdHkiLCJzY29yZSIsInRleHRDb250ZW50Iiwib3BhY2l0eUNoYW5nZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndpbmRvdyIsInRpbWVyIiwicmVtb3ZlIiwic2Vjb25kcyIsImxldmVsIiwiY2hlY2tCYWNrZ3JvdW5kIiwiZmlndXJlRGl2IiwiY291bnREb3duIiwiY291bnREb3duSW50ZXJ2YWwiLCJzdGFyc0FuZFBvaW50cyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwicHJldmVudENsaWNrIiwiZmFpbGluZ1Byb2NlZHVyZSIsImgiLCJzIiwiY2lyY2xlIiwicG9zaXRpb24iLCJmaWd1cmVFbnRlcnNBbWJ1bGFuY2UiLCJtb3ZpbmdBbWJ1bGFuY2UiLCJtb3ZlUmlnaHQiLCJtb3ZpbmdBbWJ1bGFuY2VQYXJ0MiIsIm1vdmluZ1JpZ2h0IiwiYW1idWxhbmNlcyIsImFtYnVsYW5jZSIsImJyaW5naW5nQmFja0luc3RydWN0aW9ucyIsImVuZExldmVsQ2hlY2siLCJldmVyeSIsImVuZExldmVsIiwiYm9udXMiLCJjb3VudCJdLCJzb3VyY2VSb290IjoiIn0=