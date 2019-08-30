"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class File {
    constructor() {
    }
    upload(file, path) {
        if (typeof file.then === 'function') {
            file.then(({ createReadStream }) => {
                const reader = createReadStream();
                const stream = fs.createWriteStream(path);
                reader.pipe(stream);
            });
        }
        else {
            const reader = fs.createReadStream(file.path);
            const stream = fs.createWriteStream(path);
            reader.pipe(stream);
        }
    }
}
exports.default = File;
//# sourceMappingURL=file.js.map