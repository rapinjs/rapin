export default class Cache {
    cache: any;
    constructor(driver: string, expire?: number);
    get(key: string): any;
    set(key: string, value: object | string | object[]): any;
    delete(key: string): any;
}
