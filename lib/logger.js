"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const common_1 = require("./common");
const colors = require('colors');
class Logger {
    constructor(name) {
        this.name = name;
        this.time = this.getTime();
    }
    getTime() {
        const d = new Date();
        return d.getTime();
    }
    end() {
        if (common_1.isDev) {
            const diff = this.getTime() - this.time;
            console.log(colors.red(`[Rapin JS]   `) + colors.green(this.name) + colors.yellow(` +${diff}ms`));
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map