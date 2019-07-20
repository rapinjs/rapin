"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Model {
    constructor(registry) {
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
exports.Model = Model;
//# sourceMappingURL=model.js.map