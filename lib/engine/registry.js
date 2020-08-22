"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class Registry {
    constructor(data = {}) {
        this.data = Object.assign({}, data);
    }
    get(name) {
        return this.data[name];
    }
    getAll() {
        return Object.assign({}, this.data);
    }
    set(name, value) {
        this.data[name] = value;
    }
    has(name) {
        return !lodash_1.isUndefined(this.data[name]);
    }
}
exports.default = Registry;
//# sourceMappingURL=registry.js.map