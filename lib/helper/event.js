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
exports.triggerEvent = (action, type, args) => __awaiter(void 0, void 0, void 0, function* () {
    const result = lodash_1.filter(listings[action], { type });
    for (const value of result) {
        yield value.action(args);
    }
});
exports.Trigger = (action, type) => {
    return (target, propertyKey, descriptor) => __awaiter(void 0, void 0, void 0, function* () {
        yield this.triggerEvent(action, type);
    });
};
//# sourceMappingURL=event.js.map