"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./tsconfigpath");
require("./common");
const router_1 = require("./engine/router");
const plugin_1 = require("./helper/plugin");
exports.start = () => {
    plugin_1.initPlugins();
    const router = new router_1.default();
    router.start();
};
//# sourceMappingURL=startup.js.map