export default class Template {
    adaptor: any;
    constructor();
    set(key: String, value: Object | String | Object[]): void;
    render(template: string): Promise<any>;
}
