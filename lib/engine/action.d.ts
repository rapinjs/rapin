import Registry from './registry';
export default class Action {
    route: string;
    method: string;
    constructor(route: string);
    execute(registry: Registry, args?: object): any;
}
