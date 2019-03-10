"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const common_1 = require("../common");
const path = require("path");
const Jimp = require("jimp");
const plugin_1 = require("../helper/plugin");
const fs = require("fs");
class Image {
    constructor() {
        this.data = {};
    }
    link(image, width = 0, height = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!lodash_1.isEmpty(image)) {
                const originalImage = common_1.DIR_IMAGE + '/' + image;
                let convertImage = path.resolve(common_1.DIR_IMAGE, 'cache/' + image);
                if (width && height) {
                    convertImage = path.resolve(common_1.DIR_IMAGE, 'cache/' + width + 'x' + height + '/' + image);
                }
                if (!fs.existsSync(originalImage)) {
                    return '';
                }
                if (!fs.existsSync(convertImage)) {
                    const content = yield Jimp.read(originalImage);
                    if (width !== 0 && height !== 0) {
                        content.resize(width, height).quality(90).write(convertImage);
                    }
                    else {
                        content.quality(90).write(convertImage);
                    }
                }
                let ext = path.extname(originalImage);
                let imageUrl = common_1.HTTP_SERVER;
                if (width !== 0 && height !== 0) {
                    const output = yield plugin_1.pluginEvent('onImageResizeAfter', { width, height, imageUrl, ext, image });
                    if (output) {
                        ({ width, height, imageUrl, ext, image } = output);
                    }
                    return imageUrl + 'static/images/cache/' + width + 'x' + height + '/' + path.dirname(image) + '/' + path.basename(image, ext) + ext;
                }
                else {
                    const output = yield plugin_1.pluginEvent('onImageResizeAfter', { width, height, imageUrl, ext, image });
                    if (output) {
                        ({ width, height, imageUrl, ext, image } = output);
                    }
                    return imageUrl + 'static/images/cache/' + path.dirname(image) + '/' + path.basename(image, ext) + ext;
                }
            }
            return '';
        });
    }
}
exports.default = Image;
//# sourceMappingURL=image.js.map