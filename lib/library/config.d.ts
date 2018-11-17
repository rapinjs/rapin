export default class Config {
    data: object;
    constructor();
    get(key: any): any;
    set(key: any, value: any): void;
    has(name: any): boolean;
    load(filename: string): object;
}
