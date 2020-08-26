"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRegistry = exports.initHelpers = void 0;
const registry_1 = require("../engine/registry");
let registry;
exports.initHelpers = (registryOption) => {
    registry = new registry_1.default(registryOption.getAll());
};
exports.initRegistry = () => {
    return registry;
};
//# sourceMappingURL=common.js.map