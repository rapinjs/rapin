"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const jade_1 = require("jade");
class Jade {
    constructor() {
        this.data = {};
    }
    set(key, value) {
        this.data[key] = value;
    }
    render(template) {
        const content = fs.readFileSync('src/view/template/' + template + '.jade');
        const fn = jade_1.compile(content, this.data);
        return fn();
    }
}
exports.default = Jade;
//# sourceMappingURL=jade.js.map