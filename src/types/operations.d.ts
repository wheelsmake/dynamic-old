/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
interface sDNOperations extends DNOperations{
    connectTo(target :string | nextDN) :void;
    disconnectTo(target :string | nextDN) :void;

    existsNext(target :string | nextDN) :boolean;

    get frequency() :number;
    set frequency() :void;
    get value() :any; //note:开发模式下生效
}
interface tDNOperations extends DNOperations{
    connectTo(target :string | nextDN) :void;
    disconnectTo(target :string | nextDN) :void;
    connectFrom(target :string | prevDN) :void;
    disconnectFrom(target :string | prevDN) :void;

    existsPrev(target :string | prevDN) :boolean;
    existsNext(target :string | nextDN) :boolean;
}
interface ctDNOperations extends tDNOperations{
    get frequency() :number;
    set frequency() :void;
    get value() :any; //note:开发模式下生效
}
interface eDNOperations extends DNOperations{
    connectFrom(target :string | prevDN) :void;
    disconnectFrom(target :string | prevDN) :void;

    existsPrev(target :string | prevDN) :boolean;
}