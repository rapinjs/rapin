export default class Mustache {
    data: any;
    constructor();
    set(key: string, value: object | string | number): void;
    render(template: string): any;
}
