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
const lodash_1 = require("lodash");
const template_1 = require("../library/template");
const action_1 = require("./action");
const event_1 = require("../helper/event");
const common_1 = require("../common");
class Loader {
    constructor(registry) {
        this.registry = registry;
    }
    controller(route, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, event_1.triggerEvent)('controller/' + route, 'before', { data, route });
            const action = new action_1.default(route);
            const output = yield action.execute(this.registry, data);
            yield (0, event_1.triggerEvent)('controller/' + route, 'after', { data, route, output });
            return output;
        });
    }
    model(route) {
        route = (0, lodash_1.replace)(route, /[^a-zA-Z0-9_\/]/, '');
        if (!this.registry.has('model_' + (0, lodash_1.replace)(route, '/', '_'))) {
            let model = require(common_1.DIR_CATALOG + '/model/' + route);
            const modelName = 'Model' + (0, lodash_1.join)((0, lodash_1.map)((0, lodash_1.split)(route, '/'), (value) => ((0, lodash_1.capitalize)(value))), '');
            model = model[modelName];
            this.registry.set('model_' + (0, lodash_1.replace)(route, '/', '_'), new model(this.registry));
        }
    }
    view(route, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            route = (0, lodash_1.replace)(route, /[^a-zA-Z0-9_\/]/, '');
            const template = new template_1.default();
            (0, lodash_1.each)(data, (value, key) => {
                template.set(key, value);
            });
            yield (0, event_1.triggerEvent)('view/' + route, 'before', { route, data });
            const output = yield template.render(route);
            yield (0, event_1.triggerEvent)('view/' + route, 'after', { route, data, output });
            return output;
        });
    }
    config(route) {
        this.registry.get('config').load(route);
    }
    language(route) {
        return this.registry.get('language').load(route);
    }
}
exports.default = Loader;
//# sourceMappingURL=loader.js.map