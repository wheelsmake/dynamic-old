/* dynamic
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
type anyObject = Record<string, any>;
//var nodes :anyObject = {};
function E(argument? :string, type? :string, value? :any) :never{
    if(argument === undefined) throw new Error("An error occured.");
    else throw new Error(`Argument '${argument}' ${type ? `should be a ${type}` : "is invalid"}${value ? `, received ${value}` : ""}.`);
}
function EE(message :any) :never{throw new Error(message);}
function toHTML(HTML :string) :Node[]{
    const ele = document.createElement("div");
    var returnA :Node[] = [];
    ele.innerHTML = HTML;
    //console.log(ele.innerHTML);
    if(HTML === "" || typeof HTML != "string") E("HTML", "string", HTML);
    for(let i = 0; i < ele.childNodes.length; i++) returnA[i] = ele.childNodes[i];
    return returnA;
}
function toHTMLString(HTML :HTMLElement) :string{
    const ele = document.createElement("div");
    ele.appendChild(HTML);
    return ele.innerHTML;
}
function getInnerNodes(el :HTMLElement) :Node[]{
    var nodes :Node[] = [];
    for(let i = 0; i < el.childNodes.length; i++) nodes[i] = el.childNodes[i].cloneNode(true);
    return nodes;
}
function repeat(item :any, count :number) :any[]{
    if(typeof count != "number" || count < 1) E("count", "number smaller than 1", count);
    var arr :any[] = [];
    arr[count - 1] = " ";
    return arr.fill(item, 0, count);
}
function randoma2z029(length :number) :string{
    var s :string = "";
    for(let i = 0; i < length; i++){
        let r = Math.floor(Math.random() * 36);
        if(r < 10) s += r;
        else s += String.fromCharCode(r + 87);
    }
    return s;
}
//检查传入的id是否符合规则
function checkTUID(id :string) :boolean{
    var preservedIDs :string[] = ["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"];
    var isValid = !!id.match("^[a-z0-9][a-z0-9-]+[a-z0-9]$");
    if(!isValid) console.warn(`The specified tuID is invalid: ${id}. Dynamic is going to generate one instead.`);
    if(preservedIDs.indexOf(id) != -1){
        isValid = false;
        console.warn(`The specified tuID is one of the preserved element names: ${id}. Dynamic is going to generate one instead. See https://html.spec.whatwg.org/#valid-custom-element-name for help.`);
    }
    return isValid;
}
//生成id，abcdefgh-ijk
function generateTUID() :string{
    return `${randoma2z029(11)}-${randoma2z029(17)}`;
}
function constantize(obj :anyObject) :void{
    Object.freeze(obj);
    for(let i = 0; i < Object.keys(obj).length; i++) if(typeof obj[Object.keys(obj)[i]] == "object") constantize(obj[Object.keys(obj)[i]]);
}
function render(HTML :string | HTMLElement | HTMLCollection | Node | NodeList | Node[], element :HTMLElement, insertAfter? :boolean, append? :boolean, disableDF? :boolean) :Node[]{
    if(element.parentElement === null) EE("cannot render by '<html>' element, since it's root of document.");
    var html :Node[] = [];
    if(typeof HTML == "string") html = toHTML(HTML);
    else if(HTML instanceof HTMLElement || HTML instanceof Node) html[0] = HTML.cloneNode(true);
    else if(HTML instanceof HTMLCollection || HTML instanceof NodeList) for(let i = 0; i < HTML.length; i++) html[i] = HTML.item(i)!.cloneNode(true);
    else html = HTML;
    const Rhtml = [...html].reverse(), parent = element.parentElement;
    if(append === true) for(let i = 0; i < html.length; i++) element.append(html[i]);
    else if(append === false) for(let i = 0; i < Rhtml.length; i++) element.prepend(Rhtml[i]);
    else if(insertAfter === true){
        if(!element.nextSibling) for(let i = 0; i < Rhtml.length; i++) parent!.append(Rhtml[i]);
        else for(let i = 0; i < Rhtml.length; i++) parent!.insertBefore(Rhtml[i], element.nextSibling);
    }
    else if(insertAfter === false) for(let i = 0; i < html.length; i++) parent!.insertBefore(html[i], element);
    else for(let i = 0; i < html.length; i++) element.append(html[i]);
    //todo:加入作用域
    return html;
}
function generateDFID() :string{
    return `dfid-${randoma2z029(24)}`;
}
function checkDFID(id :string) :boolean{
    //todo:
    return true;
}
var utils = {
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
}
export default utils;