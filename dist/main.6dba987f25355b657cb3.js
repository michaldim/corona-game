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

/***/ "./src/css/cursor.css":
/*!****************************!*\
  !*** ./src/css/cursor.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 			// no module.id needed
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
/************************************************************************/
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
//import style from '../css/cursor.css';

























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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUEvQjtBQUdILEtBekRELE1BeURPLElBQUlTLE9BQU8sSUFBSSxDQUFYLElBQWdCeEIsV0FBVyxDQUFDZ0QsS0FBWixDQUFrQnRCLGVBQWxCLEtBQXNDLEtBQTFELEVBQWlFO0FBQUU7QUFDdEV6RSxNQUFBQSxhQUFhLENBQUNnRyxRQUFELENBQWI7QUFDQWhHLE1BQUFBLGFBQWEsQ0FBQzRFLGlCQUFELENBQWIsQ0FGb0UsQ0FFbEM7O0FBQ2xDSyxNQUFBQSxnQkFBZ0IsR0FIb0QsQ0FHakQ7QUFDdEI7QUFDSixHQS9ERDs7QUFrRUEsTUFBTWUsUUFBUSxHQUFHdkYsV0FBVyxDQUFDcUYsYUFBRCxFQUFnQixDQUFoQixDQUE1QjtBQUVILENBdldELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9zcmMvc2NyaXB0cy9jdXJzb3JBbmRDb3JvbmEuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vc3JjL3NjcmlwdHMvZmlndXJlc01vdmVtZW50LmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL3NyYy9zY3JpcHRzL3N0b3J5TGluZS5qcyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9zcmMvY3NzL2N1cnNvci5jc3M/NDE0OSIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vc3JjL3NjcmlwdHMvc3RhcnRHYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbmNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xyXG5jb25zdCBjdXJzb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3Vyc29yJyk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XHJcbiAgICAvL3RoZSBsb2NhdGlvbiBvZiB0aGUgc3lyaW5nZSBjdXJzb3JcclxuICAgIGN1cnNvci5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcInRvcDogXCIgKyAoZS5wYWdlWSArIDQpICsgXCJweDsgbGVmdDogXCIgKyAoZS5wYWdlWCAtIDUpICsgXCJweDtcIik7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5jb25zdCBheGlzID0gWzEsIDIsIDMsIDQsIDUsIDZdOyAvL2ZvciB0aGUgbGluZXMgdGhhdCBnbyBvdXQgb2YgdGhlIGNvcm9uYSdzIGNlbnRlclxyXG4vL2NvbnN0IGF4aXNEaXZzID0gW107IC8vY29udGFpbnMgYWxsIHRoZSBheGlzRGl2cyBvZiB0aGUgY29yb25hXHJcbi8vY29uc3QgdGlueUNpcmNsZXNDb250YWluZXJzRGl2cyA9IFtdO1xyXG5jb25zdCBjb3JvbmFDaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY2lyY2xlJyk7XHJcbmxldCBhbmdsZSA9IDA7XHJcblxyXG5cclxuYXhpcy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgLy9jcmVhdGluZyBkaXYgZm9yIGVhY2ggY29yb25hIGF4aXNcclxuICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgaS5jbGFzc0xpc3QuYWRkKCdjb3JvbmEnLCAnYXhpcycpOyAvL2FkZGluZyBjbGFzcyBuYW1lcyBmb3Igb3VyIGRpdlxyXG4gICAgaS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2F4aXMnK2VsZW1lbnQpOyAvL2FkZGluZyBpZCBmb3Igb3VyIGRpdlxyXG4gICAgYm9keS5pbnNlcnRCZWZvcmUoaSwgY29yb25hQ2lyY2xlLm5leHRTaWJsaW5nKTsvL3B1dHRpbmcgXCJpXCIgYWZ0ZXIgY29yb25hQ2lyY2xlXHJcbiAgICAvL2F4aXNEaXZzLnB1c2goaSk7IC8vcHV0dGluZyBvdXIgZGl2IGluc2lkZSBheGlzRGl2cyBhcnJheVxyXG4gICAgaS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWigke2FuZ2xlfWRlZylgO1xyXG4gICAgYW5nbGUgKz0gMzA7XHJcblxyXG4gICAgLy9jcmVhdGluZyBkaXYgZm9yIGVhY2ggY29udGFpbmVyIChjb250YWluZXJzIGZvciB0aGUgdGlueSBjaXJjbGVzKVxyXG4gICAgLy90aGVzZSBjb250YWluZXJzIHdpbGwgaGF2ZSBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBjb25zdCBuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIG4uY2xhc3NMaXN0LmFkZCgnY29yb25hJywgJ3RpbnlDaXJjbGVDb250YWluZXInKTsgLy9hZGRpbmcgY2xhc3MgbmFtZXMgZm9yIG91ciBkaXZcclxuICAgIG4uc2V0QXR0cmlidXRlKCdpZCcsICd0aW55Q2lyY2xlQ29udGFpbmVyJytlbGVtZW50KTsgLy9hZGRpbmcgaWQgZm9yIG91ciBkaXZcclxuICAgIGJvZHkuaW5zZXJ0QmVmb3JlKG4sIGhlYWRlcik7Ly9wdXR0aW5nIFwiblwiIGF0IHRoZSB0b3Agb2YgdGhlIHBhZ2UsIHNvIGl0IHdpbGwgYmUgZWFzaWVyIHRvIHB1dCBpdCBvbiB0aGUgYmlnIGNpcmNsZVxyXG4gICAgLy90aW55Q2lyY2xlc0NvbnRhaW5lcnNEaXZzLnB1c2gobik7IC8vcHV0dGluZyBvdXIgZGl2IGluc2lkZSB0aW55Q2lyY2xlc0NvbnRhaW5lcnNEaXZzIGFycmF5XHJcbiAgICBuLnN0eWxlLnRvcCA9IFwiY2FsYygzMCUgLSAxMTBweClcIjsgLy9sb2NhdGluZyBpdCBhdCB0aGUgY2VudGVyIG9mIHRoZSBjb3JvbmEncyBiaWcgY2lyY2xlXHJcbiAgICBuLnN0eWxlLmJvdHRvbSA9IFwiY2FsYyg3MCUgKyAxMTBweClcIjsgXHJcbiAgICBuLnN0eWxlLnJpZ2h0ID0gYGNhbGMoNTAlICsgJHsxMCArIDIyKihlbGVtZW50IC0xKX1weClgOyAgIC8vbG9jYXRpbmcgZWFjaCBjb250YWluZXIgYXQgdGhlIGxvY2F0aW9uIG9mIHRoZSBmaXJzdCBjb250YWluZXJcclxuICAgIG4uc3R5bGUubGVmdCA9IGBjYWxjKDUwJSAtICR7MTAgKyAyMiooZWxlbWVudCAtMSl9cHgpYDsgIFxyXG4gICAgY29uc3QgY29udGFpbmVyQW5nbGUgPSAzMCAqIChlbGVtZW50IC0gMSk7IFxyXG4gICAgbi5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWigke2NvbnRhaW5lckFuZ2xlfWRlZylgOyAvL2NoYW5naW5nIHRoZSBhbmdsZSBvZiBlYWNoIGNvbnRhaW5lciwgc28gZWFjaCBjb250YWluZXIgd2lsbCBiZSBsb2NhdGVkIGJlaGluZCBvZiBlYWNoIGF4aXNcclxuICAgIFxyXG5cclxuICAgIC8vY3JlYXRpbmcgZGl2IGZvciBlYWNoIGNvcm9uYSdzIHRpbnkgY2lyY2xlXHJcbiAgICAvL3RoZXNlIGNpcmNsZXMgd2lsbCBoYXZlIHBvc2l0aW9uOiBhYnNvbHV0ZTsgb24gdGhlaXIgZmF0aGVyICh0aGUgY29udGFpbmVyKVxyXG4gICAgY29uc3QgbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb25zdCBsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTsvL3dlIG5lZWQgMTIgdGlueSBjaXJjbGVzIGFuZCB3ZSBoYXZlIG9ubHkgNiBjb250YWluZXJzXHJcbiAgICBtLmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICd0aW55Q2lyY2xlJyk7XHJcbiAgICBtLnNldEF0dHJpYnV0ZSgnaWQnLCAndGlueUNpcmNsZScrZWxlbWVudCk7XHJcbiAgICBtLnN0eWxlLnRvcCA9ICcwJztcclxuICAgIG0uc3R5bGUucmlnaHQgPSAnMCc7XHJcbiAgICBsLmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICd0aW55Q2lyY2xlJyk7XHJcbiAgICBsLnNldEF0dHJpYnV0ZSgnaWQnLCAndGlueUNpcmNsZScrKGVsZW1lbnQrNikpO1xyXG4gICAgbC5zdHlsZS50b3AgPSAnY2FsYygxMDAlIC0gMjRweCknO1xyXG4gICAgbC5zdHlsZS5yaWdodCA9ICcwJztcclxuICAgIGNvbnN0IGN1cnJlbnRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjdGlueUNpcmNsZUNvbnRhaW5lciR7ZWxlbWVudH1gKTtcclxuICAgIGN1cnJlbnRDb250YWluZXIuYXBwZW5kKG0pOyAvL3B1dGluZyBlYWNoIHRpbnlDaXJjbGUgaW5zaWRlIGl0cyByaWdodCBjb250YWluZXJcclxuICAgIGN1cnJlbnRDb250YWluZXIuYXBwZW5kKGwpOyAvL3B1dGluZyBlYWNoIHRpbnlDaXJjbGUgaW5zaWRlIGl0cyByaWdodCBjb250YWluZXJcclxuXHJcbn0pO1xyXG5cclxuXHJcbi8vY3JlYXRpbmcgZGl2IGZvciB0aGUgY29yb25hJ3MgZXllc1xyXG5jb25zdCBleWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuZXllcy5jbGFzc0xpc3QuYWRkKCdleWVzJywgJ2Nvcm9uYScpO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGlueUNpcmNsZUNvbnRhaW5lcjEnKS5hcHBlbmQoZXllcyk7XHJcblxyXG4vLy8vY3JlYXRpbmcgZGl2cyBmb3IgdGhlIGNvcm9uYSdzIGV5ZSBzaGFkZXNcclxuY29uc3QgeiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbmNvbnN0IHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG56LmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICdleWVTaGFkZXMnKTtcclxueS5jbGFzc0xpc3QuYWRkKCdjb3JvbmEnLCAnZXllU2hhZGVzJyk7XHJcbnouc2V0QXR0cmlidXRlKCdpZCcsICd0b3BFeWVzaGFkZScpO1xyXG55LnNldEF0dHJpYnV0ZSgnaWQnLCAnYm90dG9tRXllc2hhZGUnKTtcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbnlDaXJjbGVDb250YWluZXIxJykuYXBwZW5kKHopO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGlueUNpcmNsZUNvbnRhaW5lcjEnKS5hcHBlbmQoeSk7XHJcblxyXG5cclxuZXhwb3J0IHsgYm9keSwgaGVhZGVyLCBjdXJzb3IsIGNvcm9uYUNpcmNsZSwgZXllcyB9O1xyXG4iLCJpbXBvcnQgeyBib2R5LCBoZWFkZXIsIGN1cnNvciwgY29yb25hQ2lyY2xlLCBleWVzIH0gZnJvbSAnLi9jdXJzb3JBbmRDb3JvbmEnO1xyXG5pbXBvcnQgeyBzZWNvbmRzRm9yRWFjaFN0YWdlLCBwRmFpbHVyZSwgcEZhaWx1cmVBbm9uLCBwLCBwQW5vbiB9IGZyb20gJy4vc3RvcnlMaW5lJztcclxuXHJcblxyXG5sZXQgc3RvcCA9IDA7XHJcbmNvbnN0IHN0b3BXb3JraW5nID0gKGJpbmFyeSkgPT4gc3RvcCA9IGJpbmFyeTsgLy93ZSBjYW4ndCBleHBvcnQgXCJzdG9wXCIgYXMgbGV0LCBzbyB3ZSBtYWtlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hIGZ1bmN0aW9uIHRoYXQgd2UgY2FuIGV4cG9ydCwgYW5kIGl0J2xsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGFuZ2UgdGhlIHZhbHVlIG9mIHN0b3BcclxuXHJcbmNvbnN0IG91clZpZXdQb3J0V2lkdGggPSBib2R5LmNsaWVudFdpZHRoOyAvL2NsaWVudFdpZHRoIHNob3dzIHRoZSB3aWR0aCBvZiB0aGUgZWxlbWVudCB3ZSBjaG9vc2VcclxuY29uc3Qgb3VyVmlld1BvcnRIZWlnaHQgPSBib2R5LmNsaWVudEhlaWdodDtcclxuY29uc29sZS5sb2cgKCdvdXJWaWV3UG9ydFdpZHRoOiAnICsgb3VyVmlld1BvcnRXaWR0aCArICcgb3VyVmlld1BvcnRIZWlnaHQ6ICcgK291clZpZXdQb3J0SGVpZ2h0KVxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8vdGhlIGJ1dHRvbidzIGV2ZW50IGxpc3RlbmVyIHdpbGwgY2FsbCB0aGlzIGZ1bmN0aW9uLCB3aGljaCB3aWxsIG1vdmUgdGhlIGZpZ3VyZXMgaW4gcmFuZG9tIGRpcmVjdGlvbnNcclxuY29uc3QgbW92ZSA9IChmaWd1cmUsIHNwZWVkKSA9PiB7XHJcbiAgICAvL21ha2luZyByYW5kb24gaW50ZWdlcnMgZm9yIHRoZSBmaWd1cmVzIHRvIG1vdmUgaW4gZGlmZmVyZW50IGRpcmVjdGlvbnNcclxuICAgIGxldCByYW5kb21JbnRYID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDIgLSAoLTIpICsgMSkpIC0yOyAvL3RoaXMgY29uc3Qgd2lsbCBnaXZlIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiAtMiBhbmQgKzJcclxuICAgIGxldCByYW5kb21JbnRZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDIgLSAoLTIpICsgMSkpIC0yOyAvL3RoaXMgY29uc3Qgd2lsbCBnaXZlIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiAtMiBhbmQgKzJcclxuICAgIGlmIChyYW5kb21JbnRYID09IDAgJiYgcmFuZG9tSW50WSA9PSAwKXtcclxuICAgICAgICByYW5kb21JbnRYID0gMjtcclxuICAgIH1cclxuICAgXHJcbiAgICBjb25zdCBjdXJyZW50RmlndXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycrZmlndXJlKTtcclxuXHJcbiAgICAvL3RoZSB3YXkgdGhlIGZpZ3VyZXMgbW92ZVxyXG4gICAgY29uc3QgZmlndXJlTW92ZW1lbnQgPSAocmFuZG9tSW50WCwgcmFuZG9tSW50WSkgPT4ge1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKHN0b3AgPT0gMSl7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobW92ZW1lbnRJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vNCBydWxlcyBmb3IgdGhlIGNvcm5lcnMnIGNhc2VzOlxyXG4gICAgICAgIGlmICgoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPD0gMSkgJiYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA+PSAoYm9keS5jbGllbnRXaWR0aCAtNTYgLSAxKSkpIHtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSAoKG91clZpZXdQb3J0SGVpZ2h0IC01NiAtIDIpICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICcycHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPD0gMSkgJiYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA8PSAxKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICgob3VyVmlld1BvcnRIZWlnaHQgLTU2IC0gMikgKyAncHgnKTtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ID0gKChvdXJWaWV3UG9ydFdpZHRoIC01NiAtMikgKyAncHgnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoKGN1cnJlbnRGaWd1cmUub2Zmc2V0VG9wID49IChib2R5LmNsaWVudEhlaWdodCAtNTYgLSAxKSkgJiYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA8PSAxKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICcycHgnO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAoKG91clZpZXdQb3J0V2lkdGggLTU2IC0yKSArICdweCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPj0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIDEpKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0ID49IChib2R5LmNsaWVudFdpZHRoIC01NiAtIDEpKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICcycHgnO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAnMnB4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy9mb3VyIFwiaWZcIiBydWxlcyBmb3IgY2FzZXMgdGhhdCB0aGUgZmlndXJlcyByZWFjaCB0aGUgc2NyZWVuIGVkZ2VzOlxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0VG9wIDw9IDEpIHsgLy9vZmZzZXRUb3Agc2hvd3MgdGhlIGxvY2F0aW9uIGNvbXBhcmluZyB0byB0aGUgZmF0aGVyICh0aGUgYm9keSkuIFdlIG5lZWQgdGhhdCBvZmZzZXRUb3Agd2lsbCBiZSAwIG9yIDEgKGFuZCBub3Qgb25seSBvZmZzZXRUb3A9MCksIGJlY2F1c2Ugc29tZXRpbWVzIHRoZSBmaWd1cmVzIGRvIDIgc3RlcHMgKDIgcGl4ZWxzKSBhdCBhIHRpbWVcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSAoKG91clZpZXdQb3J0SGVpZ2h0IC01NiAtIDIpICsgJ3B4Jyk7Ly9NaW51cyAyLCBiZWNhdXNlIHRoZSBmaWd1cmVzIHdpbGwgYmUgc3R1Y2tlZCBpZiB3ZSB3aWxsIHNlbmQgdGhlbSB0byBvdXJWaWV3UG9ydEhlaWdodE1pbnVzMSBvciBvdXJWaWV3UG9ydEhlaWdodC4gQW5kIG1pbnVzIDU2IGJlY2F1c2Ugb2YgdGhlIHNpemUgb2YgdGhlIGZpZ3VyZXMgKHdlIHdhbnQgdGhlbSB0byBkaXNhcHBlYXIgYXQgdGhlIGVkZ2Ugb2YgdGhlIHNjcmVlbiBhbmQgbm90IDU2cHggYWZ0ZXIgaXQpXHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9IChib2R5LmNsaWVudFdpZHRoIC01NiAtIHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCkpICsgJ3B4JztcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0VG9wID49IChib2R5LmNsaWVudEhlaWdodCAtNTYgLSAxKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICcycHgnO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAoYm9keS5jbGllbnRXaWR0aCAtNTYgLSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQpKSArICdweCc7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBlbHNlIGlmIChjdXJyZW50RmlndXJlLm9mZnNldExlZnQgPD0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAoKG91clZpZXdQb3J0V2lkdGggLTU2IC0yKSArICdweCcpO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9IChib2R5LmNsaWVudEhlaWdodCAtNTYgLSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLnRvcCkpICsgJ3B4JztcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA+PSAoYm9keS5jbGllbnRXaWR0aCAtNTYgLSAxKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAnMnB4JztcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSAoYm9keS5jbGllbnRIZWlnaHQgLTU2IC0gcGFyc2VJbnQoY3VycmVudEZpZ3VyZS5zdHlsZS50b3ApKSArICdweCc7XHJcbiAgICAgICAgfSBcclxuICAgICAgICAvL2lmIHRoZSBmaWd1cmUgaXMgbm90IGluIHRoZSBlZGdlIG9yIGluIHRoZSBjb3JuZXIsXHJcbiAgICAgICAgLy90aGVuIHRoYXQncyB0aGUgd2F5IGl0IHdpbGwgbW92ZSBvbiBzY3JlZW46XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gcGFyc2VJbnQoY3VycmVudEZpZ3VyZS5zdHlsZS50b3ApICsgcmFuZG9tSW50WSArICdweCc7IC8vdGhlIG1ldGhvZCBwYXJzZUludCB0YWtlcyBvbmx5IHRoZSBudW1iZXIgKGFuZCBsZWF2ZXMgb3V0IHRoZSBzdHJpbmcgJ3B4JyBhdHRhY2hlZCB0byBpdDopIFxyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQpICsgcmFuZG9tSW50WCArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRGaWd1cmUuc3R5bGUuYmFja2dyb3VuZCArICcgWDogJysgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ICsgJyBZOiAnICsgY3VycmVudEZpZ3VyZS5zdHlsZS50b3ApO1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy9ub3cgd2UnbGwgY2FsbCB0aGUgZmlndXJlTW92ZW1lbnQgZnVuY3Rpb24sIGJ1dCB0aGUgaW50ZXJ2YWwgZm9yIHRoaXMgZnVuY3Rpb25cclxuICAgIC8vd2lsbCBiZSBoaWdoZXIgZnJlcXVlbmN5IGZvciBmaWd1cmVzIDExLTE0ICh0aGUgYmF0cykuIFxyXG4gICAgbGV0IG1vdmVtZW50SW50ZXJ2YWw7XHJcbiAgICBjb25zdCBiYXRBcnJheSA9IFsxMSwgMTIsIDEzLCAxNF07XHJcbiAgICAvL3dlIHdpbGwgdXNlIHNvbWUoKSBtZXRob2QsIHdoaWNoIGNoZWNrcyBpZiAgYXQgbGVhc3Qgb25lIGVsZW1lbnQgaW4gdGhlIGFycmF5XHJcbiAgICAvL3Bhc3NlcyB0aGUgdGVzdCBpbXBsZW1lbnRlZCBpbnNpZGUgc29tZSgpXHJcbiAgICBpZiAoYmF0QXJyYXkuc29tZShlbGVtZW50ID0+IGN1cnJlbnRGaWd1cmUuc3R5bGUuYmFja2dyb3VuZC5pbmNsdWRlcyhlbGVtZW50KSkpIHtcclxuICAgICAgICBtb3ZlbWVudEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gZmlndXJlTW92ZW1lbnQocmFuZG9tSW50WCwgcmFuZG9tSW50WSksIDkpO1xyXG4gICAgfSBlbHNlIGlmIChzcGVlZCA9PSAnZmFzdCcpIHtcclxuICAgICAgICBtb3ZlbWVudEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gZmlndXJlTW92ZW1lbnQocmFuZG9tSW50WCwgcmFuZG9tSW50WSksIDEyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdvaW5nIGZhc3Qgbm93XCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtb3ZlbWVudEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4gZmlndXJlTW92ZW1lbnQocmFuZG9tSW50WCwgcmFuZG9tSW50WSksIDIwKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxufTtcclxuXHJcblxyXG5leHBvcnQgeyBzdG9wV29ya2luZywgb3VyVmlld1BvcnRXaWR0aCwgb3VyVmlld1BvcnRIZWlnaHQsIG1vdmUgfTsiLCJpbXBvcnQgeyBib2R5LCBoZWFkZXIsIGN1cnNvciwgY29yb25hQ2lyY2xlLCBleWVzIH0gZnJvbSAnLi9jdXJzb3JBbmRDb3JvbmEnO1xyXG5cclxuXHJcbmNvbnN0IHNlY29uZHNGb3JFYWNoU3RhZ2UgPSBbMTEsIDE0LCAxMywgMTgsIDEzLCAxNiwgMjAsIDE4XTtcclxuLy8gXHJcbmNvbnN0IGZpZ3VyZXNQZXJTdGFnZSA9IFs3LCAxMCwgMTAsIDE0LCAxMCwgMjAsIDIwLCAyMF07XHJcblxyXG5jb25zdCBwRmFpbHVyZSA9IFwieW91IGZhaWxlZCBhbmQgYSBuZXcgdmFyaWFudCBpcyBzcHJlYWRpbmcgbm93LCBidXQgZG9uJ3Qgd29ycnksIHlvdSBjYW4gdHJ5IGFnYWluIGFuZCBwcmV2ZW50IGEgd29ybGQgY2F0YXN0cm9waGVcIjtcclxuY29uc3QgcEZhaWx1cmVBbm9uID0gXCJZb3UgZmFpbGVkIGFuZCBhIG5ldyB2YXJpYW50IGlzIHNwcmVhZGluZyBub3csIGJ1dCBkb24ndCB3b3JyeSwgeW91IGNhbiB0cnkgYWdhaW4gYW5kIHByZXZlbnQgYSB3b3JsZCBjYXRhc3Ryb3BoZVwiO1xyXG5cclxuY29uc3QgcCA9IFtcclxuXCJWYWNjaW5hdGUgd29ybGQncyBwb3B1bGF0aW9uIGFuZCBoZWxwIGZpZ2h0IHRoZSBjb3JvbmF2aXJ1cyBkaXNlYXNlLiBJZiB5b3UnbGwgZmFpbCwgYSBuZXcgdmFyaWFudCB3aWxsIGFycml2ZS4uLlwiLFxyXG5cInlvdSBtYWRlIGl0ISBCdXQgdGhlIHBvcHVsYXRpb24gZ3JldyBhbmQgeW91IG5lZWQgdG8gdmFjY2luYXRlIG1vcmUgcGVvcGxlIG5vdyFcIixcclxuXCJ5b3UgbWFkZSBpdCBhZ2FpbiEgTm93IGxldHMgc2VlIGlmIHlvdSBjYW4gZG8gaXQgZXZlbiBmYXN0ZXIhXCIsXHJcblwiZ3JlYXQgam9iISBCdXQgYmF0cyBhcmUgY2FtbWluZy4gQ2FuIHlvdSB2YWNjaW5hdGUgdGhlbSB0b28/XCIsXHJcblwieW91IGFyZSBhd2Vzb21lISBOb3cgbGV0cyBzZWUgaWYgeW91IGNhbiBkbyBpdCB3aXRoIHBlb3BsZSB0aGF0IGFyZSBpbiBhIGh1cnJ5IVwiLFxyXG5cImFtYXppbmcgd29yayEgQ2FuIHlvdSBhbHNvIHZhY2NpbmF0ZSBlYWNoIHBlcnNvbiBpbiBvbmx5IG9uZSBzZWNvbmQ/XCIsXHJcblwidGhlIENvcm9uYSBjYW4ndCBiZWF0IHlvdSEgTGV0cyB0cnkgaXQgbm93IHdpdGggdGhlIGJhdHMgYW5kIGZhc3RlciFcIixcclxuXCJ5b3UncmUgYWxtb3N0IGF0IHRoZSBlbmQgb2YgeW91ciBqb3VybnksIG9ubHkgb25lIHN0YWdlIHRvIGdvIVwiLFxyXG5cInlvdSBkaWQgaXQhIFlvdSBzYXZlZCBodW1hbml0eSEgWW91IGVuZGVkIHRoZSBjb3JvbmF2aXJ1cyBkaXNlYXNlIGFuZCBtYWRlIFhYWCBwb2ludC5cIlxyXG5dXHJcblxyXG5jb25zdCBwQW5vbiA9IFtcclxuICAgIFwiVmFjY2luYXRlIHdvcmxkJ3MgcG9wdWxhdGlvbiBhbmQgaGVscCBmaWdodCB0aGUgY29yb25hdmlydXMgZGlzZWFzZS4gSWYgeW91J2xsIGZhaWwsIGEgbmV3IHZhcmlhbnQgd2lsbCBhcnJpdmUuLi5cIixcclxuICAgIFwiWW91IG1hZGUgaXQhIEJ1dCB0aGUgcG9wdWxhdGlvbiBncmV3IGFuZCB5b3UgbmVlZCB0byB2YWNjaW5hdGUgbW9yZSBwZW9wbGUgbm93IVwiLFxyXG4gICAgXCJZb3UgbWFkZSBpdCBhZ2FpbiEgTm93IGxldHMgc2VlIGlmIHlvdSBjYW4gZG8gaXQgZXZlbiBmYXN0ZXIhXCIsXHJcbiAgICBcIkdyZWF0IGpvYiEgQnV0IGJhdHMgYXJlIGNhbW1pbmcuIENhbiB5b3UgdmFjY2luYXRlIHRoZW0gdG9vP1wiLFxyXG4gICAgXCJZb3UgYXJlIGF3ZXNvbWUhIE5vdyBsZXRzIHNlZSBpZiB5b3UgY2FuIGRvIGl0IHdpdGggcGVvcGxlIHRoYXQgYXJlIGluIGEgaHVycnkhXCIsXHJcbiAgICBcIkFtYXppbmcgd29yayEgQ2FuIHlvdSBhbHNvIHZhY2NpbmF0ZSBlYWNoIHBlcnNvbiBpbiBvbmx5IG9uZSBzZWNvbmQ/XCIsXHJcbiAgICBcIlRoZSBDb3JvbmEgY2FuJ3QgYmVhdCB5b3UhIExldHMgdHJ5IGl0IG5vdyB3aXRoIHRoZSBiYXRzIVwiLFxyXG4gICAgXCJZb3UncmUgYWxtb3N0IGF0IHRoZSBlbmQgb2YgeW91ciBqb3VybnksIG9ubHkgb25lIHN0YWdlIHRvIGdvIVwiLFxyXG4gICAgXCJZb3UgZGlkIGl0ISBZb3Ugc2F2ZWQgaHVtYW5pdHkhIFlvdSBlbmRlZCB0aGUgY29yb25hdmlydXMgZGlzZWFzZSBhbmQgbWFkZSBYWFggcG9pbnQuXCJcclxuXVxyXG5cclxuZXhwb3J0IHsgc2Vjb25kc0ZvckVhY2hTdGFnZSwgZmlndXJlc1BlclN0YWdlLCBwRmFpbHVyZSwgcEZhaWx1cmVBbm9uLCBwLCBwQW5vbiB9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIi8vaW1wb3J0IHN0eWxlIGZyb20gJy4uL2Nzcy9jdXJzb3IuY3NzJztcclxuaW1wb3J0ICcuLi9jc3MvY3Vyc29yLmNzcyc7XHJcbmltcG9ydCBmaWd1cmUxIGZyb20gJy4uL2ltYWdlcy9maWd1cmUxLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUyIGZyb20gJy4uL2ltYWdlcy9maWd1cmUyLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUzIGZyb20gJy4uL2ltYWdlcy9maWd1cmUzLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU0IGZyb20gJy4uL2ltYWdlcy9maWd1cmU0LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU1IGZyb20gJy4uL2ltYWdlcy9maWd1cmU1LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU2IGZyb20gJy4uL2ltYWdlcy9maWd1cmU2LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU3IGZyb20gJy4uL2ltYWdlcy9maWd1cmU3LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU4IGZyb20gJy4uL2ltYWdlcy9maWd1cmU4LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU5IGZyb20gJy4uL2ltYWdlcy9maWd1cmU5LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxMCBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTAuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTExIGZyb20gJy4uL2ltYWdlcy9maWd1cmUxMS5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTIgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTEyLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxMyBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTMuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTE0IGZyb20gJy4uL2ltYWdlcy9maWd1cmUxNC5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTUgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTE1LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxNiBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTYuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTE3IGZyb20gJy4uL2ltYWdlcy9maWd1cmUxNy5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTggZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTE4LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxOSBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTkuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTIwIGZyb20gJy4uL2ltYWdlcy9maWd1cmUyMC5zdmcnO1xyXG5pbXBvcnQgc3RhcnMgZnJvbSAnLi4vaW1hZ2VzL3N0YXJzLnN2Zyc7XHJcbmltcG9ydCB7IGJvZHksIGhlYWRlciwgY3Vyc29yLCBjb3JvbmFDaXJjbGUsIGV5ZXMgfSBmcm9tICcuL2N1cnNvckFuZENvcm9uYSc7XHJcbmltcG9ydCB7IHNlY29uZHNGb3JFYWNoU3RhZ2UsIGZpZ3VyZXNQZXJTdGFnZSwgcEZhaWx1cmUsIHBGYWlsdXJlQW5vbiwgcCwgcEFub24gfSBmcm9tICcuL3N0b3J5TGluZSc7XHJcbmltcG9ydCB7IHN0b3BXb3JraW5nLCBvdXJWaWV3UG9ydFdpZHRoLCBvdXJWaWV3UG9ydEhlaWdodCwgbW92ZSB9IGZyb20gJy4vZmlndXJlc01vdmVtZW50JztcclxuXHJcblxyXG5jb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXInKTtcclxuY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBmb3JtICNzdGFydEJ1dHRvbicpO1xyXG5jb25zdCB0b3BFeWVzaGFkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b3BFeWVzaGFkZScpO1xyXG5jb25zdCBib3R0b21FeWVzaGFkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNib3R0b21FeWVzaGFkZScpO1xyXG5jb25zdCB0aW55Q2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW55Q2lyY2xlJyk7XHJcbmNvbnN0IGNvcm9uYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JvbmEnKTtcclxuY29uc3QgdGlueUNpcmNsZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW55Q2lyY2xlQ29udGFpbmVyJyk7XHJcbmNvbnN0IGZvcm1MYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMgZm9ybSBsYWJlbCcpO1xyXG5jb25zdCBmb3JtVGV4dElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBmb3JtICNuaWNrbmFtZScpO1xyXG5jb25zdCBpbnN0cnVjdGlvbnNQVGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBwJyk7XHJcbmxldCBuaWNrbmFtZTtcclxubGV0IHN0YWdlID0gMDsvL3dpbGwgZ28gaW5zaWRlIHRoZSBsZXZlbCB0YWdcclxuY29uc3QgaW5zdHJ1Y3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucycpO1xyXG5sZXQgZmlndXJlcyA9IFtdOyAvL2ZpZ3VyZTEsIGZpZ3VyZTIuLi5cclxubGV0IGZpZ3VyZXNEaXZzID0gW107XHJcbmxldCBudW1zT2ZGaWdzID0gW107Ly9mb3IgZXhhbXBsZTogWzEsIDIsIDMsIDQsIDUsIDYsIDddIGRlcGVuZHMgb24gdGhlIG1heCBudW1iZXIgb2YgZmlndXJlcyBpbiBlYWNoIGxldmVsXHJcbmxldCB1c2VyU2NvcmUgPSAwO1xyXG5jb25zdCBib251c0Fycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyICNib251c0Fycm93Jyk7XHJcbmxldCBzcGVlZDsgLy9maWd1cmVzJyBzcGVlZCAoQ29udHJvbHMgdGhlIGZyZXF1ZW5jeSBvZiB0aGUgaW50ZXJ2YWwgaW4gdGhlIGZ1bmN0aW9uIG1vdmUpXHJcblxyXG5cclxuLy9zdGFydGluZyB0aGUgZ2FtZVxyXG5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICBcclxuICAgIGUucHJldmVudERlZmF1bHQoKTsvL3ByZXZlbnQgcmVmcmVzaGluZyB0aGUgcGFnZSAoZHVlIHRvIHRoZSBmb3JtKVxyXG5cclxuICAgIHN0b3BXb3JraW5nKDApO1xyXG5cclxuICAgIC8vYWRkaW5nIG51bWJlcnMgdG8gbnVtc09mRmlncyBhcnJheVxyXG4gICAgLy8gaWYgKHN0YWdlID09IDUpIHtcclxuICAgIC8vICAgICBudW1zT2ZGaWdzLnB1c2goMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDE1LCAxNiwgMTcsIDE4LCAxOSwgMjApO1xyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgICBmb3IgKGxldCB6ID0gMTsgeiA8PSBmaWd1cmVzUGVyU3RhZ2Vbc3RhZ2VdOyB6Kyspe1xyXG4gICAgLy8gICAgICAgICBudW1zT2ZGaWdzLnB1c2goeik7XHJcbiAgICAvLyAgICAgfSBcclxuICAgIC8vIH1cclxuICAgIGZvciAobGV0IHogPSAxOyB6IDw9IGZpZ3VyZXNQZXJTdGFnZVtzdGFnZV07IHorKyl7XHJcbiAgICAgICAgaWYgKChzdGFnZSA9PSA1KSAmJiAoeiA9PSAxMSB8fCB6ID09IDEyIHx8IHogPT0gMTMgfHwgeiA9PSAxNCkpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBudW1zT2ZGaWdzLnB1c2goeik7XHJcbiAgICAgICAgfVxyXG4gICAgfSBcclxuICAgIFxyXG4gICAgICBcclxuICAgIC8vZGVmaW5pbmcgdGhlIGZpZ3VyZXMnIGFycmF5c1xyXG4gICAgbnVtc09mRmlncy5mb3JFYWNoKG51bSA9PiB7XHJcbiAgICAgICAgLy9hZGRpbmcgZmlndXJlcyBpbnRvIHRoZSBmaWd1cmVzIGFycmF5XHJcbiAgICAgICAgZmlndXJlcy5wdXNoKCdmaWd1cmUnK251bSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9jcmVhdGluZyBmaWd1cmVzIGRpdiB0YWdzIGluIHRoZSBodG1sXHJcbiAgICAgICAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnZmlndXJlcycpO1xyXG4gICAgICAgIGkuc2V0QXR0cmlidXRlKCdpZCcsICdmaWd1cmUnK251bSk7XHJcbiAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoaSwgZm9vdGVyKTtcclxuICAgICAgICBmaWd1cmVzRGl2cy5wdXNoKGkpO1xyXG5cclxuICAgIH0pO1xyXG4gICAgIFxyXG4gICAgLy9wdXR0aW5nIHRoZSBuaWNrbmFtZSBpbiBsb2NhbCBzdG9yYWdlXHJcbiAgICBuaWNrbmFtZSA9IGRvY3VtZW50LmZvcm1zLm5pY2tuYW1lRm9ybS5uaWNrbmFtZS52YWx1ZTtcclxuICAgIGxldCBsb2NhbE5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpO1xyXG5cclxuICAgIGlmIChuaWNrbmFtZSAhPSAnJyl7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ25hbWUnLCBuaWNrbmFtZSk7XHJcbiAgICAgICAgbG9jYWxOYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ25hbWUnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvIFwiICtsb2NhbE5hbWUpO1xyXG4gICAgfSBlbHNlIGlmIChuaWNrbmFtZSA9PSAnJyl7XHJcbiAgICAgICAgaWYgKGxvY2FsTmFtZSAhPSBudWxsKXtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyBcIiArbG9jYWxOYW1lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsb2NhbE5hbWUgPSAnJztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJIZWxsbyBcIiArIGxvY2FsTmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vd2Ugd2lsbCByZW1vdmUgcGFydHMgb2YgdGhlIGZvcm0gdGhhdCB3ZSB3b24ndCBuZWVkIGFueSBtb3JlXHJcbiAgICBmb3JtTGFiZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGZvcm1UZXh0SW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIFxyXG5cclxuICAgIC8vdGhlIGNvcm9uYSBhcHBlYXJzXHJcbiAgICBjb3JvbmEuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSlcclxuICAgIC8vdGhlIHNtYWxsIGNpcmNsZXMgb2YgdGhlIGNvcm9uYSBhcHBlYXJcclxuICAgIHRpbnlDaXJjbGVDb250YWluZXIuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgIH0pXHJcbiAgICBcclxuICAgIGluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgIC8vdGhlIGNvcm9uYSdzIGV5ZXMgd2lsbCBnZXQgY2xvc2VkIGFuZCB0dXJuL2xvb2sgdG8gdGhlIG90aGVyIHNpZGVcclxuICAgIHRvcEV5ZXNoYWRlLnN0eWxlLmFuaW1hdGlvbiA9ICdzaHV0VG9wRXllc2hhZGUgMi41cyAwLjY1cyBlYXNlIGluZmluaXRlIG5vcm1hbCc7XHJcbiAgICBib3R0b21FeWVzaGFkZS5zdHlsZS5hbmltYXRpb24gPSAnc2h1dEJvdHRvbUV5ZXNoYWRlIDIuNXMgMC42NXMgZWFzZSBpbmZpbml0ZSBub3JtYWwnO1xyXG4gICAgZXllcy5zdHlsZS5hbmltYXRpb24gPSAndHVybkV5ZXMgNXMgMC45MjVzIGVhc2UgaW5maW5pdGUgbm9ybWFsJzsgXHJcblxyXG4gICAgLy90aGUgc2NvcmUgc2VjdGlvbiBhcHBlYXJzOlxyXG4gICAgaGVhZGVyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICBoZWFkZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JzsgXHJcbiAgICBjb25zdCBzY29yZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlciAjc2NvcmUgc3BhbicpO1xyXG4gICAgc2NvcmUudGV4dENvbnRlbnQgPSB1c2VyU2NvcmU7XHJcbiAgICBsZXQgeSA9IDA7XHJcbiAgICAvL3RoZSBuZXh0IGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGJ5OiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9wYWNpdHlDaGFuZ2UpO1xyXG4gICAgLy9hbmQgaXQgd2lsbCB0ZWxsIHRoZSBicm93c2VyIHRoYXQgSSB3aXNoIHRvIHBlcmZvcm0gYW4gYW5pbWF0aW9uIHdpdGggdGhlIG9wYWNpdHlcclxuICAgIGNvbnN0IG9wYWNpdHlDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgeSA9IHkgKyAwLjAzO1xyXG4gICAgICAgIGhlYWRlci5zdHlsZS5vcGFjaXR5ID0gYCR7eX1gO1xyXG5cclxuICAgICAgICBpZiAoaGVhZGVyLnN0eWxlLm9wYWNpdHkgPCAnMScpe1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUob3BhY2l0eUNoYW5nZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUob3BhY2l0eUNoYW5nZSk7XHJcblxyXG5cclxuICAgIC8vdGhlIHRpbWVyIGFwcGVhcnNcclxuICAgIGNvbnN0IHRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3RpbWVyJyk7XHJcbiAgICB0aW1lci5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7Ly9pbiBvcmRlciB0byByZXNldCB0aGUgYW5pbWF0aW9uIG9mIHRoZSBlbmQgb2YgdGhlIGxldmVsXHJcbiAgICB0aW1lci5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb25Jc09uJyk7Ly9icmluZ2luZyBiYWNrIHRoZSBvcmlnaW5hbCBjbGFzc05hbWVcclxuICAgIHRpbWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvblJlbW92ZWQnKTsvL2EgdGVtcG9yYXJ5IGNsYXNzTmFtZSB3ZSBhZGRlZCB0byB0aGUgdGltZXIgYXQgdGhlIGVuZCBvZiB0aGUgbGV2ZWwgKG5vdyB3ZSdyZSByZW1vdmluZyBpdClcclxuICAgIGxldCBzZWNvbmRzID0gc2Vjb25kc0ZvckVhY2hTdGFnZVtzdGFnZV07XHJcbiAgICB0aW1lci50ZXh0Q29udGVudCA9IHNlY29uZHM7ICBcclxuICAgIHRpbWVyLnN0eWxlLmFuaW1hdGlvbiA9IGB0aW1lckdyb3dzIDFzICR7c2Vjb25kcysxfSBlYXNlIG5vcm1hbGA7XHJcbiAgICBcclxuICAgIC8vdGhlIHN0YWdlIGFwcGVhcnMgb24gc2NyZWVuXHJcbiAgICBjb25zdCBsZXZlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlciAjbGV2ZWwgc3BhbicpO1xyXG4gICAgbGV2ZWwudGV4dENvbnRlbnQgPSBzdGFnZSsxO1xyXG5cclxuICAgIC8vcmVzZXR0aW5nIHRoZSBib251c0Fycm93IGFuaW1hdGlvbiBmcm9tIHRoZSBlbmQgb2YgdGhlIGxldmVsLCBzbyBpdCdsbCBiZSBhYmxlIHRvIHdvcmsgYWdhaW5cclxuICAgIGJvbnVzQXJyb3cuc3R5bGUuYW5pbWF0aW9uID0gJ25vbmUnO1xyXG4gICAgYm9udXNBcnJvdy5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpb25SZW1vdmVkJyk7XHJcbiAgICBib251c0Fycm93LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvbklzT24nKTtcclxuXHJcblxyXG4gICAgLy9mdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIGZyb20gdGhlIGNvdW50RG93biBmdW5jdGlvbiBcclxuICAgIC8vYW5kIGFsc28gZnJvbSB0aGUgY2hlY2sgZnVuY3Rpb25cclxuICAgIGNvbnN0IGNoZWNrQmFja2dyb3VuZCA9IChmaWd1cmVEaXYpID0+IHtcclxuICAgICAgICByZXR1cm4gZmlndXJlRGl2LnN0eWxlLmJhY2tncm91bmQuaW5jbHVkZXMoJ3N0YXJzLnN2ZycpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL2NvdW50RG93biBmdW5jdGlvbiBmb3IgdGhlIHRpbWVyIGFuZCBjaGFuZ2luZyB0aGUgY29yb25hJ3MgY29sb3Igd2hlbiBub3QgYWxsIGZpZ3VyZXMgd2VyZSBjbGlja2VkXHJcbiAgICBjb25zdCBjb3VudERvd24gPSAoKSA9PiB7XHJcbiAgICAgICAgc2Vjb25kcyA9IHNlY29uZHMgLSAxOyAgXHJcbiAgICAgICAgdGltZXIudGV4dENvbnRlbnQgPSBzZWNvbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvdW50RG93bkludGVydmFsID0gc2V0SW50ZXJ2YWwoY291bnREb3duLCAxMDAwKTsgLy9mdW5jdGlvbiBmb3IgdGhlIHRpbWVyXHJcblxyXG5cclxuICAgIGZpZ3VyZXMuZm9yRWFjaChmaWd1cmUgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBjdXJyZW50RmlndXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycrZmlndXJlKTtcclxuXHJcbiAgICAgICAgLy9hZGRpbmcgYSBiYWNrZ3JvdW5kIGltYWdlIGZvciBlYWNoIGZpZ3VyZTpcclxuICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmJhY2tncm91bmQgPSBgdXJsKCcuLyR7ZmlndXJlfS5zdmcnKWA7IFxyXG4gICAgICAgIC8vcHV0dGluZyB0aGUgZmlndXJlcyBpbiBkaWZmZXJlbnQgcGxhY2VzIGF0IHN0YXJ0aW5nIHBvaW50XHJcbiAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSBNYXRoLnJhbmRvbSgpKihib2R5LmNsaWVudEhlaWdodCAtIDU2KSArICdweCc7IC8vNTYgaXMgdGhlIHNpemUgb2YgdGhlIGZpZ3VyZXMuIGJvZHkuY2xpZW50SGVpZ2h0IGdpdmVzIHRoZSB2aWV3cG9ydCBzaXplIHdpdGhvdXQgdGhlIHNjcm9sbCBiYXJcclxuICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSBNYXRoLnJhbmRvbSgpKihib2R5LmNsaWVudFdpZHRoIC0gNTYpICsgJ3B4JzsgLy81NiBpcyB0aGUgc2l6ZSBvZiB0aGUgZmlndXJlcy5cclxuICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIC8vc3RhcnRpbmcgdG8gbW92ZSB0aGUgZmlndXJlcyBpbiBkaWZmZXJlbnQgZGlyZWN0aW9uczpcclxuICAgICAgICBpZiAoc3RhZ2UgPT0gNCB8fCBzdGFnZSA9PSA2IHx8IHN0YWdlID09IDcpe1xyXG4gICAgICAgICAgICBzcGVlZCA9ICdmYXN0JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzcGVlZCA9ICdyZWd1bGFyJztcclxuICAgICAgICB9XHJcbiAgICAgICAgbW92ZShmaWd1cmUsIHNwZWVkKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9mdW5jdGlvbiBmb3IgY2xpY2tpbmcgYSBmaWd1cmVcclxuICAgICAgICBjb25zdCBzdGFyc0FuZFBvaW50cyA9ICgpID0+IHtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJzQW5kUG9pbnRzKTtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCguL3N0YXJzLnN2ZyknO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmFuaW1hdGlvbiA9ICdmaXJld29ya3MgMC43NXMgZWFzZSBmb3J3YXJkcyBub3JtYWwnO1xyXG4gICAgICAgICAgICB1c2VyU2NvcmUgKz0gMTA7XHJcbiAgICAgICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gdXNlclNjb3JlO1xyXG4gICAgICAgICAgICAvL2RlbGV0aW5nIHRoZSBmaWd1cmUgZnJvbSB0aGUgRE9NXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5yZW1vdmUoKTsgXHJcbiAgICAgICAgICAgIH0sIDc1MSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2FkZGluZyBldmVudExpc3RlbmVyIGZvciBlYWNoIGZpZ3VyZSBhbmQgYWRqdXN0aW5nIHRoZSBzY29yZVxyXG4gICAgICAgIGN1cnJlbnRGaWd1cmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFyc0FuZFBvaW50cyk7XHJcblxyXG4gICAgICAgIC8vZnVuY3Rpb24gdGhhdCBwcmV2ZW50cyBjbGlja2luZyBvbiBmaWd1cmVzLCB3aGlsZSB0aGUgYW1idWxhbmNlcyBjb21lXHJcbiAgICAgICAgY29uc3QgcHJldmVudENsaWNrID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnNBbmRQb2ludHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9hdCB0aGUgZW5kIG9mIHRoZSBzdGFnZSB0aGUgdXNlciB3b24ndCBiZSBhYmxlIHRvIGNsaWNrIHRoZSBmaWd1cmVzXHJcbiAgICAgICAgc2V0VGltZW91dChwcmV2ZW50Q2xpY2ssIHNlY29uZHNGb3JFYWNoU3RhZ2Vbc3RhZ2VdKjEwMDApO1xyXG5cclxuICAgIH0pXHJcblxyXG5cclxuXHJcbiAgICAvL2Z1bmN0aW9uIHRoYXQgd29ya3MgYWZ0ZXIgdGhlIHVzZXIgZmFpbGVkXHJcbiAgICBjb25zdCBmYWlsaW5nUHJvY2VkdXJlID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBzdG9wV29ya2luZygxKTsgICBcclxuXHJcbiAgICAgICAgLy9tYWtpbmcgdGhlIGNvbG9yIG9mIHRoZSBjb3JvbmEgcmFuZG9tbHkgZGlmZmVyZW50XHJcbiAgICAgICAgbGV0IGggPSBNYXRoLnJhbmRvbSgpICogMzU5OyAvL3RoZSBIIG9nIHRoZSBoc2wgaXMgMC0zNTlcclxuICAgICAgICBsZXQgcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICg4MCAtIDI2ICsgMSkgKyAyNik7Ly9JIGRlY2lkZWQgdGhhdCB0aGUgcGVyY2VudGFnZSBvZiB0aGUgUyBpbiBoc2wgd2lsbCBiZSBiZXR3ZWVuIDI2IGFuZCA4MCAoYmVjYXVzZSBpIGRvbid0IGxpa2UgbWluIHNhdHVyYXRpb24gYW5kIG1heCBzYXR1cmF0aW9uKVxyXG4gICAgICAgIGxldCBsID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDc1IC0gMzUgKyAxKSArIDM1KTsvL0kgZGVjaWRlZCB0aGF0IHRoZSBwZXJjZW50YWdlIG9mIHRoZSBMIGluIGhzbCB3aWxsIGJlIGJldHdlZW4gMzUgYW5kIDc1IChub3QgdG9vIGxpZ2h0IGFuZCBub3QgdG9vIGRhcmspXHJcbiAgICAgICAgdGlueUNpcmNsZXMuZm9yRWFjaChjaXJjbGUgPT4ge1xyXG4gICAgICAgICAgICBjaXJjbGUuc3R5bGUuYmFja2dyb3VuZCA9IGBoc2woJHtofSwgJHtzfSUsICR7bH0lKWA7XHJcbiAgICAgICAgfSk7ICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy9yZW1vdmluZyB0aGUgb3JpZ2luYWwgY2xhc3MgZnJvbSB0aGUgdGltZXIsIHJlc2V0cyBpdHMgYW5pbWF0aW9uXHJcbiAgICAgICAgLy9hbmQgbGV0cyB0aGUgYW5pbWF0aW9uIHdvcmsgYWdhaW4gbmV4dCBsZXZlbCAoYWZ0ZXIgYWRkaW5nIHRoZSBvbGQgY2xhc3NOYW1lIGJhY2spXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHRpbWVyLnN0eWxlLmFuaW1hdGlvbiA9ICdub25lJztcclxuICAgICAgICAgICAgdGltZXIuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uUmVtb3ZlZCcpO1xyXG4gICAgICAgICAgICB0aW1lci5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRpb25Jc09uJyk7XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICBmaWd1cmVzRGl2cy5mb3JFYWNoKGZpZ3VyZURpdiA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZmlndXJlRGl2LnN0eWxlLmJhY2tncm91bmQuaW5jbHVkZXMoJ2ZpZ3VyZScpKXtcclxuICAgICAgICAgICAgICAgIGZpZ3VyZURpdi5zdHlsZS50b3AgPSBwYXJzZUludChmaWd1cmVEaXYuc3R5bGUudG9wKSArICdweCc7IC8vdGhlIG1ldGhvZCBwYXJzZUludCB0YWtlcyBvbmx5IHRoZSBudW1iZXIgKGFuZCBsZWF2ZXMgb3V0IHRoZSBzdHJpbmcgJ3B4JyBhdHRhY2hlZCB0byBpdCkgXHJcbiAgICAgICAgICAgICAgICBmaWd1cmVEaXYuc3R5bGUubGVmdCA9IHBhcnNlSW50KGZpZ3VyZURpdi5zdHlsZS5sZWZ0KSArICdweCc7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jcmVhdGluZyBhbWJ1bGFuY2VzIGFuZCBwdXR0aW5nIHRoZW0gODBweCBsZWZ0IHRvIGVhY2ggZmlndXJlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBpLmNsYXNzTGlzdC5hZGQoJ2FtYnVsYW5jZScpO1xyXG4gICAgICAgICAgICAgICAgYm9keS5pbnNlcnRCZWZvcmUoaSwgZm9vdGVyKTtcclxuICAgICAgICAgICAgICAgIGkuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gICAgICAgICAgICAgICAgaS5zdHlsZS50b3AgPSBmaWd1cmVEaXYuc3R5bGUudG9wO1xyXG4gICAgICAgICAgICAgICAgaS5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KGZpZ3VyZURpdi5zdHlsZS5sZWZ0KSAtIDgwKSArIFwicHhcIjtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlndXJlRW50ZXJzQW1idWxhbmNlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB6ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6IDwgMjApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlndXJlRGl2LnN0eWxlLnRvcCA9IHBhcnNlSW50KGZpZ3VyZURpdi5zdHlsZS50b3ApICsgMSArICdweCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHogKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUgIFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9tb3ZpbmcgdGhlIGFtYnVsYW5jZSBmcm9tIHRoZSBsZWZ0IG9mIHRoZSBmaWd1cmUgdG93YXJkcyB0aGUgZmlndXJlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZpbmdBbWJ1bGFuY2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBwYXJzZUludChpLnN0eWxlLmxlZnQpIDwgcGFyc2VJbnQoZmlndXJlRGl2LnN0eWxlLmxlZnQpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkuc3R5bGUubGVmdCA9IChwYXJzZUludChpLnN0eWxlLmxlZnQpICsgMSkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgLy9tb3ZpbmdBbWJ1bGFuY2VQYXJ0MiB3aWxsIGNhbGwgdGhpcyBmdW5jdGlvbjpcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vdmVSaWdodCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpLnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoaS5zdHlsZS5sZWZ0KSArIDEpICsgJ3B4JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy9tb3ZpbmcgdGhlIGFtYnVsYW5jZSBmcm9tIHRoZSBmaWd1cmUgdG8gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIHNjcmVlblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbW92aW5nQW1idWxhbmNlUGFydDIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYocGFyc2VJbnQoaS5zdHlsZS5sZWZ0KSA8IG91clZpZXdQb3J0V2lkdGgpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtb3ZpbmdSaWdodCA9IHNldEludGVydmFsKG1vdmVSaWdodCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpLnN0eWxlLmFuaW1hdGlvbiA9ICdkaXNhcHBlYXJzIDNzIGVhc2UgZm9yd2FyZHMgbm9ybWFsJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4gY2xlYXJJbnRlcnZhbChtb3ZpbmdSaWdodCksIDMwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmaWd1cmVFbnRlcnNBbWJ1bGFuY2UsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgZmlndXJlRGl2LnN0eWxlLmFuaW1hdGlvbiA9ICdmaWd1cmVCZWNvbWVzTWluaSAwLjVzIDEuMnMgZWFzZSBmb3J3YXJkcyBub3JtYWwnO1xyXG4gICAgICAgICAgICAgICAgc2V0SW50ZXJ2YWwobW92aW5nQW1idWxhbmNlLCAxNSk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KG1vdmluZ0FtYnVsYW5jZVBhcnQyLCAxNzAwKTtcclxuICAgICAgICAgICAgICAgIC8vY2xlYW5pbmcgYWxsIGZpZ3VyZXMgYW5kIGZpZ3VyZXMgYXJyYXlzIGFmdGVyIHRoZXkgZW50ZXJlZCB0aGUgYW1idWxhbmNlXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmaWd1cmVzRGl2cy5mb3JFYWNoKGZpZ3VyZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZ3VyZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZpZ3VyZXMgPSBbXTsgXHJcbiAgICAgICAgICAgICAgICAgICAgZmlndXJlc0RpdnMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBudW1zT2ZGaWdzID0gW107XHJcbiAgICAgICAgICAgICAgICB9LCAxNzAwKTtcclxuICAgICAgICAgICAgICAgIC8vY2xlYW5pbmcgdGhlIGFtYnVsYW5jZXMgYWZ0ZXIgdGhleSBmaW5pc2hlZCB0aGVpciB3b3JrXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbWJ1bGFuY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFtYnVsYW5jZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFtYnVsYW5jZXMuZm9yRWFjaChhbWJ1bGFuY2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbWJ1bGFuY2UucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sIDQ3MDApO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIC8vYnJpbmdpbmcgYmFjayB0aGUgaW5zdHJhY3Rpb24ncyBib3hcclxuICAgICAgICBjb25zdCBicmluZ2luZ0JhY2tJbnN0cnVjdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihsb2NhbE5hbWUgPT0gJycpe1xyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zUFRhZy50ZXh0Q29udGVudCA9IFwiWW91IGZhaWxlZCBhbmQgYSBuZXcgdmFyaWFudCBpcyBzcHJlYWRpbmcgbm93LCBidXQgZG9uJ3Qgd29ycnksIHlvdSBjYW4gdHJ5IGFnYWluIGFuZCBwcmV2ZW50IGEgd29ybGQgY2F0YXN0cm9waGUuXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7ICAgIFxyXG4gICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zUFRhZy50ZXh0Q29udGVudCA9IGxvY2FsTmFtZSArICcsJyArIFwiIHlvdSBmYWlsZWQgYW5kIGEgbmV3IHZhcmlhbnQgaXMgc3ByZWFkaW5nIG5vdywgYnV0IGRvbid0IHdvcnJ5LCB5b3UgY2FuIHRyeSBhZ2FpbiBhbmQgcHJldmVudCBhIHdvcmxkIGNhdGFzdHJvcGhlLlwiOyBcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLnRvcCA9ICdjYWxjKDMwJSArIDRweCknO1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUuYW5pbWF0aW9uID0gJ2luc3RydWN0aW9uc0FwcGVhcnMgMi41cyBlYXNlIGZvcndhcmRzIG5vcm1hbCc7ICAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHNldFRpbWVvdXQoYnJpbmdpbmdCYWNrSW5zdHJ1Y3Rpb25zLCAyMDAwKTtcclxuICAgIH1cclxuICAgXHJcblxyXG4gICAgLy9mdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiBhbGwgdGhlIGZpZ3VyZXMgd2VyZSBjbGlja2VkIG9yIGlmIHRoZSB0aW1lIG9mIHRoZSBsZXZlbCBlbmRlZFxyXG4gICAgY29uc3QgZW5kTGV2ZWxDaGVjayA9ICgpID0+IHtcclxuICAgICAgICBpZiAoZmlndXJlc0RpdnMuZXZlcnkoY2hlY2tCYWNrZ3JvdW5kKSkgeyAgLy9cImV2ZXJ5XCIgcmV0dXJucyB0cnVlIGlmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgZm9yIGFsbCBlbGVtZW50cyBpbiB0aGUgYXJyYXkgKGlmIGFsbCBmaWd1cmVzIGJlY2FtZSBzdGFycylcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChlbmRMZXZlbCk7XHJcbiAgICAgICAgICAgIHN0b3BXb3JraW5nKDEpOyAvL3RoZSBzdGFycyB3aWxsIHN0b3AgbW92aW5nXHJcbiAgICAgICAgICAgIHN0YWdlICs9IDE7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY291bnREb3duSW50ZXJ2YWwpOyAvL3RoZSBjbG9jayB3aWxsIHN0b3BcclxuICAgICAgICAgICAgdGltZXIuc3R5bGUuYW5pbWF0aW9uID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aW1lci5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb25SZW1vdmVkJyk7XHJcbiAgICAgICAgICAgIHRpbWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvbklzT24nKTsvL3JlbW92aW5nIHRoaXMgY2xhc3MgcmVzZXRzIHRoZSBhbmltYXRpb24gZm9yIHRoaXMgZWxlbWVudCBhbmQgbGV0cyB1cyB1c2UgaXQgYWdhaW4gYWZ0ZXIgYWRkaW5nIHRoaXMgY2xhc3MgYmFja1xyXG5cclxuICAgICAgICAgICAgaWYgKHNlY29uZHMgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGltZXIuc3R5bGUuYW5pbWF0aW9uID0gYHRpbWVyR3Jvd3NBZ2FpbiAxcyAke3NlY29uZHN9IGVhc2Ugbm9ybWFsYDtcclxuXHJcbiAgICAgICAgICAgICAgICBib251c0Fycm93LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBib251c0Fycm93LnN0eWxlLmFuaW1hdGlvbiA9IGBhcnJvd0dyb3dzIDFzICR7c2Vjb25kc30gZWFzZSBub3JtYWxgO1xyXG4gICAgICAgICAgICAgICAgYm9udXNBcnJvdy5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb25SZW1vdmVkJyk7XHJcbiAgICAgICAgICAgICAgICBib251c0Fycm93LmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvbklzT24nKTsvL3JlbW92aW5nIHRoaXMgY2xhc3MgcmVzZXRzIHRoZSBhbmltYXRpb24gZm9yIHRoaXMgZWxlbWVudCBhbmQgbGV0cyB1cyB1c2UgaXQgYWdhaW4gYWZ0ZXIgYWRkaW5nIHRoaXMgY2xhc3MgYmFja1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBib251c0Fycm93LnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgICAgICAgICB9LCAoc2Vjb25kcyoxMDAwKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGJvbnVzID0gKHNlY29uZHMgKiAxMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpID0gMTtcclxuICAgICAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50ID0gY291bnQgKyBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA8PSBib251cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJTY29yZSArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZS50ZXh0Q29udGVudCA9IHVzZXJTY29yZTtcclxuICAgICAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy9jbGVhbmluZyB0aGUgZmlndXJlcyBhcnJheXMgKGluIG9yZGVyIHRvIGdldCByZWFkeSBmb3IgbmV4dCBsZXZlbCk6XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmlndXJlcyA9IFtdOyBcclxuICAgICAgICAgICAgICAgIGZpZ3VyZXNEaXZzID0gW107XHJcbiAgICAgICAgICAgICAgICBudW1zT2ZGaWdzID0gW107XHJcbiAgICAgICAgICAgIH0sIDc1MSk7IC8vYWZ0ZXIgdGhlIGxhc3QgZmlyZXdvcmsgZW5kZWQgaXRzIHdvcmtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vaGlkaW5nIHRoZSBjb3JvbmFcclxuICAgICAgICAgICAgY29yb25hLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvL2JyaW5naW5nIGJhY2sgdGhlIGluc3RyYWN0aW9uJ3MgYm94XHJcbiAgICAgICAgICAgIGlmKGxvY2FsTmFtZSA9PSAnJyl7XHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNQVGFnLnRleHRDb250ZW50ID0gcEFub25bc3RhZ2VdOyAvL3BBbm9uIGlzIHRoZSB0ZXh0IGFwcGVhcnMgaW4gc3RvcnlMaW5lLmpzXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNQVGFnLnRleHRDb250ZW50ID0gbG9jYWxOYW1lICsgJywgJyArIHBbc3RhZ2VdOyAvLy8vcCBpcyB0aGUgdGV4dCBhcHBlYXJzIGluIHN0b3J5TGluZS5qc1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS50b3AgPSAnMjIlJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmFuaW1hdGlvbiA9ICdpbnN0cnVjdGlvbnNBcHBlYXJzIDJzIGVhc2UgZm9yd2FyZHMgbm9ybWFsJzsgICAgICAgICAgICBcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoc2Vjb25kcyA9PSAwICYmIGZpZ3VyZXNEaXZzLmV2ZXJ5KGNoZWNrQmFja2dyb3VuZCkgPT0gZmFsc2UpIHsgLy9pZiBub3QgYWxsIGZpZ3VyZXMgYmVjYW1lIHN0YXJzIGFuZCB0aGUgc2Vjb25kcyBlbmRlZFxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGVuZExldmVsKTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudERvd25JbnRlcnZhbCk7IC8vdGhlIGNsb2NrIHdpbGwgc3RvcFxyXG4gICAgICAgICAgICBmYWlsaW5nUHJvY2VkdXJlKCk7Ly9mdW5jdGlvbiB0aGF0IGJyaW5ncyB0aGUgYW1idWxhbmNlc1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3QgZW5kTGV2ZWwgPSBzZXRJbnRlcnZhbChlbmRMZXZlbENoZWNrLCAxKTsgXHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiJdLCJuYW1lcyI6WyJib2R5IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiaGVhZGVyIiwiY3Vyc29yIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzZXRBdHRyaWJ1dGUiLCJwYWdlWSIsInBhZ2VYIiwiYXhpcyIsImNvcm9uYUNpcmNsZSIsImFuZ2xlIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJpIiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwic3R5bGUiLCJ0cmFuc2Zvcm0iLCJuIiwidG9wIiwiYm90dG9tIiwicmlnaHQiLCJsZWZ0IiwiY29udGFpbmVyQW5nbGUiLCJtIiwibCIsImN1cnJlbnRDb250YWluZXIiLCJhcHBlbmQiLCJleWVzIiwieiIsInkiLCJzZWNvbmRzRm9yRWFjaFN0YWdlIiwicEZhaWx1cmUiLCJwRmFpbHVyZUFub24iLCJwIiwicEFub24iLCJzdG9wIiwic3RvcFdvcmtpbmciLCJiaW5hcnkiLCJvdXJWaWV3UG9ydFdpZHRoIiwiY2xpZW50V2lkdGgiLCJvdXJWaWV3UG9ydEhlaWdodCIsImNsaWVudEhlaWdodCIsImNvbnNvbGUiLCJsb2ciLCJtb3ZlIiwiZmlndXJlIiwic3BlZWQiLCJyYW5kb21JbnRYIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tSW50WSIsImN1cnJlbnRGaWd1cmUiLCJmaWd1cmVNb3ZlbWVudCIsImNsZWFySW50ZXJ2YWwiLCJtb3ZlbWVudEludGVydmFsIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsInBhcnNlSW50IiwiYmFja2dyb3VuZCIsImJhdEFycmF5Iiwic29tZSIsImluY2x1ZGVzIiwic2V0SW50ZXJ2YWwiLCJmaWd1cmVzUGVyU3RhZ2UiLCJmaWd1cmUxIiwiZmlndXJlMiIsImZpZ3VyZTMiLCJmaWd1cmU0IiwiZmlndXJlNSIsImZpZ3VyZTYiLCJmaWd1cmU3IiwiZmlndXJlOCIsImZpZ3VyZTkiLCJmaWd1cmUxMCIsImZpZ3VyZTExIiwiZmlndXJlMTIiLCJmaWd1cmUxMyIsImZpZ3VyZTE0IiwiZmlndXJlMTUiLCJmaWd1cmUxNiIsImZpZ3VyZTE3IiwiZmlndXJlMTgiLCJmaWd1cmUxOSIsImZpZ3VyZTIwIiwic3RhcnMiLCJmb290ZXIiLCJidXR0b24iLCJ0b3BFeWVzaGFkZSIsImJvdHRvbUV5ZXNoYWRlIiwidGlueUNpcmNsZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29yb25hIiwidGlueUNpcmNsZUNvbnRhaW5lciIsImZvcm1MYWJlbCIsImZvcm1UZXh0SW5wdXQiLCJpbnN0cnVjdGlvbnNQVGFnIiwibmlja25hbWUiLCJzdGFnZSIsImluc3RydWN0aW9ucyIsImZpZ3VyZXMiLCJmaWd1cmVzRGl2cyIsIm51bXNPZkZpZ3MiLCJ1c2VyU2NvcmUiLCJib251c0Fycm93IiwicHJldmVudERlZmF1bHQiLCJwdXNoIiwibnVtIiwiZm9ybXMiLCJuaWNrbmFtZUZvcm0iLCJ2YWx1ZSIsImxvY2FsTmFtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwiZGlzcGxheSIsImFuaW1hdGlvbiIsIm9wYWNpdHkiLCJzY29yZSIsInRleHRDb250ZW50Iiwib3BhY2l0eUNoYW5nZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIndpbmRvdyIsInRpbWVyIiwicmVtb3ZlIiwic2Vjb25kcyIsImxldmVsIiwiY2hlY2tCYWNrZ3JvdW5kIiwiZmlndXJlRGl2IiwiY291bnREb3duIiwiY291bnREb3duSW50ZXJ2YWwiLCJzdGFyc0FuZFBvaW50cyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJzZXRUaW1lb3V0IiwicHJldmVudENsaWNrIiwiZmFpbGluZ1Byb2NlZHVyZSIsImgiLCJzIiwiY2lyY2xlIiwicG9zaXRpb24iLCJmaWd1cmVFbnRlcnNBbWJ1bGFuY2UiLCJtb3ZpbmdBbWJ1bGFuY2UiLCJtb3ZlUmlnaHQiLCJtb3ZpbmdBbWJ1bGFuY2VQYXJ0MiIsIm1vdmluZ1JpZ2h0IiwiYW1idWxhbmNlcyIsImFtYnVsYW5jZSIsImJyaW5naW5nQmFja0luc3RydWN0aW9ucyIsImVuZExldmVsQ2hlY2siLCJldmVyeSIsImVuZExldmVsIiwiYm9udXMiLCJjb3VudCJdLCJzb3VyY2VSb290IjoiIn0=