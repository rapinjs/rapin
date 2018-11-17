"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    constructor() {
        this.output = '';
        this.status = 200;
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
}
exports.default = Response;
//# sourceMappingURL=response.js.map