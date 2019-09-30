"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const nPath = require("path");
const common_1 = require("../common");
class File {
    constructor() {
    }
    upload(file, path) {
        return __awaiter(this, void 0, void 0, function* () {
            let image = path + '/' +
                Math.random()
                    .toString(36)
                    .substring(2, 15);
            let reader;
            if (typeof file.then === 'function') {
                const { createReadStream, filename } = yield file;
                const ext = nPath.extname(filename);
                image += ext;
                reader = createReadStream();
            }
            else {
                reader = fs.createReadStream(file.path);
                const ext = nPath.extname(file.name);
                image += ext;
            }
            const stream = fs.createWriteStream(common_1.DIR_IMAGE + '/' + image);
            reader.pipe(stream);
            const end = new Promise(function (resolve, reject) {
                stream.on('finish', resolve);
                reader.on('error', reject);
            });
            yield end;
            return image;
        });
    }
}
exports.default = File;
//# sourceMappingURL=file.js.map