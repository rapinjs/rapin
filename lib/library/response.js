"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor(ctx) {
        this.output = '';
        this.status = 200;
        this.ctx = ctx;
    }
    set(field, val) {
        this.ctx.set(field, val);
    }
    getOutput() {
        return this.output;
    }
    setOutput(output) {
        this.output = output;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    redirect(url) {
        this.ctx.redirect(url);
    }
}
exports.default = Response;
//# sourceMappingURL=response.js.map