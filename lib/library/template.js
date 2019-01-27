"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const common_1 = require("../common");
class Template {
    constructor() {
        const { engine } = common_1.config.template;
        const filepath = path.resolve(__dirname, "./template/" + engine + ".js");
        if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
            const adaptorClass = require("./template/" + engine).default;
            this.adaptor = new adaptorClass();
        }
    }
    set(key, value) {
        this.adaptor.set(key, value);
    }
    render(template) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adaptor.render(template);
        });
    }
}
exports.default = Template;
//# sourceMappingURL=template.js.map