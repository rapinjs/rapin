"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const moment = require("moment");
const rapin_config_1 = require("rapin-config");
class Log {
    constructor() {
        const { filename } = rapin_config_1.log;
        this.filename = 'system/storage/logs/' + filename;
    }
    write(message) {
        fs.appendFileSync(this.filename, moment().format('Y-MM-DD HH:mm:ss') + ' - ' + message + '\r\n');
    }
}
exports.default = Log;
//# sourceMappingURL=log.js.map