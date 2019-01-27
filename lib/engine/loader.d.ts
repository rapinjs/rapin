import Registry from './registry';
export default class Loader {
    registry: Registry;
    constructor(registry: Registry);
    controller(route: string, data: object): Promise<any>;
    model(route: string): void;
    view(route: string, data: object): Promise<any>;
    config(route: string): void;
    language(route: string): any;
}
