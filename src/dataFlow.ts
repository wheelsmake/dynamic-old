/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
import template from "./template";
import * as utils from "../../utils/index";
import * as localUtils from "./utils";
export default class dataFlow{
    #options :dynamicOptions;
    #dfScopes :HTMLElement[] = [];
    #dataNodes :dataNode[] = [];
    #observer :MutationObserver;
    //#_ :anyObject = {};
    constructor(options :dynamicOptions/*, _ :anyObject*/){
        this.#options = options;
        //this.#_ = _;
        this.#observer = new MutationObserver(this.#observerCB);
        this.#observer.observe(document.body,{
            childList: true,
            subtree: true
        });
    }
    new(element :HTMLElement) :void{
        //排除已经是目前作用域或目前作用域子元素的新增
        for(let i = 0; i < this.#dfScopes.length; i++) if(utils.element.isDescendant(element, this.#dfScopes[i]) || element === this.#dfScopes[i]){
            console.warn(`${element} is already a descendant of an exist scope, thus dynamic won't add it.`);
            return;
        }
        //排除原数组中是新增作用域子元素的元素
        for(let i = 0; i < this.#dfScopes.length; i++) if(utils.element.isDescendant(this.#dfScopes[i], element)) utils.generic.precisePop(this.#dfScopes[i], this.#dfScopes);
        this.#dfScopes.push(element);
        this.#convertExportDataNode(element);
    }
    getScopes() :HTMLElement[]{ //todo:记得review一下，在学校干的
        return this.#dfScopes;
    }
    deleteScope(identity :HTMLElement | number) :HTMLElement | null{ //todo:记得review一下，在学校干的
        if(identity instanceof HTMLElement){
            identity = this.#dfScopes.indexOf(identity);
            if(identity == -1) return null;
        }
        return this.#dfScopes.splice(identity, 1)[0];
    }
    createDataNode(args :createDataNodeArgs){
        
    }
    createExportDataNode() /*:string*/{
        
    }
    connect(node1 :dataNode, node2 :dataNode){

    }
    #convertExportDataNode = (element :HTMLElement) :void=>{
        
    }
    #observerCB = (resultList :MutationRecord[], observer :MutationObserver) :void=>{
        //seize:
    }
}
