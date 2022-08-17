/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
import * as utils from "../../utils/index";
import * as localUtils from "./utils/index";

//开发模式
console.info(
`dynamic(dnJS) ©LJM12914. https://github.com/wheelsmake/dynamic
You are using the unminified build of dynamic. Make sure to use the minified build for production.`);
const isDEV = "__dn_DEV__" in window && (window as anyObject).__dn_DEV__ === true;


//主类
class App{
    #rootNode :Element;
    #proxy :anyObject;
    #data :anyObject = {};
    #dataDesc :depenObject = {};
    constructor(rootNode :Elementy){
        this.#rootNode = utils.arguments.reduceToElement(rootNode)!;
        console.info("creating new dynamic instance with rootNode", rootNode);
        this.#detectInsert(this.#rootNode);
        //proxy本身没有不可变性，必须再用一个data伪只读属性保护
        this.#proxy = new Proxy(this.#data, {
            //note:sharpData === this.#data
            get(sharpData, property, proxy){
                console.log("get", property);
            },
            set(sharpData, property, newValue, proxy){
                if(typeof property == "symbol") utils.generic.E(property.toString(), "string", property, "index of Dynamic.data must not be a Symbol");
                else{
                    console.log("set", property, newValue);
                    if(property in sharpData){
                        //todo:更新依赖
                    
                    }
                    else{
                        //todo:新建属性
                        sharpData[property] = newValue;

                    }
                }
                return Reflect.set(sharpData, property, newValue, proxy);
            },
            /*has(sharpData, property){
                console.log(arguments);
                return false;
            },*/
            //这里只会在Object.defineProperty走到，别听MDN的https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty#:~:text=proxy.property%3D%27value%27
            //只要警告他们不要用Object.defineProperty往data里扔东西就好了
            /*defineProperty(sharpData, property, options){
                console.log(property, options);
                console.log(arguments);
                return true;
            },*/
            deleteProperty(sharpData, property){
                //todo:取消变量关联，如果导致了断链，那么进行永久缓存并警告开发者
                return Reflect.deleteProperty(sharpData, property);
            }
        });
    }
    get rootNode(){return this.#rootNode;}
    get data(){return this.#proxy;}
    #detectInsert(node :Element) :void{
        if(node.textContent){
            const inserts = [...node.textContent.matchAll(/::[^:]+::/g)];
            //没有匹配到则为null，匹配到则[n]为::example::
            if(inserts.length > 0) for(let i = 0; i < inserts.length; i++){
                const index = inserts[i].index, str = inserts[i][0].substring(2, inserts[i][0].length - 2);
                //note:str可能是指令！
            }
        }
        const attrs = node.attributes;
        //别写in，否则出一大堆方法
        //NameNodeMap可以用数组那套，NameNodeMap.length返回的是正确的长度
        for(let i = 0; i < attrs.length; i++){
            //todo:检查属性名和属性值

        }
        //进入子节点
        for(let i = 0; i < node.childNodes.length; i++){
            //todo:递归
        }
    }
}

const Dynamic = {
    new(rootNode :Elementy){
        return new App(rootNode);
    },
    SPA: {

    },
    SW: {

    },

}

//对象导出
utils.generic.constantize(Dynamic);
export default Dynamic;