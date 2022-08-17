/* dynamic
 * ©2022 LJM12914. https://github.com/wheelsmake/dynamic
 * Licensed under MIT License. https://github.com/wheelsmake/dynamic/blob/main/LICENSE
*/
type anyObject = Record<string, any>;
type kvObject = Record<string, string | undefined | null>;
type SSkvObject = Record<string, string>;
type functionObject = Record<string, Function>;

type Elementy = Element | string;

type depenObject = Record<string, {
    shouldUpdate :string[],
    shouldExport :Function[]
}>;