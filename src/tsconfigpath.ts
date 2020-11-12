import * as tsConfigPaths from 'tsconfig-paths'
const tsConfig = require("../tsconfig.json");

tsConfigPaths.register({
  baseUrl: './lib',
  paths: tsConfig.compilerOptions.paths
})
