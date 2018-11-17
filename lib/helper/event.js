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
            action: descriptor.value
        });
    };
};
exports.triggerEvent = (action, type, args) => {
    console.log(action);
    console.log(type);
    console.log(args);
};
exports.Trigger = (action, type) => {
    return (target, propertyKey, descriptor) => {
        this.triggerEvent(action, type);
    };
};
//# sourceMappingURL=event.js.map