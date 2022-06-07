/* dynamic
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
import dataFlow from "./dataFlow";
import utils from "./utils";
interface Dynamic{
    //template :template; //note:强烈不建议访问自己，很可能造成混乱。
    dataFlow :dataFlow;
    options :anyObject | undefined;
    repeat :Function;
    render :Function;
    e :Function;
}
type anyObject = Record<string, any>;
interface templateObject{
    id :string;
    content :HTMLElement;
}
interface instanceObject{
    reference :HTMLElement;
    slots :anyObject;
}
interface registerArgs{
    element :HTMLElement;
    tuID? :string;
    remove? :boolean;
}
interface renderArgs{
    tuID :string;
    element :HTMLElement;
    slots? :anyObject;
    removeOuterElement? :boolean;
    insertAfter? :boolean;
    append? :boolean;
    disableDF? :boolean;
}
interface updateArgs{
    tuID :string;
    element :HTMLElement;
}
export default class template{
    #dynamic :Dynamic;
    #templates :templateObject[] = [];
    #instances :instanceObject[] = [];
    #observer :MutationObserver;
    constructor(dynamic :Dynamic){
        this.#dynamic = dynamic;
        this.#convertTemplate();
        this.#observer = new MutationObserver(this.#observerCB);
        this.#observer.observe(document.body,{
            childList: true,
            subtree: true
        });
    }
    //注册模板核心方法，不用判断nodynamic dynamic了！
    register(args :registerArgs) :string{
        if(args.tuID !== undefined && !utils.checkTUID(args.tuID)) utils.E("tuID", "string with some limitations", `${args.tuID}, read the documentation for help`);
        else if(args.tuID === undefined) args.tuID = utils.generateTUID();
        if(this.existsTUID(args.tuID)){
            //todo:碰撞处理，万一真的碰撞了怎么办……
            utils.E("tuID", "non-repetitive string", args.tuID);
        }
        if(args.element instanceof HTMLTemplateElement){ //解决掉template的shadow dom
            var el = document.createElement("div");
            for(let i = 0; i < args.element.content.childNodes.length; i++) el.appendChild(args.element.content.childNodes[i].cloneNode(true));
            var tem :templateObject = {
                id: args.tuID,
                content: el
            };
        }
        else{
            var tem :templateObject = {
                id: args.tuID,
                content: args.element.cloneNode(true) as HTMLElement
            };
        }
        this.#templates.push(tem);
        if(args.remove === true) args.element.remove();
        return args.tuID;
    }
    //超级核心方法
    render(args :renderArgs) :Node[] | null/*hack:ts不认utils.E类型，只能加一个null类型了，但是永远不会返回null*/{
        for(let i = 0; i < this.#templates.length; i++){
            if(this.#templates[i].id === args.tuID){
                const content = this.#templates[i].content;
                var nodes :Node[] = [];
                if(args.removeOuterElement === true) nodes = utils.getInnerNodes(content);
                else nodes[0] = content.cloneNode(true);
                //todo:slots变量替换
                return utils.render(nodes, args.element, args.insertAfter, args.append, args.disableDF);
            }
        }
        utils.E("tuID", "valid ID that exists", args.tuID);
        return null;
    }
    update(args :updateArgs) :HTMLElement | null{
        for(let i = 0; i < this.#templates.length; i++) if(this.#templates[i].id === args.tuID){
            if(args.element instanceof HTMLElement){
                var oldContent = this.#templates[i].content;
                this.#templates[i].content = args.element;
                return oldContent;
            }
            else utils.E("element", "HTMLElement", args.element);
        }
        return null;
    }
    delete(tuID :string) :HTMLElement | null{
        for(let i = 0; i < this.#templates.length; i++) if(this.#templates[i].id === tuID){
            let content = this.#templates[i].content;
            this.#templates.splice(i, 1);
            return content;
        }
        return null;
    }
    getContent(tuID :string) :HTMLElement | null{
        for(let i = 0; i < this.#templates.length; i++) if(this.#templates[i].id === tuID) return this.#templates[i].content;
        return null;
    }
    existsTUID(tuID :string) :boolean{
        for(let i = 0; i < this.#templates.length; i++) if(this.#templates[i].id === tuID) return true;
        return false;
    }
    existsElement(element :HTMLElement) :string | null{
        for(let i = 0; i < this.#templates.length; i++) if(this.#templates[i].content.isEqualNode(element)) return this.#templates[i].id;
        return null;
    }
    //获取所有模板
    getTemplates() :templateObject[]{return this.#templates;}
    getInstance(tuID :string) /*:instanceObject | instanceObject[]*/{
        //todo:传入tuid，获取已实例化的模板列表
        /*return [{
            reference: ,
            slots:[

            ]
        }];*/
    }
    //observer回调方法
    #observerCB = (resultList :MutationRecord[], observer :MutationObserver)=>{
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
                    if(!tuid || !utils.checkTUID(tuid)) tuid = utils.generateTUID();
                    this.register({
                        element: templates[i],
                        tuID: tuid,
                        remove: templates[i].getAttribute("dynamic") !== null
                    });
                }
            }
        }
        else{
            var tuid = template_input.getAttribute("tuid");
            if(!tuid || !utils.checkTUID(tuid)) tuid = utils.generateTUID();
            this.register({
                element: template_input,
                tuID: tuid,
                remove: template_input.getAttribute("dynamic") !== null
            });
        }
    }
}