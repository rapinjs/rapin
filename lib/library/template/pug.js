"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const pug_1 = require("pug");
const common_1 = require("../../common");
class Pug {
    constructor() {
        this.data = {};
    }
    set(key, value) {
        this.data[key] = value;
    }
    render(template) {
        const content = fs.readFileSync(common_1.DIR_TEMPLATE + '/template/' + template + '.pug');
        return pug_1.render(content, this.data);
    }
}
exports.default = Pug;
//# sourceMappingURL=pug.js.map