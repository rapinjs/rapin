"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initRegistry = exports.initHelpers = void 0;
let registry;
exports.initHelpers = (registryOption) => {
    registry = registryOption;
};
exports.initRegistry = () => {
    return registry;
};
//# sourceMappingURL=common.js.map