"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const template_1 = require("../library/template");
const action_1 = require("./action");
const event_1 = require("../helper/event");
class Loader {
    constructor(registry) {
        this.registry = registry;
    }
    controller(route, data) {
        event_1.triggerEvent('controller/' + route, 'before', { data });
        const action = new action_1.default(route);
        const output = action.execute(this.registry, data);
        event_1.triggerEvent('controller/' + route, 'after', { data, output });
    }
    model(route) {
        route = lodash_1.replace(route, /[^a-zA-Z0-9_\/]/, '');
        if (!this.registry.has('model_' + lodash_1.replace(route, '/', '_'))) {
            let model = require('model/' + route);
            const modelName = 'Model' + lodash_1.join(lodash_1.map(lodash_1.split(route, '/'), (value) => (lodash_1.capitalize(value))), '');
            model = model[modelName];
            this.registry.set('model_' + lodash_1.replace(route, '/', '_'), new model(this.registry));
        }
    }
    view(route, data) {
        route = lodash_1.replace(route, /[^a-zA-Z0-9_\/]/, '');
        const { templateEngine } = this.registry.get('config').get('defaultConfig');
        const template = new template_1.default(templateEngine);
        lodash_1.each(data, (value, key) => {
            template.set(key, value);
        });
        const output = template.render(route);
        return output;
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