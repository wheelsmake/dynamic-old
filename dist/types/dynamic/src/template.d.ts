interface registerArgs {
    element: Element;
    tuID?: tuID;
    remove?: boolean;
}
interface renderArgs {
    tuID: tuID;
    element: Element;
    slots?: anyObject;
    removeOuterElement?: boolean;
    insertAfter?: boolean;
    append?: boolean;
    disableDF?: boolean;
}
interface updateArgs {
    tuID: tuID;
    element: Element;
}
export default class template {
    #private;
    constructor(options: dynamicOptions);
    register(args: registerArgs): string;
    render(args: renderArgs): Node[] | undefined;
    update(args: updateArgs): Element | null;
    delete(tuID: tuID): Element | null;
    getContent(tuID: tuID): Element | null;
    existsTUID(tuID: tuID): boolean;
    existsElement(element: Element): string | null;
    getTemplates(): templateObject[];
    getInstance(tuID: tuID): void;
}
export {};
//# sourceMappingURL=template.d.ts.map