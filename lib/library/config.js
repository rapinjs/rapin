"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const lodash_1 = require("lodash");
class Config {
    constructor() {
        this.data = {};
    }
    get(key) {
        return !lodash_1.isUndefined(this.data[key]) ? this.data[key] : key;
    }
    set(key, value) {
        this.data[key] = value;
    }
    has(name) {
        return !lodash_1.isUndefined(this.data[name]);
    }
    load(filename) {
        const filepath = 'lib/config/' + filename + '.js';
        let data = {};
        if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
            data = require('config/' + filename);
        }
        if (data.default) {
            data = data.default;
        }
        this.data = Object.assign(Object.assign({}, this.data), data);
        return this.data;
    }
}
exports.default = Config;
//# sourceMappingURL=config.js.map