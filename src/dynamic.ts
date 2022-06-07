/* dynamic
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
type anyObject = Record<string, any>;
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
import template from "./template";
import dataFlow from "./dataFlow";
import utils from "./utils";
console.warn("dynamic.js ©LJM12914. https://github.com/openink/dynamic \r\nYou are using an unminified version of dynamic.js, which is not suitable for production use.");
class Dynamic{
    template :template;
    dataFlow :dataFlow;
    options :anyObject | undefined = undefined;
    constructor(options? :anyObject){
        console.warn("Creating new Dynamic instance with options", options);
        this.options = options;
        this.template = new template(this);
        this.dataFlow = new dataFlow(this);
    }
    repeat(args :repeatArgs) :any[]{
        return utils.repeat(args.item, args.count);
    }
    render(args :renderArgs) :Node[]{
        return utils.render(args.HTML, args.element, args.insertAfter, args.append, args.disableDF);
    }
    e(s :string) :Node[] | Node{
        let a :NodeList = document.querySelectorAll(s);
        if(!a.length) return [];
        if(a.length == 1 && s.match(/^.*#[^\s]*$/)) return a[0];//note:当一个页面存在相同ID元素时不会走这里，而会返回数组，因为说好了是querySelectorAll了并且本来就不应该有重复ID
        else return Array.from(a);
    }
    hatch(args :hatchArgs) :Node[]{
        return utils.hatch(args.element, args.remove);
    }
}
utils.constantize(Dynamic);
const w1ndow = window as any;
w1ndow.Dynamic = Dynamic;