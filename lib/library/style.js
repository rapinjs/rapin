"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const rapin_config_1 = require("rapin-config");
class Style {
    constructor() {
        const { engine } = rapin_config_1.template;
        const filePath = path.resolve(__dirname, './style/' + engine + '.js');
        if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
            const driverClass = require('./style/' + engine).default;
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