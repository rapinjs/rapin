"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class Decorator {
    constructor(registry) {
        this.registry = registry;
        // global.required = this.required.bind(this)
    }
    required(list) {
        return (target, propertyKey, descriptor) => {
            const originalMethod = descriptor.value;
            descriptor.value = function (...args) {
                for (const key in list) {
                    if (lodash_1.isUndefined(this.request.post[list[key]])) {
                        this.registry.get('error').set('missing_' + list[key]);
                    }
                }
                if (!this.registry.get('error').get()) {
                    return originalMethod.apply(this, args);
                }
            };
        };
    }
}
exports.default = Decorator;
//# sourceMappingURL=decorator.js.map