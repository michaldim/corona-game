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

var move = function move(figure) {
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
  };

  var movementInterval = setInterval(function () {
    return figureMovement(randomIntX, randomIntY);
  }, 20);
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

var secondsForEachStage = [8, 10, 9, 15, 10, 10, 15, 10, 15, 10];
var pFailure = "you failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe";
var pFailureAnon = "You failed and a new variant is spreading now, but don't worry, you can try again and prevent a world catastrophe";
var p = ["Vaccinate world's population and help fight the coronavirus disease. If you'll fail, a new variant will arrive...", "you made it! But the population grows and you need to vaccinate even more people now!", "you made it again! Now lets see if you can vaccinate the population faster! Thats the only way to prevent a new variant.", "great job! But new evidence came, saying that bats came to population concentrations. Try to vaccinate the bats too!", "you are awesome! But the people are in a hurry today. Lets see if you can do your job this fast!"];
var pAnon = ["Vaccinate world's population and help fight the coronavirus disease. If you'll fail, a new variant will arrive...", "You made it!But the population grows and you need to vaccinate even more people now!", "You made it again! Now lets see if you can vaccinate the population faster! Thats the only way to prevent a new variant.", "Great job! But new evidence came, saying that animals can also get sick. Try to vaccinate them too!", "You are awesome! But the people are in a hurry today.Lets see if you can do your job this fast!"];


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
var bonusArrow = document.querySelector('header #bonusArrow'); //starting the game

button.addEventListener("click", function (e) {
  e.preventDefault(); //prevent refreshing the page (due to the form)

  (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_18__.stopWorking)(0); //adding numbers to numsOfFigs array (usually it is one figure less then the number of seconds)

  for (var z = 1; z < _storyLine__WEBPACK_IMPORTED_MODULE_17__.secondsForEachStage[stage]; z++) {
    numsOfFigs.push(z);
  }

  if (stage == 2) {
    numsOfFigs.push(_storyLine__WEBPACK_IMPORTED_MODULE_17__.secondsForEachStage[stage]); //in level 2 the number of figures equall to the number of seconds
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

    (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_18__.move)(figure); //function for clicking a figure

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmMvc2NyaXB0cy9jdXJzb3JBbmRDb3JvbmEuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vc3JjL3NjcmlwdHMvZmlndXJlc01vdmVtZW50LmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL3NyYy9zY3JpcHRzL3N0b3J5TGluZS5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9zcmMvY3NzL2N1cnNvci5jc3MiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL3NyYy9jc3MvY3Vyc29yLmNzcz9kNDMxIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vc3JjL3NjcmlwdHMvc3RhcnRHYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG5jb25zdCBjdXJzb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3Vyc29yJyk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XHJcbiAgICAvL3RoZSBsb2NhdGlvbiBvZiB0aGUgc3lyaW5nZSBjdXJzb3JcclxuICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInRvcDogXCIgKyAoZS5wYWdlWSArIDQpICsgXCJweDsgbGVmdDogXCIgKyAoZS5wYWdlWCAtIDUpICsgXCJweDtcIik7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5jb25zdCBheGlzID0gWzEsIDIsIDMsIDQsIDUsIDZdOyAvL2ZvciB0aGUgbGluZXMgdGhhdCBnbyBvdXQgb2YgdGhlIGNvcm9uYSdzIGNlbnRlclxyXG4vL2NvbnN0IGF4aXNEaXZzID0gW107IC8vY29udGFpbnMgYWxsIHRoZSBheGlzRGl2cyBvZiB0aGUgY29yb25hXHJcbi8vY29uc3QgdGlueUNpcmNsZXNDb250YWluZXJzRGl2cyA9IFtdO1xyXG5jb25zdCBjb3JvbmFDaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2lyY2xlJyk7XHJcbmxldCBhbmdsZSA9IDA7XHJcblxyXG5cclxuYXhpcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgLy9jcmVhdGluZyBkaXYgZm9yIGVhY2ggY29yb25hIGF4aXNcclxuICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaS5jbGFzc0xpc3QuYWRkKCdjb3JvbmEnLCAnYXhpcycpOyAvL2FkZGluZyBjbGFzcyBuYW1lcyBmb3Igb3VyIGRpdlxyXG4gICAgaS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2F4aXMnK2VsZW1lbnQpOyAvL2FkZGluZyBpZCBmb3Igb3VyIGRpdlxyXG4gICAgYm9keS5pbnNlcnRCZWZvcmUoaSwgY29yb25hQ2lyY2xlLm5leHRTaWJsaW5nKTsvL3B1dHRpbmcgXCJpXCIgYWZ0ZXIgY29yb25hQ2lyY2xlXHJcbiAgICAvL2F4aXNEaXZzLnB1c2goaSk7IC8vcHV0dGluZyBvdXIgZGl2IGluc2lkZSBheGlzRGl2cyBhcnJheVxyXG4gICAgaS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWigke2FuZ2xlfWRlZylgO1xyXG4gICAgYW5nbGUgKz0gMzA7XHJcblxyXG4gICAgLy9jcmVhdGluZyBkaXYgZm9yIGVhY2ggY29udGFpbmVyIChjb250YWluZXJzIGZvciB0aGUgdGlueSBjaXJjbGVzKVxyXG4gICAgLy90aGVzZSBjb250YWluZXJzIHdpbGwgaGF2ZSBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBjb25zdCBuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG4uY2xhc3NMaXN0LmFkZCgnY29yb25hJywgJ3RpbnlDaXJjbGVDb250YWluZXInKTsgLy9hZGRpbmcgY2xhc3MgbmFtZXMgZm9yIG91ciBkaXZcclxuICAgIG4uc2V0QXR0cmlidXRlKCdpZCcsICd0aW55Q2lyY2xlQ29udGFpbmVyJytlbGVtZW50KTsgLy9hZGRpbmcgaWQgZm9yIG91ciBkaXZcclxuICAgIGJvZHkuaW5zZXJ0QmVmb3JlKG4sIGhlYWRlcik7Ly9wdXR0aW5nIFwiblwiIGF0IHRoZSB0b3Agb2YgdGhlIHBhZ2UsIHNvIGl0IHdpbGwgYmUgZWFzaWVyIHRvIHB1dCBpdCBvbiB0aGUgYmlnIGNpcmNsZVxyXG4gICAgLy90aW55Q2lyY2xlc0NvbnRhaW5lcnNEaXZzLnB1c2gobik7IC8vcHV0dGluZyBvdXIgZGl2IGluc2lkZSB0aW55Q2lyY2xlc0NvbnRhaW5lcnNEaXZzIGFycmF5XHJcbiAgICBuLnN0eWxlLnRvcCA9IFwiY2FsYygzMCUgLSAxMTBweClcIjsgLy9sb2NhdGluZyBpdCBhdCB0aGUgY2VudGVyIG9mIHRoZSBjb3JvbmEncyBiaWcgY2lyY2xlXHJcbiAgICBuLnN0eWxlLmJvdHRvbSA9IFwiY2FsYyg3MCUgKyAxMTBweClcIjsgXHJcbiAgICBuLnN0eWxlLnJpZ2h0ID0gYGNhbGMoNTAlICsgJHsxMCArIDIyKihlbGVtZW50IC0xKX1weClgOyAgIC8vbG9jYXRpbmcgZWFjaCBjb250YWluZXIgYXQgdGhlIGxvY2F0aW9uIG9mIHRoZSBmaXJzdCBjb250YWluZXJcclxuICAgIG4uc3R5bGUubGVmdCA9IGBjYWxjKDUwJSAtICR7MTAgKyAyMiooZWxlbWVudCAtMSl9cHgpYDsgIFxyXG4gICAgY29uc3QgY29udGFpbmVyQW5nbGUgPSAzMCAqIChlbGVtZW50IC0gMSk7IFxyXG4gICAgbi5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWigke2NvbnRhaW5lckFuZ2xlfWRlZylgOyAvL2NoYW5naW5nIHRoZSBhbmdsZSBvZiBlYWNoIGNvbnRhaW5lciwgc28gZWFjaCBjb250YWluZXIgd2lsbCBiZSBsb2NhdGVkIGJlaGluZCBvZiBlYWNoIGF4aXNcclxuICAgIFxyXG5cclxuICAgIC8vY3JlYXRpbmcgZGl2IGZvciBlYWNoIGNvcm9uYSdzIHRpbnkgY2lyY2xlXHJcbiAgICAvL3RoZXNlIGNpcmNsZXMgd2lsbCBoYXZlIHBvc2l0aW9uOiBhYnNvbHV0ZTsgb24gdGhlaXIgZmF0aGVyICh0aGUgY29udGFpbmVyKVxyXG4gICAgY29uc3QgbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsvL3dlIG5lZWQgMTIgdGlueSBjaXJjbGVzIGFuZCB3ZSBoYXZlIG9ubHkgNiBjb250YWluZXJzXHJcbiAgICBtLmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICd0aW55Q2lyY2xlJyk7XHJcbiAgICBtLnNldEF0dHJpYnV0ZSgnaWQnLCAndGlueUNpcmNsZScrZWxlbWVudCk7XHJcbiAgICBtLnN0eWxlLnRvcCA9ICcwJztcclxuICAgIG0uc3R5bGUucmlnaHQgPSAnMCc7XHJcbiAgICBsLmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICd0aW55Q2lyY2xlJyk7XHJcbiAgICBsLnNldEF0dHJpYnV0ZSgnaWQnLCAndGlueUNpcmNsZScrKGVsZW1lbnQrNikpO1xyXG4gICAgbC5zdHlsZS50b3AgPSAnY2FsYygxMDAlIC0gMjRweCknO1xyXG4gICAgbC5zdHlsZS5yaWdodCA9ICcwJztcclxuICAgIGNvbnN0IGN1cnJlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjdGlueUNpcmNsZUNvbnRhaW5lciR7ZWxlbWVudH1gKTtcclxuICAgIGN1cnJlbnRDb250YWluZXIuYXBwZW5kKG0pOyAvL3B1dGluZyBlYWNoIHRpbnlDaXJjbGUgaW5zaWRlIGl0cyByaWdodCBjb250YWluZXJcclxuICAgIGN1cnJlbnRDb250YWluZXIuYXBwZW5kKGwpOyAvL3B1dGluZyBlYWNoIHRpbnlDaXJjbGUgaW5zaWRlIGl0cyByaWdodCBjb250YWluZXJcclxuXHJcbn0pO1xyXG5cclxuXHJcbi8vY3JlYXRpbmcgZGl2IGZvciB0aGUgY29yb25hJ3MgZXllc1xyXG5jb25zdCBleWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuZXllcy5jbGFzc0xpc3QuYWRkKCdleWVzJywgJ2Nvcm9uYScpO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGlueUNpcmNsZUNvbnRhaW5lcjEnKS5hcHBlbmQoZXllcyk7XHJcblxyXG4vLy8vY3JlYXRpbmcgZGl2cyBmb3IgdGhlIGNvcm9uYSdzIGV5ZSBzaGFkZXNcclxuY29uc3QgeiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbmNvbnN0IHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG56LmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICdleWVTaGFkZXMnKTtcclxueS5jbGFzc0xpc3QuYWRkKCdjb3JvbmEnLCAnZXllU2hhZGVzJyk7XHJcbnouc2V0QXR0cmlidXRlKCdpZCcsICd0b3BFeWVzaGFkZScpO1xyXG55LnNldEF0dHJpYnV0ZSgnaWQnLCAnYm90dG9tRXllc2hhZGUnKTtcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbnlDaXJjbGVDb250YWluZXIxJykuYXBwZW5kKHopO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGlueUNpcmNsZUNvbnRhaW5lcjEnKS5hcHBlbmQoeSk7XHJcblxyXG5cclxuZXhwb3J0IHsgYm9keSwgaGVhZGVyLCBjdXJzb3IsIGNvcm9uYUNpcmNsZSwgZXllcyB9O1xyXG4iLCJpbXBvcnQgeyBib2R5LCBoZWFkZXIsIGN1cnNvciwgY29yb25hQ2lyY2xlLCBleWVzIH0gZnJvbSAnLi9jdXJzb3JBbmRDb3JvbmEnO1xyXG5pbXBvcnQgeyBzZWNvbmRzRm9yRWFjaFN0YWdlLCBwRmFpbHVyZSwgcEZhaWx1cmVBbm9uLCBwLCBwQW5vbiB9IGZyb20gJy4vc3RvcnlMaW5lJztcclxuXHJcblxyXG5sZXQgc3RvcCA9IDA7XHJcbmNvbnN0IHN0b3BXb3JraW5nID0gKGJpbmFyeSkgPT4gc3RvcCA9IGJpbmFyeTsgLy93ZSBjYW4ndCBleHBvcnQgXCJzdG9wXCIgYXMgbGV0LCBzbyB3ZSBtYWtlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hIGZ1bmN0aW9uIHRoYXQgd2UgY2FuIGV4cG9ydCwgYW5kIGl0J2xsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIHZhbHVlIG9mIHN0b3BcclxuXHJcbmNvbnN0IG91clZpZXdQb3J0V2lkdGggPSBib2R5LmNsaWVudFdpZHRoOyAvL2NsaWVudFdpZHRoIHNob3dzIHRoZSB3aWR0aCBvZiB0aGUgZWxlbWVudCB3ZSBjaG9vc2VcclxuY29uc3Qgb3VyVmlld1BvcnRIZWlnaHQgPSBib2R5LmNsaWVudEhlaWdodDtcclxuY29uc29sZS5sb2cgKCdvdXJWaWV3UG9ydFdpZHRoOiAnICsgb3VyVmlld1BvcnRXaWR0aCArICcgb3VyVmlld1BvcnRIZWlnaHQ6ICcgK291clZpZXdQb3J0SGVpZ2h0KVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vdGhlIGJ1dHRvbidzIGV2ZW50IGxpc3RlbmVyIHdpbGwgY2FsbCB0aGlzIGZ1bmN0aW9uLCB3aGljaCB3aWxsIG1vdmUgdGhlIGZpZ3VyZXMgaW4gcmFuZG9tIGRpcmVjdGlvbnNcclxuY29uc3QgbW92ZSA9IChmaWd1cmUpID0+IHtcclxuICAgIC8vbWFraW5nIHJhbmRvbiBpbnRlZ2VycyBmb3IgdGhlIGZpZ3VyZXMgdG8gbW92ZSBpbiBkaWZmZXJlbnQgZGlyZWN0aW9uc1xyXG4gICAgbGV0IHJhbmRvbUludFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMiAtICgtMikgKyAxKSkgLTI7IC8vdGhpcyBjb25zdCB3aWxsIGdpdmUgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIC0yIGFuZCArMlxyXG4gICAgbGV0IHJhbmRvbUludFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMiAtICgtMikgKyAxKSkgLTI7IC8vdGhpcyBjb25zdCB3aWxsIGdpdmUgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIC0yIGFuZCArMlxyXG4gICAgaWYgKHJhbmRvbUludFggPT0gMCAmJiByYW5kb21JbnRZID09IDApe1xyXG4gICAgICAgIHJhbmRvbUludFggPSAyO1xyXG4gICAgfVxyXG4gICBcclxuICAgIGNvbnN0IGN1cnJlbnRGaWd1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytmaWd1cmUpO1xyXG5cclxuICAgIC8vdGhlIHdheSB0aGUgZmlndXJlcyBtb3ZlXHJcbiAgICBjb25zdCBmaWd1cmVNb3ZlbWVudCA9IChyYW5kb21JbnRYLCByYW5kb21JbnRZKSA9PiB7XHJcbiAgICAgICBcclxuICAgICAgICBpZiAoc3RvcCA9PSAxKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtb3ZlbWVudEludGVydmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy80IHJ1bGVzIGZvciB0aGUgY29ybmVycycgY2FzZXM6XHJcbiAgICAgICAgaWYgKChjdXJyZW50RmlndXJlLm9mZnNldFRvcCA8PSAxKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0ID49IChib2R5LmNsaWVudFdpZHRoIC01NiAtIDEpKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICgob3VyVmlld1BvcnRIZWlnaHQgLTU2IC0gMikgKyAncHgnKTtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ID0gJzJweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChjdXJyZW50RmlndXJlLm9mZnNldFRvcCA8PSAxKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0IDw9IDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gKChvdXJWaWV3UG9ydEhlaWdodCAtNTYgLSAyKSArICdweCcpO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAoKG91clZpZXdQb3J0V2lkdGggLTU2IC0yKSArICdweCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPj0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIDEpKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0IDw9IDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gJzJweCc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICgob3VyVmlld1BvcnRXaWR0aCAtNTYgLTIpICsgJ3B4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChjdXJyZW50RmlndXJlLm9mZnNldFRvcCA+PSAoYm9keS5jbGllbnRIZWlnaHQgLTU2IC0gMSkpICYmIChjdXJyZW50RmlndXJlLm9mZnNldExlZnQgPj0gKGJvZHkuY2xpZW50V2lkdGggLTU2IC0gMSkpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gJzJweCc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICcycHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2ZvdXIgXCJpZlwiIHJ1bGVzIGZvciBjYXNlcyB0aGF0IHRoZSBmaWd1cmVzIHJlYWNoIHRoZSBzY3JlZW4gZWRnZXM6XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPD0gMSkgeyAvL29mZnNldFRvcCBzaG93cyB0aGUgbG9jYXRpb24gY29tcGFyaW5nIHRvIHRoZSBmYXRoZXIgKHRoZSBib2R5KS4gV2UgbmVlZCB0aGF0IG9mZnNldFRvcCB3aWxsIGJlIDAgb3IgMSAoYW5kIG5vdCBvbmx5IG9mZnNldFRvcD0wKSwgYmVjYXVzZSBzb21ldGltZXMgdGhlIGZpZ3VyZXMgZG8gMiBzdGVwcyAoMiBwaXhlbHMpIGF0IGEgdGltZVxyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICgob3VyVmlld1BvcnRIZWlnaHQgLTU2IC0gMikgKyAncHgnKTsvL01pbnVzIDIsIGJlY2F1c2UgdGhlIGZpZ3VyZXMgd2lsbCBiZSBzdHVja2VkIGlmIHdlIHdpbGwgc2VuZCB0aGVtIHRvIG91clZpZXdQb3J0SGVpZ2h0TWludXMxIG9yIG91clZpZXdQb3J0SGVpZ2h0LiBBbmQgbWludXMgNTYgYmVjYXVzZSBvZiB0aGUgc2l6ZSBvZiB0aGUgZmlndXJlcyAod2Ugd2FudCB0aGVtIHRvIGRpc2FwcGVhciBhdCB0aGUgZWRnZSBvZiB0aGUgc2NyZWVuIGFuZCBub3QgNTZweCBhZnRlciBpdClcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ID0gKGJvZHkuY2xpZW50V2lkdGggLTU2IC0gcGFyc2VJbnQoY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPj0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gJzJweCc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9IChib2R5LmNsaWVudFdpZHRoIC01NiAtIHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCkpICsgJ3B4JztcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA8PSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICgob3VyVmlld1BvcnRXaWR0aCAtNTYgLTIpICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wKSkgKyAncHgnO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0ID49IChib2R5LmNsaWVudFdpZHRoIC01NiAtIDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICcycHgnO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9IChib2R5LmNsaWVudEhlaWdodCAtNTYgLSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLnRvcCkpICsgJ3B4JztcclxuICAgICAgICB9IFxyXG4gICAgICAgIC8vaWYgdGhlIGZpZ3VyZSBpcyBub3QgaW4gdGhlIGVkZ2Ugb3IgaW4gdGhlIGNvcm5lcixcclxuICAgICAgICAvL3RoZW4gdGhhdCdzIHRoZSB3YXkgaXQgd2lsbCBtb3ZlIG9uIHNjcmVlbjpcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLnRvcCkgKyByYW5kb21JbnRZICsgJ3B4JzsgLy90aGUgbWV0aG9kIHBhcnNlSW50IHRha2VzIG9ubHkgdGhlIG51bWJlciAoYW5kIGxlYXZlcyBvdXQgdGhlIHN0cmluZyAncHgnIGF0dGFjaGVkIHRvIGl0OikgXHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9IHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCkgKyByYW5kb21JbnRYICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudEZpZ3VyZS5zdHlsZS5iYWNrZ3JvdW5kICsgJyBYOiAnKyBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgKyAnIFk6ICcgKyBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjb25zdCBtb3ZlbWVudEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gZmlndXJlTW92ZW1lbnQocmFuZG9tSW50WCwgcmFuZG9tSW50WSksIDIwKTtcclxuXHJcbn07XHJcblxyXG5cclxuZXhwb3J0IHsgc3RvcFdvcmtpbmcsIG91clZpZXdQb3J0V2lkdGgsIG91clZpZXdQb3J0SGVpZ2h0LCBtb3ZlIH07IiwiaW1wb3J0IHsgYm9keSwgaGVhZGVyLCBjdXJzb3IsIGNvcm9uYUNpcmNsZSwgZXllcyB9IGZyb20gJy4vY3Vyc29yQW5kQ29yb25hJztcclxuXHJcblxyXG5jb25zdCBzZWNvbmRzRm9yRWFjaFN0YWdlID0gWzgsIDEwLCA5LCAxNSwgMTAsIDEwLCAxNSwgMTAsIDE1LCAxMF07XHJcblxyXG5jb25zdCBwRmFpbHVyZSA9IFwieW91IGZhaWxlZCBhbmQgYSBuZXcgdmFyaWFudCBpcyBzcHJlYWRpbmcgbm93LCBidXQgZG9uJ3Qgd29ycnksIHlvdSBjYW4gdHJ5IGFnYWluIGFuZCBwcmV2ZW50IGEgd29ybGQgY2F0YXN0cm9waGVcIjtcclxuY29uc3QgcEZhaWx1cmVBbm9uID0gXCJZb3UgZmFpbGVkIGFuZCBhIG5ldyB2YXJpYW50IGlzIHNwcmVhZGluZyBub3csIGJ1dCBkb24ndCB3b3JyeSwgeW91IGNhbiB0cnkgYWdhaW4gYW5kIHByZXZlbnQgYSB3b3JsZCBjYXRhc3Ryb3BoZVwiO1xyXG5cclxuY29uc3QgcCA9IFtcclxuXCJWYWNjaW5hdGUgd29ybGQncyBwb3B1bGF0aW9uIGFuZCBoZWxwIGZpZ2h0IHRoZSBjb3JvbmF2aXJ1cyBkaXNlYXNlLiBJZiB5b3UnbGwgZmFpbCwgYSBuZXcgdmFyaWFudCB3aWxsIGFycml2ZS4uLlwiLFxyXG5cInlvdSBtYWRlIGl0ISBCdXQgdGhlIHBvcHVsYXRpb24gZ3Jvd3MgYW5kIHlvdSBuZWVkIHRvIHZhY2NpbmF0ZSBldmVuIG1vcmUgcGVvcGxlIG5vdyFcIixcclxuXCJ5b3UgbWFkZSBpdCBhZ2FpbiEgTm93IGxldHMgc2VlIGlmIHlvdSBjYW4gdmFjY2luYXRlIHRoZSBwb3B1bGF0aW9uIGZhc3RlciEgVGhhdHMgdGhlIG9ubHkgd2F5IHRvIHByZXZlbnQgYSBuZXcgdmFyaWFudC5cIixcclxuXCJncmVhdCBqb2IhIEJ1dCBuZXcgZXZpZGVuY2UgY2FtZSwgc2F5aW5nIHRoYXQgYmF0cyBjYW1lIHRvIHBvcHVsYXRpb24gY29uY2VudHJhdGlvbnMuIFRyeSB0byB2YWNjaW5hdGUgdGhlIGJhdHMgdG9vIVwiLFxyXG5cInlvdSBhcmUgYXdlc29tZSEgQnV0IHRoZSBwZW9wbGUgYXJlIGluIGEgaHVycnkgdG9kYXkuIExldHMgc2VlIGlmIHlvdSBjYW4gZG8geW91ciBqb2IgdGhpcyBmYXN0IVwiLFxyXG5dXHJcblxyXG5jb25zdCBwQW5vbiA9IFtcclxuICAgIFwiVmFjY2luYXRlIHdvcmxkJ3MgcG9wdWxhdGlvbiBhbmQgaGVscCBmaWdodCB0aGUgY29yb25hdmlydXMgZGlzZWFzZS4gSWYgeW91J2xsIGZhaWwsIGEgbmV3IHZhcmlhbnQgd2lsbCBhcnJpdmUuLi5cIixcclxuICAgIFwiWW91IG1hZGUgaXQhQnV0IHRoZSBwb3B1bGF0aW9uIGdyb3dzIGFuZCB5b3UgbmVlZCB0byB2YWNjaW5hdGUgZXZlbiBtb3JlIHBlb3BsZSBub3chXCIsXHJcbiAgICBcIllvdSBtYWRlIGl0IGFnYWluISBOb3cgbGV0cyBzZWUgaWYgeW91IGNhbiB2YWNjaW5hdGUgdGhlIHBvcHVsYXRpb24gZmFzdGVyISBUaGF0cyB0aGUgb25seSB3YXkgdG8gcHJldmVudCBhIG5ldyB2YXJpYW50LlwiLFxyXG4gICAgXCJHcmVhdCBqb2IhIEJ1dCBuZXcgZXZpZGVuY2UgY2FtZSwgc2F5aW5nIHRoYXQgYW5pbWFscyBjYW4gYWxzbyBnZXQgc2ljay4gVHJ5IHRvIHZhY2NpbmF0ZSB0aGVtIHRvbyFcIixcclxuICAgIFwiWW91IGFyZSBhd2Vzb21lISBCdXQgdGhlIHBlb3BsZSBhcmUgaW4gYSBodXJyeSB0b2RheS5MZXRzIHNlZSBpZiB5b3UgY2FuIGRvIHlvdXIgam9iIHRoaXMgZmFzdCFcIixcclxuXVxyXG5cclxuZXhwb3J0IHsgc2Vjb25kc0ZvckVhY2hTdGFnZSwgcEZhaWx1cmUsIHBGYWlsdXJlQW5vbiwgcCwgcEFub24gfTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vaW1hZ2VzL2Fycm93LnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2ltYWdlcy9zeXJpbmdlLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2ltYWdlcy9leWVzLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4uL2ltYWdlcy9hbWJ1bGFuY2UxLnN2Z1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIip7XFxuXFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcXG5cXHRtYXJnaW46IDA7XFxufVxcblxcbmJvZHkge1xcbiAgcGFkZGluZzogMDtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBjdXJzb3I6IG5vbmU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjM2QzYjNiO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XFxuXFxuaGVhZGVyIHsgIFxcbiAgZGlzcGxheTogbm9uZTtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgZmxleC13cmFwOiBub3dyYXA7IC8qaW4gMSBsaW5lIG9ubHkqL1xcbiAgY29sb3I6IHJnYigxODQsIDIzOCwgMTg0KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG4gIGZvbnQtZmFtaWx5OiBHYXJhbW9uZCwgc2VyaWY7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogMDtcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7IC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbiAgLW1vei11c2VyLXNlbGVjdDogbm9uZTsgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lOy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbiAgLW1zLXVzZXItc2VsZWN0OiBub25lOy8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbn1cXG5cXG5oZWFkZXIgZGl2IHtcXG4gIGZsZXg6IDE7XFxufVxcblxcbmhlYWRlciBkaXYgc3BhbiB7XFxuICBmb250LXNpemU6IDMycHg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDFweDtcXG59XFxuXFxuaGVhZGVyICNib251c0Fycm93IHtcXG4gIGJhY2tncm91bmQ6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gKyBcIikgbm8tcmVwZWF0IGNlbnRlcjsgXFxuICBiYWNrZ3JvdW5kLXNpemU6IDYwcHggQXV0bztcXG4gIG9wYWNpdHk6IDA7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBlYXNlO1xcbiAgLW1vei10cmFuc2l0aW9uOiBvcGFjaXR5IDAuNXMgZWFzZTtcXG4gIC1vLXRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBlYXNlO1xcbiAgLW1zLXRyYW5zaXRpb246IG9wYWNpdHkgMC41cyBlYXNlO1xcbn1cXG5cXG5oZWFkZXIgI2JvbnVzQXJyb3cgcCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IDEwMCU7XFxuICBmb250LXNpemU6IDIycHg7XFxuICBjb2xvcjogIzU4ZGNmNztcXG59XFxuXFxuQGtleWZyYW1lcyB0aW1lckdyb3dzIHtcXG4gIDAlIHt0cmFuc2Zvcm06IHNjYWxlKDEsIDEpfVxcbiAgNTAlIHt0cmFuc2Zvcm06IHNjYWxlKDEuNSwgMS41KX1cXG4gIDEwMCUge3RyYW5zZm9ybTogc2NhbGUoMSwgMSl9XFxufVxcblxcbkBrZXlmcmFtZXMgdGltZXJHcm93c0FnYWluIHtcXG4gIDAlIHt0cmFuc2Zvcm06IHNjYWxlKDEsIDEpfVxcbiAgNTAlIHt0cmFuc2Zvcm06IHNjYWxlKDEuNSwgMS41KX1cXG4gIDEwMCUge3RyYW5zZm9ybTogc2NhbGUoMSwgMSl9XFxufVxcblxcbkBrZXlmcmFtZXMgYXJyb3dHcm93cyB7XFxuICAwJSB7dHJhbnNmb3JtOiBzY2FsZSgxLCAxKX1cXG4gIDUwJSB7dHJhbnNmb3JtOiBzY2FsZSgxLjI1LCAxLjI1KX1cXG4gIDEwMCUge3RyYW5zZm9ybTogc2NhbGUoMSwgMSl9XFxufVxcblxcbi5jdXJzb3Ige1xcbiAgd2lkdGg6IDQ4cHg7XFxuICBoZWlnaHQ6IDQ4cHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZVooMTAwZGVnKTtcXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGVaKDEwMGRlZyk7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTsgLypUaGlzIHdpbGwgbWFrZSB0aGUgc3lyaW5nZSB0cmFuc3BhcmVudCB0byBjbGlja3MuIFxcbiAgICBJdCB3aWxsIG1ha2UgdGhlIHJlYWwgY3Vyc29yIHRvIGNsaWNrIHdoYXQncyB1bmRlciB0aGUgc3lyaW5nZSovXFxuICB6LWluZGV4OiAxMDA7XFxufVxcblxcbiNpbnN0cnVjdGlvbnMge1xcblxcdGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChyZ2IoMjQzLCAyNDMsIDE0NSkgMzAlLCByZ2IoMjQ3LCAyNDcsIDE5NykpO1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQocmdiKDI0MywgMjQzLCAxNDUpIDMwJSwgcmdiKDI0NywgMjQ3LCAxOTcpKTtcXG5cXHRiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KGxpbmVhciwgdG9wLCBib3R0b20sIGNvbG9yLXN0b3AoMzAlLCByZ2IoMjQzLCAyNDMsIDE0NSkpLCBjb2xvci1zdG9wKDEwMCUsIHJnYigyNDcsIDI0NywgMTk3KSkpO1xcblxcdGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KHJnYigyNDMsIDI0MywgMTQ1KSAzMCUsIHJnYigyNDcsIDI0NywgMTk3KSk7XFxuXFx0YmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KHJnYigyNDMsIDI0MywgMTQ1KSAzMCUsIHJnYigyNDcsIDI0NywgMTk3KSk7XFxuXFx0YmFja2dyb3VuZDogLW1zLWxpbmVhci1ncmFkaWVudChyZ2IoMjQzLCAyNDMsIDE0NSkgMzAlLCByZ2IoMjQ3LCAyNDcsIDE5NykpO1xcbiAgZmlsdGVyOiBwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoIHN0YXJ0Q29sb3JzdHI9J3JnYigyNDMsIDI0MywgMTQ1KScsIGVuZENvbG9yc3RyPSdyZ2IoMjQ3LCAyNDcsIDE5NyknLEdyYWRpZW50VHlwZT0wICk7XFxuICB3aWR0aDogNTAlO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlcjogN3B4IHNvbGlkIHJnYigxODQsIDE4NCwgMTY5KTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG4gIGZvbnQtZmFtaWx5OiBHYXJhbW9uZCwgc2VyaWY7XFxuICBmb250LXdlaWdodDogYm9sZDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMjIlO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICB6LWluZGV4OiAxMDtcXG59XFxuXFxuQGtleWZyYW1lcyBpbnN0cnVjdGlvbnNBcHBlYXJzIHtcXG4gIDAlIHtvcGFjaXR5OiAwfVxcbiAgMTAwJSB7b3BhY2l0eTogMX1cXG59XFxuXFxuI2luc3RydWN0aW9ucyBwIHtcXG4gIHVzZXItc2VsZWN0OiBub25lOyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7IC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTsvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG59XFxuXFxuZm9ybSB7XFxuICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG5mb3JtIGxhYmVsIHtcXG4gIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xcbiAgZm9udC1zaXplOiAzMnB4O1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdG9wOiAzcHg7XFxufVxcbiBcXG4uY29yb25hIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICB1c2VyLXNlbGVjdDogbm9uZTsgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lOyAvKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cXG4gIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxuICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7LyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXFxufVxcblxcbiNjaXJjbGUge1xcbiAgd2lkdGg6IDEzMHB4O1xcbiAgaGVpZ2h0OiAxMzBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGJhY2tncm91bmQ6IHJnYigyNDMsIDI0MywgMTQ1KTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMzAlO1xcbiAgYm90dG9tOiA3MCU7XFxuICBtYXJnaW46IGF1dG87XFxuICB6LWluZGV4OiAxO1xcbn1cXG5cXG4uYXhpc3tcXG4gIGhlaWdodDogMTg0cHg7XFxuICB3aWR0aDogMTBweDtcXG4gIGJhY2tncm91bmQ6IHJnYigyNDMsIDI0MywgMTQ1KTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHJpZ2h0OiAwO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMzAlO1xcbiAgYm90dG9tOiA3MCU7XFxuICBtYXJnaW46IGF1dG87XFxufVxcblxcbi50aW55Q2lyY2xlQ29udGFpbmVyIHtcXG4gIGhlaWdodDoyMjBweDtcXG4gIHdpZHRoOjIycHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTUzLCAxMTYsIDI0MCwgMCk7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB6LWluZGV4OiAyO1xcbn1cXG5cXG4udGlueUNpcmNsZSB7XFxuICBoZWlnaHQ6MjRweDtcXG4gIHdpZHRoOjI0cHg7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjQ1LCAxOTQsIDEwMCk7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDIuNXMgZWFzZTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYmFja2dyb3VuZCAyLjVzIGVhc2U7XFxuICAtbW96LXRyYW5zaXRpb246IGJhY2tncm91bmQgMi41cyBlYXNlO1xcbiAgLW8tdHJhbnNpdGlvbjogYmFja2dyb3VuZCAyLjVzIGVhc2U7XFxuICAtbXMtdHJhbnNpdGlvbjogYmFja2dyb3VuZCAyLjVzIGVhc2U7XFxufVxcblxcbi5leWVzIHtcXG4gIGhlaWdodDogNDBweDtcXG4gIHdpZHRoOiA4MHB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZDogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyArIFwiKTtcXG4gIHRvcDogNzZweDtcXG4gIHJpZ2h0OiAtMjdweDtcXG4gIHotaW5kZXg6IDM7XFxufVxcblxcbkBrZXlmcmFtZXMgdHVybkV5ZXMge1xcbiAgMCUge3RyYW5zZm9ybTogcm90YXRlWigxODBkZWcpOyBvcGFjaXR5OiAxfVxcbiAgNDglIHt0cmFuc2Zvcm06IHJvdGF0ZVooMTgwZGVnKTsgb3BhY2l0eTogMX1cXG4gIDQ5JSB7dHJhbnNmb3JtOiByb3RhdGVaKDE4MGRlZyk7IG9wYWNpdHk6IDB9XFxuICA1MCUge3RyYW5zZm9ybTogcm90YXRlWigwZGVnKTsgb3BhY2l0eTogMH1cXG4gIDUxJSB7dHJhbnNmb3JtOiByb3RhdGVaKDBkZWcpOyBvcGFjaXR5OiAxfVxcbiAgOTglIHt0cmFuc2Zvcm06IHJvdGF0ZVooMGRlZyk7IG9wYWNpdHk6IDF9XFxuICA5OSUge3RyYW5zZm9ybTogcm90YXRlWigwZGVnKTsgb3BhY2l0eTogMH1cXG4gIDEwMCUge3RyYW5zZm9ybTogcm90YXRlWigxODBkZWcpOyBvcGFjaXR5OiAwfVxcbn1cXG5cXG4uZXllU2hhZGVzIHtcXG4gIHotaW5kZXg6IDQ7XFxuICBoZWlnaHQ6IDIwcHg7XFxuICB3aWR0aDogNzZweDtcXG4gIGJhY2tncm91bmQ6IHJnYigyNDMsIDI0MywgMTQ1KTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDQ7XFxuICByaWdodDogLTI1cHg7XFxufVxcblxcbiN0b3BFeWVzaGFkZSB7XFxuICB0b3A6IDU4cHg7XFxuICBhbmltYXRpb246IG5vbmU7IC8qc2h1dFRvcEV5ZXNoYWRlIDNzIGVhc2UgaW5maW5pdGUgbm9ybWFsOyovXFxufVxcblxcbiNib3R0b21FeWVzaGFkZXtcXG4gIHRvcDogMTE2cHg7XFxuICBhbmltYXRpb246IG5vbmU7IC8qc2h1dEJvdHRvbUV5ZXNoYWRlIDNzIGVhc2UgaW5maW5pdGUgbm9ybWFsOyovXFxufVxcblxcbkBrZXlmcmFtZXMgc2h1dFRvcEV5ZXNoYWRlIHtcXG4gIDAlIHt0b3A6IDU4cHh9XFxuICAxMSUge3RvcDogNzdweH1cXG4gIDE1JSB7dG9wOiA3N3B4fVxcbiAgMjIlIHt0b3A6IDU4cHh9XFxuICAxMDAlIHt0b3A6IDU4cHh9XFxufVxcblxcbkBrZXlmcmFtZXMgc2h1dEJvdHRvbUV5ZXNoYWRlIHtcXG4gIDAlIHt0b3A6IDExNnB4fVxcbiAgMTElIHt0b3A6IDk2cHh9XFxuICAxNSUge3RvcDogOTZweH1cXG4gIDIyJSB7dG9wOiAxMTZweH1cXG4gIDEwMCUge3RvcDogMTE2cHh9XFxufVxcblxcbi5maWd1cmVzIHtcXG4gIHdpZHRoOiA1NnB4O1xcbiAgaGVpZ2h0OiA1NnB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogNTtcXG59XFxuXFxuQGtleWZyYW1lcyBmaXJld29ya3Mge1xcbiAgMCUge3dpZHRoOiA0cHg7IGhlaWdodDogNHB4OyBvcGFjaXR5OiAxO31cXG4gIDgwJSB7d2lkdGg6IDY0cHg7IGhlaWdodDogNjRweDsgb3BhY2l0eTogMC44O31cXG4gIDk5JSB7d2lkdGg6IDY0cHg7IGhlaWdodDogNjRweDsgb3BhY2l0eTogMDt9XFxuICAxMDAlIHt3aWR0aDogMHB4OyBoZWlnaHQ6IDBweDsgb3BhY2l0eTogMDt9XFxufVxcblxcbkBrZXlmcmFtZXMgZmlndXJlQmVjb21lc01pbmkge1xcbiAgMCUge3dpZHRoOiA1NnB4OyBoZWlnaHQ6IDU2cHg7IG9wYWNpdHk6IDF9XFxuICAzMCUge3dpZHRoOiAzNHB4OyBoZWlnaHQ6IDM0cHg7IG9wYWNpdHk6IDF9XFxuICAxMDAlIHt3aWR0aDogMHB4OyBoZWlnaHQ6IDBweDsgb3BhY2l0eTogMH1cXG59XFxuXFxuLmFtYnVsYW5jZSB7XFxuICB3aWR0aDogODBweDtcXG4gIGhlaWdodDogODBweDtcXG4gIHotaW5kZXg6IDU7XFxuICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8zX19fICsgXCIpO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGRpc2FwcGVhcnMge1xcbiAgMCUge29wYWNpdHk6IDF9XFxuICAxMDAlIHtvcGFjaXR5OiAwfVxcbn1cXG5cXG5cXG5mb290ZXIge1xcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XFxuICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcXG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcblxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWN1cnNvci5jc3MubWFwICovXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL2Nzcy9jdXJzb3Iuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL2Nzcy9jdXJzb3IuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0NDQ0Msc0JEQVk7Q0NDWixTREFVO0FDQ1g7O0FBRUE7RURDSSxVQUFPO0VBQ1YsYUFBQTtFQ0NDLFlBQVk7RURDZCx5QkFBUTtFQUNKLFlBQVc7RUFDWCxnQkFBWTtBQ0NoQjs7QUFFQTtFRENJLGFBQVU7RUFDViw2QkFBb0I7RUFBRSxpQkFBQSxFQUFBLGlCQUFBO0VDRXhCLHlCQUF5QjtFREF2QixrQkFBWTtFQUNmLGVBQUE7RUNFQyw0QkFBNEI7RURBOUIsaUJBQU87RUFDSCxrQkFBWTtFQUNmLE1BQUE7RUNFQyxRQUFRO0VBQ1IsT0FBTztFQUNQLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsaUJBQWlCLEVBQUUsNENBQTRDO0VBQy9ELHNCQUFzQixFQUFFLDRDQUE0QztFQUNwRSx5QkFBeUIsQ0FBQyw0Q0FBNEM7RUFDdEUscUJBQXFCLENBQUMsNENBQTRDO0FBQ3BFOztBQUVBO0VBQ0UsT0FBTztBQUNUOztBQUVBO0VBQ0UsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixRQUFRO0FBQ1Y7O0FBRUE7RUFDRSxvRUFBdUQ7RUFDdkQsMEJBQTBCO0VBQzFCLFVBQVU7RUFDVixxQ0FBcUM7RUFDckMsa0NBQWtDO0VBQ2xDLGdDQUFnQztFQUNoQyxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxrQkFBa0I7RUFD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Q1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jdXJzb3IuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9jdXJzb3IuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiaW1wb3J0IHN0eWxlIGZyb20gJy4uL2Nzcy9jdXJzb3IuY3NzJztcclxuaW1wb3J0IGZpZ3VyZTEgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTEuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTIgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTIuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTMgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTMuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTQgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTQuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTUgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTUuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTYgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTYuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTcgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTcuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTggZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTguc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTkgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTkuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTEwIGZyb20gJy4uL2ltYWdlcy9maWd1cmUxMC5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTEgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTExLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxMiBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTIuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTEzIGZyb20gJy4uL2ltYWdlcy9maWd1cmUxMy5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTQgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTE0LnN2Zyc7XHJcbmltcG9ydCBzdGFycyBmcm9tICcuLi9pbWFnZXMvc3RhcnMuc3ZnJztcclxuaW1wb3J0IHsgYm9keSwgaGVhZGVyLCBjdXJzb3IsIGNvcm9uYUNpcmNsZSwgZXllcyB9IGZyb20gJy4vY3Vyc29yQW5kQ29yb25hJztcclxuaW1wb3J0IHsgc2Vjb25kc0ZvckVhY2hTdGFnZSwgcEZhaWx1cmUsIHBGYWlsdXJlQW5vbiwgcCwgcEFub24gfSBmcm9tICcuL3N0b3J5TGluZSc7XHJcbmltcG9ydCB7IHN0b3BXb3JraW5nLCBvdXJWaWV3UG9ydFdpZHRoLCBvdXJWaWV3UG9ydEhlaWdodCwgbW92ZSB9IGZyb20gJy4vZmlndXJlc01vdmVtZW50JztcclxuXHJcblxyXG5jb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXInKTtcclxuY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBmb3JtICNzdGFydEJ1dHRvbicpO1xyXG5jb25zdCB0b3BFeWVzaGFkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b3BFeWVzaGFkZScpO1xyXG5jb25zdCBib3R0b21FeWVzaGFkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNib3R0b21FeWVzaGFkZScpO1xyXG5jb25zdCB0aW55Q2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW55Q2lyY2xlJyk7XHJcbmNvbnN0IGNvcm9uYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JvbmEnKTtcclxuY29uc3QgdGlueUNpcmNsZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW55Q2lyY2xlQ29udGFpbmVyJyk7XHJcbmNvbnN0IGZvcm1MYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMgZm9ybSBsYWJlbCcpO1xyXG5jb25zdCBmb3JtVGV4dElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBmb3JtICNuaWNrbmFtZScpO1xyXG5jb25zdCBpbnN0cnVjdGlvbnNQVGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBwJyk7XHJcbmxldCBuaWNrbmFtZTtcclxubGV0IHN0YWdlID0gMDsvL3dpbGwgZ28gaW5zaWRlIHRoZSBsZXZlbCB0YWdcclxuY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucycpO1xyXG5sZXQgZmlndXJlcyA9IFtdOyAvL2ZpZ3VyZTEsIGZpZ3VyZTIuLi5cclxubGV0IGZpZ3VyZXNEaXZzID0gW107XHJcbmxldCBudW1zT2ZGaWdzID0gW107Ly9mb3IgZXhhbXBsZTogWzEsIDIsIDMsIDQsIDUsIDYsIDddIGRlcGVuZHMgb24gdGhlIG1heCBudW1iZXIgb2YgZmlndXJlcyBpbiBlYWNoIGxldmVsXHJcbmxldCB1c2VyU2NvcmUgPSAwO1xyXG5jb25zdCBib251c0Fycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyICNib251c0Fycm93Jyk7XHJcblxyXG5cclxuXHJcbi8vc3RhcnRpbmcgdGhlIGdhbWVcclxuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgXHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7Ly9wcmV2ZW50IHJlZnJlc2hpbmcgdGhlIHBhZ2UgKGR1ZSB0byB0aGUgZm9ybSlcclxuXHJcbiAgICBzdG9wV29ya2luZygwKTtcclxuXHJcbiAgICAvL2FkZGluZyBudW1iZXJzIHRvIG51bXNPZkZpZ3MgYXJyYXkgKHVzdWFsbHkgaXQgaXMgb25lIGZpZ3VyZSBsZXNzIHRoZW4gdGhlIG51bWJlciBvZiBzZWNvbmRzKVxyXG4gICAgZm9yIChsZXQgeiA9IDE7IHogPCBzZWNvbmRzRm9yRWFjaFN0YWdlW3N0YWdlXTsgeisrKXtcclxuICAgICAgICBudW1zT2ZGaWdzLnB1c2goeik7XHJcbiAgICB9XHJcbiAgICBpZiAoc3RhZ2UgPT0gMil7XHJcbiAgICAgICAgbnVtc09mRmlncy5wdXNoKHNlY29uZHNGb3JFYWNoU3RhZ2Vbc3RhZ2VdKTsvL2luIGxldmVsIDIgdGhlIG51bWJlciBvZiBmaWd1cmVzIGVxdWFsbCB0byB0aGUgbnVtYmVyIG9mIHNlY29uZHNcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vZGVmaW5pbmcgdGhlIGZpZ3VyZXMnIGFycmF5c1xyXG4gICAgbnVtc09mRmlncy5mb3JFYWNoKG51bSA9PiB7XHJcbiAgICAgICAgLy9hZGRpbmcgZmlndXJlcyBpbnRvIHRoZSBmaWd1cmVzIGFycmF5XHJcbiAgICAgICAgZmlndXJlcy5wdXNoKCdmaWd1cmUnK251bSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jcmVhdGluZyBmaWd1cmVzIGRpdiB0YWdzIGluIHRoZSBodG1sXHJcbiAgICAgICAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnZmlndXJlcycpO1xyXG4gICAgICAgIGkuc2V0QXR0cmlidXRlKCdpZCcsICdmaWd1cmUnK251bSk7XHJcbiAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoaSwgZm9vdGVyKTtcclxuICAgICAgICBmaWd1cmVzRGl2cy5wdXNoKGkpO1xyXG5cclxuICAgIH0pO1xyXG4gICAgIFxyXG4gICAgLy9wdXR0aW5nIHRoZSBuaWNrbmFtZSBpbiBsb2NhbCBzdG9yYWdlXHJcbiAgICBuaWNrbmFtZSA9IGRvY3VtZW50LmZvcm1zLm5pY2tuYW1lRm9ybS5uaWNrbmFtZS52YWx1ZTtcclxuICAgIGxldCBsb2NhbE5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpO1xyXG5cclxuICAgIGlmIChuaWNrbmFtZSAhPSAnJyl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hbWUnLCBuaWNrbmFtZSk7XHJcbiAgICAgICAgbG9jYWxOYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvIFwiICtsb2NhbE5hbWUpO1xyXG4gICAgfSBlbHNlIGlmIChuaWNrbmFtZSA9PSAnJyl7XHJcbiAgICAgICAgaWYgKGxvY2FsTmFtZSAhPSBudWxsKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyBcIiArbG9jYWxOYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2NhbE5hbWUgPSAnJztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyBcIiArIGxvY2FsTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vd2Ugd2lsbCByZW1vdmUgcGFydHMgb2YgdGhlIGZvcm0gdGhhdCB3ZSB3b24ndCBuZWVkIGFueSBtb3JlXHJcbiAgICBmb3JtTGFiZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGZvcm1UZXh0SW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIFxyXG5cclxuICAgIC8vdGhlIGNvcm9uYSBhcHBlYXJzXHJcbiAgICBjb3JvbmEuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSlcclxuICAgIC8vdGhlIHNtYWxsIGNpcmNsZXMgb2YgdGhlIGNvcm9uYSBhcHBlYXJcclxuICAgIHRpbnlDaXJjbGVDb250YWluZXIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgIH0pXHJcbiAgICBcclxuICAgIGluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgIC8vdGhlIGNvcm9uYSdzIGV5ZXMgd2lsbCBnZXQgY2xvc2VkIGFuZCB0dXJuL2xvb2sgdG8gdGhlIG90aGVyIHNpZGVcclxuICAgIHRvcEV5ZXNoYWRlLnN0eWxlLmFuaW1hdGlvbiA9ICdzaHV0VG9wRXllc2hhZGUgMi41cyAwLjY1cyBlYXNlIGluZmluaXRlIG5vcm1hbCc7XHJcbiAgICBib3R0b21FeWVzaGFkZS5zdHlsZS5hbmltYXRpb24gPSAnc2h1dEJvdHRvbUV5ZXNoYWRlIDIuNXMgMC42NXMgZWFzZSBpbmZpbml0ZSBub3JtYWwnO1xyXG4gICAgZXllcy5zdHlsZS5hbmltYXRpb24gPSAndHVybkV5ZXMgNXMgMC45MjVzIGVhc2UgaW5maW5pdGUgbm9ybWFsJzsgXHJcblxyXG4gICAgLy90aGUgc2NvcmUgc2VjdGlvbiBhcHBlYXJzOlxyXG4gICAgaGVhZGVyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICBoZWFkZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JzsgXHJcbiAgICBjb25zdCBzY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlciAjc2NvcmUgc3BhbicpO1xyXG4gICAgc2NvcmUudGV4dENvbnRlbnQgPSB1c2VyU2NvcmU7XHJcbiAgICBsZXQgeSA9IDA7XHJcbiAgICAvL3RoZSBuZXh0IGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGJ5OiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9wYWNpdHlDaGFuZ2UpO1xyXG4gICAgLy9hbmQgaXQgd2lsbCB0ZWxsIHRoZSBicm93c2VyIHRoYXQgSSB3aXNoIHRvIHBlcmZvcm0gYW4gYW5pbWF0aW9uIHdpdGggdGhlIG9wYWNpdHlcclxuICAgIGNvbnN0IG9wYWNpdHlDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgeSA9IHkgKyAwLjAzO1xyXG4gICAgICAgIGhlYWRlci5zdHlsZS5vcGFjaXR5ID0gYCR7eX1gO1xyXG5cclxuICAgICAgICBpZiAoaGVhZGVyLnN0eWxlLm9wYWNpdHkgPCAnMScpe1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUob3BhY2l0eUNoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUob3BhY2l0eUNoYW5nZSk7XHJcblxyXG5cclxuICAgIC8vdGhlIHRpbWVyIGFwcGVhcnNcclxuICAgIGNvbnN0IHRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWVyJyk7XHJcbiAgICB0aW1lci5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7Ly9pbiBvcmRlciB0byByZXNldCB0aGUgYW5pbWF0aW9uIG9mIHRoZSBlbmQgb2YgdGhlIGxldmVsXHJcbiAgICB0aW1lci5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb25Jc09uJyk7Ly9icmluZ2luZyBiYWNrIHRoZSBvcmlnaW5hbCBjbGFzc05hbWVcclxuICAgIHRpbWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvblJlbW92ZWQnKTsvL2EgdGVtcG9yYXJ5IGNsYXNzTmFtZSB3ZSBhZGRlZCB0byB0aGUgdGltZXIgYXQgdGhlIGVuZCBvZiB0aGUgbGV2ZWwgKG5vdyB3ZSdyZSByZW1vdmluZyBpdClcclxuICAgIGxldCBzZWNvbmRzID0gc2Vjb25kc0ZvckVhY2hTdGFnZVtzdGFnZV07XHJcbiAgICB0aW1lci50ZXh0Q29udGVudCA9IHNlY29uZHM7ICBcclxuICAgIHRpbWVyLnN0eWxlLmFuaW1hdGlvbiA9IGB0aW1lckdyb3dzIDFzICR7c2Vjb25kcysxfSBlYXNlIG5vcm1hbGA7XHJcbiAgICBcclxuICAgIC8vdGhlIHN0YWdlIGFwcGVhcnMgb24gc2NyZWVuXHJcbiAgICBjb25zdCBsZXZlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlciAjbGV2ZWwgc3BhbicpO1xyXG4gICAgbGV2ZWwudGV4dENvbnRlbnQgPSBzdGFnZSsxO1xyXG5cclxuICAgIC8vcmVzZXR0aW5nIHRoZSBib251c0Fycm93IGFuaW1hdGlvbiBmcm9tIHRoZSBlbmQgb2YgdGhlIGxldmVsLCBzbyBpdCdsbCBiZSBhYmxlIHRvIHdvcmsgYWdhaW5cclxuICAgIGJvbnVzQXJyb3cuc3R5bGUuYW5pbWF0aW9uID0gJ25vbmUnO1xyXG4gICAgYm9udXNBcnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpb25SZW1vdmVkJyk7XHJcbiAgICBib251c0Fycm93LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvbklzT24nKTtcclxuXHJcblxyXG4gICAgLy9mdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIGZyb20gdGhlIGNvdW50RG93biBmdW5jdGlvbiBcclxuICAgIC8vYW5kIGFsc28gZnJvbSB0aGUgY2hlY2sgZnVuY3Rpb25cclxuICAgIGNvbnN0IGNoZWNrQmFja2dyb3VuZCA9IChmaWd1cmVEaXYpID0+IHtcclxuICAgICAgICByZXR1cm4gZmlndXJlRGl2LnN0eWxlLmJhY2tncm91bmQuaW5jbHVkZXMoJ3N0YXJzLnN2ZycpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL2NvdW50RG93biBmdW5jdGlvbiBmb3IgdGhlIHRpbWVyIGFuZCBjaGFuZ2luZyB0aGUgY29yb25hJ3MgY29sb3Igd2hlbiBub3QgYWxsIGZpZ3VyZXMgd2VyZSBjbGlja2VkXHJcbiAgICBjb25zdCBjb3VudERvd24gPSAoKSA9PiB7XHJcbiAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgLSAxOyAgXHJcbiAgICAgICAgdGltZXIudGV4dENvbnRlbnQgPSBzZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvdW50RG93bkludGVydmFsID0gc2V0SW50ZXJ2YWwoY291bnREb3duLCAxMDAwKTsgLy9mdW5jdGlvbiBmb3IgdGhlIHRpbWVyXHJcblxyXG5cclxuICAgIGZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50RmlndXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycrZmlndXJlKTtcclxuXHJcbiAgICAgICAgLy9hZGRpbmcgYSBiYWNrZ3JvdW5kIGltYWdlIGZvciBlYWNoIGZpZ3VyZTpcclxuICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCcuLyR7ZmlndXJlfS5zdmcnKWA7IFxyXG4gICAgICAgIC8vcHV0dGluZyB0aGUgZmlndXJlcyBpbiBkaWZmZXJlbnQgcGxhY2VzIGF0IHN0YXJ0aW5nIHBvaW50XHJcbiAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSBNYXRoLnJhbmRvbSgpKihib2R5LmNsaWVudEhlaWdodCAtIDU2KSArICdweCc7IC8vNTYgaXMgdGhlIHNpemUgb2YgdGhlIGZpZ3VyZXMuIGJvZHkuY2xpZW50SGVpZ2h0IGdpdmVzIHRoZSB2aWV3cG9ydCBzaXplIHdpdGhvdXQgdGhlIHNjcm9sbCBiYXJcclxuICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSBNYXRoLnJhbmRvbSgpKihib2R5LmNsaWVudFdpZHRoIC0gNTYpICsgJ3B4JzsgLy81NiBpcyB0aGUgc2l6ZSBvZiB0aGUgZmlndXJlcy5cclxuICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIC8vc3RhcnRpbmcgdG8gbW92ZSB0aGUgZmlndXJlcyBpbiBkaWZmZXJlbnQgZGlyZWN0aW9uczpcclxuICAgICAgICBtb3ZlKGZpZ3VyZSk7XHJcblxyXG4gICAgICAgIC8vZnVuY3Rpb24gZm9yIGNsaWNraW5nIGEgZmlndXJlXHJcbiAgICAgICAgY29uc3Qgc3RhcnNBbmRQb2ludHMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFyc0FuZFBvaW50cyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoLi9zdGFycy5zdmcpJztcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5hbmltYXRpb24gPSAnZmlyZXdvcmtzIDAuNzVzIGVhc2UgZm9yd2FyZHMgbm9ybWFsJztcclxuICAgICAgICAgICAgdXNlclNjb3JlICs9IDEwO1xyXG4gICAgICAgICAgICBzY29yZS50ZXh0Q29udGVudCA9IHVzZXJTY29yZTtcclxuICAgICAgICAgICAgLy9kZWxldGluZyB0aGUgZmlndXJlIGZyb20gdGhlIERPTVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUucmVtb3ZlKCk7IFxyXG4gICAgICAgICAgICB9LCA3NTEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hZGRpbmcgZXZlbnRMaXN0ZW5lciBmb3IgZWFjaCBmaWd1cmUgYW5kIGFkanVzdGluZyB0aGUgc2NvcmVcclxuICAgICAgICBjdXJyZW50RmlndXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnNBbmRQb2ludHMpO1xyXG5cclxuICAgICAgICAvL2Z1bmN0aW9uIHRoYXQgcHJldmVudHMgY2xpY2tpbmcgb24gZmlndXJlcywgd2hpbGUgdGhlIGFtYnVsYW5jZXMgY29tZVxyXG4gICAgICAgIGNvbnN0IHByZXZlbnRDbGljayA9ICgpID0+IHtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJzQW5kUG9pbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYXQgdGhlIGVuZCBvZiB0aGUgc3RhZ2UgdGhlIHVzZXIgd29uJ3QgYmUgYWJsZSB0byBjbGljayB0aGUgZmlndXJlc1xyXG4gICAgICAgIHNldFRpbWVvdXQocHJldmVudENsaWNrLCBzZWNvbmRzRm9yRWFjaFN0YWdlW3N0YWdlXSoxMDAwKTtcclxuXHJcbiAgICB9KVxyXG5cclxuXHJcblxyXG4gICAgLy9mdW5jdGlvbiB0aGF0IHdvcmtzIGFmdGVyIHRoZSB1c2VyIGZhaWxlZFxyXG4gICAgY29uc3QgZmFpbGluZ1Byb2NlZHVyZSA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgc3RvcFdvcmtpbmcoMSk7ICAgXHJcblxyXG4gICAgICAgIC8vbWFraW5nIHRoZSBjb2xvciBvZiB0aGUgY29yb25hIHJhbmRvbWx5IGRpZmZlcmVudFxyXG4gICAgICAgIGxldCBoID0gTWF0aC5yYW5kb20oKSAqIDM1OTsgLy90aGUgSCBvZyB0aGUgaHNsIGlzIDAtMzU5XHJcbiAgICAgICAgbGV0IHMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoODAgLSAyNiArIDEpICsgMjYpOy8vSSBkZWNpZGVkIHRoYXQgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIFMgaW4gaHNsIHdpbGwgYmUgYmV0d2VlbiAyNiBhbmQgODAgKGJlY2F1c2UgaSBkb24ndCBsaWtlIG1pbiBzYXR1cmF0aW9uIGFuZCBtYXggc2F0dXJhdGlvbilcclxuICAgICAgICBsZXQgbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg3NSAtIDM1ICsgMSkgKyAzNSk7Ly9JIGRlY2lkZWQgdGhhdCB0aGUgcGVyY2VudGFnZSBvZiB0aGUgTCBpbiBoc2wgd2lsbCBiZSBiZXR3ZWVuIDM1IGFuZCA3NSAobm90IHRvbyBsaWdodCBhbmQgbm90IHRvbyBkYXJrKVxyXG4gICAgICAgIHRpbnlDaXJjbGVzLmZvckVhY2goY2lyY2xlID0+IHtcclxuICAgICAgICAgICAgY2lyY2xlLnN0eWxlLmJhY2tncm91bmQgPSBgaHNsKCR7aH0sICR7c30lLCAke2x9JSlgO1xyXG4gICAgICAgIH0pOyAgIFxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vcmVtb3ZpbmcgdGhlIG9yaWdpbmFsIGNsYXNzIGZyb20gdGhlIHRpbWVyLCByZXNldHMgaXRzIGFuaW1hdGlvblxyXG4gICAgICAgIC8vYW5kIGxldHMgdGhlIGFuaW1hdGlvbiB3b3JrIGFnYWluIG5leHQgbGV2ZWwgKGFmdGVyIGFkZGluZyB0aGUgb2xkIGNsYXNzTmFtZSBiYWNrKVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aW1lci5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRpbWVyLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvblJlbW92ZWQnKTtcclxuICAgICAgICAgICAgdGltZXIuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW9uSXNPbicpO1xyXG4gICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgZmlndXJlc0RpdnMuZm9yRWFjaChmaWd1cmVEaXYgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGZpZ3VyZURpdi5zdHlsZS5iYWNrZ3JvdW5kLmluY2x1ZGVzKCdmaWd1cmUnKSl7XHJcbiAgICAgICAgICAgICAgICBmaWd1cmVEaXYuc3R5bGUudG9wID0gcGFyc2VJbnQoZmlndXJlRGl2LnN0eWxlLnRvcCkgKyAncHgnOyAvL3RoZSBtZXRob2QgcGFyc2VJbnQgdGFrZXMgb25seSB0aGUgbnVtYmVyIChhbmQgbGVhdmVzIG91dCB0aGUgc3RyaW5nICdweCcgYXR0YWNoZWQgdG8gaXQpIFxyXG4gICAgICAgICAgICAgICAgZmlndXJlRGl2LnN0eWxlLmxlZnQgPSBwYXJzZUludChmaWd1cmVEaXYuc3R5bGUubGVmdCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY3JlYXRpbmcgYW1idWxhbmNlcyBhbmQgcHV0dGluZyB0aGVtIDgwcHggbGVmdCB0byBlYWNoIGZpZ3VyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgaS5jbGFzc0xpc3QuYWRkKCdhbWJ1bGFuY2UnKTtcclxuICAgICAgICAgICAgICAgIGJvZHkuaW5zZXJ0QmVmb3JlKGksIGZvb3Rlcik7XHJcbiAgICAgICAgICAgICAgICBpLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuICAgICAgICAgICAgICAgIGkuc3R5bGUudG9wID0gZmlndXJlRGl2LnN0eWxlLnRvcDtcclxuICAgICAgICAgICAgICAgIGkuc3R5bGUubGVmdCA9IChwYXJzZUludChmaWd1cmVEaXYuc3R5bGUubGVmdCkgLSA4MCkgKyBcInB4XCI7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpZ3VyZUVudGVyc0FtYnVsYW5jZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeiA8IDIwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZ3VyZURpdi5zdHlsZS50b3AgPSBwYXJzZUludChmaWd1cmVEaXYuc3R5bGUudG9wKSArIDEgKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB6ICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCA1ICBcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vbW92aW5nIHRoZSBhbWJ1bGFuY2UgZnJvbSB0aGUgbGVmdCBvZiB0aGUgZmlndXJlIHRvd2FyZHMgdGhlIGZpZ3VyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbW92aW5nQW1idWxhbmNlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICggcGFyc2VJbnQoaS5zdHlsZS5sZWZ0KSA8IHBhcnNlSW50KGZpZ3VyZURpdi5zdHlsZS5sZWZ0KSApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoaS5zdHlsZS5sZWZ0KSArIDEpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIC8vbW92aW5nQW1idWxhbmNlUGFydDIgd2lsbCBjYWxsIHRoaXMgZnVuY3Rpb246XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlUmlnaHQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaS5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KGkuc3R5bGUubGVmdCkgKyAxKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIC8vbW92aW5nIHRoZSBhbWJ1bGFuY2UgZnJvbSB0aGUgZmlndXJlIHRvIHRoZSByaWdodCBzaWRlIG9mIHRoZSBzY3JlZW5cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vdmluZ0FtYnVsYW5jZVBhcnQyID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KGkuc3R5bGUubGVmdCkgPCBvdXJWaWV3UG9ydFdpZHRoKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW92aW5nUmlnaHQgPSBzZXRJbnRlcnZhbChtb3ZlUmlnaHQsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS5zdHlsZS5hbmltYXRpb24gPSAnZGlzYXBwZWFycyAzcyBlYXNlIGZvcndhcmRzIG5vcm1hbCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEludGVydmFsKCgpID0+IGNsZWFySW50ZXJ2YWwobW92aW5nUmlnaHQpLCAzMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZmlndXJlRW50ZXJzQW1idWxhbmNlLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgIGZpZ3VyZURpdi5zdHlsZS5hbmltYXRpb24gPSAnZmlndXJlQmVjb21lc01pbmkgMC41cyAxLjJzIGVhc2UgZm9yd2FyZHMgbm9ybWFsJztcclxuICAgICAgICAgICAgICAgIHNldEludGVydmFsKG1vdmluZ0FtYnVsYW5jZSwgMTUpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChtb3ZpbmdBbWJ1bGFuY2VQYXJ0MiwgMTcwMCk7XHJcbiAgICAgICAgICAgICAgICAvL2NsZWFuaW5nIGFsbCBmaWd1cmVzIGFuZCBmaWd1cmVzIGFycmF5cyBhZnRlciB0aGV5IGVudGVyZWQgdGhlIGFtYnVsYW5jZVxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlndXJlc0RpdnMuZm9yRWFjaChmaWd1cmUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWd1cmUucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmaWd1cmVzID0gW107IFxyXG4gICAgICAgICAgICAgICAgICAgIGZpZ3VyZXNEaXZzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtc09mRmlncyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfSwgMTcwMCk7XHJcbiAgICAgICAgICAgICAgICAvL2NsZWFuaW5nIHRoZSBhbWJ1bGFuY2VzIGFmdGVyIHRoZXkgZmluaXNoZWQgdGhlaXIgd29ya1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYW1idWxhbmNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hbWJ1bGFuY2UnKTtcclxuICAgICAgICAgICAgICAgICAgICBhbWJ1bGFuY2VzLmZvckVhY2goYW1idWxhbmNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW1idWxhbmNlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9LCA0NzAwKTtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KVxyXG5cclxuICAgICAgICAvL2JyaW5naW5nIGJhY2sgdGhlIGluc3RyYWN0aW9uJ3MgYm94XHJcbiAgICAgICAgY29uc3QgYnJpbmdpbmdCYWNrSW5zdHJ1Y3Rpb25zID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYobG9jYWxOYW1lID09ICcnKXtcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc1BUYWcudGV4dENvbnRlbnQgPSBcIllvdSBmYWlsZWQgYW5kIGEgbmV3IHZhcmlhbnQgaXMgc3ByZWFkaW5nIG5vdywgYnV0IGRvbid0IHdvcnJ5LCB5b3UgY2FuIHRyeSBhZ2FpbiBhbmQgcHJldmVudCBhIHdvcmxkIGNhdGFzdHJvcGhlLlwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAgICBcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc1BUYWcudGV4dENvbnRlbnQgPSBsb2NhbE5hbWUgKyAnLCcgKyBcIiB5b3UgZmFpbGVkIGFuZCBhIG5ldyB2YXJpYW50IGlzIHNwcmVhZGluZyBub3csIGJ1dCBkb24ndCB3b3JyeSwgeW91IGNhbiB0cnkgYWdhaW4gYW5kIHByZXZlbnQgYSB3b3JsZCBjYXRhc3Ryb3BoZS5cIjsgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS50b3AgPSAnY2FsYygzMCUgKyA0cHgpJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmFuaW1hdGlvbiA9ICdpbnN0cnVjdGlvbnNBcHBlYXJzIDIuNXMgZWFzZSBmb3J3YXJkcyBub3JtYWwnOyAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBzZXRUaW1lb3V0KGJyaW5naW5nQmFja0luc3RydWN0aW9ucywgMjAwMCk7XHJcbiAgICB9XHJcbiAgIFxyXG5cclxuICAgIC8vZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgYWxsIHRoZSBmaWd1cmVzIHdlcmUgY2xpY2tlZCBvciBpZiB0aGUgdGltZSBvZiB0aGUgbGV2ZWwgZW5kZWRcclxuICAgIGNvbnN0IGVuZExldmVsQ2hlY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGZpZ3VyZXNEaXZzLmV2ZXJ5KGNoZWNrQmFja2dyb3VuZCkpIHsgIC8vXCJldmVyeVwiIHJldHVybnMgdHJ1ZSBpZiB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIGZvciBhbGwgZWxlbWVudHMgaW4gdGhlIGFycmF5IChpZiBhbGwgZmlndXJlcyBiZWNhbWUgc3RhcnMpXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZW5kTGV2ZWwpO1xyXG4gICAgICAgICAgICBzdG9wV29ya2luZygxKTsgLy90aGUgc3RhcnMgd2lsbCBzdG9wIG1vdmluZ1xyXG4gICAgICAgICAgICBzdGFnZSArPSAxO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGNvdW50RG93bkludGVydmFsKTsgLy90aGUgY2xvY2sgd2lsbCBzdG9wXHJcbiAgICAgICAgICAgIHRpbWVyLnN0eWxlLmFuaW1hdGlvbiA9ICdub25lJztcclxuICAgICAgICAgICAgdGltZXIuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uUmVtb3ZlZCcpO1xyXG4gICAgICAgICAgICB0aW1lci5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpb25Jc09uJyk7Ly9yZW1vdmluZyB0aGlzIGNsYXNzIHJlc2V0cyB0aGUgYW5pbWF0aW9uIGZvciB0aGlzIGVsZW1lbnQgYW5kIGxldHMgdXMgdXNlIGl0IGFnYWluIGFmdGVyIGFkZGluZyB0aGlzIGNsYXNzIGJhY2tcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWNvbmRzICE9IDApIHtcclxuICAgICAgICAgICAgICAgIHRpbWVyLnN0eWxlLmFuaW1hdGlvbiA9IGB0aW1lckdyb3dzQWdhaW4gMXMgJHtzZWNvbmRzfSBlYXNlIG5vcm1hbGA7XHJcblxyXG4gICAgICAgICAgICAgICAgYm9udXNBcnJvdy5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgYm9udXNBcnJvdy5zdHlsZS5hbmltYXRpb24gPSBgYXJyb3dHcm93cyAxcyAke3NlY29uZHN9IGVhc2Ugbm9ybWFsYDtcclxuICAgICAgICAgICAgICAgIGJvbnVzQXJyb3cuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uUmVtb3ZlZCcpO1xyXG4gICAgICAgICAgICAgICAgYm9udXNBcnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpb25Jc09uJyk7Ly9yZW1vdmluZyB0aGlzIGNsYXNzIHJlc2V0cyB0aGUgYW5pbWF0aW9uIGZvciB0aGlzIGVsZW1lbnQgYW5kIGxldHMgdXMgdXNlIGl0IGFnYWluIGFmdGVyIGFkZGluZyB0aGlzIGNsYXNzIGJhY2tcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9udXNBcnJvdy5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgICAgICAgICAgfSwgKHNlY29uZHMqMTAwMCkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBib251cyA9IChzZWNvbmRzICogMTApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaSA9IDE7XHJcbiAgICAgICAgICAgICAgICBsZXQgY291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgICAgICAgICBjb3VudCA9IGNvdW50ICsgaTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPD0gYm9udXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyU2NvcmUgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUudGV4dENvbnRlbnQgPSB1c2VyU2NvcmU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vY2xlYW5pbmcgdGhlIGZpZ3VyZXMgYXJyYXlzIChpbiBvcmRlciB0byBnZXQgcmVhZHkgZm9yIG5leHQgbGV2ZWwpOlxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZpZ3VyZXMgPSBbXTsgXHJcbiAgICAgICAgICAgICAgICBmaWd1cmVzRGl2cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbnVtc09mRmlncyA9IFtdO1xyXG4gICAgICAgICAgICB9LCA3NTEpOyAvL2FmdGVyIHRoZSBsYXN0IGZpcmV3b3JrIGVuZGVkIGl0cyB3b3JrXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2hpZGluZyB0aGUgY29yb25hXHJcbiAgICAgICAgICAgIGNvcm9uYS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9icmluZ2luZyBiYWNrIHRoZSBpbnN0cmFjdGlvbidzIGJveFxyXG4gICAgICAgICAgICBpZihsb2NhbE5hbWUgPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zUFRhZy50ZXh0Q29udGVudCA9IHBBbm9uW3N0YWdlXTsgLy9wQW5vbiBpcyB0aGUgdGV4dCBhcHBlYXJzIGluIHN0b3J5TGluZS5qc1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zUFRhZy50ZXh0Q29udGVudCA9IGxvY2FsTmFtZSArICcsICcgKyBwW3N0YWdlXTsgLy8vL3AgaXMgdGhlIHRleHQgYXBwZWFycyBpbiBzdG9yeUxpbmUuanNcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUudG9wID0gJzIyJSc7XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS5hbmltYXRpb24gPSAnaW5zdHJ1Y3Rpb25zQXBwZWFycyAycyBlYXNlIGZvcndhcmRzIG5vcm1hbCc7ICAgICAgICAgICAgXHJcblxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHNlY29uZHMgPT0gMCAmJiBmaWd1cmVzRGl2cy5ldmVyeShjaGVja0JhY2tncm91bmQpID09IGZhbHNlKSB7IC8vaWYgbm90IGFsbCBmaWd1cmVzIGJlY2FtZSBzdGFycyBhbmQgdGhlIHNlY29uZHMgZW5kZWRcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChlbmRMZXZlbCk7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY291bnREb3duSW50ZXJ2YWwpOyAvL3RoZSBjbG9jayB3aWxsIHN0b3BcclxuICAgICAgICAgICAgZmFpbGluZ1Byb2NlZHVyZSgpOy8vZnVuY3Rpb24gdGhhdCBicmluZ3MgdGhlIGFtYnVsYW5jZXNcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0IGVuZExldmVsID0gc2V0SW50ZXJ2YWwoZW5kTGV2ZWxDaGVjaywgMSk7IFxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iXSwibmFtZXMiOlsiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImhlYWRlciIsImN1cnNvciIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwic2V0QXR0cmlidXRlIiwicGFnZVkiLCJwYWdlWCIsImF4aXMiLCJjb3JvbmFDaXJjbGUiLCJhbmdsZSIsImZvckVhY2giLCJlbGVtZW50IiwiaSIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbnNlcnRCZWZvcmUiLCJuZXh0U2libGluZyIsInN0eWxlIiwidHJhbnNmb3JtIiwibiIsInRvcCIsImJvdHRvbSIsInJpZ2h0IiwibGVmdCIsImNvbnRhaW5lckFuZ2xlIiwibSIsImwiLCJjdXJyZW50Q29udGFpbmVyIiwiYXBwZW5kIiwiZXllcyIsInoiLCJ5Iiwic2Vjb25kc0ZvckVhY2hTdGFnZSIsInBGYWlsdXJlIiwicEZhaWx1cmVBbm9uIiwicCIsInBBbm9uIiwic3RvcCIsInN0b3BXb3JraW5nIiwiYmluYXJ5Iiwib3VyVmlld1BvcnRXaWR0aCIsImNsaWVudFdpZHRoIiwib3VyVmlld1BvcnRIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJjb25zb2xlIiwibG9nIiwibW92ZSIsImZpZ3VyZSIsInJhbmRvbUludFgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21JbnRZIiwiY3VycmVudEZpZ3VyZSIsImZpZ3VyZU1vdmVtZW50IiwiY2xlYXJJbnRlcnZhbCIsIm1vdmVtZW50SW50ZXJ2YWwiLCJvZmZzZXRUb3AiLCJvZmZzZXRMZWZ0IiwicGFyc2VJbnQiLCJiYWNrZ3JvdW5kIiwic2V0SW50ZXJ2YWwiLCJmaWd1cmUxIiwiZmlndXJlMiIsImZpZ3VyZTMiLCJmaWd1cmU0IiwiZmlndXJlNSIsImZpZ3VyZTYiLCJmaWd1cmU3IiwiZmlndXJlOCIsImZpZ3VyZTkiLCJmaWd1cmUxMCIsImZpZ3VyZTExIiwiZmlndXJlMTIiLCJmaWd1cmUxMyIsImZpZ3VyZTE0Iiwic3RhcnMiLCJmb290ZXIiLCJidXR0b24iLCJ0b3BFeWVzaGFkZSIsImJvdHRvbUV5ZXNoYWRlIiwidGlueUNpcmNsZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29yb25hIiwidGlueUNpcmNsZUNvbnRhaW5lciIsImZvcm1MYWJlbCIsImZvcm1UZXh0SW5wdXQiLCJpbnN0cnVjdGlvbnNQVGFnIiwibmlja25hbWUiLCJzdGFnZSIsImluc3RydWN0aW9ucyIsImZpZ3VyZXMiLCJmaWd1cmVzRGl2cyIsIm51bXNPZkZpZ3MiLCJ1c2VyU2NvcmUiLCJib251c0Fycm93IiwicHJldmVudERlZmF1bHQiLCJwdXNoIiwibnVtIiwiZm9ybXMiLCJuaWNrbmFtZUZvcm0iLCJ2YWx1ZSIsImxvY2FsTmFtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwiZGlzcGxheSIsImFuaW1hdGlvbiIsIm9wYWNpdHkiLCJzY29yZSIsInRleHRDb250ZW50Iiwib3BhY2l0eUNoYW5nZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndpbmRvdyIsInRpbWVyIiwicmVtb3ZlIiwic2Vjb25kcyIsImxldmVsIiwiY2hlY2tCYWNrZ3JvdW5kIiwiZmlndXJlRGl2IiwiaW5jbHVkZXMiLCJjb3VudERvd24iLCJjb3VudERvd25JbnRlcnZhbCIsInN0YXJzQW5kUG9pbnRzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJwcmV2ZW50Q2xpY2siLCJmYWlsaW5nUHJvY2VkdXJlIiwiaCIsInMiLCJjaXJjbGUiLCJwb3NpdGlvbiIsImZpZ3VyZUVudGVyc0FtYnVsYW5jZSIsIm1vdmluZ0FtYnVsYW5jZSIsIm1vdmVSaWdodCIsIm1vdmluZ0FtYnVsYW5jZVBhcnQyIiwibW92aW5nUmlnaHQiLCJhbWJ1bGFuY2VzIiwiYW1idWxhbmNlIiwiYnJpbmdpbmdCYWNrSW5zdHJ1Y3Rpb25zIiwiZW5kTGV2ZWxDaGVjayIsImV2ZXJ5IiwiZW5kTGV2ZWwiLCJib251cyIsImNvdW50Il0sInNvdXJjZVJvb3QiOiIifQ==