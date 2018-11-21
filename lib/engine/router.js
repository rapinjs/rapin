"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_cookie_1 = require("koa-cookie");
const Koa = require("koa");
const serve = require("koa-static");
const lodash_1 = require("lodash");
const common_1 = require("../helper/common");
const request_1 = require("../helper/request");
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
const mail_1 = require("../library/mail");
const user_1 = require("../library/user");
const inky_1 = require("../library/inky");
const style_1 = require("../library/style");
const action_1 = require("./action");
const loader_1 = require("./loader");
const registry_1 = require("./registry");
const event_1 = require("../helper/event");
const file_1 = require("../library/file");
const KoaRouter = require("koa-router");
const mount = require("koa-mount");
const koaBody = require("koa-body");
const session = require("koa-session");
const axios_1 = require("axios");
const plugin_1 = require("../helper/plugin");
class Router {
    constructor() {
        this.app = new Koa();
        this.app.use(koaBody({ multipart: true }));
        this.app.use(koa_cookie_1.default());
        this.app.use(session(this.app));
        this.app.use(serve(common_2.DIR_STATIC));
        this.app.use(mount(common_2.STATIC_BASE_URL + '/static', serve(common_2.DIR_STATIC)));
        this.app.use(mount(common_2.STATIC_BASE_URL + '/stylesheet', serve(common_2.DIR_STYLESHEET)));
        new decorator_1.default(this.registry);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            plugin_1.pluginEvent('beforeInitRegistry', { app: this.app });
            yield this.initRegistry();
            plugin_1.pluginEvent('afterInitRegistry', { app: this.app, registry: this.registry });
            const router = new KoaRouter();
            plugin_1.pluginEvent('onBeforeInitRouter', { app: this.app, registry: this.registry });
            this.app.use((ctx, next) => this.preRequest(ctx, next));
            lodash_1.forEach(request_1.routes(this.registry), (route) => {
                if (route.type === 'GET') {
                    router.get(route.path, (ctx, next) => this.postRequest(ctx, next, route));
                }
                if (route.type === 'POST') {
                    router.post(route.path, (ctx, next) => this.postRequest(ctx, next, route));
                }
                if (route.type === 'PUT') {
                    router.put(route.path, (ctx, next) => this.postRequest(ctx, next, route));
                }
            });
            this.app.use(router.routes());
            this.app.use(router.allowedMethods());
            this.app.use(mount(common_2.BASE_URL, router.middleware()));
            plugin_1.pluginEvent('onAfterInitRouter', { app: this.app, registry: this.registry });
            this.app.listen(common_2.PORT, () => {
                // tslint:disable-next-line:no-console
                console.log('Example app listening on port ' + common_2.PORT + '!');
            });
        });
    }
    initRegistry() {
        return __awaiter(this, void 0, void 0, function* () {
            this.registry = new registry_1.default();
            common_1.initHelpers(this.registry);
            this.registry.set('language', new language_1.default());
            this.registry.set('file', new file_1.default());
            this.registry.set('crypto', new crypto_1.default());
            this.registry.set('config', new config_1.default());
            this.registry.set('image', new image_1.default());
            this.registry.set('pagination', new pagination_1.default());
            this.registry.set('inky', new inky_1.default());
            this.registry.set('axios', axios_1.default);
            this.registry.set('mail', new mail_1.default());
            this.registry.set('style', new style_1.default());
            this.registry.set('log', new log_1.default());
            this.registry.set('load', new loader_1.default(this.registry));
            try {
                this.registry.set('db', new db_1.default());
                yield this.registry.get('db').init();
            }
            catch (e) {
                this.handleError(e);
            }
        });
    }
    preRequest(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            this.registry.set('error', new error_1.default());
            this.registry.set('request', new request_2.default(Object.assign({}, ctx.request, { query: ctx.query, cookie: ctx.cookie, session: ctx.session, params: {} })));
            this.registry.set('user', new user_1.default(this.registry));
            this.registry.set('cache', new cache_1.default());
            yield next();
        });
    }
    postRequest(ctx, next, route) {
        return __awaiter(this, void 0, void 0, function* () {
            this.registry.set('request', new request_2.default(Object.assign({}, ctx.request, { query: ctx.query, cookie: ctx.cookie, session: ctx.session, params: ctx.params })));
            this.registry.set('response', new response_1.default(ctx));
            plugin_1.pluginEvent('onRequest', { app: this.app, registry: this.registry, ctx, route });
            const token = !lodash_1.isUndefined(ctx.request.headers.token) ? ctx.request.headers.token : false;
            let verify = false;
            if (token) {
                verify = yield this.registry.get('user').verify(token);
            }
            if ((route.auth && token && verify) || !route.auth) {
                try {
                    event_1.triggerEvent('controller/' + route.action, 'before', { data: {} });
                    const action = new action_1.default(route.action);
                    const output = yield action.execute(this.registry);
                    event_1.triggerEvent('controller/' + route.action, 'after', { data: {}, output });
                }
                catch (e) {
                    this.handleError(e);
                }
                const error = this.registry.get('error').get();
                if (error) {
                    ctx.status = 400;
                    ctx.body = error;
                }
                else if (ctx.response.status !== 302) {
                    ctx.status = this.registry.get('response').getStatus();
                    ctx.body = this.registry.get('response').getOutput();
                }
            }
            else {
                ctx.status = 401;
                ctx.body = 'Unauthorized';
            }
        });
    }
    handleError(err) {
        plugin_1.pluginEvent('onError', { app: this.app, err, registry: this.registry });
        // tslint:disable-next-line:no-console
        console.log(err);
        // this.registry.get('log').write(err.message + err.stack)
        // this.registry.get('response').setStatus(500)
        // this.registry.get('response').setOutput({ status: 500, message: err.message })
    }
}
exports.default = Router;
//# sourceMappingURL=router.js.map