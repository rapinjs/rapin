export default class Language {
    directory: string;
    data: object;
    constructor(directory?: string);
    get(key: any): any;
    set(key: any, value: any): void;
    all(): object;
    load(filename: any): object;
}
