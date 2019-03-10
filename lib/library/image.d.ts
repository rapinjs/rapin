export default class Image {
    data: object;
    constructor();
    link(image: string, width?: number, height?: number): Promise<string>;
}
