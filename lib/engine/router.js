"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const lodash_1 = require("lodash");
const common_1 = require("../helper/common");
const request_1 = require("../helper/request");
const fileUpload = require("express-fileupload");
const common_2 = require("../common");
const cache_1 = require("../library/cache");
const config_1 = require("../library/config");
const crypto_1 = require("../library/crypto");
const db_1 = require("../library/db");
const decorator_1 = require("../library/decorator");
const error_1 = require("../library/error");
const image_1 = require("../library/image");
const language_1 = require("../library/language");
const log_1 = require("../library/log");
const request_2 = require("../library/request");
const response_1 = require("../library/response");
const pagination_1 = require("../library/pagination");
const user_1 = require("../library/user");
const action_1 = require("./action");
const loader_1 = require("./loader");
const registry_1 = require("./registry");
const event_1 = require("../helper/event");
class Router {
    constructor() {
        this.app = express();
        this.app.use(cors({
            allowedHeaders: 'content-type,token',
            origin: common_2.CORS ? '*' : false,
        }));
        this.app.use(express.json());
        this.app.use(fileUpload());
        this.app.use(cookieParser());
        this.app.use(common_2.BASE_URL + 'static', express.static(common_2.DIR_STATIC));
        new decorator_1.default(this.registry);
    }
    start() {
        this.initRegistry();
        const router = express.Router();
        router.use((req, res, next) => this.preRequest(req, res, next)).bind(this);
        lodash_1.forEach(request_1.routes(this.registry), (route) => {
            if (route.type === 'GET') {
                router.get(route.path, (req, res) => this.postRequest(req, res, route)).bind(this);
            }
            if (route.type === 'POST') {
                router.post(route.path, (req, res) => this.postRequest(req, res, route)).bind(this);
            }
            if (route.type === 'PUT') {
                router.put(route.path, (req, res) => this.postRequest(req, res, route)).bind(this);
            }
        });
        // console.log(router)
        this.app.use(common_2.BASE_URL, router);
        this.app.listen(common_2.PORT, () => {
            console.log('Example app listening on port ' + common_2.PORT + '!');
        });
    }
    initRegistry() {
        this.registry = new registry_1.default();
        common_1.initHelpers(this.registry);
        this.registry.set('language', new language_1.default());
        this.registry.set('crypto', new crypto_1.default());
        this.registry.set('config', new config_1.default());
        this.registry.set('image', new image_1.default());
        this.registry.set('pagination', new pagination_1.default());
        this.registry.get('config').load('default');
        const defaultConfig = this.registry.get('config').get('defaultConfig');
        const { dbEngine, dbHostname, dbUsername, dbPassword, dbDatabase, dbPort, errorFilename, } = defaultConfig;
        this.registry.set('log', new log_1.default(errorFilename));
        this.registry.set('load', new loader_1.default(this.registry));
        this.registry.set('log', new log_1.default(errorFilename));
        try {
            this.registry.set('db', new db_1.default(dbEngine, dbHostname, dbUsername, dbPassword, dbDatabase, dbPort));
        }
        catch (e) {
            this.handleError(e);
        }
    }
    preRequest(req, res, next) {
        this.registry.set('error', new error_1.default());
        this.registry.set('request', new request_2.default(req));
        this.registry.set('response', new response_1.default());
        this.registry.set('user', new user_1.default(this.registry));
        const defaultConfig = this.registry.get('config').get('defaultConfig');
        const { cacheEngine, cacheExpire } = defaultConfig;
        this.registry.set('cache', new cache_1.default(cacheEngine, cacheExpire));
        next();
    }
    postRequest(req, res, route) {
        const token = !lodash_1.isUndefined(req.headers.token) ? req.headers.token : false;
        if ((route.auth && token && this.registry.get('user').verify(token)) || !route.auth) {
            try {
                event_1.triggerEvent('controller/' + route.action, 'before', { data: {} });
                const action = new action_1.default(route.action);
                const output = action.execute(this.registry);
                event_1.triggerEvent('controller/' + route.action, 'after', { data: {}, output });
            }
            catch (e) {
                this.handleError(e);
            }
            const error = this.registry.get('error').get();
            if (error) {
                res.status(400).send(error);
            }
            else {
                res.status(this.registry.get('response').getStatus()).send(this.registry.get('response').getOutput());
            }
        }
        else {
            res.status(401).send('Unauthorized');
        }
    }
    handleError(err) {
        console.log(err);
        // this.registry.get('log').write(err.message + err.stack)
        // this.registry.get('response').setStatus(500)
        // this.registry.get('response').setOutput({ status: 500, message: err.message })
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map