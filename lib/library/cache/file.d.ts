export default class File {
    expire: number;
    constructor(expire?: number);
    get(key: any): any;
    set(key: any, value: any): void;
    delete(key: any): void;
}
