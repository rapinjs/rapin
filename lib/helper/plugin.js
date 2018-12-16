"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const common_2 = require("../common");
const lodash_1 = require("lodash");
const util_1 = require("util");
let registry = common_1.initRegistry();
const listings = [];
exports.initPlugins = () => {
    lodash_1.each(common_2.config.plugins, value => {
        const plugin = require(value);
        listings.push(new plugin["default"]());
    });
};
exports.pluginEvent = (action, args) => {
    lodash_1.each(listings, value => {
        if (!util_1.isUndefined(value[action])) {
            value[action](args);
        }
    });
};
//# sourceMappingURL=plugin.js.map