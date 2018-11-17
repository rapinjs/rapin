"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsConfigPaths = require("tsconfig-paths");
const tsConfig = require("../tsconfig.json");
const baseUrl = '.';
tsConfigPaths.register({
    baseUrl,
    paths: tsConfig.compilerOptions.paths
});
//# sourceMappingURL=tsconfigpath.js.map