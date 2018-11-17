import Registry from '../engine/registry';
export default class Decorator {
    registry: Registry;
    constructor(registry: Registry);
    required(list: any): (target: any, propertyKey: any, descriptor: any) => void;
}
