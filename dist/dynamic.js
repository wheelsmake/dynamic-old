/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dynamic.ts":
/*!************************!*\
  !*** ./src/dynamic.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/index */ "../utils/index.ts");
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/index */ "./src/utils/index.ts");
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Dynamic_instances, _Dynamic_rootNode, _Dynamic_sourceDNs, _Dynamic_transDNs, _Dynamic_exportDNs, _Dynamic_DNs, _Dynamic_detectDN;


console.info("dynamic ©LJM12914. https://github.com/wheelsmake/dynamic \r\nYou are using an unminified version of dynamic, which is not suitable for production use.");
const DEV = "DEV" in window && window.DEV === true;
class Dynamic {
    constructor(rootNode) {
        _Dynamic_instances.add(this);
        _Dynamic_rootNode.set(this, void 0);
        _Dynamic_sourceDNs.set(this, []);
        _Dynamic_transDNs.set(this, []);
        _Dynamic_exportDNs.set(this, []);
        _Dynamic_DNs.set(this, []);
        __classPrivateFieldSet(this, _Dynamic_rootNode, _utils_index__WEBPACK_IMPORTED_MODULE_0__.arguments.reduceToElement(rootNode), "f");
        __classPrivateFieldGet(this, _Dynamic_instances, "m", _Dynamic_detectDN).call(this, __classPrivateFieldGet(this, _Dynamic_rootNode, "f"));
    }
    get rootNode() { return __classPrivateFieldGet(this, _Dynamic_rootNode, "f"); }
    __DEV__getPrivateFields__() {
        if (DEV)
            return {
                rootNode: __classPrivateFieldGet(this, _Dynamic_rootNode, "f"),
                sourceDNs: __classPrivateFieldGet(this, _Dynamic_sourceDNs, "f"),
                transDNs: __classPrivateFieldGet(this, _Dynamic_transDNs, "f"),
                exportDNs: __classPrivateFieldGet(this, _Dynamic_exportDNs, "f"),
                DNs: __classPrivateFieldGet(this, _Dynamic_DNs, "f")
            };
    }
    sourceDN(args) {
        const DNs = __classPrivateFieldGet(this, _Dynamic_DNs, "f"), sourceDNs = __classPrivateFieldGet(this, _Dynamic_sourceDNs, "f"), transDNs = __classPrivateFieldGet(this, _Dynamic_transDNs, "f"), exportDNs = __classPrivateFieldGet(this, _Dynamic_exportDNs, "f");
        var thisDN;
        if (typeof args == "object") {
            const result = _utils_index__WEBPACK_IMPORTED_MODULE_1__.createDN.createSDN(args);
            sourceDNs.push(result);
            DNs.push(result);
            thisDN = result;
        }
        else
            for (let i = 0; i < sourceDNs.length; i++)
                if (sourceDNs[i].name === args)
                    thisDN = sourceDNs[i];
        return {
            connectTo(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.connectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); },
            disconnectTo(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.disconnectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); },
            existsNext(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.existsNext([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); },
            get frequency() { return thisDN.frequency; },
            set frequency(frequency) {
                if (typeof frequency != "number")
                    _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("frequency", "number", frequency);
                else
                    thisDN.frequency = frequency;
            },
            get value() { if (DEV)
                return thisDN.value; }
        };
    }
    transDN(args) {
        const DNs = __classPrivateFieldGet(this, _Dynamic_DNs, "f"), sourceDNs = __classPrivateFieldGet(this, _Dynamic_sourceDNs, "f"), transDNs = __classPrivateFieldGet(this, _Dynamic_transDNs, "f"), exportDNs = __classPrivateFieldGet(this, _Dynamic_exportDNs, "f");
        var thisDN;
        if (typeof args == "object") {
            const result = _utils_index__WEBPACK_IMPORTED_MODULE_1__.createDN.createTDN(args);
            transDNs.push(result);
            DNs.push(result);
            thisDN = result;
        }
        else
            for (let i = 0; i < transDNs.length; i++)
                if (transDNs[i].name === args)
                    thisDN = transDNs[i];
        return {
            connectTo(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.connectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); },
            disconnectTo(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.disconnectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); },
            connectFrom(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.connectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); },
            disconnectFrom(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.disconnectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); },
            existsPrev(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.existsPrev([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); },
            existsNext(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.existsNext([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); }
        };
    }
    exportDN(args) {
        const DNs = __classPrivateFieldGet(this, _Dynamic_DNs, "f"), sourceDNs = __classPrivateFieldGet(this, _Dynamic_sourceDNs, "f"), transDNs = __classPrivateFieldGet(this, _Dynamic_transDNs, "f"), exportDNs = __classPrivateFieldGet(this, _Dynamic_exportDNs, "f");
        var thisDN;
        if (typeof args == "object") {
            const result = _utils_index__WEBPACK_IMPORTED_MODULE_1__.createDN.createEDN(args);
            exportDNs.push(result);
            DNs.push(result);
            thisDN = result;
        }
        else
            for (let i = 0; i < exportDNs.length; i++)
                if (exportDNs[i].name === args)
                    thisDN = exportDNs[i];
        return {
            connectFrom(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.connectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); },
            disconnectFrom(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.disconnectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); },
            existsPrev(target) { return _utils_index__WEBPACK_IMPORTED_MODULE_1__.dno.existsPrev([DNs, sourceDNs, transDNs, exportDNs], thisDN, target); }
        };
    }
}
_Dynamic_rootNode = new WeakMap(), _Dynamic_sourceDNs = new WeakMap(), _Dynamic_transDNs = new WeakMap(), _Dynamic_exportDNs = new WeakMap(), _Dynamic_DNs = new WeakMap(), _Dynamic_instances = new WeakSet(), _Dynamic_detectDN = function _Dynamic_detectDN(node) {
    if (node.textContent) {
        const sDNm = node.textContent.match(/^__[^:]+__$/), tDNm = node.textContent.match(/^--[^:]+--$/), eDNm = node.textContent.match(/^::[^:]+::$/);
        if (eDNm)
            this.exportDN({
                name: eDNm[0].substring(2, eDNm[0].length - 2),
                export() {
                }
            });
        if (sDNm) {
        }
    }
    const attrs = node.attributes;
    for (let i = 0; i < attrs.length; i++) {
    }
    for (let i = 0; i < node.childNodes.length; i++) {
    }
};
_utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.constantize(Dynamic);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dynamic);


/***/ }),

/***/ "./src/utils/createDN.ts":
/*!*******************************!*\
  !*** ./src/utils/createDN.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createEDN": () => (/* binding */ createEDN),
/* harmony export */   "createSDN": () => (/* binding */ createSDN),
/* harmony export */   "createTDN": () => (/* binding */ createTDN)
/* harmony export */ });
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index */ "../utils/index.ts");

function createSDN(args) {
    checkArgs("s", args);
}
function createTDN(args) {
    checkArgs("t", args);
}
function createEDN(args) {
    checkArgs("e", args);
}
function checkArgs(type, args) {
    const a = "args", b = "DNCreateArgs", c = " is invalid";
    if (!("name" in args))
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E(a, b, args, `${a}.name${c}`);
    else if ("methods" in args && typeof args.methods != "object")
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E(a, b, args, `${a}.methods${c}`);
    else
        switch (type) {
            case "s":
                if (!("fetch" in args) || typeof args.fetch != "function")
                    _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E(a, `s${b}`, args, `${a}.fetch${c}`);
                else
                    break;
            case "t":
                if ("isCached" in args && args.isCached === true && (!("frequency" in args) || typeof args.frequency != "number"))
                    _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E(a, `t${b}`, args, `${a}.frequency${c}`);
                break;
            case "e":
                if (!("export" in args) || typeof args.export != "function")
                    _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E(a, `e${b}`, args, `${a}.export${c}`);
                break;
            default:
                _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.EE("?");
                break;
        }
}


/***/ }),

/***/ "./src/utils/dno.ts":
/*!**************************!*\
  !*** ./src/utils/dno.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "connectFrom": () => (/* binding */ connectFrom),
/* harmony export */   "connectTo": () => (/* binding */ connectTo),
/* harmony export */   "disconnectFrom": () => (/* binding */ disconnectFrom),
/* harmony export */   "disconnectTo": () => (/* binding */ disconnectTo),
/* harmony export */   "existsNext": () => (/* binding */ existsNext),
/* harmony export */   "existsPrev": () => (/* binding */ existsPrev)
/* harmony export */ });
/* harmony import */ var _utils_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/index */ "../utils/index.ts");

function connectTo(data, objective, target) {
    const targetDN = processTarget(data, target);
    if (data[1].indexOf(targetDN) != -1)
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.EE("Source datanodes cannot be connected.");
    else if (objective.nexts.indexOf(targetDN) != -1)
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("target", undefined, target, "duplicated next nodes");
    else {
        objective.nexts.push(targetDN);
        targetDN.prevs.push(objective);
    }
}
function disconnectTo(data, objective, target) {
    const targetDN = processTarget(data, target);
    if (data[1].indexOf(targetDN) != -1)
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.EE("Source datanodes cannot be connected, thus wont be disconnected.");
    else if (objective.nexts.indexOf(targetDN) == -1)
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("target", undefined, target, "cannot find it as next nodes");
    else {
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.precisePop(targetDN, objective.nexts);
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.precisePop(objective, targetDN.prevs);
    }
}
function connectFrom(data, objective, target) {
}
function disconnectFrom(data, objective, target) {
}
function existsPrev(data, objective, target) {
    const targetDN = processTarget(data, target);
    return false;
}
function existsNext(data, objective, target) {
    const targetDN = processTarget(data, target);
    return false;
}
function processTarget(data, target) {
    if (typeof target == "object") {
        if (data[0].indexOf(target) != -1)
            return target;
        else
            _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("target", undefined, target, "cannot find this datanode");
    }
    else if (typeof target == "string") {
        for (let i = 0; i < data[0].length; i++)
            if (data[0][i].name === target)
                return data[0][i];
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("target", undefined, target, "cannot find this datanode");
    }
    else
        _utils_index__WEBPACK_IMPORTED_MODULE_0__.generic.E("target", "string | nextDN", target);
}


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDN": () => (/* reexport module object */ _createDN__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "dno": () => (/* reexport module object */ _dno__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _dno__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dno */ "./src/utils/dno.ts");
/* harmony import */ var _createDN__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createDN */ "./src/utils/createDN.ts");






/***/ }),

/***/ "../utils/arguments.ts":
/*!*****************************!*\
  !*** ../utils/arguments.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reduceToElement": () => (/* binding */ reduceToElement)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "../utils/index.ts");

function reduceToElement(input) {
    if (input instanceof Element)
        return input;
    else if (typeof input == "string") {
        const el = _index__WEBPACK_IMPORTED_MODULE_0__.element.e(input);
        if (el instanceof Node)
            return el;
        else
            _index__WEBPACK_IMPORTED_MODULE_0__.generic.E("rootNode", "string | Element", input, "rootNode should be a VALID #id selector");
    }
    else
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.E("rootNode", "string | Element", input, "rootNode should be a #id selector or an Element");
}


/***/ }),

/***/ "../utils/element.ts":
/*!***************************!*\
  !*** ../utils/element.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ e),
/* harmony export */   "getInnerNodes": () => (/* binding */ getInnerNodes),
/* harmony export */   "hatch": () => (/* binding */ hatch),
/* harmony export */   "isChild": () => (/* binding */ isChild),
/* harmony export */   "isDescendant": () => (/* binding */ isDescendant),
/* harmony export */   "isInDocument": () => (/* binding */ isInDocument),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "toHTML": () => (/* binding */ toHTML)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "../utils/index.ts");

function e(s, scope) {
    if (scope === undefined || !(scope instanceof Element))
        scope = document;
    let a = scope.querySelectorAll(s);
    if (!a.length)
        return [];
    if (a.length == 1 && s.match(/^.*#[^\s]*$/))
        return a[0];
    else
        return Array.from(a);
}
function isDescendant(possibleDescendant, possibleParent) {
    while (possibleDescendant.tagName != "HTML") {
        possibleDescendant = possibleDescendant.parentNode;
        if (possibleDescendant === possibleParent)
            return true;
    }
    return false;
}
function isInDocument(element) {
    return isDescendant(element, e("html")[0]);
}
function isChild(element, target) {
    const children = target.childNodes;
    for (let i = 0; i < children.length; i++)
        if (element === children[i])
            return true;
    return false;
}
function toHTML(HTML) {
    if (HTML === "" || typeof HTML != "string")
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.E("HTML", "string", HTML);
    const ele = document.createElement("div");
    ele.innerHTML = HTML;
    return getInnerNodes(ele);
}
function getInnerNodes(el) {
    var nodes = [];
    for (let i = 0; i < el.childNodes.length; i++)
        nodes[i] = el.childNodes[i].cloneNode(true);
    return nodes;
}
function hatch(element, remove) {
    const par = element.parentElement, children = Array.from(element.childNodes);
    for (let i = 0; i < children.length; i++)
        par.insertBefore(children[i], element);
    if (remove === true)
        element.remove();
    return children;
}
function render(HTML, element, insertAfter, append, disableDF) {
    if (element.parentElement === null)
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.EE("cannot render by '<html>' element, since it's root of document.");
    var html = [];
    if (typeof HTML == "string")
        html = toHTML(HTML);
    else if (HTML instanceof Element || HTML instanceof Node)
        html[0] = HTML.cloneNode(true);
    else if (HTML instanceof HTMLCollection || HTML instanceof NodeList)
        for (let i = 0; i < HTML.length; i++)
            html[i] = HTML.item(i).cloneNode(true);
    else
        html = HTML;
    const Rhtml = [...html].reverse(), parent = element.parentElement;
    if (append === true)
        for (let i = 0; i < html.length; i++)
            element.append(html[i]);
    else if (append === false)
        for (let i = 0; i < Rhtml.length; i++)
            element.prepend(Rhtml[i]);
    else if (insertAfter === true) {
        if (!element.nextSibling)
            for (let i = 0; i < Rhtml.length; i++)
                parent.append(Rhtml[i]);
        else
            for (let i = 0; i < Rhtml.length; i++)
                parent.insertBefore(Rhtml[i], element.nextSibling);
    }
    else if (insertAfter === false)
        for (let i = 0; i < html.length; i++)
            parent.insertBefore(html[i], element);
    else
        for (let i = 0; i < html.length; i++)
            element.append(html[i]);
    return html;
}


/***/ }),

/***/ "../utils/generic.ts":
/*!***************************!*\
  !*** ../utils/generic.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ E),
/* harmony export */   "EE": () => (/* binding */ EE),
/* harmony export */   "constantize": () => (/* binding */ constantize),
/* harmony export */   "precisePop": () => (/* binding */ precisePop),
/* harmony export */   "randoma2Z": () => (/* binding */ randoma2Z),
/* harmony export */   "randoma2z029": () => (/* binding */ randoma2z029),
/* harmony export */   "repeat": () => (/* binding */ repeat)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "../utils/index.ts");

function randoma2Z(length) {
    var s = "";
    for (let i = 0; i < length; i++) {
        let r = Math.floor(Math.random() * 52);
        if (r > 25)
            s += String.fromCharCode(r + 71);
        else
            s += String.fromCharCode(r + 65);
    }
    return s;
}
function randoma2z029(length) {
    var s = "";
    for (let i = 0; i < length; i++) {
        let r = Math.floor(Math.random() * 36);
        if (r < 10)
            s += r;
        else
            s += String.fromCharCode(r + 87);
    }
    return s;
}
function precisePop(ele, array) {
    if (array.indexOf(ele) === -1)
        return null;
    return array.splice(array.indexOf(ele), 1)[0];
}
function constantize(obj) {
    Object.freeze(obj);
    for (let i = 0; i < Object.keys(obj).length; i++)
        if (typeof obj[Object.keys(obj)[i]] == "object")
            constantize(obj[Object.keys(obj)[i]]);
}
function E(argument, type, value, reason) {
    if (argument === undefined)
        throw new Error("An error occured.");
    else {
        console.info("ERROR INFO: argument", argument, ",type", type, ",value", value, ",reason", reason);
        throw new Error(`Argument '${argument}' ${type ? `should be a(an) ${type}` : "is invalid"}${reason ? `, reason: ${reason}` : ""}${value ? `, got ${value}` : ""}.`);
    }
}
function EE(message) { throw new Error(message); }
function repeat(item, count) {
    if (typeof count != "number" || count < 1)
        _index__WEBPACK_IMPORTED_MODULE_0__.generic.E("count", "number smaller than 1", count);
    var arr = [];
    arr[count - 1] = " ";
    return arr.fill(item, 0, count);
}


/***/ }),

/***/ "../utils/index.ts":
/*!*************************!*\
  !*** ../utils/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arguments": () => (/* reexport module object */ _arguments__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "element": () => (/* reexport module object */ _element__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "generic": () => (/* reexport module object */ _generic__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _generic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generic */ "../utils/generic.ts");
/* harmony import */ var _element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element */ "../utils/element.ts");
/* harmony import */ var _arguments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arguments */ "../utils/arguments.ts");








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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/dynamic.export.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dynamic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dynamic */ "./src/dynamic.ts");

Object.defineProperty(window, "Dynamic", {
    configurable: false,
    writable: false,
    enumerable: true,
    value: _dynamic__WEBPACK_IMPORTED_MODULE_0__["default"]
});

})();

/******/ })()
;
//# sourceMappingURL=dynamic.js.map