"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const lodash_1 = require("lodash");
class Action {
    constructor(route) {
        const parts = lodash_1.split(lodash_1.replace(route, /[^a-zA-Z0-9_\/]/, ''), '/');
        while (parts) {
            const filename = 'src/controller/' + lodash_1.join(parts, '/') + '.ts';
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
        const controllerName = 'Controller' + lodash_1.join(lodash_1.map(lodash_1.split(this.route, '/'), (value) => (lodash_1.capitalize(value))), '');
        let controller = registry.get(controllerName);
        if (!registry.has(controllerName)) {
            controller = require('controller/' + this.route);
            controller = controller[controllerName];
            controller = new controller(registry);
        }
        return controller[this.method](args);
    }
}
exports.default = Action;
//# sourceMappingURL=action.js.map