/* dynamic
 * ©2022 LJM12914. https://github.com/openink/dynamic
 * Licensed under Apache 2.0 License. https://github.com/openink/dynamic/blob/main/LICENSE
*/
type anyObject = Record<string, any>;
type dynamicOptions = {
    rootScope? :HTMLElement;
    enableAntiClash? :boolean;
    clashHandler? :(type :string, args :object, clashee :object) => string;
    multiNextDataNode? :boolean;
    renderSecurityLevel? :0 | 1 | 2 | 3;
    bannedTagName? :string[];
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
declare class template{
    #options :dynamicOptions;
    #templates :templateObject[] = [];
    #instances :instanceObject[] = [];
    #observer :MutationObserver;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
interface dfScope{
    id :string;
    element :HTMLElement;
}
interface dataNode{
    id :string;
    processor :Function;
    prevNodes :dataNode[];
    nextNodes :dataNode[];
}
declare class dataFlow{
    #options :dynamicOptions;
    #dfScopes :dfScope[] = [];
    #dataNodes :dataNode[] = [];
    #observer :MutationObserver;
}