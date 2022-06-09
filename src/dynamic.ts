/* dynamic
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
import template from "./template";
import dataFlow from "./dataFlow";
import utils from "./utils";
interface renderArgs{
    HTML :string | HTMLElement | HTMLCollection | Node | NodeList | Node[];
    element :HTMLElement;
    insertAfter? :boolean;
    append? :boolean;
    disableDF? :boolean;
}
interface repeatArgs{
    item :any;
    count :number;
}
interface hatchArgs{
    element :HTMLElement;
    remove? :boolean;
}
console.warn("dynamic.js ©LJM12914. https://github.com/openink/dynamic \r\nYou are using an unminified version of dynamic.js, which is not suitable for production use.");
class Dynamic{
    #options :dynamicOptions;
    template :template;
    dataFlow :dataFlow;
    constructor(options? :dynamicOptions){
        console.warn("Creating new Dynamic instance with options", options);
        this.#options = options;
        this.template = new template(this.#options);
        this.dataFlow = new dataFlow(this.#options);
        //this.#utils = utils;
    }
    getOptions() :dynamicOptions{
        return this.#options;
    }
    render(args :renderArgs) :Node[]{
        //todo:添加渲染限制
        return utils.render(args.HTML, args.element, args.insertAfter, args.append, args.disableDF);
    }
    repeat(args :repeatArgs) :any[]{
        return utils.repeat(args.item, args.count);
    }
    e(s :string, scope? :HTMLElement | Document) :Node[] | Node{
        return utils.e(s, scope);
    }
    toHTML(HTML :string) :Node[]{
        return utils.toHTML(HTML);
    }
    hatch(args :hatchArgs) :Node[]{
        return utils.hatch(args.element, args.remove);
    }
    compose(){
        //todo:
    }
}
utils.constantize(Dynamic);
(window as any).Dynamic = Dynamic;