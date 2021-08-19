"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATIC_BASE_URL = exports.BASE_URL = exports.Model = exports.Controller = exports.PORT = exports.HTTP_SERVER = exports.DIR_STORAGE = exports.config = exports.DIR_LANGUAGE = exports.DIR_STYLESHEET = exports.DIR_TEMPLATE = exports.DIR_CATALOG = exports.DIR_STATIC = exports.DIR_IMAGE = exports.DIR_ROOT = exports.DIR_APPLICATION = exports.NODE_ENV = exports.isDev = void 0;
const path = require("path");
const fs = require("fs");
const controller_1 = require("./engine/controller");
const model_1 = require("./engine/model");
const dotenv = require("dotenv");
const tsConfigPaths = require("tsconfig-paths");
const lodash_1 = require("lodash");
if (typeof process.env.NODE_ENV === 'undefined') {
    process.env.NODE_ENV = 'development';
}
if (lodash_1.includes(process.argv, "start")) {
    process.env.NODE_ENV = 'production';
}
exports.isDev = process.env.NODE_ENV === 'development';
exports.NODE_ENV = process.env.NODE_ENV;
exports.DIR_APPLICATION = path.resolve(__dirname, '');
exports.DIR_ROOT = path.resolve('');
tsConfigPaths.register({
    baseUrl: exports.DIR_ROOT,
    paths: {
        "*": [
            "*",
            "system/*",
            "src/*",
            "system/helper/*"
        ]
    }
});
exports.DIR_IMAGE = path.resolve('', './static/images/');
exports.DIR_STATIC = path.resolve('', './static/');
exports.DIR_CATALOG = fs.existsSync(exports.DIR_ROOT + '/lib') ?
    exports.DIR_ROOT + '/lib/' :
    exports.DIR_ROOT + '/src/';
let dirTemplate = '';
let dirStylesheet = '';
if (fs.existsSync(exports.DIR_CATALOG + '/view')) {
    dirTemplate = path.resolve(exports.DIR_CATALOG, './view');
    dirStylesheet = path.resolve(exports.DIR_CATALOG, './view/stylesheet/');
}
else {
    dirTemplate = path.resolve(exports.DIR_ROOT, './view');
    dirStylesheet = path.resolve(exports.DIR_ROOT, './view/stylesheet/');
}
exports.DIR_TEMPLATE = dirTemplate;
exports.DIR_STYLESHEET = dirStylesheet;
let dirLanguage = '';
if (fs.existsSync(exports.DIR_CATALOG + '/language')) {
    dirLanguage = path.resolve(exports.DIR_CATALOG, './language/');
}
else {
    dirLanguage = path.resolve(exports.DIR_ROOT, './language/');
}
exports.DIR_LANGUAGE = dirLanguage;
if (fs.existsSync(exports.DIR_ROOT + '/' + '.env.' + process.env.NODE_ENV)) {
    dotenv.config({ path: exports.DIR_ROOT + '/' + '.env.' + process.env.NODE_ENV });
}
else if (fs.existsSync(exports.DIR_ROOT + '/.env')) {
    dotenv.config({ path: exports.DIR_ROOT + '/.env' });
}
//@ts-ignore
let rapinConfig = {};
if (fs.existsSync(exports.DIR_ROOT + '/config.js')) {
    rapinConfig = require(exports.DIR_ROOT + '/config.js');
}
else if (fs.existsSync(exports.DIR_ROOT + '/config.ts')) {
    rapinConfig = require(exports.DIR_ROOT + '/config.ts');
}
else if (fs.existsSync(exports.DIR_ROOT + '/rapin.config.js')) {
    rapinConfig = require(exports.DIR_ROOT + '/rapin.config.js');
}
else if (fs.existsSync(exports.DIR_ROOT + '/rapin.config.ts')) {
    rapinConfig = require(exports.DIR_ROOT + '/rapin.config.ts');
}
const rapinConfigDefault = require("../rapin.config");
exports.config = Object.assign(Object.assign({}, rapinConfigDefault), rapinConfig);
const { storage } = rapinConfig;
exports.DIR_STORAGE = storage || path.resolve('', './storage/');
if (!fs.existsSync(exports.DIR_STORAGE)) {
    fs.mkdirSync(exports.DIR_STORAGE);
}
exports.HTTP_SERVER = process.env.HTTP_SERVER || 'http://localhost/';
exports.PORT = process.env.PORT || '3000';
exports.Controller = controller_1.Controller;
exports.Model = model_1.Model;
exports.BASE_URL = process.env.BASE_URL || '/';
exports.STATIC_BASE_URL = process.env.BASE_URL || '';
//# sourceMappingURL=common.js.map