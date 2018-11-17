export default class Template {
    adaptor: any;
    constructor(adaptor: string);
    set(key: String, value: Object | String | Object[]): void;
    render(template: string): any;
}
