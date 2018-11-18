"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const lodash_1 = require("lodash");
let registry = common_1.initRegistry();
const listings = [];
exports.Listing = (action, type) => {
    return (target, propertyKey, descriptor) => {
        if (lodash_1.isUndefined(listings[action])) {
            listings[action] = [];
        }
        listings[action].push({
            action: descriptor.value,
            type
        });
    };
};
exports.triggerEvent = (action, type, args) => {
    const result = lodash_1.filter(listings[action], { type });
    lodash_1.each(result, (value) => {
        value.action(args);
    });
};
exports.Trigger = (action, type) => {
    return (target, propertyKey, descriptor) => {
        this.triggerEvent(action, type);
    };
};
//# sourceMappingURL=event.js.map