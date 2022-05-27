type mutations = Array<MutationRecord>;
interface templateObject{
    id :string;
    content :HTMLElement | null;
}
type templateArray = templateObject[];
interface instanceObject{
    reference :HTMLElement;
    slots :Record<string,string>;
}
type instanceArray = instanceObject[];
const Dynamic = (()=>{
    console.warn("Dynamic.js ©LJM12914. https://github.com/openink/dynamic \r\nYou are using an unminified version of Dynamic.js, which is not suitable for production use.");
    var mtScopes :HTMLElement[] = [];
    var instanceObjects :instanceArray = [];
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
        var s = [...randoma2z029(12)];
        s[8] = "-";
        return s.join("");
    }
    function constantize(obj :Record<string,any>) :void{
        Object.freeze(obj);
        for(let i = 0; i < Object.keys(obj).length; i++) if(typeof obj[Object.keys(obj)[i]] == "object") constantize(obj[Object.keys(obj)[i]]);
    }
    class dataFlow{//todo:
        #observer :MutationObserver;
        constructor(){
            this.#observer = new MutationObserver(this.#observerCB);
            this.#observer.observe(document.body,{
                childList: true,
                subtree: true
            });
        }
        new(){
            //todo:
        }
        #observerCB = (resultList :mutations, observer :MutationObserver)=>{}
    }
    class template{
        #templates :templateArray = [];
        #observer :MutationObserver;
        constructor(){
            this.#convertTemplate();
            this.#observer = new MutationObserver(this.#observerCB);
            this.#observer.observe(document.body,{
                childList: true,
                subtree: true
            });
        }
        //注册模板核心方法，不用判断nodynamic dynamic了！
        register(element :HTMLElement, TUID? :string, remove? :Boolean) :string{
            if(TUID !== undefined && !checkTUID(TUID)) E("TUID", "string with some limitations", `${TUID}, read the documentation for help`);
            else if(TUID === undefined) TUID = generateTUID();
            var tem :templateObject = {
                id: TUID,
                content: null
            };
            if(element instanceof HTMLTemplateElement){ //解决掉template的shadow dom
                var el = document.createElement("div");
                for(let i = 0; i < element.content.childNodes.length; i++) el.appendChild(element.content.childNodes[i].cloneNode(true));
                tem.content = el;
            }
            else tem.content = element.cloneNode(true) as HTMLElement;
            this.#templates.push(tem);
            if(remove === true) element.remove();
            return TUID;
        }
        render(tuID :string, element :HTMLElement, slots? :Record<string,any>, removeOuterElement? :Boolean, insertAfter? :Boolean, append? :Boolean) /*:HTMLElement*/{
            //todo:渲染模板
        }
        update(tuID :string, element :HTMLElement) /*:HTMLElement*/{
            //todo:提供tuid，更新模板内容
        }
        delete(tuID :string) :HTMLElement | null{
            for(let i = 0; i < this.#templates.length; i++) if(this.#templates[i].id === tuID){
                let content = this.#templates[i].content
                this.#templates.splice(i, 1);
                return content;
            }
            return null;
        }
        getContent(tuID :string) :HTMLElement | null{
            for(let i = 0; i < this.#templates.length; i++) if(this.#templates[i].id === tuID) return this.#templates[i].content as HTMLElement;
            return null;
        }
        exists(element :HTMLElement) :string | null{
            for(let i = 0; i < this.#templates.length; i++) if(this.#templates[i].content === element) return this.#templates[i].id as string;
            return null;
        }
        getInstance(tuID :string) :object[]{
            //todo:传入tuid，获取已实例化的模板列表
            return [{
                reference: "",
                slots:[

                ]
            }];
        }
        getTemplates() :object{return this.#templates;} //获取所有模板
        //调试用方法，不要一直开着！
        /**//*
        __convertTemplate__ = (template_input? :HTMLTemplateElement) :void=>{
            this.convertTemplate(template_input);
        }
        /**/
        //observer回调方法
        #observerCB = (resultList :mutations, observer :MutationObserver)=>{
            for(let i = 0; i < resultList.length; i++) for(let j = 0; j < resultList[i].addedNodes.length; j++){
                const ele = resultList[i].addedNodes[j] as HTMLElement;
                //template增量注册
                if(ele instanceof HTMLTemplateElement && ele.getAttribute("nodynamic") === null) this.#convertTemplate(ele);
                //todo:释放tuid检测与渲染模板
            }
        }
        //从template增量注册与起始注册混用方法
        #convertTemplate = (template_input? :HTMLTemplateElement) :void=>{
            if(template_input === undefined){
                const templates = document.querySelectorAll("template");
                for(let i = 0; i < templates.length; i++){
                    if(templates[i].getAttribute("nodynamic") === null){
                        var tuid = templates[i].getAttribute("tuid");
                        if(!tuid || !checkTUID(tuid)) tuid = generateTUID();
                        this.register(templates[i], tuid, templates[i].getAttribute("dynamic") !== null);
                    }
                }
            }
            else{
                var tuid = template_input.getAttribute("tuid");
                if(!tuid || !checkTUID(tuid)) tuid = generateTUID();
                this.register(template_input, tuid, template_input.getAttribute("dynamic") !== null);
            }
        }
    }
    class Dynamic{
        template :object;
        dataFlow :object;
        constructor(options? :object){
            console.warn("Creating new Dynamic instance.");
            this.template = new template();
            this.dataFlow = new dataFlow();
            if(options){
                console.log(options);
                //todo:
            }
        }
        repeat(item :any, count :number) :any[]{return repeat(item, count);}
        render(HTML :string | HTMLElement | HTMLCollection | Node | NodeList | Node[], element :HTMLElement, insertAfter? :Boolean, append? :Boolean) :Node[]{
            var html :Node[] = [];
            if(typeof HTML == "string") html = toHTML(HTML);
            else if(HTML instanceof HTMLElement || HTML instanceof Node) html[0] = HTML.cloneNode(true);
            else if(HTML instanceof HTMLCollection || HTML instanceof NodeList) for(let i = 0; i < HTML.length; i++) html[i] = HTML.item(i)!.cloneNode(true);
            else html = HTML;
            const parent = element.parentElement!, Rhtml = [...html].reverse();
            if(append === true) for(let i = 0; i < html.length; i++) element.append(html[i]);
            else if(append === false) for(let i = 0; i < Rhtml.length; i++) element.prepend(Rhtml[i]);
            else if(insertAfter === true){
                if(!element.nextSibling) for(let i = 0; i < Rhtml.length; i++) parent.append(Rhtml[i]);
                else for(let i = 0; i < Rhtml.length; i++) parent.insertBefore(Rhtml[i], element.nextSibling);
            }
            else if(insertAfter === false) for(let i = 0; i < html.length; i++) parent.insertBefore(html[i], element);
            else for(let i = 0; i < html.length; i++) element.append(html[i]);
            return html;
        }
        e(s :string) :Node[] | Node{
            let a :NodeList = document.querySelectorAll(s);
            if(!a.length) return [];
            if(a.length == 1 && s.match(/^.*#[^\s]*$/)) return a[0];
            else return Array.from(a);
        }
    }
    constantize(Dynamic);
    return Dynamic;
})();