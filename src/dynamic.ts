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
        this.#detectDN(this.#rootNode);
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
        //创建节点
        if(typeof args == "object"){
            //create会审查参数
            const result = localUtils.createDN.createSDN(args)!;
            sourceDNs.push(result);
            DNs.push(result);
            thisDN = result;
        }
        //查找节点
        else{
            for(let i = 0; i < sourceDNs.length; i++) if(sourceDNs[i].name === args) thisDN = sourceDNs[i];
            //这就让我很不爽了，ts怎么会逼我写出带断言的变量等于undefined这种东西？？？
            if(thisDN! === undefined) utils.generic.E("args", `s${s[1]}`, args, s[0]);
        }
        return{
            connectTo(target :string | nextDN) :void{return localUtils.dno.connectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            disconnectTo(target :string | nextDN) :void{return localUtils.dno.disconnectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            existsNext(target :string | nextDN) :boolean{return localUtils.dno.existsNext([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);},
            fetchNow(){},
            get frequency(){return thisDN.frequency;},
            set frequency(freq :number){
                if(typeof freq != "number") utils.generic.E("frequency", "number", freq);
                else thisDN.frequency = freq;
            },
            get value(){
                //todo:不要限得那么死，如果是基本数据类型那么就放出来，引用数据类型就看开发模式与否
                //基本数据类型：undefined、
                if(DEV) return thisDN.value;
                else return s[2];
            }
        }
    }
    transDN(args :tDNcreateArgs | string) :tDNOperations | ctDNOperations{
        const DNs = this.#DNs, sourceDNs = this.#sourceDNs, transDNs = this.#transDNs, exportDNs = this.#exportDNs,
              sourceDN = this.sourceDN, transDN = this.transDN, exportDN = this.exportDN;
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
        else{
            for(let i = 0; i < transDNs.length; i++) if(transDNs[i].name === args) thisDN = transDNs[i];
            if(thisDN! === undefined) utils.generic.E("args", `t${s[1]}`, args, s[0]);
        }
        thisDN = thisDN!;
        const result2 :tDNOperations = {
            connectTo(target :string | nextDN) :anyDNOperations{
                //hack:这里玩了个副作用
                const type = localUtils.misc.checkType(localUtils.dno.connectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target)!);
                if(type == "t") return transDN(target);
                else if(type == "e") return exportDN(target);
                else utils.generic.EE(`${type}???`); //能走到这里就是鬼片
            },
            disconnectTo(target :string | nextDN) :anyDNOperations{
                localUtils.dno.disconnectTo([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);
                return thisDN;
            },
            connectFrom(target :string | prevDN) :anyDNOperations{
                localUtils.dno.connectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);
                return thisDN;
            },
            disconnectFrom(target :string | prevDN) :anyDNOperations{
                localUtils.dno.disconnectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);
                return thisDN;
            },
            existsPrev(target :string | prevDN) :boolean{return localUtils.dno.existsPrev([DNs, sourceDNs, transDNs, exportDNs], thisDN, target)},
            existsNext(target :string | nextDN) :boolean{return localUtils.dno.existsNext([DNs, sourceDNs, transDNs, exportDNs], thisDN, target)}
        };
        if("frequency" in thisDN){
            //判断是否为缓存传递节点（ctransitive），如果是，提供缓存访问方法
            //note:如果在已存在的对象上添加getter和setter，需要使用Object.defineProperty，result2["get xxx"]是没用的！
            //Object.defineProperty有一大堆默认配置坑，烦死了
            Object.defineProperty(result2, "frequency", {
                configurable: false,
                enumerable: true,
                get(){return (thisDN as ctransitiveDN).frequency;},
                set(freq :number){
                    if(typeof freq != "number") utils.generic.E("frequency", "number", freq);
                    else (thisDN as ctransitiveDN).frequency = freq;
                }
            });
            Object.defineProperty(result2, "value", {
                configurable: false,
                enumerable: true,
                get(){return (thisDN as ctransitiveDN).value;}
            });
            result2.updateNow = function(){
                //(thisDN as ctransitiveDN).update();
            }
            return result2 as ctDNOperations;
        }
        else return result2 as tDNOperations;
    }
    exportDN(args :eDNcreateArgs | string) :eDNOperations{
        const DNs = this.#DNs, sourceDNs = this.#sourceDNs, transDNs = this.#transDNs, exportDNs = this.#exportDNs,
              sourceDN = this.sourceDN, transDN = this.transDN, exportDN = this.exportDN;
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
        else{
            for(let i = 0; i < exportDNs.length; i++) if(exportDNs[i].name === args) thisDN = exportDNs[i];
            if(thisDN! === undefined) utils.generic.E("args", `e${s[1]}`, args, s[0]);
        }
        return{
            connectFrom(target :string | prevDN) :anyDNOperations{
                localUtils.dno.connectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);
                
            },
            disconnectFrom(target :string | prevDN) :anyDNOperations{
                localUtils.dno.disconnectFrom([DNs, sourceDNs, transDNs, exportDNs], thisDN, target);
                
            },
            existsPrev(target :string | prevDN) :boolean{return localUtils.dno.existsPrev([DNs, sourceDNs, transDNs, exportDNs], thisDN, target)}
        }
    }
    #detectDN(node :Element) :void{
        if(node.textContent){
            const sDNm = node.textContent.match(/^__[^:]+__$/),
                  tDNm = node.textContent.match(/^--[^:]+--$/),
                  eDNm = node.textContent.match(/^::[^:]+::$/);
            //没有匹配到则为null，匹配到则[0]为::example::
            if(eDNm) this.exportDN({
                name: eDNm[0].substring(2, eDNm[0].length - 2),
                methods: {}, //其实可以不用，utils那边做了兜底
                export(data :any) :any{
                    node.textContent = Object.prototype.toString.call((this as anyObject).value); //这里的this是精心设计的
                }
            });
            /*else if(tDNm) this.transDN({

            });
            else if(sDNm) this.sourceDN({

            });*/
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