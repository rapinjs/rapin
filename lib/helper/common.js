"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
let registry;
exports.initHelpers = (registryOption) => {
    registry = registryOption;
};
exports.initRegistry = () => {
    return registry;
};
//# sourceMappingURL=common.js.map