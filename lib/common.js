"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const controller_1 = require("./engine/controller");
const model_1 = require("./engine/model");
const dotenv = require("dotenv");
const lodash_1 = require("lodash");
exports.NODE_ENV = lodash_1.includes(process.argv, 'start')
    ? 'production'
    : 'development';
dotenv.config({ path: '.env.' + exports.NODE_ENV });
const rapinConfig = require("rapin.config");
const rapinConfigDefault = require("../rapin.config");
const { storage } = rapinConfig;
exports.config = Object.assign(Object.assign({}, rapinConfigDefault), rapinConfig);
exports.DIR_APPLICATION = path.resolve(__dirname, '');
exports.DIR_IMAGE = path.resolve('', './static/images/');
exports.DIR_STORAGE = storage || path.resolve('', './storage/');
exports.DIR_STATIC = path.resolve('', './static/');
exports.DIR_STYLESHEET = path.resolve('', './src/view/stylesheet/');
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