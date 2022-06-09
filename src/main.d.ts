/* dynamic
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
type anyObject = Record<string, any>;
type dynamicOptions = { //last update: 2022.6.9 15:28
    rootScope? :HTMLElement;
    enableAntiClash? :boolean;
    clashHandler? :(type :string, args :object, clashee :object) => string;
    multiNextDataNode? :boolean;
    renderSecurityLevel? :0 | 1 | 2 | 3;
    bannedTagName? :string[];
    tInstanceLimit? :number;
} | undefined;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface templateObject{
    id :string;
    content :HTMLElement;
}
interface instanceObject{
    reference :HTMLElement;
    slots :anyObject;
}
declare class template{ //last update: 2022.6.9 15:43
    #options :dynamicOptions;
    #templates :templateObject[] = [];
    #instances :instanceObject[] = [];
    #observer :MutationObserver;
    register :(args :registerArgs) => string;
    render :(args :renderArgs) => Node[] | undefined;
    update :(args :updateArgs) => HTMLElement | null;
    delete :(tuID :string) => HTMLElement | null;
    getContent :(tuID :string) => HTMLElement | null;
    existsTUID :(tuID :string) => boolean;
    existsElement :(element :HTMLElement) => string | null;
    getTemplates :() => templateObject[];
    getInstance :(tuID :string) => void/*:instanceObject | instanceObject[]*/;
    #parseSlots :(target :HTMLElement, argSlots? :anyObject) => void;
    #getTemplateObject :(tuID :string) => object | null;
    #observerCB :(resultList :MutationRecord[], observer :MutationObserver) => void;
    #convertTemplate :(template_input? :HTMLTemplateElement) => void;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface dataNodeBase{
    id :string;
    proxy :ProxyConstructor;
    prevNodes :dataNodeBase[];
}
interface dataNode extends dataNodeBase{
    nextNodes :dataNode[];
    processor :(/*todo: */) => any;
}
type exportDataNode = dataNodeBase;
declare class dataFlow{ //last update: 2022.6.9 16:30
    #options :dynamicOptions;
    #dfScopes :dfScope[] = [];
    #dataNodes :dataNode[] = [];
    #observer :MutationObserver;
    #_ :anyObject;
    new :(element :HTMLElement) => void;
    createDataNode :() => void;
    connect :(node1 :dataNode, node2 :dataNode) => void;
    #observerCB :(resultList :MutationRecord[], observer :MutationObserver) => void;
}