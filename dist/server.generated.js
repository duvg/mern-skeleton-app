/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\n(function () {\n  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;\n  enterModule && enterModule(module);\n})();\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\nconst config = {\n  env: \"development\" || 0,\n  port: process.env.PORT || 3000,\n  jwtSecret: process.env.JWT_SECRET || 'TheMainSecretSpace',\n  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || 'mongodb://' + (process.env.IP || '127.0.0.1') + ':' + (process.env.MONGO_PORT || '27017') + '/mernproject'\n};\nconst _default = config;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_default);\n;\n(function () {\n  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;\n  if (!reactHotLoader) {\n    return;\n  }\n  reactHotLoader.register(config, \"config\", \"C:\\\\proyectos\\\\mern-skeleton-app\\\\config\\\\config.js\");\n  reactHotLoader.register(_default, \"default\", \"C:\\\\proyectos\\\\mern-skeleton-app\\\\config\\\\config.js\");\n})();\n;\n(function () {\n  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;\n  leaveModule && leaveModule(module);\n})();\n\n//# sourceURL=webpack://mern-skeleton-app/./config/config.js?");

/***/ }),

/***/ "./server/express.js":
/*!***************************!*\
  !*** ./server/express.js ***!
  \***************************/
/***/ (() => {

eval("throw new Error(\"Module build failed (from ./node_modules/babel-loader/lib/index.js):\\nSyntaxError: C:\\\\proyectos\\\\mern-skeleton-app\\\\server\\\\express.js: Missing semicolon. (49:3)\\n\\n\\u001b[0m \\u001b[90m 47 |\\u001b[39m app\\u001b[33m.\\u001b[39muse(\\u001b[32m'/'\\u001b[39m\\u001b[33m,\\u001b[39m categoryRoutes)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 48 |\\u001b[39m app\\u001b[33m.\\u001b[39muse(\\u001b[32m'/'\\u001b[39m\\u001b[33m,\\u001b[39m productRoutes)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m\\u001b[31m\\u001b[1m>\\u001b[22m\\u001b[39m\\u001b[90m 49 |\\u001b[39m app use(\\u001b[32m'/'\\u001b[39m\\u001b[33m,\\u001b[39m postRoutes)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m    |\\u001b[39m    \\u001b[31m\\u001b[1m^\\u001b[22m\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 50 |\\u001b[39m app use(\\u001b[32m'/'\\u001b[39m\\u001b[33m,\\u001b[39m commentRoutes)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 51 |\\u001b[39m app use(\\u001b[32m'/'\\u001b[39m\\u001b[33m,\\u001b[39m likeRoutes)\\u001b[33m;\\u001b[39m\\u001b[0m\\n\\u001b[0m \\u001b[90m 52 |\\u001b[39m\\u001b[0m\\n    at instantiate (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:60:32)\\n    at constructor (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:355:12)\\n    at JSXParserMixin.raise (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3204:19)\\n    at JSXParserMixin.semicolon (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:3566:10)\\n    at JSXParserMixin.parseExpressionStatement (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13105:10)\\n    at JSXParserMixin.parseStatementContent (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12688:19)\\n    at JSXParserMixin.parseStatementLike (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12535:17)\\n    at JSXParserMixin.parseModuleItem (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12512:17)\\n    at JSXParserMixin.parseBlockOrModuleBlockBody (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13136:36)\\n    at JSXParserMixin.parseBlockBody (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:13129:10)\\n    at JSXParserMixin.parseProgram (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12411:10)\\n    at JSXParserMixin.parseTopLevel (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:12401:25)\\n    at JSXParserMixin.parse (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:14297:10)\\n    at parse (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\parser\\\\lib\\\\index.js:14338:38)\\n    at parser (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\parser\\\\index.js:41:34)\\n    at parser.next (<anonymous>)\\n    at normalizeFile (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transformation\\\\normalize-file.js:64:38)\\n    at normalizeFile.next (<anonymous>)\\n    at run (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transformation\\\\index.js:21:50)\\n    at run.next (<anonymous>)\\n    at transform (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\@babel\\\\core\\\\lib\\\\transform.js:22:41)\\n    at transform.next (<anonymous>)\\n    at step (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\gensync\\\\index.js:261:32)\\n    at C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\gensync\\\\index.js:273:13\\n    at async.call.result.err.err (C:\\\\proyectos\\\\mern-skeleton-app\\\\node_modules\\\\gensync\\\\index.js:223:11)\");\n\n//# sourceURL=webpack://mern-skeleton-app/./server/express.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../config/config */ \"./config/config.js\");\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./express */ \"./server/express.js\");\n/* harmony import */ var _express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_express__WEBPACK_IMPORTED_MODULE_2__);\nvar __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {\n  return a;\n};\n\n\n\n(mongoose__WEBPACK_IMPORTED_MODULE_0___default().Promise) = global.Promise;\nmongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(_config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mongoUri);\nmongoose__WEBPACK_IMPORTED_MODULE_0___default().connection.on('error', () => {\n  throw new Error(`Unable to connect to database: ${_config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].mongoUri}`);\n});\n_express__WEBPACK_IMPORTED_MODULE_2___default().listen(_config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].port, err => {\n  if (err) {\n    console.log(err);\n  }\n  console.info('Server is started on port %s', _config_config__WEBPACK_IMPORTED_MODULE_1__[\"default\"].port);\n});\n\n//# sourceURL=webpack://mern-skeleton-app/./server/server.js?");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

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
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;