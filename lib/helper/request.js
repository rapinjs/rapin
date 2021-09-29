"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = exports.validate = exports.required = exports.PUT = exports.DELETE = exports.POST = exports.GET = void 0;
const common_1 = require("../helper/common");
const lodash_1 = require("lodash");
const glob = require("glob");
const path = require("path");
const common_2 = require("../common");
const results = [];
let controllerPath = '';
const GET = (path, type = 'json') => {
    return (target, propertyKey, descriptor) => {
        results.push({
            path,
            type: 'GET',
            contentType: type,
            auth: false,
            action: controllerPath + '/' + propertyKey,
        });
    };
};
exports.GET = GET;
const POST = (path, type = 'json') => {
    return (target, propertyKey, descriptor) => {
        results.push({
            path,
            type: 'POST',
            contentType: type,
            auth: false,
            action: controllerPath + '/' + propertyKey,
        });
    };
};
exports.POST = POST;
const DELETE = (path, type = 'json') => {
    return (target, propertyKey, descriptor) => {
        results.push({
            path,
            type: 'DELETE',
            contentType: type,
            auth: false,
            action: controllerPath + '/' + propertyKey,
        });
    };
};
exports.DELETE = DELETE;
const PUT = (path, type = 'json') => {
    return (target, propertyKey, descriptor) => {
        results.push({
            path,
            type: 'PUT',
            contentType: type,
            auth: false,
            action: controllerPath + '/' + propertyKey,
        });
    };
};
exports.PUT = PUT;
const required = (list) => {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let registry = (0, common_1.initRegistry)();
            for (const key in list) {
                if ((0, lodash_1.isUndefined)(registry.get('request').post[list[key]])) {
                    registry.get('error').set('missing_' + list[key]);
                }
            }
            if (!registry.get('error').get()) {
                return originalMethod.apply(this, args);
            }
        };
    };
};
exports.required = required;
const validate = (action) => {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                let registry = (0, common_1.initRegistry)();
                const error = yield registry.get('load').controller(action);
                if (!error) {
                    return originalMethod.apply(this, args);
                }
                else {
                    registry.get('error').set(error);
                }
            });
        };
    };
};
exports.validate = validate;
const routes = (registryOption) => {
    const registry = registryOption;
    const controllers = glob.sync(common_2.DIR_CATALOG + '/controller/**/*.+(js|ts)');
    for (const value of controllers) {
        controllerPath = path.resolve(value);
        controllerPath = (0, lodash_1.replace)(controllerPath, path.resolve(common_2.DIR_CATALOG + '/controller/'), '');
        controllerPath = (0, lodash_1.replace)(controllerPath, '.js', '');
        controllerPath = (0, lodash_1.replace)(controllerPath, '.ts', '');
        let controller = require('controller' + controllerPath);
        const controllerName = 'Controller' + (0, lodash_1.join)((0, lodash_1.map)((0, lodash_1.split)(controllerPath, /[\\\/]/), (value) => ((0, lodash_1.capitalize)(value))), '');
        controller = controller[controllerName];
        new controller(registry);
        // registry.set(controllerName, new controller(registry))
    }
    return results;
};
exports.routes = routes;
//# sourceMappingURL=request.js.map