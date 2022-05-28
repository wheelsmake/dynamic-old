"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
const Dynamic = (() => {
    var _dataFlow_observer, _dataFlow_observerCB, _template_templates, _template_observer, _template_observerCB, _template_convertTemplate;
    console.warn("Dynamic.js ©LJM12914. https://github.com/openink/dynamic \r\nYou are using an unminified version of Dynamic.js, which is not suitable for production use.");
    var mtScopes = [];
    var instanceObjects = [];
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
        var s = [...randoma2z029(29)];
        s[11] = "-";
        return s.join("");
    }
    function constantize(obj) {
        Object.freeze(obj);
        for (let i = 0; i < Object.keys(obj).length; i++)
            if (typeof obj[Object.keys(obj)[i]] == "object")
                constantize(obj[Object.keys(obj)[i]]);
    }
    class dataFlow {
        constructor() {
            _dataFlow_observer.set(this, void 0);
            _dataFlow_observerCB.set(this, (resultList, observer) => { });
            __classPrivateFieldSet(this, _dataFlow_observer, new MutationObserver(__classPrivateFieldGet(this, _dataFlow_observerCB, "f")), "f");
            __classPrivateFieldGet(this, _dataFlow_observer, "f").observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        new() {
        }
    }
    _dataFlow_observer = new WeakMap(), _dataFlow_observerCB = new WeakMap();
    class template {
        constructor() {
            _template_templates.set(this, []);
            _template_observer.set(this, void 0);
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
                            if (!tuid || !checkTUID(tuid))
                                tuid = generateTUID();
                            this.register(templates[i], tuid, templates[i].getAttribute("dynamic") !== null);
                        }
                    }
                }
                else {
                    var tuid = template_input.getAttribute("tuid");
                    if (!tuid || !checkTUID(tuid))
                        tuid = generateTUID();
                    this.register(template_input, tuid, template_input.getAttribute("dynamic") !== null);
                }
            });
            __classPrivateFieldGet(this, _template_convertTemplate, "f").call(this);
            __classPrivateFieldSet(this, _template_observer, new MutationObserver(__classPrivateFieldGet(this, _template_observerCB, "f")), "f");
            __classPrivateFieldGet(this, _template_observer, "f").observe(document.body, {
                childList: true,
                subtree: true
            });
        }
        register(element, TUID, remove) {
            if (TUID !== undefined && !checkTUID(TUID))
                E("TUID", "string with some limitations", `${TUID}, read the documentation for help`);
            else if (TUID === undefined)
                TUID = generateTUID();
            var tem = {
                id: TUID,
                content: null
            };
            if (element instanceof HTMLTemplateElement) {
                var el = document.createElement("div");
                for (let i = 0; i < element.content.childNodes.length; i++)
                    el.appendChild(element.content.childNodes[i].cloneNode(true));
                tem.content = el;
            }
            else
                tem.content = element.cloneNode(true);
            __classPrivateFieldGet(this, _template_templates, "f").push(tem);
            if (remove === true)
                element.remove();
            return TUID;
        }
        render(tuID, element, slots, removeOuterElement, insertAfter, append) {
        }
        update(tuID, element) {
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
            return [{
                    reference: "",
                    slots: []
                }];
        }
        getTemplates() { return __classPrivateFieldGet(this, _template_templates, "f"); }
    }
    _template_templates = new WeakMap(), _template_observer = new WeakMap(), _template_observerCB = new WeakMap(), _template_convertTemplate = new WeakMap();
    class Dynamic {
        constructor(options) {
            console.warn("Creating new Dynamic instance.");
            this.template = new template();
            this.dataFlow = new dataFlow();
            if (options) {
                console.log(options);
            }
        }
        repeat(item, count) { return repeat(item, count); }
        render(HTML, element, insertAfter, append) {
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
            const parent = element.parentElement, Rhtml = [...html].reverse();
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
    constantize(Dynamic);
    return Dynamic;
})();
//# sourceMappingURL=dynamic.js.map