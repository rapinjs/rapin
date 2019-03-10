"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../types/Proxy.d.ts" />
class Controller {
    constructor(registry) {
        this.registry = registry;
        return new Proxy(this, this);
    }
    get(target, name) {
        if (name in target) {
            return target[name];
        }
        else {
            return this.registry.get(name);
        }
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map