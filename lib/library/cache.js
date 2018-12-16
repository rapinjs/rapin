"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const common_1 = require("../common");
class Cache {
    constructor() {
        const { engine, expire } = common_1.config.cache;
        const filePath = path.resolve(__dirname, "./cache/" + engine + ".js");
        if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
            const driverClass = require("./cache/" + engine).default;
            this.cache = new driverClass(expire);
        }
    }
    get(key) {
        return this.cache.get(key);
    }
    set(key, value) {
        return this.cache.set(key, value);
    }
    delete(key) {
        return this.cache.delete(key);
    }
}
exports.default = Cache;
//# sourceMappingURL=cache.js.map