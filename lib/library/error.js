"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class Error {
    constructor() {
        this.error = [];
        this.description = {
            unauthorized: {
                code: 401,
                message: 'Unauthorized'
            }
        };
    }
    set(error, system_message = '') {
        this.error.push({
            error,
            code: !lodash_1.isEmpty(this.description[error])
                ? this.description[error].code
                : 404,
            message: !lodash_1.isEmpty(this.description[error])
                ? this.description[error].message
                : '',
            system_message
        });
    }
    get() {
        let result = {};
        if (!lodash_1.isEmpty(this.error)) {
            result = this.error[0];
        }
        return !lodash_1.isEmpty(result) ? result : false;
    }
}
exports.default = Error;
//# sourceMappingURL=error.js.map