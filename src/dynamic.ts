/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
import * as utils from "../../utils/index";
import * as localUtils from "./utils/index";
import DN from "./dataNode/index";

//开发模式
console.info(
`dynamic(dnJS) ©LJM12914. https://github.com/wheelsmake/dynamic
You are using the unminified build of dynamic. Make sure to use the minified build for production.`);
const DEV = "DEV" in window && (window as anyObject).DEV === true;

//重用字符串
const s = [
    "cannot find this datanode",
    "DNcreateArgs | string",
    "BLOCKED IN NON-DEV MODE"
];

//主类
class Dynamic{
    #rootNode :Element;
    #sourceDNs :sourceDN[] = [];
    #transDNs :transDN[] = [];
    #exportDNs :exportDN[] = [];
    #DNs :dataNode[] = [];
    constructor(rootNode :Elementy){
        this.#rootNode = utils.arguments.reduceToElement(rootNode)!;
        this.#detectDNfromHTML(this.#rootNode);
        //开发模式记录
        console.info("creating new dynamic instance with rootNode", rootNode);
    }
    get rootNode(){return this.#rootNode;}
    __DEV__getPrivateFields__(){
        if(DEV) return{
            rootNode: this.#rootNode,
            sourceDNs: this.#sourceDNs,
            transDNs: this.#transDNs,
            exportDNs: this.#exportDNs,
            DNs: this.#DNs
        }
        else return s[2];
    }
    sourceDN(args :sDNcreateArgs | string) :sDNOperations{
        const DNs = this.#DNs, sourceDNs = this.#sourceDNs, transDNs = this.#transDNs, exportDNs = this.#exportDNs,
              sourceDN = this.sourceDN, transDN = this.transDN, exportDN = this.exportDN;
        var thisDN :sourceDN;
        if(typeof args == "object"){
            //create会审查参数
            //const result = localUtils.createDN.createSDN(args)!;
            sourceDNs.push(result);
            DNs.push(result);
            thisDN = result;
        }
        //查找节点
        else{
            //note:线性遍历数组的耗时可以忽略不计，遍历一个拥有200000个三个number类型对象的数组耗时约3ms
            for(let i = 0; i < sourceDNs.length; i++) if(sourceDNs[i].name === args) thisDN = sourceDNs[i];
            //这就让我很不爽了，ts怎么会逼我写出带断言的变量等于undefined这种东西？？？
            if(thisDN! === undefined) utils.generic.E("args", `s${s[1]}`, args, s[0]);
        }
    }
    transDN(args :tDNcreateArgs | string) :void{

    }
    exportDN(args :eDNcreateArgs | string) :void{

    }
    #detectDNfromHTML(node :Element) :void{
        if(node.textContent){
            const sDNm = node.textContent.match(/^__[^:]+__$/),
                  tDNm = node.textContent.match(/^--[^:]+--$/),
                  eDNm = node.textContent.match(/^::[^:]+::$/);
            //没有匹配到则为null，匹配到则[0]为::example::
            if(eDNm){
                
            }
            else if(tDNm){}
            else if(sDNm){}
        }
        const attrs = node.attributes;
        //别写in，否则出一大堆方法
        //NameNodeMap可以用数组那套，NameNodeMap.length返回的是正确的长度
        for(let i = 0; i < attrs.length; i++){
            //todo:检查属性

        }
        //遍历DOM，递归
        for(let i = 0; i < node.childNodes.length; i++){

        }
    }
}


//对象导出
utils.generic.constantize(Dynamic);
export default Dynamic;