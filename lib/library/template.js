"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Template {
    constructor(adaptor) {
        const filepath = path.resolve(__dirname, './template/' + adaptor + '.js');
        if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
            const adaptorClass = require('./template/' + adaptor).default;
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