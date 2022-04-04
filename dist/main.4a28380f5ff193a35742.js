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

/***/ "./src/scripts/signInAndRegisterForms.js":
/*!***********************************************!*\
  !*** ./src/scripts/signInAndRegisterForms.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeX": () => (/* binding */ closeX),
/* harmony export */   "registerButton": () => (/* binding */ registerButton),
/* harmony export */   "registerFormContainer": () => (/* binding */ registerFormContainer),
/* harmony export */   "signInButton": () => (/* binding */ signInButton),
/* harmony export */   "signInFormContainer": () => (/* binding */ signInFormContainer)
/* harmony export */ });
var registerButton = document.querySelector("#register");
var registerFormContainer = document.querySelector("#registerFormContainer");
var signInButton = document.querySelector('#signIn');
var signInFormContainer = document.querySelector('#signInFormContainer');
var closeX = document.querySelector(".x");
registerButton.addEventListener("click", function () {
  registerFormContainer.style.display = 'block';
  closeX.style.display = 'block';
});
signInButton.addEventListener("click", function () {
  signInFormContainer.style.display = 'block';
  closeX.style.display = 'block';
});
closeX.addEventListener("click", function () {
  signInFormContainer.style.display = 'none';
  registerFormContainer.style.display = 'none';
  closeX.style.display = 'none';
});


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

/***/ "./src/images/favicon.ico":
/*!********************************!*\
  !*** ./src/images/favicon.ico ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "favicon.ico";

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
/* harmony import */ var _images_favicon_ico__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../images/favicon.ico */ "./src/images/favicon.ico");
/* harmony import */ var _cursorAndCorona__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./cursorAndCorona */ "./src/scripts/cursorAndCorona.js");
/* harmony import */ var _signInAndRegisterForms__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./signInAndRegisterForms */ "./src/scripts/signInAndRegisterForms.js");
/* harmony import */ var _storyLine__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./storyLine */ "./src/scripts/storyLine.js");
/* harmony import */ var _figuresMovement__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./figuresMovement */ "./src/scripts/figuresMovement.js");
//import style from '../css/cursor.css';



























var footer = document.querySelector('footer');
var button = document.querySelector('#instructions form #startButton');
var topEyeshade = document.querySelector('#topEyeshade');
var bottomEyeshade = document.querySelector('#bottomEyeshade');
var tinyCircles = document.querySelectorAll('.tinyCircle');
var corona = document.querySelectorAll('.corona');
var tinyCircleContainer = document.querySelectorAll('.tinyCircleContainer');
var nicknameFormLabel = document.querySelector('#instructions form label');
var nicknameFormTextInput = document.querySelector('#instructions form #nickname');
var instructionsPTag = document.querySelector('#instructions p');
var sign = document.querySelector('#sign');
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

  (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_26__.stopWorking)(0); //adding numbers to numsOfFigs array
  // if (stage == 5) {
  //     numsOfFigs.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 16, 17, 18, 19, 20);
  // } else {
  //     for (let z = 1; z <= figuresPerStage[stage]; z++){
  //         numsOfFigs.push(z);
  //     } 
  // }

  for (var z = 1; z <= _storyLine__WEBPACK_IMPORTED_MODULE_25__.figuresPerStage[stage]; z++) {
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
    _cursorAndCorona__WEBPACK_IMPORTED_MODULE_23__.body.insertBefore(i, footer);
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


  nicknameFormLabel.style.display = 'none';
  nicknameFormTextInput.style.display = 'none'; //we will remove signIn and signUp buttons

  sign.style.display = 'none'; //the corona appears

  corona.forEach(function (element) {
    element.style.display = 'block';
  }); //the small circles of the corona appear

  tinyCircleContainer.forEach(function (element) {
    element.style.display = 'inline-block';
  });
  instructions.style.display = 'none'; //the corona's eyes will get closed and turn/look to the other side

  topEyeshade.style.animation = 'shutTopEyeshade 2.5s 0.65s ease infinite normal';
  bottomEyeshade.style.animation = 'shutBottomEyeshade 2.5s 0.65s ease infinite normal';
  _cursorAndCorona__WEBPACK_IMPORTED_MODULE_23__.eyes.style.animation = 'turnEyes 5s 0.925s ease infinite normal'; //the score section appears:

  _cursorAndCorona__WEBPACK_IMPORTED_MODULE_23__.header.style.opacity = '0';
  _cursorAndCorona__WEBPACK_IMPORTED_MODULE_23__.header.style.display = 'flex';
  var score = document.querySelector('header #score span');
  score.textContent = userScore;
  var y = 0; //the next function will be called by: window.requestAnimationFrame(opacityChange);
  //and it will tell the browser that I wish to perform an animation with the opacity

  var opacityChange = function opacityChange() {
    y = y + 0.03;
    _cursorAndCorona__WEBPACK_IMPORTED_MODULE_23__.header.style.opacity = "".concat(y);

    if (_cursorAndCorona__WEBPACK_IMPORTED_MODULE_23__.header.style.opacity < '1') {
      requestAnimationFrame(opacityChange);
    }
  };

  window.requestAnimationFrame(opacityChange); //the timer appears

  var timer = document.querySelector('#timer');
  timer.style.animation = 'none'; //in order to reset the animation of the end of the level

  timer.classList.add('animationIsOn'); //bringing back the original className

  timer.classList.remove('animationRemoved'); //a temporary className we added to the timer at the end of the level (now we're removing it)

  var seconds = _storyLine__WEBPACK_IMPORTED_MODULE_25__.secondsForEachStage[stage];
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

    currentFigure.style.top = Math.random() * (_cursorAndCorona__WEBPACK_IMPORTED_MODULE_23__.body.clientHeight - 56) + 'px'; //56 is the size of the figures. body.clientHeight gives the viewport size without the scroll bar

    currentFigure.style.left = Math.random() * (_cursorAndCorona__WEBPACK_IMPORTED_MODULE_23__.body.clientWidth - 56) + 'px'; //56 is the size of the figures.

    currentFigure.style.display = 'block'; //starting to move the figures in different directions:

    if (stage == 4 || stage == 6 || stage == 7) {
      speed = 'fast';
    } else {
      speed = 'regular';
    }

    (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_26__.move)(figure, speed); //function for clicking a figure

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


    setTimeout(preventClick, _storyLine__WEBPACK_IMPORTED_MODULE_25__.secondsForEachStage[stage] * 1000);
  }); //function that works after the user failed

  var failingProcedure = function failingProcedure() {
    (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_26__.stopWorking)(1); //making the color of the corona randomly different

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
        _cursorAndCorona__WEBPACK_IMPORTED_MODULE_23__.body.insertBefore(i, footer);
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
          if (parseInt(i.style.left) < _figuresMovement__WEBPACK_IMPORTED_MODULE_26__.ourViewPortWidth) {
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
      (0,_figuresMovement__WEBPACK_IMPORTED_MODULE_26__.stopWorking)(1); //the stars will stop moving

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
        instructionsPTag.textContent = _storyLine__WEBPACK_IMPORTED_MODULE_25__.pAnon[stage]; //pAnon is the text appears in storyLine.js
      } else {
        instructionsPTag.textContent = localName + ', ' + _storyLine__WEBPACK_IMPORTED_MODULE_25__.p[stage]; ////p is the text appears in storyLine.js
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RixLQUFiLENBQW1CNkcsT0FBbkIsR0FBNkIsR0FBN0I7QUFDQWpCLE1BQUFBLFlBQVksQ0FBQzVGLEtBQWIsQ0FBbUJzRCxPQUFuQixHQUE2QixPQUE3QjtBQUNBc0MsTUFBQUEsWUFBWSxDQUFDNUYsS0FBYixDQUFtQjRHLFNBQW5CLEdBQStCLDZDQUEvQjtBQUdILEtBekRELE1BeURPLElBQUlTLE9BQU8sSUFBSSxDQUFYLElBQWdCdkIsV0FBVyxDQUFDK0MsS0FBWixDQUFrQnRCLGVBQWxCLEtBQXNDLEtBQTFELEVBQWlFO0FBQUU7QUFDdEVoRixNQUFBQSxhQUFhLENBQUN1RyxRQUFELENBQWI7QUFDQXZHLE1BQUFBLGFBQWEsQ0FBQ21GLGlCQUFELENBQWIsQ0FGb0UsQ0FFbEM7O0FBQ2xDSyxNQUFBQSxnQkFBZ0IsR0FIb0QsQ0FHakQ7QUFDdEI7QUFDSixHQS9ERDs7QUFrRUEsTUFBTWUsUUFBUSxHQUFHOUYsV0FBVyxDQUFDNEYsYUFBRCxFQUFnQixDQUFoQixDQUE1QjtBQUVILENBeldELEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9zcmMvc2NyaXB0cy9jdXJzb3JBbmRDb3JvbmEuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vc3JjL3NjcmlwdHMvZmlndXJlc01vdmVtZW50LmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL3NyYy9zY3JpcHRzL3NpZ25JbkFuZFJlZ2lzdGVyRm9ybXMuanMiLCJ3ZWJwYWNrOi8vY29yb25hLWdhbWUuYml0YnVja2V0LmlvLy4vc3JjL3NjcmlwdHMvc3RvcnlMaW5lLmpzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby8uL3NyYy9jc3MvY3Vyc29yLmNzcz80MTQ5Iiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Nvcm9uYS1nYW1lLmJpdGJ1Y2tldC5pby93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9jb3JvbmEtZ2FtZS5iaXRidWNrZXQuaW8vLi9zcmMvc2NyaXB0cy9zdGFydEdhbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XHJcbmNvbnN0IGN1cnNvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJzb3InKTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcclxuICAgIC8vdGhlIGxvY2F0aW9uIG9mIHRoZSBzeXJpbmdlIGN1cnNvclxyXG4gICAgY3Vyc29yLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwidG9wOiBcIiArIChlLnBhZ2VZICsgNCkgKyBcInB4OyBsZWZ0OiBcIiArIChlLnBhZ2VYIC0gNSkgKyBcInB4O1wiKTtcclxufSk7XHJcblxyXG5cclxuXHJcbmNvbnN0IGF4aXMgPSBbMSwgMiwgMywgNCwgNSwgNl07IC8vZm9yIHRoZSBsaW5lcyB0aGF0IGdvIG91dCBvZiB0aGUgY29yb25hJ3MgY2VudGVyXHJcbi8vY29uc3QgYXhpc0RpdnMgPSBbXTsgLy9jb250YWlucyBhbGwgdGhlIGF4aXNEaXZzIG9mIHRoZSBjb3JvbmFcclxuLy9jb25zdCB0aW55Q2lyY2xlc0NvbnRhaW5lcnNEaXZzID0gW107XHJcbmNvbnN0IGNvcm9uYUNpcmNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjaXJjbGUnKTtcclxubGV0IGFuZ2xlID0gMDtcclxuXHJcblxyXG5heGlzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAvL2NyZWF0aW5nIGRpdiBmb3IgZWFjaCBjb3JvbmEgYXhpc1xyXG4gICAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpLmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICdheGlzJyk7IC8vYWRkaW5nIGNsYXNzIG5hbWVzIGZvciBvdXIgZGl2XHJcbiAgICBpLnNldEF0dHJpYnV0ZSgnaWQnLCAnYXhpcycrZWxlbWVudCk7IC8vYWRkaW5nIGlkIGZvciBvdXIgZGl2XHJcbiAgICBib2R5Lmluc2VydEJlZm9yZShpLCBjb3JvbmFDaXJjbGUubmV4dFNpYmxpbmcpOy8vcHV0dGluZyBcImlcIiBhZnRlciBjb3JvbmFDaXJjbGVcclxuICAgIC8vYXhpc0RpdnMucHVzaChpKTsgLy9wdXR0aW5nIG91ciBkaXYgaW5zaWRlIGF4aXNEaXZzIGFycmF5XHJcbiAgICBpLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVaKCR7YW5nbGV9ZGVnKWA7XHJcbiAgICBhbmdsZSArPSAzMDtcclxuXHJcbiAgICAvL2NyZWF0aW5nIGRpdiBmb3IgZWFjaCBjb250YWluZXIgKGNvbnRhaW5lcnMgZm9yIHRoZSB0aW55IGNpcmNsZXMpXHJcbiAgICAvL3RoZXNlIGNvbnRhaW5lcnMgd2lsbCBoYXZlIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGNvbnN0IG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgbi5jbGFzc0xpc3QuYWRkKCdjb3JvbmEnLCAndGlueUNpcmNsZUNvbnRhaW5lcicpOyAvL2FkZGluZyBjbGFzcyBuYW1lcyBmb3Igb3VyIGRpdlxyXG4gICAgbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RpbnlDaXJjbGVDb250YWluZXInK2VsZW1lbnQpOyAvL2FkZGluZyBpZCBmb3Igb3VyIGRpdlxyXG4gICAgYm9keS5pbnNlcnRCZWZvcmUobiwgaGVhZGVyKTsvL3B1dHRpbmcgXCJuXCIgYXQgdGhlIHRvcCBvZiB0aGUgcGFnZSwgc28gaXQgd2lsbCBiZSBlYXNpZXIgdG8gcHV0IGl0IG9uIHRoZSBiaWcgY2lyY2xlXHJcbiAgICAvL3RpbnlDaXJjbGVzQ29udGFpbmVyc0RpdnMucHVzaChuKTsgLy9wdXR0aW5nIG91ciBkaXYgaW5zaWRlIHRpbnlDaXJjbGVzQ29udGFpbmVyc0RpdnMgYXJyYXlcclxuICAgIG4uc3R5bGUudG9wID0gXCJjYWxjKDMwJSAtIDExMHB4KVwiOyAvL2xvY2F0aW5nIGl0IGF0IHRoZSBjZW50ZXIgb2YgdGhlIGNvcm9uYSdzIGJpZyBjaXJjbGVcclxuICAgIG4uc3R5bGUuYm90dG9tID0gXCJjYWxjKDcwJSArIDExMHB4KVwiOyBcclxuICAgIG4uc3R5bGUucmlnaHQgPSBgY2FsYyg1MCUgKyAkezEwICsgMjIqKGVsZW1lbnQgLTEpfXB4KWA7ICAgLy9sb2NhdGluZyBlYWNoIGNvbnRhaW5lciBhdCB0aGUgbG9jYXRpb24gb2YgdGhlIGZpcnN0IGNvbnRhaW5lclxyXG4gICAgbi5zdHlsZS5sZWZ0ID0gYGNhbGMoNTAlIC0gJHsxMCArIDIyKihlbGVtZW50IC0xKX1weClgOyAgXHJcbiAgICBjb25zdCBjb250YWluZXJBbmdsZSA9IDMwICogKGVsZW1lbnQgLSAxKTsgXHJcbiAgICBuLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGVaKCR7Y29udGFpbmVyQW5nbGV9ZGVnKWA7IC8vY2hhbmdpbmcgdGhlIGFuZ2xlIG9mIGVhY2ggY29udGFpbmVyLCBzbyBlYWNoIGNvbnRhaW5lciB3aWxsIGJlIGxvY2F0ZWQgYmVoaW5kIG9mIGVhY2ggYXhpc1xyXG4gICAgXHJcblxyXG4gICAgLy9jcmVhdGluZyBkaXYgZm9yIGVhY2ggY29yb25hJ3MgdGlueSBjaXJjbGVcclxuICAgIC8vdGhlc2UgY2lyY2xlcyB3aWxsIGhhdmUgcG9zaXRpb246IGFic29sdXRlOyBvbiB0aGVpciBmYXRoZXIgKHRoZSBjb250YWluZXIpXHJcbiAgICBjb25zdCBtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbnN0IGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpOy8vd2UgbmVlZCAxMiB0aW55IGNpcmNsZXMgYW5kIHdlIGhhdmUgb25seSA2IGNvbnRhaW5lcnNcclxuICAgIG0uY2xhc3NMaXN0LmFkZCgnY29yb25hJywgJ3RpbnlDaXJjbGUnKTtcclxuICAgIG0uc2V0QXR0cmlidXRlKCdpZCcsICd0aW55Q2lyY2xlJytlbGVtZW50KTtcclxuICAgIG0uc3R5bGUudG9wID0gJzAnO1xyXG4gICAgbS5zdHlsZS5yaWdodCA9ICcwJztcclxuICAgIGwuY2xhc3NMaXN0LmFkZCgnY29yb25hJywgJ3RpbnlDaXJjbGUnKTtcclxuICAgIGwuc2V0QXR0cmlidXRlKCdpZCcsICd0aW55Q2lyY2xlJysoZWxlbWVudCs2KSk7XHJcbiAgICBsLnN0eWxlLnRvcCA9ICdjYWxjKDEwMCUgLSAyNHB4KSc7XHJcbiAgICBsLnN0eWxlLnJpZ2h0ID0gJzAnO1xyXG4gICAgY29uc3QgY3VycmVudENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCN0aW55Q2lyY2xlQ29udGFpbmVyJHtlbGVtZW50fWApO1xyXG4gICAgY3VycmVudENvbnRhaW5lci5hcHBlbmQobSk7IC8vcHV0aW5nIGVhY2ggdGlueUNpcmNsZSBpbnNpZGUgaXRzIHJpZ2h0IGNvbnRhaW5lclxyXG4gICAgY3VycmVudENvbnRhaW5lci5hcHBlbmQobCk7IC8vcHV0aW5nIGVhY2ggdGlueUNpcmNsZSBpbnNpZGUgaXRzIHJpZ2h0IGNvbnRhaW5lclxyXG5cclxufSk7XHJcblxyXG5cclxuLy9jcmVhdGluZyBkaXYgZm9yIHRoZSBjb3JvbmEncyBleWVzXHJcbmNvbnN0IGV5ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5leWVzLmNsYXNzTGlzdC5hZGQoJ2V5ZXMnLCAnY29yb25hJyk7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW55Q2lyY2xlQ29udGFpbmVyMScpLmFwcGVuZChleWVzKTtcclxuXHJcbi8vLy9jcmVhdGluZyBkaXZzIGZvciB0aGUgY29yb25hJ3MgZXllIHNoYWRlc1xyXG5jb25zdCB6ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuY29uc3QgeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbnouY2xhc3NMaXN0LmFkZCgnY29yb25hJywgJ2V5ZVNoYWRlcycpO1xyXG55LmNsYXNzTGlzdC5hZGQoJ2Nvcm9uYScsICdleWVTaGFkZXMnKTtcclxuei5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3RvcEV5ZXNoYWRlJyk7XHJcbnkuc2V0QXR0cmlidXRlKCdpZCcsICdib3R0b21FeWVzaGFkZScpO1xyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGlueUNpcmNsZUNvbnRhaW5lcjEnKS5hcHBlbmQoeik7XHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aW55Q2lyY2xlQ29udGFpbmVyMScpLmFwcGVuZCh5KTtcclxuXHJcblxyXG5leHBvcnQgeyBib2R5LCBoZWFkZXIsIGN1cnNvciwgY29yb25hQ2lyY2xlLCBleWVzIH07XHJcbiIsImltcG9ydCB7IGJvZHksIGhlYWRlciwgY3Vyc29yLCBjb3JvbmFDaXJjbGUsIGV5ZXMgfSBmcm9tICcuL2N1cnNvckFuZENvcm9uYSc7XHJcbmltcG9ydCB7IHNlY29uZHNGb3JFYWNoU3RhZ2UsIHBGYWlsdXJlLCBwRmFpbHVyZUFub24sIHAsIHBBbm9uIH0gZnJvbSAnLi9zdG9yeUxpbmUnO1xyXG5cclxuXHJcbmxldCBzdG9wID0gMDtcclxuY29uc3Qgc3RvcFdvcmtpbmcgPSAoYmluYXJ5KSA9PiBzdG9wID0gYmluYXJ5OyAvL3dlIGNhbid0IGV4cG9ydCBcInN0b3BcIiBhcyBsZXQsIHNvIHdlIG1ha2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2EgZnVuY3Rpb24gdGhhdCB3ZSBjYW4gZXhwb3J0LCBhbmQgaXQnbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoYW5nZSB0aGUgdmFsdWUgb2Ygc3RvcFxyXG5cclxuY29uc3Qgb3VyVmlld1BvcnRXaWR0aCA9IGJvZHkuY2xpZW50V2lkdGg7IC8vY2xpZW50V2lkdGggc2hvd3MgdGhlIHdpZHRoIG9mIHRoZSBlbGVtZW50IHdlIGNob29zZVxyXG5jb25zdCBvdXJWaWV3UG9ydEhlaWdodCA9IGJvZHkuY2xpZW50SGVpZ2h0O1xyXG5jb25zb2xlLmxvZyAoJ291clZpZXdQb3J0V2lkdGg6ICcgKyBvdXJWaWV3UG9ydFdpZHRoICsgJyBvdXJWaWV3UG9ydEhlaWdodDogJyArb3VyVmlld1BvcnRIZWlnaHQpXHJcblxyXG5cclxuXHJcblxyXG5cclxuLy90aGUgYnV0dG9uJ3MgZXZlbnQgbGlzdGVuZXIgd2lsbCBjYWxsIHRoaXMgZnVuY3Rpb24sIHdoaWNoIHdpbGwgbW92ZSB0aGUgZmlndXJlcyBpbiByYW5kb20gZGlyZWN0aW9uc1xyXG5jb25zdCBtb3ZlID0gKGZpZ3VyZSwgc3BlZWQpID0+IHtcclxuICAgIC8vbWFraW5nIHJhbmRvbiBpbnRlZ2VycyBmb3IgdGhlIGZpZ3VyZXMgdG8gbW92ZSBpbiBkaWZmZXJlbnQgZGlyZWN0aW9uc1xyXG4gICAgbGV0IHJhbmRvbUludFggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMiAtICgtMikgKyAxKSkgLTI7IC8vdGhpcyBjb25zdCB3aWxsIGdpdmUgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIC0yIGFuZCArMlxyXG4gICAgbGV0IHJhbmRvbUludFkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMiAtICgtMikgKyAxKSkgLTI7IC8vdGhpcyBjb25zdCB3aWxsIGdpdmUgYSByYW5kb20gaW50ZWdlciBiZXR3ZWVuIC0yIGFuZCArMlxyXG4gICAgaWYgKHJhbmRvbUludFggPT0gMCAmJiByYW5kb21JbnRZID09IDApe1xyXG4gICAgICAgIHJhbmRvbUludFggPSAyO1xyXG4gICAgfVxyXG4gICBcclxuICAgIGNvbnN0IGN1cnJlbnRGaWd1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytmaWd1cmUpO1xyXG5cclxuICAgIC8vdGhlIHdheSB0aGUgZmlndXJlcyBtb3ZlXHJcbiAgICBjb25zdCBmaWd1cmVNb3ZlbWVudCA9IChyYW5kb21JbnRYLCByYW5kb21JbnRZKSA9PiB7XHJcbiAgICAgICBcclxuICAgICAgICBpZiAoc3RvcCA9PSAxKXtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtb3ZlbWVudEludGVydmFsKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy80IHJ1bGVzIGZvciB0aGUgY29ybmVycycgY2FzZXM6XHJcbiAgICAgICAgaWYgKChjdXJyZW50RmlndXJlLm9mZnNldFRvcCA8PSAxKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0ID49IChib2R5LmNsaWVudFdpZHRoIC01NiAtIDEpKSkge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICgob3VyVmlld1BvcnRIZWlnaHQgLTU2IC0gMikgKyAncHgnKTtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ID0gJzJweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChjdXJyZW50RmlndXJlLm9mZnNldFRvcCA8PSAxKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0IDw9IDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gKChvdXJWaWV3UG9ydEhlaWdodCAtNTYgLSAyKSArICdweCcpO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgPSAoKG91clZpZXdQb3J0V2lkdGggLTU2IC0yKSArICdweCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmICgoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPj0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIDEpKSAmJiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0IDw9IDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gJzJweCc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICgob3VyVmlld1BvcnRXaWR0aCAtNTYgLTIpICsgJ3B4Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKChjdXJyZW50RmlndXJlLm9mZnNldFRvcCA+PSAoYm9keS5jbGllbnRIZWlnaHQgLTU2IC0gMSkpICYmIChjdXJyZW50RmlndXJlLm9mZnNldExlZnQgPj0gKGJvZHkuY2xpZW50V2lkdGggLTU2IC0gMSkpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gJzJweCc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICcycHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL2ZvdXIgXCJpZlwiIHJ1bGVzIGZvciBjYXNlcyB0aGF0IHRoZSBmaWd1cmVzIHJlYWNoIHRoZSBzY3JlZW4gZWRnZXM6XHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPD0gMSkgeyAvL29mZnNldFRvcCBzaG93cyB0aGUgbG9jYXRpb24gY29tcGFyaW5nIHRvIHRoZSBmYXRoZXIgKHRoZSBib2R5KS4gV2UgbmVlZCB0aGF0IG9mZnNldFRvcCB3aWxsIGJlIDAgb3IgMSAoYW5kIG5vdCBvbmx5IG9mZnNldFRvcD0wKSwgYmVjYXVzZSBzb21ldGltZXMgdGhlIGZpZ3VyZXMgZG8gMiBzdGVwcyAoMiBwaXhlbHMpIGF0IGEgdGltZVxyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9ICgob3VyVmlld1BvcnRIZWlnaHQgLTU2IC0gMikgKyAncHgnKTsvL01pbnVzIDIsIGJlY2F1c2UgdGhlIGZpZ3VyZXMgd2lsbCBiZSBzdHVja2VkIGlmIHdlIHdpbGwgc2VuZCB0aGVtIHRvIG91clZpZXdQb3J0SGVpZ2h0TWludXMxIG9yIG91clZpZXdQb3J0SGVpZ2h0LiBBbmQgbWludXMgNTYgYmVjYXVzZSBvZiB0aGUgc2l6ZSBvZiB0aGUgZmlndXJlcyAod2Ugd2FudCB0aGVtIHRvIGRpc2FwcGVhciBhdCB0aGUgZWRnZSBvZiB0aGUgc2NyZWVuIGFuZCBub3QgNTZweCBhZnRlciBpdClcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0ID0gKGJvZHkuY2xpZW50V2lkdGggLTU2IC0gcGFyc2VJbnQoY3VycmVudEZpZ3VyZS5zdHlsZS5sZWZ0KSkgKyAncHgnO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEZpZ3VyZS5vZmZzZXRUb3AgPj0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gJzJweCc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9IChib2R5LmNsaWVudFdpZHRoIC01NiAtIHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCkpICsgJ3B4JztcclxuICAgICAgICB9IFxyXG4gICAgICAgIGVsc2UgaWYgKGN1cnJlbnRGaWd1cmUub2Zmc2V0TGVmdCA8PSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICgob3VyVmlld1BvcnRXaWR0aCAtNTYgLTIpICsgJ3B4Jyk7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wID0gKGJvZHkuY2xpZW50SGVpZ2h0IC01NiAtIHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUudG9wKSkgKyAncHgnO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgZWxzZSBpZiAoY3VycmVudEZpZ3VyZS5vZmZzZXRMZWZ0ID49IChib2R5LmNsaWVudFdpZHRoIC01NiAtIDEpKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9ICcycHgnO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9IChib2R5LmNsaWVudEhlaWdodCAtNTYgLSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLnRvcCkpICsgJ3B4JztcclxuICAgICAgICB9IFxyXG4gICAgICAgIC8vaWYgdGhlIGZpZ3VyZSBpcyBub3QgaW4gdGhlIGVkZ2Ugb3IgaW4gdGhlIGNvcm5lcixcclxuICAgICAgICAvL3RoZW4gdGhhdCdzIHRoZSB3YXkgaXQgd2lsbCBtb3ZlIG9uIHNjcmVlbjpcclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudEZpZ3VyZS5zdHlsZS50b3AgPSBwYXJzZUludChjdXJyZW50RmlndXJlLnN0eWxlLnRvcCkgKyByYW5kb21JbnRZICsgJ3B4JzsgLy90aGUgbWV0aG9kIHBhcnNlSW50IHRha2VzIG9ubHkgdGhlIG51bWJlciAoYW5kIGxlYXZlcyBvdXQgdGhlIHN0cmluZyAncHgnIGF0dGFjaGVkIHRvIGl0OikgXHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9IHBhcnNlSW50KGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCkgKyByYW5kb21JbnRYICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudEZpZ3VyZS5zdHlsZS5iYWNrZ3JvdW5kICsgJyBYOiAnKyBjdXJyZW50RmlndXJlLnN0eWxlLmxlZnQgKyAnIFk6ICcgKyBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCk7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvL25vdyB3ZSdsbCBjYWxsIHRoZSBmaWd1cmVNb3ZlbWVudCBmdW5jdGlvbiwgYnV0IHRoZSBpbnRlcnZhbCBmb3IgdGhpcyBmdW5jdGlvblxyXG4gICAgLy93aWxsIGJlIGhpZ2hlciBmcmVxdWVuY3kgZm9yIGZpZ3VyZXMgMTEtMTQgKHRoZSBiYXRzKS4gXHJcbiAgICBsZXQgbW92ZW1lbnRJbnRlcnZhbDtcclxuICAgIGNvbnN0IGJhdEFycmF5ID0gWzExLCAxMiwgMTMsIDE0XTtcclxuICAgIC8vd2Ugd2lsbCB1c2Ugc29tZSgpIG1ldGhvZCwgd2hpY2ggY2hlY2tzIGlmICBhdCBsZWFzdCBvbmUgZWxlbWVudCBpbiB0aGUgYXJyYXlcclxuICAgIC8vcGFzc2VzIHRoZSB0ZXN0IGltcGxlbWVudGVkIGluc2lkZSBzb21lKClcclxuICAgIGlmIChiYXRBcnJheS5zb21lKGVsZW1lbnQgPT4gY3VycmVudEZpZ3VyZS5zdHlsZS5iYWNrZ3JvdW5kLmluY2x1ZGVzKGVsZW1lbnQpKSkge1xyXG4gICAgICAgIG1vdmVtZW50SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiBmaWd1cmVNb3ZlbWVudChyYW5kb21JbnRYLCByYW5kb21JbnRZKSwgOSk7XHJcbiAgICB9IGVsc2UgaWYgKHNwZWVkID09ICdmYXN0Jykge1xyXG4gICAgICAgIG1vdmVtZW50SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiBmaWd1cmVNb3ZlbWVudChyYW5kb21JbnRYLCByYW5kb21JbnRZKSwgMTIpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ29pbmcgZmFzdCBub3dcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1vdmVtZW50SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiBmaWd1cmVNb3ZlbWVudChyYW5kb21JbnRYLCByYW5kb21JbnRZKSwgMjApO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG59O1xyXG5cclxuXHJcbmV4cG9ydCB7IHN0b3BXb3JraW5nLCBvdXJWaWV3UG9ydFdpZHRoLCBvdXJWaWV3UG9ydEhlaWdodCwgbW92ZSB9OyIsImNvbnN0IHJlZ2lzdGVyQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlclwiKTtcclxuY29uc3QgcmVnaXN0ZXJGb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNyZWdpc3RlckZvcm1Db250YWluZXJcIik7XHJcbmNvbnN0IHNpZ25JbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWduSW4nKTtcclxuY29uc3Qgc2lnbkluRm9ybUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzaWduSW5Gb3JtQ29udGFpbmVyJyk7XHJcbmNvbnN0IGNsb3NlWCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIueFwiKTtcclxuXHJcblxyXG5yZWdpc3RlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgcmVnaXN0ZXJGb3JtQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgY2xvc2VYLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG59KTtcclxuXHJcblxyXG5zaWduSW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIHNpZ25JbkZvcm1Db250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBjbG9zZVguc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbn0pO1xyXG5cclxuY2xvc2VYLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICBzaWduSW5Gb3JtQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICByZWdpc3RlckZvcm1Db250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIGNsb3NlWC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59KTtcclxuXHJcblxyXG5cclxuZXhwb3J0IHsgcmVnaXN0ZXJCdXR0b24sIHJlZ2lzdGVyRm9ybUNvbnRhaW5lciwgc2lnbkluQnV0dG9uLCBzaWduSW5Gb3JtQ29udGFpbmVyLCBjbG9zZVggfTsiLCJpbXBvcnQgeyBib2R5LCBoZWFkZXIsIGN1cnNvciwgY29yb25hQ2lyY2xlLCBleWVzIH0gZnJvbSAnLi9jdXJzb3JBbmRDb3JvbmEnO1xyXG5cclxuXHJcbmNvbnN0IHNlY29uZHNGb3JFYWNoU3RhZ2UgPSBbMTEsIDE0LCAxMywgMTgsIDEzLCAxNiwgMjAsIDE4XTtcclxuLy8gXHJcbmNvbnN0IGZpZ3VyZXNQZXJTdGFnZSA9IFs3LCAxMCwgMTAsIDE0LCAxMCwgMjAsIDIwLCAyMF07XHJcblxyXG5jb25zdCBwRmFpbHVyZSA9IFwieW91IGZhaWxlZCBhbmQgYSBuZXcgdmFyaWFudCBpcyBzcHJlYWRpbmcgbm93LCBidXQgZG9uJ3Qgd29ycnksIHlvdSBjYW4gdHJ5IGFnYWluIGFuZCBwcmV2ZW50IGEgd29ybGQgY2F0YXN0cm9waGVcIjtcclxuY29uc3QgcEZhaWx1cmVBbm9uID0gXCJZb3UgZmFpbGVkIGFuZCBhIG5ldyB2YXJpYW50IGlzIHNwcmVhZGluZyBub3csIGJ1dCBkb24ndCB3b3JyeSwgeW91IGNhbiB0cnkgYWdhaW4gYW5kIHByZXZlbnQgYSB3b3JsZCBjYXRhc3Ryb3BoZVwiO1xyXG5cclxuY29uc3QgcCA9IFtcclxuXCJWYWNjaW5hdGUgd29ybGQncyBwb3B1bGF0aW9uIGFuZCBoZWxwIGZpZ2h0IHRoZSBjb3JvbmF2aXJ1cyBkaXNlYXNlLiBJZiB5b3UnbGwgZmFpbCwgYSBuZXcgdmFyaWFudCB3aWxsIGFycml2ZS4uLlwiLFxyXG5cInlvdSBtYWRlIGl0ISBCdXQgdGhlIHBvcHVsYXRpb24gZ3JldyBhbmQgeW91IG5lZWQgdG8gdmFjY2luYXRlIG1vcmUgcGVvcGxlIG5vdyFcIixcclxuXCJ5b3UgbWFkZSBpdCBhZ2FpbiEgTm93IGxldHMgc2VlIGlmIHlvdSBjYW4gZG8gaXQgZXZlbiBmYXN0ZXIhXCIsXHJcblwiZ3JlYXQgam9iISBCdXQgYmF0cyBhcmUgY2FtbWluZy4gQ2FuIHlvdSB2YWNjaW5hdGUgdGhlbSB0b28/XCIsXHJcblwieW91IGFyZSBhd2Vzb21lISBOb3cgbGV0cyBzZWUgaWYgeW91IGNhbiBkbyBpdCB3aXRoIHBlb3BsZSB0aGF0IGFyZSBpbiBhIGh1cnJ5IVwiLFxyXG5cImFtYXppbmcgd29yayEgQ2FuIHlvdSBhbHNvIHZhY2NpbmF0ZSBlYWNoIHBlcnNvbiBpbiBvbmx5IG9uZSBzZWNvbmQ/XCIsXHJcblwidGhlIENvcm9uYSBjYW4ndCBiZWF0IHlvdSEgTGV0cyB0cnkgaXQgbm93IHdpdGggdGhlIGJhdHMgYW5kIGZhc3RlciFcIixcclxuXCJ5b3UncmUgYWxtb3N0IGF0IHRoZSBlbmQgb2YgeW91ciBqb3VybnksIG9ubHkgb25lIHN0YWdlIHRvIGdvIVwiLFxyXG5cInlvdSBkaWQgaXQhIFlvdSBzYXZlZCBodW1hbml0eSEgWW91IGVuZGVkIHRoZSBjb3JvbmF2aXJ1cyBkaXNlYXNlIGFuZCBtYWRlIFhYWCBwb2ludC5cIlxyXG5dXHJcblxyXG5jb25zdCBwQW5vbiA9IFtcclxuICAgIFwiVmFjY2luYXRlIHdvcmxkJ3MgcG9wdWxhdGlvbiBhbmQgaGVscCBmaWdodCB0aGUgY29yb25hdmlydXMgZGlzZWFzZS4gSWYgeW91J2xsIGZhaWwsIGEgbmV3IHZhcmlhbnQgd2lsbCBhcnJpdmUuLi5cIixcclxuICAgIFwiWW91IG1hZGUgaXQhIEJ1dCB0aGUgcG9wdWxhdGlvbiBncmV3IGFuZCB5b3UgbmVlZCB0byB2YWNjaW5hdGUgbW9yZSBwZW9wbGUgbm93IVwiLFxyXG4gICAgXCJZb3UgbWFkZSBpdCBhZ2FpbiEgTm93IGxldHMgc2VlIGlmIHlvdSBjYW4gZG8gaXQgZXZlbiBmYXN0ZXIhXCIsXHJcbiAgICBcIkdyZWF0IGpvYiEgQnV0IGJhdHMgYXJlIGNhbW1pbmcuIENhbiB5b3UgdmFjY2luYXRlIHRoZW0gdG9vP1wiLFxyXG4gICAgXCJZb3UgYXJlIGF3ZXNvbWUhIE5vdyBsZXRzIHNlZSBpZiB5b3UgY2FuIGRvIGl0IHdpdGggcGVvcGxlIHRoYXQgYXJlIGluIGEgaHVycnkhXCIsXHJcbiAgICBcIkFtYXppbmcgd29yayEgQ2FuIHlvdSBhbHNvIHZhY2NpbmF0ZSBlYWNoIHBlcnNvbiBpbiBvbmx5IG9uZSBzZWNvbmQ/XCIsXHJcbiAgICBcIlRoZSBDb3JvbmEgY2FuJ3QgYmVhdCB5b3UhIExldHMgdHJ5IGl0IG5vdyB3aXRoIHRoZSBiYXRzIVwiLFxyXG4gICAgXCJZb3UncmUgYWxtb3N0IGF0IHRoZSBlbmQgb2YgeW91ciBqb3VybnksIG9ubHkgb25lIHN0YWdlIHRvIGdvIVwiLFxyXG4gICAgXCJZb3UgZGlkIGl0ISBZb3Ugc2F2ZWQgaHVtYW5pdHkhIFlvdSBlbmRlZCB0aGUgY29yb25hdmlydXMgZGlzZWFzZSBhbmQgbWFkZSBYWFggcG9pbnQuXCJcclxuXVxyXG5cclxuZXhwb3J0IHsgc2Vjb25kc0ZvckVhY2hTdGFnZSwgZmlndXJlc1BlclN0YWdlLCBwRmFpbHVyZSwgcEZhaWx1cmVBbm9uLCBwLCBwQW5vbiB9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIi8vaW1wb3J0IHN0eWxlIGZyb20gJy4uL2Nzcy9jdXJzb3IuY3NzJztcclxuaW1wb3J0ICcuLi9jc3MvY3Vyc29yLmNzcyc7XHJcbmltcG9ydCBmaWd1cmUxIGZyb20gJy4uL2ltYWdlcy9maWd1cmUxLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUyIGZyb20gJy4uL2ltYWdlcy9maWd1cmUyLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUzIGZyb20gJy4uL2ltYWdlcy9maWd1cmUzLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU0IGZyb20gJy4uL2ltYWdlcy9maWd1cmU0LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU1IGZyb20gJy4uL2ltYWdlcy9maWd1cmU1LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU2IGZyb20gJy4uL2ltYWdlcy9maWd1cmU2LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU3IGZyb20gJy4uL2ltYWdlcy9maWd1cmU3LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU4IGZyb20gJy4uL2ltYWdlcy9maWd1cmU4LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmU5IGZyb20gJy4uL2ltYWdlcy9maWd1cmU5LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxMCBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTAuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTExIGZyb20gJy4uL2ltYWdlcy9maWd1cmUxMS5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTIgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTEyLnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxMyBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTMuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTE0IGZyb20gJy4uL2ltYWdlcy9maWd1cmUxNC5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTUgZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTE1LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxNiBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTYuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTE3IGZyb20gJy4uL2ltYWdlcy9maWd1cmUxNy5zdmcnO1xyXG5pbXBvcnQgZmlndXJlMTggZnJvbSAnLi4vaW1hZ2VzL2ZpZ3VyZTE4LnN2Zyc7XHJcbmltcG9ydCBmaWd1cmUxOSBmcm9tICcuLi9pbWFnZXMvZmlndXJlMTkuc3ZnJztcclxuaW1wb3J0IGZpZ3VyZTIwIGZyb20gJy4uL2ltYWdlcy9maWd1cmUyMC5zdmcnO1xyXG5pbXBvcnQgc3RhcnMgZnJvbSAnLi4vaW1hZ2VzL3N0YXJzLnN2Zyc7XHJcbmltcG9ydCBmYXZpY29uIGZyb20gJy4uL2ltYWdlcy9mYXZpY29uLmljbyc7XHJcbmltcG9ydCB7IGJvZHksIGhlYWRlciwgY3Vyc29yLCBjb3JvbmFDaXJjbGUsIGV5ZXMgfSBmcm9tICcuL2N1cnNvckFuZENvcm9uYSc7XHJcbmltcG9ydCB7IHJlZ2lzdGVyQnV0dG9uLCByZWdpc3RlckZvcm1Db250YWluZXIsIGNsb3NlWCB9IGZyb20gJy4vc2lnbkluQW5kUmVnaXN0ZXJGb3Jtcyc7XHJcbmltcG9ydCB7IHNlY29uZHNGb3JFYWNoU3RhZ2UsIGZpZ3VyZXNQZXJTdGFnZSwgcEZhaWx1cmUsIHBGYWlsdXJlQW5vbiwgcCwgcEFub24gfSBmcm9tICcuL3N0b3J5TGluZSc7XHJcbmltcG9ydCB7IHN0b3BXb3JraW5nLCBvdXJWaWV3UG9ydFdpZHRoLCBvdXJWaWV3UG9ydEhlaWdodCwgbW92ZSB9IGZyb20gJy4vZmlndXJlc01vdmVtZW50JztcclxuXHJcblxyXG5jb25zdCBmb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb290ZXInKTtcclxuY29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBmb3JtICNzdGFydEJ1dHRvbicpO1xyXG5jb25zdCB0b3BFeWVzaGFkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b3BFeWVzaGFkZScpO1xyXG5jb25zdCBib3R0b21FeWVzaGFkZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNib3R0b21FeWVzaGFkZScpO1xyXG5jb25zdCB0aW55Q2lyY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW55Q2lyY2xlJyk7XHJcbmNvbnN0IGNvcm9uYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb3JvbmEnKTtcclxuY29uc3QgdGlueUNpcmNsZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aW55Q2lyY2xlQ29udGFpbmVyJyk7XHJcbmNvbnN0IG5pY2tuYW1lRm9ybUxhYmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2luc3RydWN0aW9ucyBmb3JtIGxhYmVsJyk7XHJcbmNvbnN0IG5pY2tuYW1lRm9ybVRleHRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMgZm9ybSAjbmlja25hbWUnKTtcclxuY29uc3QgaW5zdHJ1Y3Rpb25zUFRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbnN0cnVjdGlvbnMgcCcpO1xyXG5jb25zdCBzaWduID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpZ24nKTtcclxubGV0IG5pY2tuYW1lO1xyXG5sZXQgc3RhZ2UgPSAwOy8vd2lsbCBnbyBpbnNpZGUgdGhlIGxldmVsIHRhZ1xyXG5jb25zdCBpbnN0cnVjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaW5zdHJ1Y3Rpb25zJyk7XHJcbmxldCBmaWd1cmVzID0gW107IC8vZmlndXJlMSwgZmlndXJlMi4uLlxyXG5sZXQgZmlndXJlc0RpdnMgPSBbXTtcclxubGV0IG51bXNPZkZpZ3MgPSBbXTsvL2ZvciBleGFtcGxlOiBbMSwgMiwgMywgNCwgNSwgNiwgN10gZGVwZW5kcyBvbiB0aGUgbWF4IG51bWJlciBvZiBmaWd1cmVzIGluIGVhY2ggbGV2ZWxcclxubGV0IHVzZXJTY29yZSA9IDA7XHJcbmNvbnN0IGJvbnVzQXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXIgI2JvbnVzQXJyb3cnKTtcclxubGV0IHNwZWVkOyAvL2ZpZ3VyZXMnIHNwZWVkIChDb250cm9scyB0aGUgZnJlcXVlbmN5IG9mIHRoZSBpbnRlcnZhbCBpbiB0aGUgZnVuY3Rpb24gbW92ZSlcclxuXHJcblxyXG4vL3N0YXJ0aW5nIHRoZSBnYW1lXHJcbmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIFxyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpOy8vcHJldmVudCByZWZyZXNoaW5nIHRoZSBwYWdlIChkdWUgdG8gdGhlIGZvcm0pXHJcblxyXG4gICAgc3RvcFdvcmtpbmcoMCk7XHJcblxyXG4gICAgLy9hZGRpbmcgbnVtYmVycyB0byBudW1zT2ZGaWdzIGFycmF5XHJcbiAgICAvLyBpZiAoc3RhZ2UgPT0gNSkge1xyXG4gICAgLy8gICAgIG51bXNPZkZpZ3MucHVzaCgxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCA5LCAxMCwgMTUsIDE2LCAxNywgMTgsIDE5LCAyMCk7XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICAgIGZvciAobGV0IHogPSAxOyB6IDw9IGZpZ3VyZXNQZXJTdGFnZVtzdGFnZV07IHorKyl7XHJcbiAgICAvLyAgICAgICAgIG51bXNPZkZpZ3MucHVzaCh6KTtcclxuICAgIC8vICAgICB9IFxyXG4gICAgLy8gfVxyXG4gICAgZm9yIChsZXQgeiA9IDE7IHogPD0gZmlndXJlc1BlclN0YWdlW3N0YWdlXTsgeisrKXtcclxuICAgICAgICBpZiAoKHN0YWdlID09IDUpICYmICh6ID09IDExIHx8IHogPT0gMTIgfHwgeiA9PSAxMyB8fCB6ID09IDE0KSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG51bXNPZkZpZ3MucHVzaCh6KTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAgIFxyXG4gICAgLy9kZWZpbmluZyB0aGUgZmlndXJlcycgYXJyYXlzXHJcbiAgICBudW1zT2ZGaWdzLmZvckVhY2gobnVtID0+IHtcclxuICAgICAgICAvL2FkZGluZyBmaWd1cmVzIGludG8gdGhlIGZpZ3VyZXMgYXJyYXlcclxuICAgICAgICBmaWd1cmVzLnB1c2goJ2ZpZ3VyZScrbnVtKTtcclxuICAgICAgICBcclxuICAgICAgICAvL2NyZWF0aW5nIGZpZ3VyZXMgZGl2IHRhZ3MgaW4gdGhlIGh0bWxcclxuICAgICAgICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaS5jbGFzc0xpc3QuYWRkKCdmaWd1cmVzJyk7XHJcbiAgICAgICAgaS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2ZpZ3VyZScrbnVtKTtcclxuICAgICAgICBib2R5Lmluc2VydEJlZm9yZShpLCBmb290ZXIpO1xyXG4gICAgICAgIGZpZ3VyZXNEaXZzLnB1c2goaSk7XHJcblxyXG4gICAgfSk7XHJcbiAgICAgXHJcbiAgICAvL3B1dHRpbmcgdGhlIG5pY2tuYW1lIGluIGxvY2FsIHN0b3JhZ2VcclxuICAgIG5pY2tuYW1lID0gZG9jdW1lbnQuZm9ybXMubmlja25hbWVGb3JtLm5pY2tuYW1lLnZhbHVlO1xyXG4gICAgbGV0IGxvY2FsTmFtZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCduYW1lJyk7XHJcblxyXG4gICAgaWYgKG5pY2tuYW1lICE9ICcnKXtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbmFtZScsIG5pY2tuYW1lKTtcclxuICAgICAgICBsb2NhbE5hbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbmFtZScpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG8gXCIgK2xvY2FsTmFtZSk7XHJcbiAgICB9IGVsc2UgaWYgKG5pY2tuYW1lID09ICcnKXtcclxuICAgICAgICBpZiAobG9jYWxOYW1lICE9IG51bGwpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvIFwiICtsb2NhbE5hbWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2FsTmFtZSA9ICcnO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvIFwiICsgbG9jYWxOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy93ZSB3aWxsIHJlbW92ZSBwYXJ0cyBvZiB0aGUgZm9ybSB0aGF0IHdlIHdvbid0IG5lZWQgYW55IG1vcmVcclxuICAgIG5pY2tuYW1lRm9ybUxhYmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICBuaWNrbmFtZUZvcm1UZXh0SW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIFxyXG4gICAgLy93ZSB3aWxsIHJlbW92ZSBzaWduSW4gYW5kIHNpZ25VcCBidXR0b25zXHJcbiAgICBzaWduLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgLy90aGUgY29yb25hIGFwcGVhcnNcclxuICAgIGNvcm9uYS5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9KVxyXG4gICAgLy90aGUgc21hbGwgY2lyY2xlcyBvZiB0aGUgY29yb25hIGFwcGVhclxyXG4gICAgdGlueUNpcmNsZUNvbnRhaW5lci5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgfSlcclxuICAgIFxyXG4gICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgLy90aGUgY29yb25hJ3MgZXllcyB3aWxsIGdldCBjbG9zZWQgYW5kIHR1cm4vbG9vayB0byB0aGUgb3RoZXIgc2lkZVxyXG4gICAgdG9wRXllc2hhZGUuc3R5bGUuYW5pbWF0aW9uID0gJ3NodXRUb3BFeWVzaGFkZSAyLjVzIDAuNjVzIGVhc2UgaW5maW5pdGUgbm9ybWFsJztcclxuICAgIGJvdHRvbUV5ZXNoYWRlLnN0eWxlLmFuaW1hdGlvbiA9ICdzaHV0Qm90dG9tRXllc2hhZGUgMi41cyAwLjY1cyBlYXNlIGluZmluaXRlIG5vcm1hbCc7XHJcbiAgICBleWVzLnN0eWxlLmFuaW1hdGlvbiA9ICd0dXJuRXllcyA1cyAwLjkyNXMgZWFzZSBpbmZpbml0ZSBub3JtYWwnOyBcclxuXHJcbiAgICAvL3RoZSBzY29yZSBzZWN0aW9uIGFwcGVhcnM6XHJcbiAgICBoZWFkZXIuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgIGhlYWRlci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnOyBcclxuICAgIGNvbnN0IHNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyICNzY29yZSBzcGFuJyk7XHJcbiAgICBzY29yZS50ZXh0Q29udGVudCA9IHVzZXJTY29yZTtcclxuICAgIGxldCB5ID0gMDtcclxuICAgIC8vdGhlIG5leHQgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYnk6IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUob3BhY2l0eUNoYW5nZSk7XHJcbiAgICAvL2FuZCBpdCB3aWxsIHRlbGwgdGhlIGJyb3dzZXIgdGhhdCBJIHdpc2ggdG8gcGVyZm9ybSBhbiBhbmltYXRpb24gd2l0aCB0aGUgb3BhY2l0eVxyXG4gICAgY29uc3Qgb3BhY2l0eUNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICB5ID0geSArIDAuMDM7XHJcbiAgICAgICAgaGVhZGVyLnN0eWxlLm9wYWNpdHkgPSBgJHt5fWA7XHJcblxyXG4gICAgICAgIGlmIChoZWFkZXIuc3R5bGUub3BhY2l0eSA8ICcxJyl7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShvcGFjaXR5Q2hhbmdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShvcGFjaXR5Q2hhbmdlKTtcclxuXHJcblxyXG4gICAgLy90aGUgdGltZXIgYXBwZWFyc1xyXG4gICAgY29uc3QgdGltZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGltZXInKTtcclxuICAgIHRpbWVyLnN0eWxlLmFuaW1hdGlvbiA9ICdub25lJzsvL2luIG9yZGVyIHRvIHJlc2V0IHRoZSBhbmltYXRpb24gb2YgdGhlIGVuZCBvZiB0aGUgbGV2ZWxcclxuICAgIHRpbWVyLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvbklzT24nKTsvL2JyaW5naW5nIGJhY2sgdGhlIG9yaWdpbmFsIGNsYXNzTmFtZVxyXG4gICAgdGltZXIuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW9uUmVtb3ZlZCcpOy8vYSB0ZW1wb3JhcnkgY2xhc3NOYW1lIHdlIGFkZGVkIHRvIHRoZSB0aW1lciBhdCB0aGUgZW5kIG9mIHRoZSBsZXZlbCAobm93IHdlJ3JlIHJlbW92aW5nIGl0KVxyXG4gICAgbGV0IHNlY29uZHMgPSBzZWNvbmRzRm9yRWFjaFN0YWdlW3N0YWdlXTtcclxuICAgIHRpbWVyLnRleHRDb250ZW50ID0gc2Vjb25kczsgIFxyXG4gICAgdGltZXIuc3R5bGUuYW5pbWF0aW9uID0gYHRpbWVyR3Jvd3MgMXMgJHtzZWNvbmRzKzF9IGVhc2Ugbm9ybWFsYDtcclxuICAgIFxyXG4gICAgLy90aGUgc3RhZ2UgYXBwZWFycyBvbiBzY3JlZW5cclxuICAgIGNvbnN0IGxldmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyICNsZXZlbCBzcGFuJyk7XHJcbiAgICBsZXZlbC50ZXh0Q29udGVudCA9IHN0YWdlKzE7XHJcblxyXG4gICAgLy9yZXNldHRpbmcgdGhlIGJvbnVzQXJyb3cgYW5pbWF0aW9uIGZyb20gdGhlIGVuZCBvZiB0aGUgbGV2ZWwsIHNvIGl0J2xsIGJlIGFibGUgdG8gd29yayBhZ2FpblxyXG4gICAgYm9udXNBcnJvdy5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7XHJcbiAgICBib251c0Fycm93LmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvblJlbW92ZWQnKTtcclxuICAgIGJvbnVzQXJyb3cuY2xhc3NMaXN0LmFkZCgnYW5pbWF0aW9uSXNPbicpO1xyXG5cclxuXHJcbiAgICAvL2Z1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgZnJvbSB0aGUgY291bnREb3duIGZ1bmN0aW9uIFxyXG4gICAgLy9hbmQgYWxzbyBmcm9tIHRoZSBjaGVjayBmdW5jdGlvblxyXG4gICAgY29uc3QgY2hlY2tCYWNrZ3JvdW5kID0gKGZpZ3VyZURpdikgPT4ge1xyXG4gICAgICAgIHJldHVybiBmaWd1cmVEaXYuc3R5bGUuYmFja2dyb3VuZC5pbmNsdWRlcygnc3RhcnMuc3ZnJyk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vY291bnREb3duIGZ1bmN0aW9uIGZvciB0aGUgdGltZXIgYW5kIGNoYW5naW5nIHRoZSBjb3JvbmEncyBjb2xvciB3aGVuIG5vdCBhbGwgZmlndXJlcyB3ZXJlIGNsaWNrZWRcclxuICAgIGNvbnN0IGNvdW50RG93biA9ICgpID0+IHtcclxuICAgICAgICBzZWNvbmRzID0gc2Vjb25kcyAtIDE7ICBcclxuICAgICAgICB0aW1lci50ZXh0Q29udGVudCA9IHNlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY291bnREb3duSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChjb3VudERvd24sIDEwMDApOyAvL2Z1bmN0aW9uIGZvciB0aGUgdGltZXJcclxuXHJcblxyXG4gICAgZmlndXJlcy5mb3JFYWNoKGZpZ3VyZSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRGaWd1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJytmaWd1cmUpO1xyXG5cclxuICAgICAgICAvL2FkZGluZyBhIGJhY2tncm91bmQgaW1hZ2UgZm9yIGVhY2ggZmlndXJlOlxyXG4gICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUuYmFja2dyb3VuZCA9IGB1cmwoJy4vJHtmaWd1cmV9LnN2ZycpYDsgXHJcbiAgICAgICAgLy9wdXR0aW5nIHRoZSBmaWd1cmVzIGluIGRpZmZlcmVudCBwbGFjZXMgYXQgc3RhcnRpbmcgcG9pbnRcclxuICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLnRvcCA9IE1hdGgucmFuZG9tKCkqKGJvZHkuY2xpZW50SGVpZ2h0IC0gNTYpICsgJ3B4JzsgLy81NiBpcyB0aGUgc2l6ZSBvZiB0aGUgZmlndXJlcy4gYm9keS5jbGllbnRIZWlnaHQgZ2l2ZXMgdGhlIHZpZXdwb3J0IHNpemUgd2l0aG91dCB0aGUgc2Nyb2xsIGJhclxyXG4gICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUubGVmdCA9IE1hdGgucmFuZG9tKCkqKGJvZHkuY2xpZW50V2lkdGggLSA1NikgKyAncHgnOyAvLzU2IGlzIHRoZSBzaXplIG9mIHRoZSBmaWd1cmVzLlxyXG4gICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgLy9zdGFydGluZyB0byBtb3ZlIHRoZSBmaWd1cmVzIGluIGRpZmZlcmVudCBkaXJlY3Rpb25zOlxyXG4gICAgICAgIGlmIChzdGFnZSA9PSA0IHx8IHN0YWdlID09IDYgfHwgc3RhZ2UgPT0gNyl7XHJcbiAgICAgICAgICAgIHNwZWVkID0gJ2Zhc3QnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNwZWVkID0gJ3JlZ3VsYXInO1xyXG4gICAgICAgIH1cclxuICAgICAgICBtb3ZlKGZpZ3VyZSwgc3BlZWQpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICAvL2Z1bmN0aW9uIGZvciBjbGlja2luZyBhIGZpZ3VyZVxyXG4gICAgICAgIGNvbnN0IHN0YXJzQW5kUG9pbnRzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnNBbmRQb2ludHMpO1xyXG4gICAgICAgICAgICBjdXJyZW50RmlndXJlLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKC4vc3RhcnMuc3ZnKSc7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUuc3R5bGUuYW5pbWF0aW9uID0gJ2ZpcmV3b3JrcyAwLjc1cyBlYXNlIGZvcndhcmRzIG5vcm1hbCc7XHJcbiAgICAgICAgICAgIHVzZXJTY29yZSArPSAxMDtcclxuICAgICAgICAgICAgc2NvcmUudGV4dENvbnRlbnQgPSB1c2VyU2NvcmU7XHJcbiAgICAgICAgICAgIC8vZGVsZXRpbmcgdGhlIGZpZ3VyZSBmcm9tIHRoZSBET01cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50RmlndXJlLnJlbW92ZSgpOyBcclxuICAgICAgICAgICAgfSwgNzUxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vYWRkaW5nIGV2ZW50TGlzdGVuZXIgZm9yIGVhY2ggZmlndXJlIGFuZCBhZGp1c3RpbmcgdGhlIHNjb3JlXHJcbiAgICAgICAgY3VycmVudEZpZ3VyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJzQW5kUG9pbnRzKTtcclxuXHJcbiAgICAgICAgLy9mdW5jdGlvbiB0aGF0IHByZXZlbnRzIGNsaWNraW5nIG9uIGZpZ3VyZXMsIHdoaWxlIHRoZSBhbWJ1bGFuY2VzIGNvbWVcclxuICAgICAgICBjb25zdCBwcmV2ZW50Q2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRGaWd1cmUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFyc0FuZFBvaW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2F0IHRoZSBlbmQgb2YgdGhlIHN0YWdlIHRoZSB1c2VyIHdvbid0IGJlIGFibGUgdG8gY2xpY2sgdGhlIGZpZ3VyZXNcclxuICAgICAgICBzZXRUaW1lb3V0KHByZXZlbnRDbGljaywgc2Vjb25kc0ZvckVhY2hTdGFnZVtzdGFnZV0qMTAwMCk7XHJcblxyXG4gICAgfSlcclxuXHJcblxyXG5cclxuICAgIC8vZnVuY3Rpb24gdGhhdCB3b3JrcyBhZnRlciB0aGUgdXNlciBmYWlsZWRcclxuICAgIGNvbnN0IGZhaWxpbmdQcm9jZWR1cmUgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIHN0b3BXb3JraW5nKDEpOyAgIFxyXG5cclxuICAgICAgICAvL21ha2luZyB0aGUgY29sb3Igb2YgdGhlIGNvcm9uYSByYW5kb21seSBkaWZmZXJlbnRcclxuICAgICAgICBsZXQgaCA9IE1hdGgucmFuZG9tKCkgKiAzNTk7IC8vdGhlIEggb2cgdGhlIGhzbCBpcyAwLTM1OVxyXG4gICAgICAgIGxldCBzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDgwIC0gMjYgKyAxKSArIDI2KTsvL0kgZGVjaWRlZCB0aGF0IHRoZSBwZXJjZW50YWdlIG9mIHRoZSBTIGluIGhzbCB3aWxsIGJlIGJldHdlZW4gMjYgYW5kIDgwIChiZWNhdXNlIGkgZG9uJ3QgbGlrZSBtaW4gc2F0dXJhdGlvbiBhbmQgbWF4IHNhdHVyYXRpb24pXHJcbiAgICAgICAgbGV0IGwgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoNzUgLSAzNSArIDEpICsgMzUpOy8vSSBkZWNpZGVkIHRoYXQgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIEwgaW4gaHNsIHdpbGwgYmUgYmV0d2VlbiAzNSBhbmQgNzUgKG5vdCB0b28gbGlnaHQgYW5kIG5vdCB0b28gZGFyaylcclxuICAgICAgICB0aW55Q2lyY2xlcy5mb3JFYWNoKGNpcmNsZSA9PiB7XHJcbiAgICAgICAgICAgIGNpcmNsZS5zdHlsZS5iYWNrZ3JvdW5kID0gYGhzbCgke2h9LCAke3N9JSwgJHtsfSUpYDtcclxuICAgICAgICB9KTsgICBcclxuICAgICAgICBcclxuICAgICAgICAvL3JlbW92aW5nIHRoZSBvcmlnaW5hbCBjbGFzcyBmcm9tIHRoZSB0aW1lciwgcmVzZXRzIGl0cyBhbmltYXRpb25cclxuICAgICAgICAvL2FuZCBsZXRzIHRoZSBhbmltYXRpb24gd29yayBhZ2FpbiBuZXh0IGxldmVsIChhZnRlciBhZGRpbmcgdGhlIG9sZCBjbGFzc05hbWUgYmFjaylcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGltZXIuc3R5bGUuYW5pbWF0aW9uID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aW1lci5jbGFzc0xpc3QuYWRkKCdhbmltYXRpb25SZW1vdmVkJyk7XHJcbiAgICAgICAgICAgIHRpbWVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FuaW1hdGlvbklzT24nKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIGZpZ3VyZXNEaXZzLmZvckVhY2goZmlndXJlRGl2ID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChmaWd1cmVEaXYuc3R5bGUuYmFja2dyb3VuZC5pbmNsdWRlcygnZmlndXJlJykpe1xyXG4gICAgICAgICAgICAgICAgZmlndXJlRGl2LnN0eWxlLnRvcCA9IHBhcnNlSW50KGZpZ3VyZURpdi5zdHlsZS50b3ApICsgJ3B4JzsgLy90aGUgbWV0aG9kIHBhcnNlSW50IHRha2VzIG9ubHkgdGhlIG51bWJlciAoYW5kIGxlYXZlcyBvdXQgdGhlIHN0cmluZyAncHgnIGF0dGFjaGVkIHRvIGl0KSBcclxuICAgICAgICAgICAgICAgIGZpZ3VyZURpdi5zdHlsZS5sZWZ0ID0gcGFyc2VJbnQoZmlndXJlRGl2LnN0eWxlLmxlZnQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgICAgICAvL2NyZWF0aW5nIGFtYnVsYW5jZXMgYW5kIHB1dHRpbmcgdGhlbSA4MHB4IGxlZnQgdG8gZWFjaCBmaWd1cmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGkuY2xhc3NMaXN0LmFkZCgnYW1idWxhbmNlJyk7XHJcbiAgICAgICAgICAgICAgICBib2R5Lmluc2VydEJlZm9yZShpLCBmb290ZXIpO1xyXG4gICAgICAgICAgICAgICAgaS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcbiAgICAgICAgICAgICAgICBpLnN0eWxlLnRvcCA9IGZpZ3VyZURpdi5zdHlsZS50b3A7XHJcbiAgICAgICAgICAgICAgICBpLnN0eWxlLmxlZnQgPSAocGFyc2VJbnQoZmlndXJlRGl2LnN0eWxlLmxlZnQpIC0gODApICsgXCJweFwiO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWd1cmVFbnRlcnNBbWJ1bGFuY2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHogPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHogPCAyMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWd1cmVEaXYuc3R5bGUudG9wID0gcGFyc2VJbnQoZmlndXJlRGl2LnN0eWxlLnRvcCkgKyAxICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeiArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNSAgXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL21vdmluZyB0aGUgYW1idWxhbmNlIGZyb20gdGhlIGxlZnQgb2YgdGhlIGZpZ3VyZSB0b3dhcmRzIHRoZSBmaWd1cmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vdmluZ0FtYnVsYW5jZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHBhcnNlSW50KGkuc3R5bGUubGVmdCkgPCBwYXJzZUludChmaWd1cmVEaXYuc3R5bGUubGVmdCkgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaS5zdHlsZS5sZWZ0ID0gKHBhcnNlSW50KGkuc3R5bGUubGVmdCkgKyAxKSArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAvL21vdmluZ0FtYnVsYW5jZVBhcnQyIHdpbGwgY2FsbCB0aGlzIGZ1bmN0aW9uOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgbW92ZVJpZ2h0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGkuc3R5bGUubGVmdCA9IChwYXJzZUludChpLnN0eWxlLmxlZnQpICsgMSkgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL21vdmluZyB0aGUgYW1idWxhbmNlIGZyb20gdGhlIGZpZ3VyZSB0byB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgc2NyZWVuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZpbmdBbWJ1bGFuY2VQYXJ0MiA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihwYXJzZUludChpLnN0eWxlLmxlZnQpIDwgb3VyVmlld1BvcnRXaWR0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vdmluZ1JpZ2h0ID0gc2V0SW50ZXJ2YWwobW92ZVJpZ2h0LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGkuc3R5bGUuYW5pbWF0aW9uID0gJ2Rpc2FwcGVhcnMgM3MgZWFzZSBmb3J3YXJkcyBub3JtYWwnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbCgoKSA9PiBjbGVhckludGVydmFsKG1vdmluZ1JpZ2h0KSwgMzAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZpZ3VyZUVudGVyc0FtYnVsYW5jZSwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICBmaWd1cmVEaXYuc3R5bGUuYW5pbWF0aW9uID0gJ2ZpZ3VyZUJlY29tZXNNaW5pIDAuNXMgMS4ycyBlYXNlIGZvcndhcmRzIG5vcm1hbCc7XHJcbiAgICAgICAgICAgICAgICBzZXRJbnRlcnZhbChtb3ZpbmdBbWJ1bGFuY2UsIDE1KTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQobW92aW5nQW1idWxhbmNlUGFydDIsIDE3MDApO1xyXG4gICAgICAgICAgICAgICAgLy9jbGVhbmluZyBhbGwgZmlndXJlcyBhbmQgZmlndXJlcyBhcnJheXMgYWZ0ZXIgdGhleSBlbnRlcmVkIHRoZSBhbWJ1bGFuY2VcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZpZ3VyZXNEaXZzLmZvckVhY2goZmlndXJlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlndXJlLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZmlndXJlcyA9IFtdOyBcclxuICAgICAgICAgICAgICAgICAgICBmaWd1cmVzRGl2cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIG51bXNPZkZpZ3MgPSBbXTtcclxuICAgICAgICAgICAgICAgIH0sIDE3MDApO1xyXG4gICAgICAgICAgICAgICAgLy9jbGVhbmluZyB0aGUgYW1idWxhbmNlcyBhZnRlciB0aGV5IGZpbmlzaGVkIHRoZWlyIHdvcmtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFtYnVsYW5jZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYW1idWxhbmNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYW1idWxhbmNlcy5mb3JFYWNoKGFtYnVsYW5jZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtYnVsYW5jZS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSwgNDcwMCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgLy9icmluZ2luZyBiYWNrIHRoZSBpbnN0cmFjdGlvbidzIGJveFxyXG4gICAgICAgIGNvbnN0IGJyaW5naW5nQmFja0luc3RydWN0aW9ucyA9ICgpID0+IHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKGxvY2FsTmFtZSA9PSAnJyl7XHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNQVGFnLnRleHRDb250ZW50ID0gXCJZb3UgZmFpbGVkIGFuZCBhIG5ldyB2YXJpYW50IGlzIHNwcmVhZGluZyBub3csIGJ1dCBkb24ndCB3b3JyeSwgeW91IGNhbiB0cnkgYWdhaW4gYW5kIHByZXZlbnQgYSB3b3JsZCBjYXRhc3Ryb3BoZS5cIjtcclxuICAgICAgICAgICAgfSBlbHNlIHsgICAgXHJcbiAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNQVGFnLnRleHRDb250ZW50ID0gbG9jYWxOYW1lICsgJywnICsgXCIgeW91IGZhaWxlZCBhbmQgYSBuZXcgdmFyaWFudCBpcyBzcHJlYWRpbmcgbm93LCBidXQgZG9uJ3Qgd29ycnksIHlvdSBjYW4gdHJ5IGFnYWluIGFuZCBwcmV2ZW50IGEgd29ybGQgY2F0YXN0cm9waGUuXCI7IFxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUudG9wID0gJ2NhbGMoMzAlICsgNHB4KSc7XHJcbiAgICAgICAgICAgIGluc3RydWN0aW9ucy5zdHlsZS5hbmltYXRpb24gPSAnaW5zdHJ1Y3Rpb25zQXBwZWFycyAyLjVzIGVhc2UgZm9yd2FyZHMgbm9ybWFsJzsgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgc2V0VGltZW91dChicmluZ2luZ0JhY2tJbnN0cnVjdGlvbnMsIDIwMDApO1xyXG4gICAgfVxyXG4gICBcclxuXHJcbiAgICAvL2Z1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIGFsbCB0aGUgZmlndXJlcyB3ZXJlIGNsaWNrZWQgb3IgaWYgdGhlIHRpbWUgb2YgdGhlIGxldmVsIGVuZGVkXHJcbiAgICBjb25zdCBlbmRMZXZlbENoZWNrID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChmaWd1cmVzRGl2cy5ldmVyeShjaGVja0JhY2tncm91bmQpKSB7ICAvL1wiZXZlcnlcIiByZXR1cm5zIHRydWUgaWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSBmb3IgYWxsIGVsZW1lbnRzIGluIHRoZSBhcnJheSAoaWYgYWxsIGZpZ3VyZXMgYmVjYW1lIHN0YXJzKVxyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGVuZExldmVsKTtcclxuICAgICAgICAgICAgc3RvcFdvcmtpbmcoMSk7IC8vdGhlIHN0YXJzIHdpbGwgc3RvcCBtb3ZpbmdcclxuICAgICAgICAgICAgc3RhZ2UgKz0gMTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb3VudERvd25JbnRlcnZhbCk7IC8vdGhlIGNsb2NrIHdpbGwgc3RvcFxyXG4gICAgICAgICAgICB0aW1lci5zdHlsZS5hbmltYXRpb24gPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRpbWVyLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvblJlbW92ZWQnKTtcclxuICAgICAgICAgICAgdGltZXIuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW9uSXNPbicpOy8vcmVtb3ZpbmcgdGhpcyBjbGFzcyByZXNldHMgdGhlIGFuaW1hdGlvbiBmb3IgdGhpcyBlbGVtZW50IGFuZCBsZXRzIHVzIHVzZSBpdCBhZ2FpbiBhZnRlciBhZGRpbmcgdGhpcyBjbGFzcyBiYWNrXHJcblxyXG4gICAgICAgICAgICBpZiAoc2Vjb25kcyAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lci5zdHlsZS5hbmltYXRpb24gPSBgdGltZXJHcm93c0FnYWluIDFzICR7c2Vjb25kc30gZWFzZSBub3JtYWxgO1xyXG5cclxuICAgICAgICAgICAgICAgIGJvbnVzQXJyb3cuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIGJvbnVzQXJyb3cuc3R5bGUuYW5pbWF0aW9uID0gYGFycm93R3Jvd3MgMXMgJHtzZWNvbmRzfSBlYXNlIG5vcm1hbGA7XHJcbiAgICAgICAgICAgICAgICBib251c0Fycm93LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvblJlbW92ZWQnKTtcclxuICAgICAgICAgICAgICAgIGJvbnVzQXJyb3cuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW9uSXNPbicpOy8vcmVtb3ZpbmcgdGhpcyBjbGFzcyByZXNldHMgdGhlIGFuaW1hdGlvbiBmb3IgdGhpcyBlbGVtZW50IGFuZCBsZXRzIHVzIHVzZSBpdCBhZ2FpbiBhZnRlciBhZGRpbmcgdGhpcyBjbGFzcyBiYWNrXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvbnVzQXJyb3cuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICAgICAgICAgIH0sIChzZWNvbmRzKjEwMDApKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYm9udXMgPSAoc2Vjb25kcyAqIDEwKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGkgPSAxO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgIHNldEludGVydmFsKCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgY291bnQgPSBjb3VudCArIGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50IDw9IGJvbnVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlclNjb3JlICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlLnRleHRDb250ZW50ID0gdXNlclNjb3JlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL2NsZWFuaW5nIHRoZSBmaWd1cmVzIGFycmF5cyAoaW4gb3JkZXIgdG8gZ2V0IHJlYWR5IGZvciBuZXh0IGxldmVsKTpcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmaWd1cmVzID0gW107IFxyXG4gICAgICAgICAgICAgICAgZmlndXJlc0RpdnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIG51bXNPZkZpZ3MgPSBbXTtcclxuICAgICAgICAgICAgfSwgNzUxKTsgLy9hZnRlciB0aGUgbGFzdCBmaXJld29yayBlbmRlZCBpdHMgd29ya1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9oaWRpbmcgdGhlIGNvcm9uYVxyXG4gICAgICAgICAgICBjb3JvbmEuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vYnJpbmdpbmcgYmFjayB0aGUgaW5zdHJhY3Rpb24ncyBib3hcclxuICAgICAgICAgICAgaWYobG9jYWxOYW1lID09ICcnKXtcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc1BUYWcudGV4dENvbnRlbnQgPSBwQW5vbltzdGFnZV07IC8vcEFub24gaXMgdGhlIHRleHQgYXBwZWFycyBpbiBzdG9yeUxpbmUuanNcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc1BUYWcudGV4dENvbnRlbnQgPSBsb2NhbE5hbWUgKyAnLCAnICsgcFtzdGFnZV07IC8vLy9wIGlzIHRoZSB0ZXh0IGFwcGVhcnMgaW4gc3RvcnlMaW5lLmpzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLnRvcCA9ICcyMiUnO1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBpbnN0cnVjdGlvbnMuc3R5bGUuYW5pbWF0aW9uID0gJ2luc3RydWN0aW9uc0FwcGVhcnMgMnMgZWFzZSBmb3J3YXJkcyBub3JtYWwnOyAgICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChzZWNvbmRzID09IDAgJiYgZmlndXJlc0RpdnMuZXZlcnkoY2hlY2tCYWNrZ3JvdW5kKSA9PSBmYWxzZSkgeyAvL2lmIG5vdCBhbGwgZmlndXJlcyBiZWNhbWUgc3RhcnMgYW5kIHRoZSBzZWNvbmRzIGVuZGVkXHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZW5kTGV2ZWwpO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGNvdW50RG93bkludGVydmFsKTsgLy90aGUgY2xvY2sgd2lsbCBzdG9wXHJcbiAgICAgICAgICAgIGZhaWxpbmdQcm9jZWR1cmUoKTsvL2Z1bmN0aW9uIHRoYXQgYnJpbmdzIHRoZSBhbWJ1bGFuY2VzXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBlbmRMZXZlbCA9IHNldEludGVydmFsKGVuZExldmVsQ2hlY2ssIDEpOyBcclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIl0sIm5hbWVzIjpbImJvZHkiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJoZWFkZXIiLCJjdXJzb3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInNldEF0dHJpYnV0ZSIsInBhZ2VZIiwicGFnZVgiLCJheGlzIiwiY29yb25hQ2lyY2xlIiwiYW5nbGUiLCJmb3JFYWNoIiwiZWxlbWVudCIsImkiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJzdHlsZSIsInRyYW5zZm9ybSIsIm4iLCJ0b3AiLCJib3R0b20iLCJyaWdodCIsImxlZnQiLCJjb250YWluZXJBbmdsZSIsIm0iLCJsIiwiY3VycmVudENvbnRhaW5lciIsImFwcGVuZCIsImV5ZXMiLCJ6IiwieSIsInNlY29uZHNGb3JFYWNoU3RhZ2UiLCJwRmFpbHVyZSIsInBGYWlsdXJlQW5vbiIsInAiLCJwQW5vbiIsInN0b3AiLCJzdG9wV29ya2luZyIsImJpbmFyeSIsIm91clZpZXdQb3J0V2lkdGgiLCJjbGllbnRXaWR0aCIsIm91clZpZXdQb3J0SGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiY29uc29sZSIsImxvZyIsIm1vdmUiLCJmaWd1cmUiLCJzcGVlZCIsInJhbmRvbUludFgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyYW5kb21JbnRZIiwiY3VycmVudEZpZ3VyZSIsImZpZ3VyZU1vdmVtZW50IiwiY2xlYXJJbnRlcnZhbCIsIm1vdmVtZW50SW50ZXJ2YWwiLCJvZmZzZXRUb3AiLCJvZmZzZXRMZWZ0IiwicGFyc2VJbnQiLCJiYWNrZ3JvdW5kIiwiYmF0QXJyYXkiLCJzb21lIiwiaW5jbHVkZXMiLCJzZXRJbnRlcnZhbCIsInJlZ2lzdGVyQnV0dG9uIiwicmVnaXN0ZXJGb3JtQ29udGFpbmVyIiwic2lnbkluQnV0dG9uIiwic2lnbkluRm9ybUNvbnRhaW5lciIsImNsb3NlWCIsImRpc3BsYXkiLCJmaWd1cmVzUGVyU3RhZ2UiLCJmaWd1cmUxIiwiZmlndXJlMiIsImZpZ3VyZTMiLCJmaWd1cmU0IiwiZmlndXJlNSIsImZpZ3VyZTYiLCJmaWd1cmU3IiwiZmlndXJlOCIsImZpZ3VyZTkiLCJmaWd1cmUxMCIsImZpZ3VyZTExIiwiZmlndXJlMTIiLCJmaWd1cmUxMyIsImZpZ3VyZTE0IiwiZmlndXJlMTUiLCJmaWd1cmUxNiIsImZpZ3VyZTE3IiwiZmlndXJlMTgiLCJmaWd1cmUxOSIsImZpZ3VyZTIwIiwic3RhcnMiLCJmYXZpY29uIiwiZm9vdGVyIiwiYnV0dG9uIiwidG9wRXllc2hhZGUiLCJib3R0b21FeWVzaGFkZSIsInRpbnlDaXJjbGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImNvcm9uYSIsInRpbnlDaXJjbGVDb250YWluZXIiLCJuaWNrbmFtZUZvcm1MYWJlbCIsIm5pY2tuYW1lRm9ybVRleHRJbnB1dCIsImluc3RydWN0aW9uc1BUYWciLCJzaWduIiwibmlja25hbWUiLCJzdGFnZSIsImluc3RydWN0aW9ucyIsImZpZ3VyZXMiLCJmaWd1cmVzRGl2cyIsIm51bXNPZkZpZ3MiLCJ1c2VyU2NvcmUiLCJib251c0Fycm93IiwicHJldmVudERlZmF1bHQiLCJwdXNoIiwibnVtIiwiZm9ybXMiLCJuaWNrbmFtZUZvcm0iLCJ2YWx1ZSIsImxvY2FsTmFtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJzZXRJdGVtIiwiYW5pbWF0aW9uIiwib3BhY2l0eSIsInNjb3JlIiwidGV4dENvbnRlbnQiLCJvcGFjaXR5Q2hhbmdlIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2luZG93IiwidGltZXIiLCJyZW1vdmUiLCJzZWNvbmRzIiwibGV2ZWwiLCJjaGVja0JhY2tncm91bmQiLCJmaWd1cmVEaXYiLCJjb3VudERvd24iLCJjb3VudERvd25JbnRlcnZhbCIsInN0YXJzQW5kUG9pbnRzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNldFRpbWVvdXQiLCJwcmV2ZW50Q2xpY2siLCJmYWlsaW5nUHJvY2VkdXJlIiwiaCIsInMiLCJjaXJjbGUiLCJwb3NpdGlvbiIsImZpZ3VyZUVudGVyc0FtYnVsYW5jZSIsIm1vdmluZ0FtYnVsYW5jZSIsIm1vdmVSaWdodCIsIm1vdmluZ0FtYnVsYW5jZVBhcnQyIiwibW92aW5nUmlnaHQiLCJhbWJ1bGFuY2VzIiwiYW1idWxhbmNlIiwiYnJpbmdpbmdCYWNrSW5zdHJ1Y3Rpb25zIiwiZW5kTGV2ZWxDaGVjayIsImV2ZXJ5IiwiZW5kTGV2ZWwiLCJib251cyIsImNvdW50Il0sInNvdXJjZVJvb3QiOiIifQ==