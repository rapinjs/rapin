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
exports.pluginEvent = exports.initPlugins = void 0;
const common_1 = require("../common");
const lodash_1 = require("lodash");
const logger_1 = require("../logger");
const listings = [];
const initPlugins = () => {
    lodash_1.each(common_1.config.plugins, value => {
        let logger = new logger_1.Logger(`Init plugin - ${value}`);
        const plugin = require(value);
        listings.push({
            name: value,
            plugin: new plugin.default()
        });
        logger.end();
    });
};
exports.initPlugins = initPlugins;
const pluginEvent = (action, args) => __awaiter(void 0, void 0, void 0, function* () {
    for (const value of listings) {
        if (!lodash_1.isUndefined(value.plugin[action])) {
            let logger = new logger_1.Logger(`Event plugin(${action}) - ${value.name}`);
            const output = yield value.plugin[action](args);
            if (!lodash_1.isEmpty(output)) {
                return output;
            }
            logger.end();
        }
    }
    return false;
});
exports.pluginEvent = pluginEvent;
//# sourceMappingURL=plugin.js.map