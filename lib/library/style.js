"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Style {
    constructor(driver) {
        const filePath = path.resolve(__dirname, './style/' + driver + '.js');
        if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
            const driverClass = require('./style/' + driver).default;
            this.style = new driverClass();
        }
    }
    link(link) {
        return this.style.link(link);
    }
    path(path) {
        return this.style.path(path);
    }
}
exports.default = Style;
//# sourceMappingURL=style.js.map