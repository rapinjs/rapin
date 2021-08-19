"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRegistry = exports.initHelpers = void 0;
const registry_1 = require("../engine/registry");
let registry;
const initHelpers = (registryOption) => {
    registry = new registry_1.default(registryOption.getAll());
};
exports.initHelpers = initHelpers;
const initRegistry = () => {
    return registry;
};
exports.initRegistry = initRegistry;
//# sourceMappingURL=common.js.map