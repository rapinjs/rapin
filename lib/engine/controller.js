"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
class Controller {
    constructor(registry) {
        this.data = {};
        this.registry = registry;
        return new Proxy(this, this);
    }
    get $context() {
        return this.registry.getAll();
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