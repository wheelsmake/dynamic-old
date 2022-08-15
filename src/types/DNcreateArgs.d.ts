/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
interface DNcreateArgs{
    name :string;
    methods? :Record<string, Function>;
}
interface sDNcreateArgs extends DNcreateArgs{
    fetch() :any;
    frequency :number;
}
interface tDNcreateArgs extends DNcreateArgs{
    /* 不要让开发者写太多格式化代码！
     * 如果不提供，那么我们就自己最简化定义它们
     * get() :any{return this.value;}
     * set(data :any) :any{this.value = data;}
     * ok?
    */
    get?() :any;
    set?(data :any) :any;
    isCached? :boolean;
    frequency? :number;
}
interface eDNcreateArgs extends DNcreateArgs{
    export() :any;
}