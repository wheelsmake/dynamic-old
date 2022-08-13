/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
import * as utils from "../../utils/index";
import * as localUtils from "./utils/index";

class Scope{
    #rootNode :Element;
    constructor(rootNode :Elementy){
        this.#rootNode = utils.arguments.reduceToElement(rootNode)!;

    }
}


const Dynamic = {
    createScope(rootNode :Elementy) :Scope{
        return new Scope(rootNode);
    },
    
};
//对象导出
utils.generic.constantize(Dynamic);
export default Dynamic;