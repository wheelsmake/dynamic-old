/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
import Dynamic from "./dynamic";
//fixed:当作模块使用的时候不需要弄到全局作用域，所以将这个东西抽出来了
Object.defineProperty(window, "Dynamic", {
    configurable: false,
    writable: false,
    enumerable: true,
    value: Dynamic
});