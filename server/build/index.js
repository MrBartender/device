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
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var _data_pumps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/data/pumps */ \"./src/data/pumps.js\");\n\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\n\nvar isOnline = __webpack_require__(/*! is-online */ \"is-online\");\n\nvar wifi = __webpack_require__(/*! node-wifi */ \"node-wifi\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar app = express();\n\nvar AWS = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n\n\nvar credentials = new AWS.SharedIniFileCredentials({\n  profile: 'prototype'\n});\nAWS.config.credentials = credentials;\nAWS.config.update({\n  region: 'us-east-1'\n});\nvar sqs = new AWS.SQS({\n  apiVersion: '2012-11-05'\n});\nvar queue_url = 'https://sqs.us-east-1.amazonaws.com/996076014670/TestQueue'; // Init the wifi module\n\nwifi.init({\n  // network interface, choose a random wifi interface if set to null\n  iface: null\n}); // Setup Security middleware\n\napp.use(helmet()); // Serve static files\n\napp.use(express.static(path.resolve(__dirname, 'home/kiosk-user/mrbartender/public'))); // Parse Post data\n\napp.use(bodyParser.json()); // handle base route - interrupt if no internet connection\n\napp.get('/', function (req, res) {\n  // res.sendFile('index.html', { root: './mrbartender/public/build' })\n  res.sendFile(path.resolve(__dirname, 'home/kiosk-user/mrbartender/public/index.html'));\n}); // get internet status\n\napp.get('/check-online',\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(req, res) {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.t0 = res;\n            _context.next = 3;\n            return isOnline({\n              timeout: 4000\n            });\n\n          case 3:\n            _context.t1 = _context.sent;\n            _context.t2 = {\n              'online': _context.t1\n            };\n\n            _context.t0.send.call(_context.t0, _context.t2);\n\n          case 6:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, this);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\napp.get('/scan', function (req, res) {\n  wifi.scan().then(function (networks) {\n    res.send(networks);\n  }).catch(function (err) {\n    console.log(err);\n    res.send(err);\n  });\n}); // pop next order message from sqs queue\n\napp.get('/queue/next', function (req, res) {\n  var params = {\n    AttributeNames: [\"SentTimestamp\"],\n    MaxNumberOfMessages: 1,\n    MessageAttributeNames: [\".*\" //get all attributes\n    ],\n    QueueUrl: queue_url,\n    VisibilityTimeout: 20,\n    WaitTimeSeconds: 3\n  };\n  sqs.receiveMessage(params, function (err, data) {\n    if (err) {\n      console.log(\"Receive Error\", err);\n      res.send(false);\n    } else if (data.Messages) {\n      var message = data.Messages[0];\n      console.log(\"Message retrieved\", data.Messages[0].MessageId);\n      res.send({\n        order_id: message.Body\n      });\n      var deleteParams = {\n        QueueUrl: queue_url,\n        ReceiptHandle: data.Messages[0].ReceiptHandle\n      };\n      sqs.deleteMessage(deleteParams, function (err, data) {\n        if (err) {\n          console.log(\"Delete Error\", err);\n        } else {\n          console.log(\"Message Deleted\", data);\n        }\n      });\n    } else {\n      res.send(false);\n    }\n  });\n});\napp.post('/order', function (req, res) {\n  var order_id = req.body.order_id;\n  console.log('retrieving order', order_id); // TODO: API call goes here\n\n  res.send({\n    pumps: [{\n      id: 1,\n      ms: 2000\n    }, {\n      id: 2,\n      ms: 2000\n    }]\n  }); // for testing\n}); // Get a pump by id\n\napp.get('/pump', function (req, res) {\n  var id = req.body.id;\n  res.send({\n    pump: _data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"pumps\"][id - 1]\n  });\n}); // Start a pump by id\n\napp.post('/startPump', function (req, res) {\n  var id = req.body.id;\n  var pump = _data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"pumps\"][id - 1];\n  console.log('Turning on pump ' + pump.id);\n  var result = pump.start();\n  res.send({\n    pump: pump\n  });\n}); // Stop a pump by id\n\napp.post('/stopPump', function (req, res) {\n  var id = req.body.id;\n  var pump = _data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"pumps\"][id - 1];\n  console.log('Turning off pump ' + pump.id);\n  var result = pump.stop();\n  res.send({\n    pump: pump\n  });\n}); // Run the device server\n\napp.listen(3000, function () {\n  return console.log('MrBartender listening on port 3000!');\n}); // Cleanup GPIO resources on server close\n\nprocess.on('exit', function () {\n  console.log('Exiting MrBartender, happy drinking!');\n\n  for (var i = 1; i <= 12; i++) {\n    _data_pumps__WEBPACK_IMPORTED_MODULE_0__[\"pumps\"][i.toString()].unexport();\n  }\n});\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./src/data/pumps.js":
/*!***************************!*\
  !*** ./src/data/pumps.js ***!
  \***************************/
/*! exports provided: pump, pumps, pour */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pump\", function() { return pump; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pumps\", function() { return pumps; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pour\", function() { return pour; });\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar gpio = __webpack_require__(/*! onoff */ \"onoff\").Gpio;\n\nvar nums = [2, 3, 4, 5, 6, 13, 14, 15, 17, 18, 19, 26];\nvar pump =\n/*#__PURE__*/\nfunction () {\n  function pump(id, pin, tube_length, ready_time) {\n    _classCallCheck(this, pump);\n\n    this.id = id;\n    this.gpio = new gpio(pin, 'high');\n    this.tube_length = tube_length;\n    this.ready_time = ready_time;\n  }\n\n  _createClass(pump, [{\n    key: \"start\",\n    value: function start() {\n      console.log('starting pump', this.id);\n      this.gpio.writeSync(0);\n      return this.gpio.readSync();\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      console.log('stopping pump', this.id);\n      this.gpio.writeSync(1);\n      return this.gpio.readSync();\n    }\n  }, {\n    key: \"pour_for\",\n    value: function () {\n      var _pour_for = _asyncToGenerator(\n      /*#__PURE__*/\n      regeneratorRuntime.mark(function _callee(ms) {\n        return regeneratorRuntime.wrap(function _callee$(_context) {\n          while (1) {\n            switch (_context.prev = _context.next) {\n              case 0:\n                this.start();\n                _context.next = 3;\n                return new Promise(function (r) {\n                  return setTimeout(r, ms);\n                });\n\n              case 3:\n                this.stop();\n                return _context.abrupt(\"return\", this);\n\n              case 5:\n              case \"end\":\n                return _context.stop();\n            }\n          }\n        }, _callee, this);\n      }));\n\n      function pour_for(_x) {\n        return _pour_for.apply(this, arguments);\n      }\n\n      return pour_for;\n    }()\n  }]);\n\n  return pump;\n}();\nvar pumps = [new pump(1, 26, 25, 110), new pump(2, 19, 25, 110), new pump(3, 13, 25, 110), new pump(4, 6, 25, 110), new pump(5, 5, 25, 110), new pump(6, 2, 25, 110), new pump(7, 3, 25, 110), new pump(8, 4, 25, 110), new pump(9, 17, 25, 110), new pump(10, 14, 25, 110), new pump(11, 15, 25, 110), new pump(12, 18, 25, 110)];\nfunction pour(_x2) {\n  return _pour.apply(this, arguments);\n}\n\nfunction _pour() {\n  _pour = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee2(order) {\n    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, pump, ms;\n\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            _iteratorNormalCompletion = true;\n            _didIteratorError = false;\n            _iteratorError = undefined;\n            _context2.prev = 3;\n            _iterator = order.pumps[Symbol.iterator]();\n\n          case 5:\n            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {\n              _context2.next = 13;\n              break;\n            }\n\n            pump = _step.value;\n            ms = pump.ms;\n            _context2.next = 10;\n            return pumps[pump.id - 1].pour_for(ms);\n\n          case 10:\n            _iteratorNormalCompletion = true;\n            _context2.next = 5;\n            break;\n\n          case 13:\n            _context2.next = 19;\n            break;\n\n          case 15:\n            _context2.prev = 15;\n            _context2.t0 = _context2[\"catch\"](3);\n            _didIteratorError = true;\n            _iteratorError = _context2.t0;\n\n          case 19:\n            _context2.prev = 19;\n            _context2.prev = 20;\n\n            if (!_iteratorNormalCompletion && _iterator.return != null) {\n              _iterator.return();\n            }\n\n          case 22:\n            _context2.prev = 22;\n\n            if (!_didIteratorError) {\n              _context2.next = 25;\n              break;\n            }\n\n            throw _iteratorError;\n\n          case 25:\n            return _context2.finish(22);\n\n          case 26:\n            return _context2.finish(19);\n\n          case 27:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, this, [[3, 15, 19, 27], [20,, 22, 26]]);\n  }));\n  return _pour.apply(this, arguments);\n}\n\n//# sourceURL=webpack:///./src/data/pumps.js?");

/***/ }),

/***/ 0:
/*!**********************************************!*\
  !*** multi babel-polyfill ./server/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! babel-polyfill */\"babel-polyfill\");\nmodule.exports = __webpack_require__(/*! ./server/index.js */\"./server/index.js\");\n\n\n//# sourceURL=webpack:///multi_babel-polyfill_./server/index.js?");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"aws-sdk\");\n\n//# sourceURL=webpack:///external_%22aws-sdk%22?");

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

/***/ "onoff":
/*!************************!*\
  !*** external "onoff" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"onoff\");\n\n//# sourceURL=webpack:///external_%22onoff%22?");

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