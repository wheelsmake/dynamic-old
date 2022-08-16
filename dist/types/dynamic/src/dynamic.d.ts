declare class Dynamic {
    #private;
    constructor(rootNode: Elementy);
    get rootNode(): Element;
    __DEV__getPrivateFields__(): string | {
        rootNode: Element;
        sourceDNs: sourceDN[];
        transDNs: transDN[];
        exportDNs: exportDN[];
        DNs: dataNode[];
    };
    sourceDN(args: sDNcreateArgs | string): sDNOperations;
    transDN(args: tDNcreateArgs | string): tDNOperations | ctDNOperations;
    exportDN(args: eDNcreateArgs | string): eDNOperations;
}
export default Dynamic;
//# sourceMappingURL=dynamic.d.ts.map