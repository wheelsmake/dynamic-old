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
var _dataFlow_options, _dataFlow_dfScopes, _dataFlow_dataNodes, _dataFlow_observer, _dataFlow__, _dataFlow_observerCB;

class dataFlow {
    constructor(options, _) {
        _dataFlow_options.set(this, void 0);
        _dataFlow_dfScopes.set(this, []);
        _dataFlow_dataNodes.set(this, []);
        _dataFlow_observer.set(this, void 0);
        _dataFlow__.set(this, {});
        _dataFlow_observerCB.set(this, (resultList, observer) => {
        });
        __classPrivateFieldSet(this, _dataFlow_options, options, "f");
        __classPrivateFieldSet(this, _dataFlow__, _, "f");
        __classPrivateFieldSet(this, _dataFlow_observer, new MutationObserver(__classPrivateFieldGet(this, _dataFlow_observerCB, "f")), "f");
        __classPrivateFieldGet(this, _dataFlow_observer, "f").observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    new(element) {
        for (let i = 0; i < __classPrivateFieldGet(this, _dataFlow_dfScopes, "f").length; i++)
            if (_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isDescendant(element, __classPrivateFieldGet(this, _dataFlow_dfScopes, "f")[i]) || element === __classPrivateFieldGet(this, _dataFlow_dfScopes, "f")[i])
                return;
        for (let i = 0; i < __classPrivateFieldGet(this, _dataFlow_dfScopes, "f").length; i++)
            if (_utils__WEBPACK_IMPORTED_MODULE_0__["default"].isDescendant(__classPrivateFieldGet(this, _dataFlow_dfScopes, "f")[i], element))
                _utils__WEBPACK_IMPORTED_MODULE_0__["default"].precisePop(__classPrivateFieldGet(this, _dataFlow_dfScopes, "f")[i], __classPrivateFieldGet(this, _dataFlow_dfScopes, "f"));
        __classPrivateFieldGet(this, _dataFlow_dfScopes, "f").push(element);
    }
    createDataNode() {
    }
    connect(node1, node2) {
    }
}
_dataFlow_options = new WeakMap(), _dataFlow_dfScopes = new WeakMap(), _dataFlow_dataNodes = new WeakMap(), _dataFlow_observer = new WeakMap(), _dataFlow__ = new WeakMap(), _dataFlow_observerCB = new WeakMap();


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
var _template_options, _template_templates, _template_instances, _template_observer, _template_parseSlots, _template_getTemplateObject, _template_observerCB, _template_convertTemplate;

class template {
    constructor(options) {
        _template_options.set(this, void 0);
        _template_templates.set(this, []);
        _template_instances.set(this, []);
        _template_observer.set(this, void 0);
        _template_parseSlots.set(this, (target, argSlots) => {
            const slots = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].e("slot", target);
            if (argSlots !== undefined && slots.length != 0)
                for (let i = 0; i < slots.length; i++) {
                    const attr = slots[i].getAttribute("name"), isHTMLSlot = slots[i].getAttribute("html") === "";
                    if (attr === null || attr === "")
                        continue;
                    for (let j in argSlots)
                        if (j === attr) {
                            const content = argSlots[j];
                            if (content === undefined)
                                continue;
                            if (isHTMLSlot)
                                slots[i].innerHTML = content;
                            else
                                slots[i].innerText = content;
                        }
                }
            if (slots.length != 0)
                for (let i = 0; i < slots.length; i++) {
                    const par = slots[i].parentElement;
                    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].hatch(slots[i], true);
                    par.normalize();
                }
        });
        _template_getTemplateObject.set(this, (tuID) => {
            for (let i = 0; i < __classPrivateFieldGet(this, _template_templates, "f").length; i++)
                if (__classPrivateFieldGet(this, _template_templates, "f")[i].id === tuID)
                    return __classPrivateFieldGet(this, _template_templates, "f")[i];
            return null;
        });
        _template_observerCB.set(this, (resultList, observer) => {
            for (let i = 0; i < resultList.length; i++)
                for (let j = 0; j < resultList[i].addedNodes.length; j++) {
                    const ele = resultList[i].addedNodes[j];
                    if (!(ele instanceof HTMLElement))
                        return;
                    if (ele instanceof HTMLTemplateElement)
                        __classPrivateFieldGet(this, _template_convertTemplate, "f").call(this, ele);
                    if (this.getContent(ele.tagName.toLowerCase())) {
                        var slots = [];
                        for (let i = 0; i < ele.childNodes.length; i++) {
                            const child = ele.childNodes[i];
                            if (child instanceof HTMLElement && child.tagName === "SLOT")
                                slots.push(child);
                        }
                        var argSlots = {};
                        for (let i = 0; i < slots.length; i++) {
                            const name = slots[i].getAttribute("name");
                            if (name === null || name === "")
                                continue;
                            argSlots[name] = slots[i].innerHTML;
                        }
                        ele.innerHTML = "";
                        this.render({
                            tuID: ele.tagName.toLowerCase(),
                            element: ele,
                            slots: argSlots
                        });
                        _utils__WEBPACK_IMPORTED_MODULE_0__["default"].hatch(ele, true);
                    }
                }
        });
        _template_convertTemplate.set(this, (template_input) => {
            const goRender = (template) => {
                if (template.getAttribute("nodynamic") === null) {
                    var tuid = template.getAttribute("tuid");
                    if (!tuid || !_utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkTUID(tuid))
                        tuid = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].generateTUID();
                    const el = document.createElement("div"), children = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getInnerNodes(template.content);
                    for (let i = 0; i < children.length; i++)
                        el.appendChild(children[i]);
                    if (template.getAttribute("dynamic") !== null)
                        template.remove();
                    this.register({
                        element: el,
                        tuID: tuid,
                        remove: true
                    });
                }
            };
            if (template_input === undefined) {
                const templates = document.querySelectorAll("template");
                for (let i = 0; i < templates.length; i++)
                    goRender(templates[i]);
            }
            else
                goRender(template_input);
        });
        __classPrivateFieldSet(this, _template_options, options, "f");
        __classPrivateFieldGet(this, _template_convertTemplate, "f").call(this);
        __classPrivateFieldSet(this, _template_observer, new MutationObserver(__classPrivateFieldGet(this, _template_observerCB, "f")), "f");
        __classPrivateFieldGet(this, _template_observer, "f").observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    register(args) {
        if (args.tuID !== undefined && !_utils__WEBPACK_IMPORTED_MODULE_0__["default"].checkTUID(args.tuID))
            _utils__WEBPACK_IMPORTED_MODULE_0__["default"].E("tuID", "string with some limitations", `${args.tuID}, read the documentation for help`);
        else if (args.tuID === undefined)
            args.tuID = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].generateTUID();
        while (this.existsTUID(args.tuID)) {
            if (__classPrivateFieldGet(this, _template_options, "f") && __classPrivateFieldGet(this, _template_options, "f").enableAntiClash === true) {
                if (__classPrivateFieldGet(this, _template_options, "f").clashHandler !== undefined)
                    args.tuID = __classPrivateFieldGet(this, _template_options, "f").clashHandler("tuID", args, __classPrivateFieldGet(this, _template_getTemplateObject, "f").call(this, args.tuID));
                else
                    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].E("options.clashHandler", "Function", __classPrivateFieldGet(this, _template_options, "f").clashHandler);
            }
            else
                _utils__WEBPACK_IMPORTED_MODULE_0__["default"].E("tuID", "non-repetitive string", args.tuID);
        }
        const tem = {
            id: args.tuID,
            content: args.element.cloneNode(true)
        };
        __classPrivateFieldGet(this, _template_templates, "f").push(tem);
        if (args.remove === true)
            args.element.remove();
        return args.tuID;
    }
    render(args) {
        for (let i = 0; i < __classPrivateFieldGet(this, _template_templates, "f").length; i++) {
            if (__classPrivateFieldGet(this, _template_templates, "f")[i].id === args.tuID) {
                const content = __classPrivateFieldGet(this, _template_templates, "f")[i].content.cloneNode(true);
                if (content instanceof HTMLElement)
                    __classPrivateFieldGet(this, _template_parseSlots, "f").call(this, content, args.slots);
                var nodes = [];
                if (args.removeOuterElement === true)
                    nodes = _utils__WEBPACK_IMPORTED_MODULE_0__["default"].getInnerNodes(content);
                else
                    nodes[0] = content;
                return _utils__WEBPACK_IMPORTED_MODULE_0__["default"].render(nodes, args.element, args.insertAfter, args.append, args.disableDF);
            }
        }
        _utils__WEBPACK_IMPORTED_MODULE_0__["default"].E("tuID", "valid ID that exists", args.tuID);
    }
    update(args) {
        for (let i = 0; i < __classPrivateFieldGet(this, _template_templates, "f").length; i++)
            if (__classPrivateFieldGet(this, _template_templates, "f")[i].id === args.tuID) {
                if (args.element instanceof HTMLElement) {
                    const oldContent = __classPrivateFieldGet(this, _template_templates, "f")[i].content;
                    __classPrivateFieldGet(this, _template_templates, "f")[i].content = args.element;
                    return oldContent;
                }
                else
                    _utils__WEBPACK_IMPORTED_MODULE_0__["default"].E("element", "HTMLElement", args.element);
            }
        return null;
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
    existsTUID(tuID) {
        for (let i = 0; i < __classPrivateFieldGet(this, _template_templates, "f").length; i++)
            if (__classPrivateFieldGet(this, _template_templates, "f")[i].id === tuID)
                return true;
        return false;
    }
    existsElement(element) {
        for (let i = 0; i < __classPrivateFieldGet(this, _template_templates, "f").length; i++)
            if (__classPrivateFieldGet(this, _template_templates, "f")[i].content.isEqualNode(element))
                return __classPrivateFieldGet(this, _template_templates, "f")[i].id;
        return null;
    }
    getTemplates() { return __classPrivateFieldGet(this, _template_templates, "f"); }
    getInstance(tuID) {
    }
}
_template_options = new WeakMap(), _template_templates = new WeakMap(), _template_instances = new WeakMap(), _template_observer = new WeakMap(), _template_parseSlots = new WeakMap(), _template_getTemplateObject = new WeakMap(), _template_observerCB = new WeakMap(), _template_convertTemplate = new WeakMap();


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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {
    return {
        e(s, scope) {
            if (scope === undefined || !(scope instanceof HTMLElement))
                scope = document;
            let a = scope.querySelectorAll(s);
            if (!a.length)
                return [];
            if (a.length == 1 && s.match(/^.*#[^\s]*$/))
                return a[0];
            else
                return Array.from(a);
        },
        precisePop(ele, array) {
            if (array.indexOf(ele) === -1)
                return null;
            return array.splice(array.indexOf(ele), 1);
        },
        isDescendant(element, target) {
            while (element.tagName != "HTML") {
                element = element.parentNode;
                if (element === target)
                    return true;
            }
            return false;
        },
        isChild(element, target) {
            const children = target.childNodes;
            for (let i = 0; i < children.length; i++)
                if (element === children[i])
                    return true;
            return false;
        },
        E(argument, type, value) {
            if (argument === undefined)
                throw new Error("An error occured.");
            else
                throw new Error(`Argument '${argument}' ${type ? `should be a ${type}` : "is invalid"}${value ? `, got ${value}` : ""}.`);
        },
        EE(message) { throw new Error(message); },
        toHTML(HTML) {
            if (HTML === "" || typeof HTML != "string")
                this.E("HTML", "string", HTML);
            const ele = document.createElement("div");
            ele.innerHTML = HTML;
            return this.getInnerNodes(ele);
        },
        getInnerNodes(el) {
            var nodes = [];
            for (let i = 0; i < el.childNodes.length; i++)
                nodes[i] = el.childNodes[i].cloneNode(true);
            return nodes;
        },
        repeat(item, count) {
            if (typeof count != "number" || count < 1)
                this.E("count", "number smaller than 1", count);
            var arr = [];
            arr[count - 1] = " ";
            return arr.fill(item, 0, count);
        },
        randoma2z029(length) {
            var s = "";
            for (let i = 0; i < length; i++) {
                let r = Math.floor(Math.random() * 36);
                if (r < 10)
                    s += r;
                else
                    s += String.fromCharCode(r + 87);
            }
            return s;
        },
        checkTUID(id) {
            const preservedIDs = ["annotation-xml", "color-profile", "font-face", "font-face-src", "font-face-uri", "font-face-format", "font-face-name", "missing-glyph"];
            var isValid = !!id.match("^[a-z0-9][a-z0-9-]+[a-z0-9]$");
            if (preservedIDs.indexOf(id) != -1)
                this.EE(`The specified tuID is one of the preserved element names: ${id}. See https://html.spec.whatwg.org/#valid-custom-element-name for help.`);
            return isValid;
        },
        generateTUID() {
            return `${this.randoma2z029(11)}-${this.randoma2z029(17)}`;
        },
        constantize(obj) {
            Object.freeze(obj);
            for (let i = 0; i < Object.keys(obj).length; i++)
                if (typeof obj[Object.keys(obj)[i]] == "object")
                    this.constantize(obj[Object.keys(obj)[i]]);
        },
        render(HTML, element, insertAfter, append, disableDF) {
            if (element.parentElement === null)
                this.EE("cannot render by '<html>' element, since it's root of document.");
            var html = [];
            if (typeof HTML == "string")
                html = this.toHTML(HTML);
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
        },
        generateDFID() {
            return `dfid-${this.randoma2z029(24)}`;
        },
        checkDFID(id) {
            return true;
        },
        hatch(element, remove) {
            const par = element.parentElement, children = Array.from(element.childNodes);
            for (let i = 0; i < children.length; i++)
                par.insertBefore(children[i], element);
            if (remove === true)
                element.remove();
            return children;
        }
    };
})());


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
var _Dynamic_options;



console.warn("dynamic.js ©LJM12914. https://github.com/openink/dynamic \r\nYou are using an unminified version of dynamic.js, which is not suitable for production use.");
class Dynamic {
    constructor(options) {
        _Dynamic_options.set(this, void 0);
        this._ = {};
        console.warn("Creating new Dynamic instance with options", options);
        __classPrivateFieldSet(this, _Dynamic_options, options, "f");
        this.template = new _template__WEBPACK_IMPORTED_MODULE_0__["default"](__classPrivateFieldGet(this, _Dynamic_options, "f"));
        this.dataFlow = new _dataFlow__WEBPACK_IMPORTED_MODULE_1__["default"](__classPrivateFieldGet(this, _Dynamic_options, "f"), this._);
    }
    getOptions() {
        return __classPrivateFieldGet(this, _Dynamic_options, "f");
    }
    render(args) {
        return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].render(args.HTML, args.element, args.insertAfter, args.append, args.disableDF);
    }
    repeat(args) {
        return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].repeat(args.item, args.count);
    }
    e(s, scope) {
        return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].e(s, scope);
    }
    toHTML(HTML) {
        return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].toHTML(HTML);
    }
    hatch(args) {
        return _utils__WEBPACK_IMPORTED_MODULE_2__["default"].hatch(args.element, args.remove);
    }
    compose() {
    }
    n() {
        return this.dataFlow.createDataNode();
    }
}
_Dynamic_options = new WeakMap();
_utils__WEBPACK_IMPORTED_MODULE_2__["default"].constantize(Dynamic);
window.Dynamic = Dynamic;

})();

/******/ })()
;
//# sourceMappingURL=dynamic.js.map