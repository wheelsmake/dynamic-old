type anyObject = Record<string, any>;
function E(name? :string, type? :string, value? :any) :never{
    if(name === undefined) throw new Error("An error occured.");
    else throw new Error(`Argument '${name}' ${type ? `should be a ${type}` : "is invalid"}${value ? `, received ${value}` : ""}.`);
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
function checkTUID(id : string) :Boolean{
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
    var s = [...randoma2z029(29)];
    s[11] = "-";
    return s.join("");
}
function constantize(obj :anyObject) :void{
    Object.freeze(obj);
    for(let i = 0; i < Object.keys(obj).length; i++) if(typeof obj[Object.keys(obj)[i]] == "object") constantize(obj[Object.keys(obj)[i]]);
}
var utils = {
    E: E,
    EE: EE,
    toHTML: toHTML,
    toHTMLString: toHTMLString,
    repeat: repeat,
    randoma2z029: randoma2z029,
    checkTUID: checkTUID,
    generateTUID: generateTUID,
    constantize: constantize
}
//constantize(utils);
export default utils;