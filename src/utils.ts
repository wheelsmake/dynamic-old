/* dynamic
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
export default (()=>{
    return{
        e(s :string, scope? :HTMLElement | Document) :Node[] | Node{
            if(scope === undefined || !(scope instanceof HTMLElement)) scope = document;
            let a :NodeList = scope.querySelectorAll(s);
            if(!a.length) return [];
            //note:当一个页面存在相同ID元素时不会走这里，而会返回数组，因为说好了是querySelectorAll了并且本来就不应该有重复ID，不能怪我啊
            if(a.length == 1 && s.match(/^.*#[^\s]*$/)) return a[0];
            else return Array.from(a);
        },
        precisePop(ele :any, array :any[]) :any[] | null{
            if(array.indexOf(ele) === -1) return null;
            return array.splice(array.indexOf(ele), 1);
        },
        isDescendant(element :HTMLElement, target :HTMLElement) :boolean{
            while(element.tagName != "HTML"){
                element = element.parentNode! as HTMLElement;
                if(element === target) return true; 
            }
            return false;
        },
        isChild(element :HTMLElement, target :HTMLElement) :boolean{
            const children = target.childNodes;
            for(let i = 0; i < children.length; i++) if(element === children[i]) return true;
            return false;
        },
        E(argument? :string, type? :string, value? :any) :never{
            if(argument === undefined) throw new Error("An error occured.");
            else throw new Error(`Argument '${argument}' ${type ? `should be a ${type}` : "is invalid"}${value ? `, got ${value}` : ""}.`);
        },
        EE(message :any) :never{throw new Error(message);},
        toHTML(HTML :string) :Node[]{
            if(HTML === "" || typeof HTML != "string") this.E("HTML", "string", HTML);
            const ele = document.createElement("div");
            ele.innerHTML = HTML;
            return this.getInnerNodes(ele);
        },
        getInnerNodes(el :Node | HTMLElement) :Node[]{
            var nodes :Node[] = [];
            for(let i = 0; i < el.childNodes.length; i++) nodes[i] = el.childNodes[i].cloneNode(true);
            return nodes;
        },
        repeat(item :any, count :number) :any[]{
            if(typeof count != "number" || count < 1) this.E("count", "number smaller than 1", count);
            var arr :any[] = [];
            arr[count - 1] = " ";
            return arr.fill(item, 0, count);
        },
        randoma2z029(length :number) :string{
            var s :string = "";
            for(let i = 0; i < length; i++){
                let r = Math.floor(Math.random() * 36);
                if(r < 10) s += r;
                else s += String.fromCharCode(r + 87);
            }
            return s;
        },
        //检查传入的tuid是否符合规则
        checkTUID(id :string) :boolean{
            const preservedIDs :string[] = ["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"];
            var isValid = !!id.match("^[a-z0-9][a-z0-9-]+[a-z0-9]$");
            //if(!isValid) console.warn(`The specified tuID is invalid: ${id}. Dynamic is going to generate one instead.`);
            if(preservedIDs.indexOf(id) != -1) this.EE(`The specified tuID is one of the preserved element names: ${id}. See https://html.spec.whatwg.org/#valid-custom-element-name for help.`);
            return isValid;
        },
        //生成id，abcdefgh-ijk
        generateTUID() :string{
            return `${this.randoma2z029(11)}-${this.randoma2z029(17)}`;
        },
        //递归冻结对象
        constantize(obj :anyObject) :void{
            Object.freeze(obj);
            for(let i = 0; i < Object.keys(obj).length; i++) if(typeof obj[Object.keys(obj)[i]] == "object") this.constantize(obj[Object.keys(obj)[i]]);
        },
        //最终渲染方法，老祖宗求你别出bug
        render(HTML :string | HTMLElement | HTMLCollection | HTMLElement[] | Node | NodeList | Node[], element :HTMLElement, insertAfter? :boolean, append? :boolean, disableDF? :boolean) :Node[]{
            if(element.parentElement === null) this.EE("cannot render by '<html>' element, since it's root of document.");
            var html :Node[] = [];
            if(typeof HTML == "string") html = this.toHTML(HTML);
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
            //todo:加入作用域
            return html;
        },
        generateDFID() :string{
            return `dfid-${this.randoma2z029(24)}`;
        },
        //检查dfid
        checkDFID(id :string) :boolean{
            //todo:检查dfID是否合乎标准
            return true;
        },
        //最终剥壳器
        hatch(element :HTMLElement, remove? :boolean) :Node[]{
            //note:Nodelist类型会实时同步造成不稳定的for循环，必须转换为Node[]！
            const par = element.parentElement!, children :Node[] = Array.from(element.childNodes);
            for(let i = 0; i < children.length; i++) par.insertBefore(children[i], element);
            if(remove === true) element.remove();
            return children;
        }
    }
})();