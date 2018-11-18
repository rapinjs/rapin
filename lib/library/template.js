"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const rapin_config_1 = require("rapin-config");
class Template {
    constructor() {
        const { engine } = rapin_config_1.template;
        const filepath = path.resolve(__dirname, './template/' + engine + '.js');
        if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
            const adaptorClass = require('./template/' + engine).default;
            this.adaptor = new adaptorClass();
        }
    }
    set(key, value) {
        this.adaptor.set(key, value);
    }
    render(template) {
        return this.adaptor.render(template);
    }
}
exports.default = Template;
//# sourceMappingURL=template.js.map