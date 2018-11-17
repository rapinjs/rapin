export default class Image {
    data: object;
    constructor();
    link(image: any, width?: boolean, height?: boolean): string;
    googleMap(location: string, image_path: string, callback: any): void;
    download(uri: string, image_path: string): boolean;
}
