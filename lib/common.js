"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const controller_1 = require("./engine/controller");
const model_1 = require("./engine/model");
const dotenv_1 = require("dotenv");
const lodash_1 = require("lodash");
const rapin_config_1 = require("rapin-config");
exports.DIR_APPLICATION = path.resolve(__dirname, '../');
exports.DIR_IMAGE = path.resolve(__dirname, '../static/images/');
exports.DIR_STORAGE = rapin_config_1.storage || path.resolve(__dirname, './storage/');
exports.DIR_STATIC = path.resolve(__dirname, '../static/');
exports.DIR_STYLESHEET = path.resolve(__dirname, '../src/view/stylesheet/');
exports.NODE_ENV = lodash_1.includes(process.argv, 'start') ? 'production' : 'development';
dotenv_1.config({ path: '.env.' + exports.NODE_ENV });
if (!fs.existsSync(exports.DIR_STORAGE)) {
    fs.mkdirSync(exports.DIR_STORAGE);
}
exports.HTTP_SERVER = process.env.HTTP_SERVER || 'http://localhost/';
exports.PORT = process.env.PORT || '3000';
exports.Controller = controller_1.Controller;
exports.Model = model_1.Model;
exports.CORS = process.env.CORS === 'true' || false;
exports.BASE_URL = process.env.BASE_URL || '/';
//# sourceMappingURL=common.js.map