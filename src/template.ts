type anyObject = Record<string, any>;
interface templateObject{
    id :string;
    content :HTMLElement | null;
}
interface instanceObject{
    reference :HTMLElement;
    slots :anyObject;
}
import utils from "./utils";
export default class template{
    #dynamic :anyObject;
    #templates :templateObject[] = [];
    #instances :instanceObject[] = [];
    #observer :MutationObserver;
    constructor(dynamic :anyObject){
        this.#dynamic = dynamic;
        this.#convertTemplate();
        this.#observer = new MutationObserver(this.#observerCB);
        this.#observer.observe(document.body,{
            childList: true,
            subtree: true
        });
    }
    //注册模板核心方法，不用判断nodynamic dynamic了！
    register(element :HTMLElement, TUID? :string, remove? :Boolean) :string{
        if(TUID !== undefined && !utils.checkTUID(TUID)) utils.E("TUID", "string with some limitations", `${TUID}, read the documentation for help`);
        else if(TUID === undefined) TUID = utils.generateTUID();
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
    //超级核心方法。
    render(tuID :string, element :HTMLElement, slots? :anyObject, removeOuterElement? :Boolean, insertAfter? :Boolean, append? :Boolean) /*:HTMLElement*/{
        for(let i = 0; i < this.#templates.length; i++){
            if(this.#templates[i].id === tuID){
//todo:渲染模板
                const id = this.#templates[i].id, content = this.#templates[i].content;
                var HTML;
                if(removeOuterElement === true){
                    
                }
            }
        }
        utils.E("tuID", "valid ID that exists", tuID);
    }
    update(tuID :string, element :HTMLElement) /*:HTMLElement*/{
        //todo:提供tuid，更新模板内容
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
        for(let i = 0; i < this.#templates.length; i++) if(this.#templates[i].id === tuID) return this.#templates[i].content as HTMLElement;
        return null;
    }
    exists(element :HTMLElement) :string | null{
        for(let i = 0; i < this.#templates.length; i++) if(this.#templates[i].content === element) return this.#templates[i].id as string;
        return null;
    }
    getInstance(tuID :string) /*:instanceObject | instanceObject[]*/{
        //todo:传入tuid，获取已实例化的模板列表
        /*return [{
            reference: ,
            slots:[

            ]
        }];*/
    }
    getTemplates() :templateObject[]{return this.#templates;} //获取所有模板
    //调试用方法，不要一直开着！
    /**//*
    /**/
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
                    this.register(templates[i], tuid, templates[i].getAttribute("dynamic") !== null);
                }
            }
        }
        else{
            var tuid = template_input.getAttribute("tuid");
            if(!tuid || !utils.checkTUID(tuid)) tuid = utils.generateTUID();
            this.register(template_input, tuid, template_input.getAttribute("dynamic") !== null);
        }
    }
}