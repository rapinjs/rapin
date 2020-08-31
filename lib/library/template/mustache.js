"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const mustache_1 = require("mustache");
class Mustache {
    constructor() {
        this.data = {};
    }
    set(key, value) {
        this.data[key] = value;
    }
    render(template) {
        const content = fs.readFileSync('view/template/' + template + '.mustache');
        const output = mustache_1.render(content.toString(), this.data);
        return output;
    }
}
exports.default = Mustache;
//# sourceMappingURL=mustache.js.map