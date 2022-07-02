export default class dataFlow {
    #private;
    constructor(options: dynamicOptions);
    new(element: Element): void;
    getScopes(): Element[];
    deleteScope(identity: Element | number): Element | null;
    createDataNode(args: createDataNodeArgs): void;
    createExportDataNode(): void;
    connect(node1: dataNode, node2: dataNode): void;
}
//# sourceMappingURL=dataFlow.d.ts.map