type anyObject = Record<string, any>;
interface dfScope{
    id :string;
    element :HTMLElement;
    notLinkWith? :HTMLElement[];
    notLinkBy? :HTMLElement[];
}
import utils from "./utils";
export default class dataFlow{
    #dynamic :anyObject;
    #dfScopes :dfScope[] = [];
    #observer :MutationObserver;
    constructor(dynamic :anyObject){
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
    #observerCB = (resultList :MutationRecord[], observer :MutationObserver)=>{
        //seize:
    }
}