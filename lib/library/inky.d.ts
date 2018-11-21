export default class Inky {
    protected css: string;
    protected html: string;
    constructor();
    addStyle(style: any): void;
    setHtml(html: any): void;
    convert(options?: {}, cheerioOpts?: {
        decodeEntities: boolean;
    }): any;
}
