/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
type anyObject = Record<string, any>;
type kvObject = Record<string, string | undefined | null>;
type SSkvObject = Record<string, string>;
type dynamicOptions = { //last update: 2022.6.9 15:28
    rootScope? :Element;
    renderSecurityLevel? :0 | 1 | 2 | 3;
    bannedTagName? :string[];
    tInstanceLimit? :number;
} | undefined;
type tuID = string; //实在想不出很好的定义方式，变长字符串？？？
interface templateObject{
    id :tuID;
    content :Element;
}
interface instanceObject{
    reference :Element;
    slots :anyObject;
}
interface dataNode{
    name :string;
    prevNodes :dataNodeBase[];
}
interface createDataNodeArgs{
    name :string;
    source :any;
    getProcessor :() => any;
    setProcessor :() => any;
}
type exportDataNode = dataNodeBase;