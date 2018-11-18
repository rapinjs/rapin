import Registry from './registry';
export default class Loader {
    registry: Registry;
    constructor(registry: Registry);
    controller(route: string, data: object): Promise<void>;
    model(route: string): void;
    view(route: string, data: object): any;
    config(route: string): void;
    language(route: string): any;
}
