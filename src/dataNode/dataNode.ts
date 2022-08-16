/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
import * as utils from "../../../utils/index";
import * as localUtils from "../utils/index";
export default class dataNode{
    #name :string;
    #methods :functionObject = {};
    constructor(name :string, methods :functionObject){
        //name的合法性和唯一性会在调用这里之前验证
        this.#name = name;
        //methods伪属性有验证
        this.methods = methods;
    }
    get name(){return this.#name;}
    get methods() :functionObject{return this.#methods;}
    //增量
    set methods(input :any){
        for(let i in input){
            if(typeof input[i] == "function") this.#methods[i] = input[i].bind({
                //todo:“精心设计”this
            });
            else utils.generic.E("methods", "functionObject", input[i], "this entry is not function");
        }
    }
    //这个不用走伪属性，不用验证就不用走
    removeMethod(method :string) :functionObject{
        for(let i in this.#methods) if(this.#methods[i].name === method) delete this.#methods[i];
        return this.#methods;
    }
}