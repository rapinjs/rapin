"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const sass = require("sass");
const fs = require("fs");
const path = require("path");
class Postcss {
    constructor() {
    }
    convert(stylePath) {
        const filePath = path.resolve(common_1.DIR_STYLESHEET, './' + stylePath);
        if (!fs.existsSync(filePath + '.css') || common_1.NODE_ENV !== 'production') {
            const fileContent = fs.readFileSync(filePath + '.scss').toString();
            const result = sass.compileString(fileContent);
            fs.writeFileSync(filePath + '.css', result.css);
        }
    }
    link(link) {
        this.convert(link);
        return common_1.HTTP_SERVER + 'stylesheet/' + link + '.css';
    }
    path(filePath) {
        this.convert(filePath);
        return common_1.DIR_STYLESHEET + '/' + filePath + '.css';
    }
}
exports.default = Postcss;
//# sourceMappingURL=scss.js.map