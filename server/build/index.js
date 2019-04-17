/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_pumps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/data/pumps */ \"./src/data/pumps.js\");\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\"); // const gpio = require('onoff').Gpio\n\n\nvar isOnline = __webpack_require__(/*! is-online */ \"is-online\");\n\nvar wifi = __webpack_require__(/*! node-wifi */ \"node-wifi\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar app = express();\n // Init the wifi module\n\nwifi.init({\n  // network interface, choose a random wifi interface if set to null\n  iface: null\n}); // Setup Security middleware\n\napp.use(helmet()); // Serve static files\n\napp.use(express.static(path.resolve('./public'))); // Parse Post data\n\napp.use(bodyParser.json()); // handle base route - interrupt if no internet connection\n\napp.get('/', function (req, res) {\n  res.sendFile('index.html', {\n    root: './public'\n  });\n}); // get internet status\n\napp.get('/check-online',\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.t0 = res;\n            _context.next = 3;\n            return isOnline({\n              timeout: 4000\n            });\n\n          case 3:\n            _context.t1 = _context.sent;\n            _context.t2 = {\n              'online': _context.t1\n            };\n\n            _context.t0.send.call(_context.t0, _context.t2);\n\n          case 6:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, this);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\napp.get('/scan', function (req, res) {\n  wifi.scan().then(function (networks) {\n    res.send(networks);\n  }).catch(function (err) {\n    console.log(err);\n    res.send(err);\n  });\n}); // Start a pump by id\n\napp.post('/startPump', function (req, res) {\n  var pump = req.body.pump;\n  console.log('Turning on pump ' + Object(_data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"id_of\"])(pump));\n  var result = Object(_data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"turn_on\"])(Object(_data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"power_to\"])(pump));\n  res.send({\n    pump: pump\n  });\n}); // Stop a pump by id\n\napp.post('/stopPump', function (req, res) {\n  var pump = req.body.pump;\n  console.log('Turning off pump ' + Object(_data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"id_of\"])(pump));\n  var result = Object(_data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"turn_off\"])(Object(_data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"power_to\"])(pump));\n  res.send({\n    pump: pump\n  });\n}); // Run the device server\n\napp.listen(3000, function () {\n  return console.log('MrBartender listening on port 3000!');\n}); // Cleanup GPIO resources on server close\n\nprocess.on('exit', function () {\n  console.log('Exiting MrBartender, happy drinking!');\n\n  for (var i = 1; i <= 12; i++) {\n    _data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"pumps\"][i.toString()].unexport();\n  }\n});\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./src/data/gpio.js":
/*!**************************!*\
  !*** ./src/data/gpio.js ***!
  \**************************/
/*! exports provided: gpio */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gpio\", function() { return gpio; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar gpio =\n/*#__PURE__*/\nfunction () {\n  function gpio(pin, pwr) {\n    _classCallCheck(this, gpio);\n\n    this.pin = pin;\n    this.pwr = pwr;\n    this.state = 0;\n  }\n\n  _createClass(gpio, [{\n    key: \"writeSync\",\n    value: function writeSync(state) {\n      this.state = state;\n      return state;\n    }\n  }, {\n    key: \"readSync\",\n    value: function readSync() {\n      return this.state;\n    }\n  }]);\n\n  return gpio;\n}();\n\n//# sourceURL=webpack:///./src/data/gpio.js?");

/***/ }),

/***/ "./src/data/pumps.js":
/*!***************************!*\
  !*** ./src/data/pumps.js ***!
  \***************************/
/*! exports provided: pumps, turn_on, turn_off, id_of, power_to, tube_length, ready_time */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pumps\", function() { return pumps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"turn_on\", function() { return turn_on; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"turn_off\", function() { return turn_off; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"id_of\", function() { return id_of; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"power_to\", function() { return power_to; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tube_length\", function() { return tube_length; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ready_time\", function() { return ready_time; });\n/* harmony import */ var _data_gpio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/data/gpio */ \"./src/data/gpio.js\");\n// import { Gpio as gpio } from 'onoff'  \n\nvar nums = [2, 3, 4, 5, 6, 13, 14, 15, 17, 18, 19, 26];\nvar pumps = [[1, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](26, 'high'), 25, 110], [2, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](19, 'high'), 25, 110], [3, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](13, 'high'), 25, 110], [4, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](6, 'high'), 25, 110], [5, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](5, 'high'), 25, 110], [6, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](2, 'high'), 25, 110], [7, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](3, 'high'), 25, 110], [8, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](4, 'high'), 25, 110], [9, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](17, 'high'), 25, 110], [10, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](14, 'high'), 25, 110], [11, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](15, 'high'), 25, 110], [12, new _data_gpio__WEBPACK_IMPORTED_MODULE_0__[\"gpio\"](18, 'high'), 25, 110]];\nvar turn_on = function turn_on(device) {\n  device.writeSync(0);\n  return device.readSync();\n};\nvar turn_off = function turn_off(device) {\n  device.writeSync(1);\n  return device.readSync();\n};\nvar id_of = function id_of(pump) {\n  return pump[0];\n};\nvar power_to = function power_to(pump) {\n  return pump[1];\n};\nvar tube_length = function tube_length(pump) {\n  return pump[2];\n}; // time in ms for pump to fill tube\n\nvar ready_time = function ready_time(pump) {\n  return pump[4];\n};\n\n//# sourceURL=webpack:///./src/data/pumps.js?");

/***/ }),

/***/ 0:
/*!**********************************************!*\
  !*** multi babel-polyfill ./server/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! ./server/index.js */\"./server/index.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./server/index.js?");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"babel-polyfill\");\n\n//# sourceURL=webpack:///external_%22babel-polyfill%22?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "is-online":
/*!****************************!*\
  !*** external "is-online" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"is-online\");\n\n//# sourceURL=webpack:///external_%22is-online%22?");

/***/ }),

/***/ "node-wifi":
/*!****************************!*\
  !*** external "node-wifi" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"node-wifi\");\n\n//# sourceURL=webpack:///external_%22node-wifi%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });