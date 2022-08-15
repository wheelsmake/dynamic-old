/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
/**有问题已经报错了，一定会返回节点
 * 
 * 看清我是**S**！！*/
export function createSDN(args :sDNcreateArgs) :sourceDN | void{
    checkArgs("s", args);
}
/**有问题已经报错了，一定会返回节点
 * 
 * 看清我是**T**！！*/
export function createTDN(args :tDNcreateArgs) :transDN | void{
    checkArgs("t", args);
}
/**有问题已经报错了，一定会返回节点
 * 
 * 看清我是**E**！！*/
export function createEDN(args :eDNcreateArgs) :exportDN | void{
    checkArgs("e", args);
}


function checkArgs(type :"s" | "t" | "e", args :any) :void{
    //重用字符串
    const a = "args", b = "DNCreateArgs", c = " is invalid";
    //没name
    if(!("name" in args)) utils.generic.E(a, b, args, `${a}.name${c}`);
    //methods不符合规范（不完全验证，因为貌似没有可以不用循环判断一个对象里是否都是某类型的方法）
    //没关系，methods我们不需要验证太多，等到调用的时候让开发者自己懵逼吧
    //note: typeof xxx == "type" 是可以的，typeof运算比比较运算优先级高
    //并且其实"sth" in obj的in运算也比比较运算优先级高
    else if("methods" in args && typeof args.methods != "object") utils.generic.E(a, b, args, `${a}.methods${c}`);
    else switch(type){
        case "s":
            //fetch不对劲
            if(!("fetch" in args) || typeof args.fetch != "function") utils.generic.E(a, `s${b}`, args, `${a}.fetch${c}`);
            else 
            break;
        case "t":
            //isCached是true然后没frequency或frequency不是数字
            if("isCached" in args && args.isCached === true && (!("frequency" in args) || typeof args.frequency != "number")) utils.generic.E(a, `t${b}`, args, `${a}.frequency${c}`);
            break;
        case "e":
            //export不对劲
            if(!("export" in args) || typeof args.export != "function") utils.generic.E(a, `e${b}`, args, `${a}.export${c}`);
            break;
        default:
            //绝不会走到这里
            utils.generic.EE("?");
            break;
    }
}