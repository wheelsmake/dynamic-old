/* dynamic
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
import template from "./template";
import utils from "./utils";
export default class dataFlow{
    #options :dynamicOptions;
    #dfScopes :dfScope[] = [];
    #dataNodes :dataNode[] = [];
    #observer :MutationObserver;
    constructor(options :dynamicOptions){
        this.#options = options;
        this.#observer = new MutationObserver(this.#observerCB);
        this.#observer.observe(document.body,{
            childList: true,
            subtree: true
        });
    }
    new(){
        //todo:新建作用域
    }
    /*generateDFID(){
        return utils.generateDFID();
    }*/
    #observerCB = (resultList :MutationRecord[], observer :MutationObserver)=>{
        //seize:
    }
}