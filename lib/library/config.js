"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const common_1 = require("../common");
class Config {
    constructor() {
        this.data = {};
    }
    get(key) {
        return !(0, lodash_1.isUndefined)(this.data[key]) ? this.data[key] : key;
    }
    set(key, value) {
        this.data[key] = value;
    }
    has(name) {
        return !(0, lodash_1.isUndefined)(this.data[name]);
    }
    load(filename) {
        let filepath = common_1.DIR_CATALOG + '/config/' + filename;
        let data = {};
        try {
            filepath = require.resolve(filepath);
            data = require(filepath);
        }
        catch (e) {
        }
        filepath = common_1.DIR_ROOT + '/config/' + filename;
        try {
            filepath = require.resolve(filepath);
            data = require(filepath);
        }
        catch (e) {
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