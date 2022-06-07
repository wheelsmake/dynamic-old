/* dynamic
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
import template from "./template";
import utils from "./utils";
interface Dynamic{
    template :template;
    //dataFlow :dataFlow; //note:强烈不建议访问自己，很可能造成混乱。
    options :anyObject | undefined;
    repeat :Function;
    render :Function;
    e :Function;
}
type anyObject = Record<string, any>;
interface dfScope{
    id :string;
    element :HTMLElement;
}
interface dataNode{
    id :string;
    processor :Function;
    prevNodes :dataNode[];
    nextNodes :dataNode[];
}
export default class dataFlow{
    #dynamic :Dynamic;
    #dfScopes :dfScope[] = [];
    #dataNodes :dataNode[] = [];
    #observer :MutationObserver;
    constructor(dynamic :Dynamic){
        this.#dynamic = dynamic;
        this.#observer = new MutationObserver(this.#observerCB);
        this.#observer.observe(document.body,{
            childList: true,
            subtree: true
        });
    }
    new(){
        //todo:
    }
    /*generateDFID(){
        return utils.generateDFID();
    }*/
    #observerCB = (resultList :MutationRecord[], observer :MutationObserver)=>{
        //seize:
    }
}