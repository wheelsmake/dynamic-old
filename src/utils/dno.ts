/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
export function connectTo(
    data :[dataNode[], sourceDN[], transDN[], exportDN[]],
    objective :prevDN, target :string | nextDN
) :void{
    const targetDN :dataNode = processTarget(data, target)!;
    //是否是源节点，源节点不能被连接
    if(data[1].indexOf(targetDN as any) != -1) utils.generic.EE("Source datanodes cannot be connected.");
    //是否已经连接了，重复的不要
    //argument:这里是否需要双边检测？如果可能存在单边连接，则需要这样做。目前仅检测objective方。
    else if(objective.nexts.indexOf(targetDN as nextDN) != -1) utils.generic.E("target", undefined, target, "duplicated next nodes");
    else{
        objective.nexts.push(targetDN as nextDN);
        (targetDN as nextDN).prevs.push(objective);
    }
}
export function disconnectTo(
    data :[dataNode[], sourceDN[], transDN[], exportDN[]],
    objective :prevDN, target :string | nextDN
) :void{
    const targetDN :dataNode = processTarget(data, target)!;
    //是否是源节点
    if(data[1].indexOf(targetDN as any) != -1) utils.generic.EE("Source datanodes cannot be connected, thus wont be disconnected.");
    //是否没有连接argument:与上面一样
    else if(objective.nexts.indexOf(targetDN as nextDN) == -1) utils.generic.E("target", undefined, target, "cannot find it as next nodes");
    else{
        utils.generic.precisePop(targetDN as nextDN, objective.nexts);
        utils.generic.precisePop(objective, (targetDN as nextDN).prevs);
    }
}
export function connectFrom(
    data :[dataNode[], sourceDN[], transDN[], exportDN[]],
    objective :nextDN, target :string | prevDN
) :void{

}
export function disconnectFrom(
    data :[dataNode[], sourceDN[], transDN[], exportDN[]],
    objective :nextDN, target :string | prevDN
) :void{

}
export function existsPrev(
    data :[dataNode[], sourceDN[], transDN[], exportDN[]],
    objective :nextDN, target :string | prevDN
) :boolean{
    const targetDN :dataNode = processTarget(data, target)!;
    return false;
}
export function existsNext(
    data :[dataNode[], sourceDN[], transDN[], exportDN[]],
    objective :prevDN, target :string | nextDN
) :boolean{
    const targetDN :dataNode = processTarget(data, target)!;
    return false;
}

/**void懂的*/
function processTarget(data :[dataNode[], sourceDN[], transDN[], exportDN[]], target :string | dataNode) :dataNode | void{
    if(typeof target == "object"){
        if(data[0].indexOf(target) != -1) return target;
        else utils.generic.E("target", undefined, target, "cannot find this datanode");
    }
    else if(typeof target == "string"){
        for(let i = 0; i < data[0].length; i++) if(data[0][i].name === target) return data[0][i];
        utils.generic.E("target", undefined, target, "cannot find this datanode");
    }
    else utils.generic.E("target", "string | nextDN", target);
}