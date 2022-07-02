/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
import template from "./template";
import dataFlow from "./dataFlow";
import * as utils from "../../utils/index";
import * as localUtils from "./utils";
interface renderArgs{
    HTML :string | Element | HTMLCollection | Node | NodeList | Node[];
    element :Element;
    insertAfter? :boolean;
    append? :boolean;
    disableDF? :boolean;
}
interface repeatArgs{
    item :any;
    count :number;
}
interface hatchArgs{
    element :Element;
    remove? :boolean;
}
console.warn("dynamic.js ©LJM12914. https://github.com/openink/dynamic \r\nYou are using an unminified version of dynamic.js, which is not suitable for production use.");
class Dynamic{
    #options :dynamicOptions;
    template :template;
    dataFlow :dataFlow;
    //_ :anyObject = {}; //没搞懂啊
    constructor(options? :dynamicOptions){
        console.log("Creating new Dynamic instance with options", options);
        this.#options = options;
        this.template = new template(this.#options);
        this.dataFlow = new dataFlow(this.#options/*, this._*/);
        //this.#utils = utils;
    }
    getOptions() :dynamicOptions{
        return this.#options;
    }
    render(args :renderArgs) :Node[]{
        //todo:添加渲染限制
        return utils.element.render(args.HTML, args.element, args.insertAfter, args.append, args.disableDF);
    }
    repeat(args :repeatArgs) :any[]{
        return utils.generic.repeat(args.item, args.count);
    }
    e(s :string, scope? :Element | Document) :Node[] | Node{
        return utils.element.e(s, scope);
    }
    toHTML(HTML :string) :Node[]{
        return utils.element.toHTML(HTML);
    }
    hatch(args :hatchArgs) :Node[]{
        return utils.element.hatch(args.element, args.remove);
    }
    compose(){
        //todo:
    }
    n(args :createDataNodeArgs){
        return this.dataFlow.createDataNode(args);
    }
}
utils.generic.constantize(Dynamic);
(window as any).Dynamic = Dynamic;