import * as tsConfigPaths from 'tsconfig-paths'
const tsConfig = require("./tsconfig.json");

const baseUrl = './'

tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths
})
