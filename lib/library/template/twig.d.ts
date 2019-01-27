export default class Twig {
    data: any;
    constructor();
    set(key: string, value: object | string | number): void;
    render(template: string): Promise<{}>;
}
