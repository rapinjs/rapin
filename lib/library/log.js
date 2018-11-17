"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const moment = require("moment");
class Log {
    constructor(filename) {
        this.filename = 'system/storage/logs/' + filename;
    }
    write(message) {
        fs.appendFileSync(this.filename, moment().format('Y-MM-DD HH:mm:ss') + ' - ' + message + '\r\n');
    }
}
exports.default = Log;
//# sourceMappingURL=log.js.map