"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Request {
    constructor(req) {
        this.req = req;
        this.postData = req.body;
        this.getData = req.query;
        this.paramsData = req.params;
    }
    get headers() {
        return this.req.req.headers;
    }
    get post() {
        return this.postData;
    }
    set post(value) {
        this.postData = value;
    }
    get get() {
        return this.getData;
    }
    set get(value) {
        this.getData = value;
    }
    get cookie() {
        return this.req.cookie;
    }
    get files() {
        return this.req.files;
    }
    get params() {
        return this.paramsData;
    }
    set params(value) {
        this.paramsData = value;
    }
    get session() {
        return this.req.session;
    }
}
exports.default = Request;
//# sourceMappingURL=request.js.map