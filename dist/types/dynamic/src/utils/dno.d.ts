export declare function connectTo(data: [dataNode[], sourceDN[], transDN[], exportDN[]], objective: prevDN, target: string | nextDN): void;
export declare function disconnectTo(data: [dataNode[], sourceDN[], transDN[], exportDN[]], objective: prevDN, target: string | nextDN): void;
export declare function connectFrom(data: [dataNode[], sourceDN[], transDN[], exportDN[]], objective: nextDN, target: string | prevDN): void;
export declare function disconnectFrom(data: [dataNode[], sourceDN[], transDN[], exportDN[]], objective: nextDN, target: string | prevDN): void;
export declare function existsPrev(data: [dataNode[], sourceDN[], transDN[], exportDN[]], objective: nextDN, target: string | prevDN): boolean;
export declare function existsNext(data: [dataNode[], sourceDN[], transDN[], exportDN[]], objective: prevDN, target: string | nextDN): boolean;
//# sourceMappingURL=dno.d.ts.map