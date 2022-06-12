/* dynamic
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
import template from "./template";
import utils from "./utils";
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
        for(let i = 0; i < this.#dfScopes.length; i++) if(utils.isDescendant(element, this.#dfScopes[i]) || element === this.#dfScopes[i]) return;
        //排除原数组中是新增作用域子元素的元素
        for(let i = 0; i < this.#dfScopes.length; i++) if(utils.isDescendant(this.#dfScopes[i], element)) utils.precisePop(this.#dfScopes[i], this.#dfScopes);
        this.#dfScopes.push(element);
    }
    createDataNode(args :createDataNodeArgs){
        
    }

    connect(node1 :dataNode, node2 :dataNode){

    }
    #createExportDataNode = ()=>{
        
    }
    #observerCB = (resultList :MutationRecord[], observer :MutationObserver) :void=>{
        //seize:
    }
}