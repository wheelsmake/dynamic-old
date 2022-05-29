/* dynamic.js
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
type anyObject = Record<string, any>;
import template from "./template";
import dataFlow from "./dataFlow";
import utils from "./utils";
const Dynamic = (()=>{
    console.warn("dynamic.js ©LJM12914. https://github.com/openink/dynamic \r\nYou are using an unminified version of dynamic.js, which is not suitable for production use.");
    class Dynamic{
        template :object;
        dataFlow :object;
        options :anyObject | undefined = undefined;
        constructor(options? :anyObject){
            console.warn("Creating new Dynamic instance.");
            console.log(options);
            this.options = options;
            this.template = new template(this);
            this.dataFlow = new dataFlow(this);
        }
        repeat(item :any, count :number) :any[]{return utils.repeat(item, count);}
        render(HTML :string | HTMLElement | HTMLCollection | Node | NodeList | Node[], element :HTMLElement, insertAfter? :Boolean, append? :Boolean) :Node[]{
            if(element.parentElement === null) utils.EE("cannot render by '<html>' element, since it's root of document.");
            var html :Node[] = [];
            if(typeof HTML == "string") html = utils.toHTML(HTML);
            else if(HTML instanceof HTMLElement || HTML instanceof Node) html[0] = HTML.cloneNode(true);
            else if(HTML instanceof HTMLCollection || HTML instanceof NodeList) for(let i = 0; i < HTML.length; i++) html[i] = HTML.item(i)!.cloneNode(true);
            else html = HTML;
            const Rhtml = [...html].reverse(), parent = element.parentElement;
            if(append === true) for(let i = 0; i < html.length; i++) element.append(html[i]);
            else if(append === false) for(let i = 0; i < Rhtml.length; i++) element.prepend(Rhtml[i]);
            else if(insertAfter === true){
                if(!element.nextSibling) for(let i = 0; i < Rhtml.length; i++) parent!.append(Rhtml[i]);
                else for(let i = 0; i < Rhtml.length; i++) parent!.insertBefore(Rhtml[i], element.nextSibling);
            }
            else if(insertAfter === false) for(let i = 0; i < html.length; i++) parent!.insertBefore(html[i], element);
            else for(let i = 0; i < html.length; i++) element.append(html[i]);
            return html;
        }
        e(s :string) :Node[] | Node{
            let a :NodeList = document.querySelectorAll(s);
            if(!a.length) return [];
            if(a.length == 1 && s.match(/^.*#[^\s]*$/)) return a[0];//note:当一个页面存在相同ID元素时不会走这里，而会返回数组，因为说好了是querySelectorAll了并且本来就不应该有重复ID
            else return Array.from(a);
        }
    }
    utils.constantize(Dynamic);
    return Dynamic;
})();
const w1ndow = window as any;
w1ndow.Dynamic = Dynamic;