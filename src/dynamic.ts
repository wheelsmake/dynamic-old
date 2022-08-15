/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
import * as utils from "../../utils/index";
import * as localUtils from "./utils/index";


//开发模式
console.info("dynamic ©LJM12914. https://github.com/wheelsmake/dynamic \r\nYou are using an unminified version of dynamic, which is not suitable for production use.");
const DEV = "DEV" in window && (window as anyObject).DEV === true;


//主类
class Dynamic{
    #rootNode :Element;
    #sourceDNs :sourceDN[] = [];
    #transDNs :transDN[] = [];
    #exportDNs :exportDN[] = [];
    #DNs :dataNode[] = [];
    constructor(rootNode :Elementy){
        this.#rootNode = utils.arguments.reduceToElement(rootNode)!;
        this.#detectDN(this.#rootNode);
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
    }
    sourceDN(args :sDNcreateArgs | string) :sDNOperations{
        const DNs = this.#DNs, sourceDNs = this.#sourceDNs, transDNs = this.#transDNs, exportDNs = this.#exportDNs;
        var thisDN :sourceDN;
        //创建节点
        if(typeof args == "object"){
            //create会审查参数
            const result = localUtils.createDN.createSDN(args)!;
            sourceDNs.push(result);
            DNs.push(result);
            thisDN = result;
        }
        //查找节点
        else for(let i = 0; i < sourceDNs.length; i++) if(sourceDNs[i].name === args) thisDN = sourceDNs[i];
        return{
            connectTo(target :string | nextDN) :void{return localUtils.dno.connectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            disconnectTo(target :string | nextDN) :void{return localUtils.dno.disconnectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            existsNext(target :string | nextDN) :boolean{return localUtils.dno.existsNext([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            get frequency(){return thisDN.frequency;},
            set frequency(frequency :number){
                if(typeof frequency != "number") utils.generic.E("frequency", "number", frequency);
                else thisDN.frequency = frequency;
            },
            get value(){if(DEV) return thisDN.value;}
        }
    }
    transDN(args :tDNcreateArgs | string) :tDNOperations{
        const DNs = this.#DNs, sourceDNs = this.#sourceDNs, transDNs = this.#transDNs, exportDNs = this.#exportDNs;
        var thisDN :transDN;
        //创建节点
        if(typeof args == "object"){
            //create会审查参数
            const result = localUtils.createDN.createTDN(args)!;
            transDNs.push(result);
            DNs.push(result);
            thisDN = result;
        }
        //查找节点
        else for(let i = 0; i < transDNs.length; i++) if(transDNs[i].name === args) thisDN = transDNs[i];
        //todo:判断是否为缓存传递节点（ctransitive），如果是，提供缓存访问方法
        return{
            connectTo(target :string | nextDN) :void{return localUtils.dno.connectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            disconnectTo(target :string | nextDN) :void{return localUtils.dno.disconnectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            connectFrom(target :string | prevDN) :void{return localUtils.dno.connectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            disconnectFrom(target :string | prevDN) :void{return localUtils.dno.disconnectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            existsPrev(target :string | prevDN) :boolean{return localUtils.dno.existsPrev([DNs, sourceDNs, transDNs, exportDNs], thisDN, target)},
            existsNext(target :string | nextDN) :boolean{return localUtils.dno.existsNext([DNs, sourceDNs, transDNs, exportDNs], thisDN, target)}
        }
    }
    exportDN(args :eDNcreateArgs | string) :eDNOperations{
        const DNs = this.#DNs, sourceDNs = this.#sourceDNs, transDNs = this.#transDNs, exportDNs = this.#exportDNs;
        var thisDN :exportDN;
        //创建节点
        if(typeof args == "object"){
            //create会审查参数
            const result = localUtils.createDN.createEDN(args)!;
            exportDNs.push(result);
            DNs.push(result);
            thisDN = result;
        }
        //查找节点
        else for(let i = 0; i < exportDNs.length; i++) if(exportDNs[i].name === args) thisDN = exportDNs[i];
        return{
            connectFrom(target :string | prevDN) :void{return localUtils.dno.connectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            disconnectFrom(target :string | prevDN) :void{return localUtils.dno.disconnectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            existsPrev(target :string | prevDN) :boolean{return localUtils.dno.existsPrev([DNs, sourceDNs, transDNs, exportDNs], thisDN, target)}
        }
    }
    #detectDN(node :Element) :void{
        if(node.textContent){
            const sDNm = node.textContent.match(/^__[^:]+__$/),
                  tDNm = node.textContent.match(/^--[^:]+--$/),
                  eDNm = node.textContent.match(/^::[^:]+::$/);
            //没有匹配到则为null
            if(eDNm) this.exportDN({
                name: eDNm[0].substring(2, eDNm[0].length - 2),
                export(){
                    
                }
            });
            if(sDNm){

            }
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