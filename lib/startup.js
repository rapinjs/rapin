#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./tsconfigpath");
const router_1 = require("./engine/router");
const plugin_1 = require("./helper/plugin");
plugin_1.initPlugins();
const router = new router_1.default();
router.start();
//# sourceMappingURL=startup.js.map