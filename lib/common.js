"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATIC_BASE_URL = exports.BASE_URL = exports.Model = exports.Controller = exports.PORT = exports.HTTP_SERVER = exports.DIR_STYLESHEET = exports.DIR_STATIC = exports.DIR_STORAGE = exports.DIR_LANGUAGE = exports.DIR_IMAGE = exports.DIR_APPLICATION = exports.config = exports.NODE_ENV = exports.isDev = void 0;
const path = require("path");
const fs = require("fs");
const controller_1 = require("./engine/controller");
const model_1 = require("./engine/model");
const dotenv = require("dotenv");
exports.isDev = process.env.NODE_ENV === 'development';
exports.NODE_ENV = process.env.NODE_ENV;
dotenv.config({ path: '.env.' + process.env.NODE_ENV });
//@ts-ignore
const rapinConfig = require("config.js");
const rapinConfigDefault = require("../rapin.config");
const { storage } = rapinConfig;
exports.config = Object.assign(Object.assign({}, rapinConfigDefault), rapinConfig);
exports.DIR_APPLICATION = path.resolve(__dirname, '');
exports.DIR_IMAGE = path.resolve('', './static/images/');
exports.DIR_LANGUAGE = path.resolve('', './language/');
exports.DIR_STORAGE = storage || path.resolve('', './storage/');
exports.DIR_STATIC = path.resolve('', './static/');
exports.DIR_STYLESHEET = path.resolve('', './view/stylesheet/');
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