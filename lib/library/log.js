"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const moment = require("moment");
const common_1 = require("../common");
if (!fs.existsSync(common_1.DIR_STORAGE + "/logs")) {
    fs.mkdirSync(common_1.DIR_STORAGE + "/logs");
}
class Log {
    constructor() {
        const { filename } = common_1.config.log;
        this.filename = common_1.DIR_STORAGE + "/logs/" + filename;
    }
    write(message) {
        fs.appendFileSync(this.filename, moment().format("Y-MM-DD HH:mm:ss") + " - " + message + "\r\n");
    }
}
exports.default = Log;
//# sourceMappingURL=log.js.map