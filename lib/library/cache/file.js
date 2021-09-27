"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const glob = require("glob");
const lodash_1 = require("lodash");
const moment = require("moment");
const common_1 = require("../../common");
if (!fs.existsSync(common_1.DIR_STORAGE + '/cache')) {
    fs.mkdirSync(common_1.DIR_STORAGE + '/cache');
}
class File {
    constructor(expire = 3600) {
        this.expire = expire;
        const files = glob.sync(common_1.DIR_STORAGE + '/cache/cache.*');
        if (files) {
            (0, lodash_1.forEach)(files, (file) => {
                const time = (0, lodash_1.last)(file.split('.'));
                if ((0, lodash_1.toNumber)(time) < moment().unix()) {
                    if (fs.existsSync(file)) {
                        fs.unlinkSync(file);
                    }
                }
            });
        }
    }
    get(key) {
        const files = glob.sync(common_1.DIR_STORAGE + '/cache/cache.' + (0, lodash_1.replace)(key, '/[^A-Z0-9\._-]/î', '') + '.*');
        if (!(0, lodash_1.isEmpty)(files)) {
            const content = fs.readFileSync(files[0]);
            return JSON.parse((0, lodash_1.toString)(content));
        }
        return false;
    }
    set(key, value) {
        this.delete(key);
        const file = common_1.DIR_STORAGE + '/cache/cache.' + (0, lodash_1.replace)(key, '/[^A-Z0-9\._-]/î', '') + '.' + (moment().unix() + this.expire);
        fs.writeFileSync(file, JSON.stringify(value));
    }
    delete(key) {
        const files = glob.sync(common_1.DIR_STORAGE + '/cache/cache.' + (0, lodash_1.replace)(key, '/[^A-Z0-9\._-]/î', '') + '.*');
        if (!(0, lodash_1.isEmpty)(files)) {
            (0, lodash_1.forEach)(files, (file) => {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            });
        }
    }
}
exports.default = File;
//# sourceMappingURL=file.js.map