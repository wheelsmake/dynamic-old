declare class Dynamic {
    #private;
    constructor(rootNode: Elementy);
    get rootNode(): Element;
    __DEV__getPrivateFields__(): {
        rootNode: Element;
        sourceDNs: sourceDN[];
        transDNs: transDN[];
        exportDNs: exportDN[];
        DNs: dataNode[];
    } | undefined;
    sourceDN(args: sDNcreateArgs | string): sDNOperations;
    transDN(args: tDNcreateArgs | string): tDNOperations;
    exportDN(args: eDNcreateArgs | string): eDNOperations;
}
export default Dynamic;
//# sourceMappingURL=dynamic.d.ts.map