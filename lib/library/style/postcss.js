"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../../common");
const postcss_1 = require("postcss");
const fs = require("fs");
const config = require('./postcss.config.js');
class Postcss {
    constructor() {
    }
    convert(stylePath) {
        const filePath = common_1.DIR_STYLESHEET + '/' + stylePath;
        if (!fs.existsSync(filePath + '.css') || common_1.NODE_ENV !== 'production') {
            const fileContent = fs.readFileSync(filePath + '.pcss');
            const result = postcss_1.default(config()).process(fileContent, {
                from: filePath + '.pcss',
                to: filePath + '.css',
            }).css;
            fs.writeFileSync(filePath + '.css', result);
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
//# sourceMappingURL=postcss.js.map