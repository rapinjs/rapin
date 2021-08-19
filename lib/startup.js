"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
require("./common");
const router_1 = require("./engine/router");
const plugin_1 = require("./helper/plugin");
const start = () => {
    plugin_1.initPlugins();
    const router = new router_1.default();
    router.start();
};
exports.start = start;
//# sourceMappingURL=startup.js.map