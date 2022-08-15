export declare function e(s: string, scope?: Element | Document): Node[] | Node;
export declare function isDescendant(possibleDescendant: Element, possibleParent: Element): boolean;
export declare function isInDocument(element: Element): boolean;
export declare function isChild(element: Element, target: Element): boolean;
export declare function toHTML(HTML: string): Node[];
export declare function getInnerNodes(el: Node | Element): Node[];
export declare function hatch(element: Element, remove?: boolean): Node[];
export declare function render(HTML: string | Element | HTMLCollection | Element[] | Node | NodeList | Node[], element: Element, insertAfter?: boolean, append?: boolean, disableDF?: boolean): Node[];
//# sourceMappingURL=element.d.ts.map