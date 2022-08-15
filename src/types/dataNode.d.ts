/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
interface dataNodeBase{
    name :string;
    methods :Record<string, Function>;
}
interface sourceDN extends dataNodeBase{
    fetch() :any;
    value :any;
    frequency :number;
    nexts :nextDN[];
}
interface transitiveDN extends dataNodeBase{
    get() :any;
    set(data :any) :any;
    prevs :prevDN[];
    nexts :nextDN[];
}
interface ctransitiveDN extends transitiveDN{
    value :any;
    frequency :number;
}
interface exportDN extends dataNodeBase{
    export() :any;
    prevs :prevDN[];
}
type transDN = transitiveDN | ctransitiveDN;

type prevDN = transDN | sourceDN;
type nextDN = transDN | exportDN;
type dataNode = sourceDN | transDN | exportDN;