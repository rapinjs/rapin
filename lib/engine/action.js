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
const fs = require("fs");
const lodash_1 = require("lodash");
class Action {
    constructor(route) {
        this.method = 'index';
        const parts = lodash_1.split(lodash_1.replace(route, /[^a-zA-Z0-9_\/]/, ''), '/');
        while (parts) {
            const filename = 'src/controller/' + lodash_1.join(parts, '/') + '.js';
            if (lodash_1.isEmpty(parts)) {
                break;
            }
            if (fs.existsSync(filename) && fs.lstatSync(filename).isFile()) {
                this.route = lodash_1.join(parts, '/');
                break;
            }
            else {
                this.method = parts.pop();
            }
        }
    }
    execute(registry, args = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerName = 'Controller' + lodash_1.join(lodash_1.map(lodash_1.split(this.route, '/'), (value) => (lodash_1.capitalize(value))), '');
            // let controller = registry.get(controllerName)
            // if (!registry.has(controllerName)) {
            let controller = require('controller/' + this.route);
            controller = controller[controllerName];
            controller = new controller(registry);
            // }
            return yield controller[this.method](args);
        });
    }
}
exports.default = Action;
//# sourceMappingURL=action.js.map