"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const twig = require("twig");
const common_1 = require("../../common");
class Twig {
    constructor() {
        this.data = {};
    }
    set(key, value) {
        this.data[key] = value;
    }
    render(template) {
        return __awaiter(this, void 0, void 0, function* () {
            if (common_1.isDev) {
                twig.cache(false);
            }
            const p = new Promise((resolve, reject) => {
                twig.renderFile("src/view/template/" + template + ".twig", this.data, (err, txt) => {
                    resolve(txt);
                });
            });
            return yield p;
        });
    }
}
exports.default = Twig;
//# sourceMappingURL=twig.js.map