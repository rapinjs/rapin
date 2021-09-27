"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const mustache_1 = require("mustache");
const common_1 = require("../../common");
class Mustache {
    constructor() {
        this.data = {};
    }
    set(key, value) {
        this.data[key] = value;
    }
    render(template) {
        const content = fs.readFileSync(common_1.DIR_TEMPLATE + '/template/' + template + '.mustache');
        const output = (0, mustache_1.render)(content.toString(), this.data);
        return output;
    }
}
exports.default = Mustache;
//# sourceMappingURL=mustache.js.map