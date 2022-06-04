/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dataFlow.ts":
/*!*************************!*\
  !*** ./src/dataFlow.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ dataFlow)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
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
var _dataFlow_dynamic, _dataFlow_dfScopes, _dataFlow_observer, _dataFlow_observerCB;

class dataFlow {
    constructor(dynamic) {
        _dataFlow_dynamic.set(this, void 0);
        _dataFlow_dfScopes.set(this, []);
        _dataFlow_observer.set(this, void 0);
        _dataFlow_observerCB.set(this, (resultList, observer) => {
        });
        __classPrivateFieldSet(this, _dataFlow_dynamic, dynamic, "f");
        __classPrivateFieldSet(this, _dataFlow_observer, new MutationObserver(__classPrivateFieldGet(this, _dataFlow_observerCB, "f")), "f");
        __classPrivateFieldGet(this, _dataFlow_observer, "f").observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    new() {
    }
    generateDFID() {
        return _utils__WEBPACK_IMPORTED_MODULE_0__["default"].generateDFID();
    }
}
_dataFlow_dynamic = new WeakMap(), _dataFlow_dfScopes = new WeakMap(), _dataFlow_observer = new WeakMap(), _dataFlow_observerCB = new WeakMap();


/***/ }),

/***/ "./src/template.ts":
/*!*************************!*\
  !*** ./src/template.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ template)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
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
var _template_dynamic, _template_templates, _template_instances, _template_observer, _template_test, _template_observerCB, _template_convertTemplate;

class template {
    constructor(dynamic) {
        _template_dynamic.set(this, void 0);
        _template_templates.set(this, []);
        _template_instances.set(this, []);
        _template_observer.set(this, void 0);
        _template_test.set(this, "fdsaaaaaaaaaa");
        _template_observerCB.set(this, (resultList, observer) => {
            for (let i = 0; i < resultList.length; i++)
                for (let j = 0; j < resultList[i].addedNodes.length; j++) {
                    const ele = resultList[i].addedNodes[j];
                    if (ele instanceof HTMLTemplateElement && ele.getAttribute("nodynamic") === null)
                        __classPrivateFieldGet(this, _template_convertTemplate, "f").call(this, ele);
                }
        });
        _template_convertTemplate.set(this, (template_input) => {
            if (template_input === undefined) {
                const templates = document.querySelectorAll("template");
                for (let i = 0; i < templates.length; i++) {
                    if (templates[i].getAttribute("nodynamic") === null) {
                        var tuid = templates[i].getAttribute("tuid");
                        if (!tuid || !_utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkTUID(tuid))
                            tuid = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].generateTUID();
                        this.register({
                            element: templates[i],
                            TUID: tuid,
                            remove: templates[i].getAttribute("dynamic") !== null
                        });
                    }
                }
            }
            else {
                var tuid = template_input.getAttribute("tuid");
                if (!tuid || !_utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkTUID(tuid))
                    tuid = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].generateTUID();
                this.register({
                    element: template_input,
                    TUID: tuid,
                    remove: template_input.getAttribute("dynamic") !== null
                });
            }
        });
        __classPrivateFieldSet(this, _template_dynamic, dynamic, "f");
        __classPrivateFieldGet(this, _template_convertTemplate, "f").call(this);
        __classPrivateFieldSet(this, _template_observer, new MutationObserver(__classPrivateFieldGet(this, _template_observerCB, "f")), "f");
        __classPrivateFieldGet(this, _template_observer, "f").observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    register(args) {
        if (args.TUID !== undefined && !_utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkTUID(args.TUID))
            _utils__WEBPACK_IMPORTED_MODULE_0__["default"].E("TUID", "string with some limitations", `${args.TUID}, read the documentation for help`);
        else if (args.TUID === undefined)
            args.TUID = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].generateTUID();
        var tem = {
            id: args.TUID,
            content: null
        };
        if (args.element instanceof HTMLTemplateElement) {
            var el = document.createElement("div");
            for (let i = 0; i < args.element.content.childNodes.length; i++)
                el.appendChild(args.element.content.childNodes[i].cloneNode(true));
            tem.content = el;
        }
        else
            tem.content = args.element.cloneNode(true);
        __classPrivateFieldGet(this, _template_templates, "f").push(tem);
        if (args.remove === true)
            args.element.remove();
        return args.TUID;
    }
    render(args) {
        for (let i = 0; i < __classPrivateFieldGet(this, _template_templates, "f").length; i++) {
            if (__classPrivateFieldGet(this, _template_templates, "f")[i].id === args.tuID) {
                const id = __classPrivateFieldGet(this, _template_templates, "f")[i].id, content = __classPrivateFieldGet(this, _template_templates, "f")[i].content;
                var nodes = [];
                if (args.removeOuterElement === true)
                    nodes = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getInnerNodes(content);
                else
                    nodes[0] = content.cloneNode(true);
                return _utils__WEBPACK_IMPORTED_MODULE_0__["default"].render(nodes, args.element, args.insertAfter, args.append, args.disableDF);
            }
        }
        _utils__WEBPACK_IMPORTED_MODULE_0__["default"].E("tuID", "valid ID that exists", args.tuID);
        return null;
    }
    update(args) {
    }
    delete(tuID) {
        for (let i = 0; i < __classPrivateFieldGet(this, _template_templates, "f").length; i++)
            if (__classPrivateFieldGet(this, _template_templates, "f")[i].id === tuID) {
                let content = __classPrivateFieldGet(this, _template_templates, "f")[i].content;
                __classPrivateFieldGet(this, _template_templates, "f").splice(i, 1);
                return content;
            }
        return null;
    }
    getContent(tuID) {
        for (let i = 0; i < __classPrivateFieldGet(this, _template_templates, "f").length; i++)
            if (__classPrivateFieldGet(this, _template_templates, "f")[i].id === tuID)
                return __classPrivateFieldGet(this, _template_templates, "f")[i].content;
        return null;
    }
    exists(element) {
        for (let i = 0; i < __classPrivateFieldGet(this, _template_templates, "f").length; i++)
            if (__classPrivateFieldGet(this, _template_templates, "f")[i].content === element)
                return __classPrivateFieldGet(this, _template_templates, "f")[i].id;
        return null;
    }
    getInstance(tuID) {
    }
    getTemplates() { return __classPrivateFieldGet(this, _template_templates, "f"); }
}
_template_dynamic = new WeakMap(), _template_templates = new WeakMap(), _template_instances = new WeakMap(), _template_observer = new WeakMap(), _template_test = new WeakMap(), _template_observerCB = new WeakMap(), _template_convertTemplate = new WeakMap();


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var nodes = {};
function E(name, type, value) {
    if (name === undefined)
        throw new Error("An error occured.");
    else
        throw new Error(`Argument '${name}' ${type ? `should be a ${type}` : "is invalid"}${value ? `, received ${value}` : ""}.`);
}
function EE(message) { throw new Error(message); }
function toHTML(HTML) {
    const ele = document.createElement("div");
    var returnA = [];
    ele.innerHTML = HTML;
    if (HTML === "" || typeof HTML != "string")
        E("HTML", "string", HTML);
    for (let i = 0; i < ele.childNodes.length; i++)
        returnA[i] = ele.childNodes[i];
    return returnA;
}
function toHTMLString(HTML) {
    const ele = document.createElement("div");
    ele.appendChild(HTML);
    return ele.innerHTML;
}
function getInnerNodes(el) {
    var nodes = [];
    for (let i = 0; i < el.childNodes.length; i++)
        nodes[i] = el.childNodes[i].cloneNode(true);
    return nodes;
}
function repeat(item, count) {
    if (typeof count != "number" || count < 1)
        E("count", "number smaller than 1", count);
    var arr = [];
    arr[count - 1] = " ";
    return arr.fill(item, 0, count);
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
function checkTUID(id) {
    var preservedIDs = ["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"];
    var isValid = !!id.match("^[a-z0-9][a-z0-9-]+[a-z0-9]$");
    if (!isValid)
        console.warn(`The specified tuID is invalid: ${id}. Dynamic is going to generate one instead.`);
    if (preservedIDs.indexOf(id) != -1) {
        isValid = false;
        console.warn(`The specified tuID is one of the preserved element names: ${id}. Dynamic is going to generate one instead. See https://html.spec.whatwg.org/#valid-custom-element-name for help.`);
    }
    return isValid;
}
function generateTUID() {
    return `${randoma2z029(11)}-${randoma2z029(17)}`;
}
function constantize(obj) {
    Object.freeze(obj);
    for (let i = 0; i < Object.keys(obj).length; i++)
        if (typeof obj[Object.keys(obj)[i]] == "object")
            constantize(obj[Object.keys(obj)[i]]);
}
function render(HTML, element, insertAfter, append, disableDF) {
    if (element.parentElement === null)
        EE("cannot render by '<html>' element, since it's root of document.");
    var html = [];
    if (typeof HTML == "string")
        html = toHTML(HTML);
    else if (HTML instanceof HTMLElement || HTML instanceof Node)
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
function generateDFID() {
    return `dfid-${randoma2z029(24)}`;
}
var utils = {
    nodes: nodes,
    E: E,
    EE: EE,
    toHTML: toHTML,
    toHTMLString: toHTMLString,
    getInnerNodes: getInnerNodes,
    repeat: repeat,
    randoma2z029: randoma2z029,
    checkTUID: checkTUID,
    generateTUID: generateTUID,
    constantize: constantize,
    render: render,
    generateDFID: generateDFID
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (utils);


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
/*!************************!*\
  !*** ./src/dynamic.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _template__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./template */ "./src/template.ts");
/* harmony import */ var _dataFlow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataFlow */ "./src/dataFlow.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");



console.warn("dynamic.js ©LJM12914. https://github.com/openink/dynamic \r\nYou are using an unminified version of dynamic.js, which is not suitable for production use.");
class Dynamic {
    constructor(options) {
        this.options = undefined;
        console.warn("Creating new Dynamic instance.");
        console.log(options);
        this.options = options;
        this.template = new _template__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        this.dataFlow = new _dataFlow__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    }
    repeat(args) { return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].repeat(args.item, args.count); }
    render(args) {
        return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].render(args.HTML, args.element, args.insertAfter, args.append, args.disableDF);
    }
    e(s) {
        let a = document.querySelectorAll(s);
        if (!a.length)
            return [];
        if (a.length == 1 && s.match(/^.*#[^\s]*$/))
            return a[0];
        else
            return Array.from(a);
    }
}
_utils__WEBPACK_IMPORTED_MODULE_2__["default"].constantize(Dynamic);
const w1ndow = window;
w1ndow.Dynamic = Dynamic;

})();

/******/ })()
;
//# sourceMappingURL=dynamic.js.map