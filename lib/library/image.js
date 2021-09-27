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
const lodash_1 = require("lodash");
const common_1 = require("../common");
const path = require("path");
const jimp = require("jimp");
const plugin_1 = require("../helper/plugin");
const fs = require("fs");
class Image {
    constructor() {
        this.data = {};
    }
    link(image, width = 0, height = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, lodash_1.isEmpty)(image)) {
                const originalImage = common_1.DIR_IMAGE + '/' + image;
                let convertImage = path.resolve(common_1.DIR_IMAGE, 'cache/' + image);
                if (width && height) {
                    convertImage = path.resolve(common_1.DIR_IMAGE, 'cache/' + width + 'x' + height + '/' + image);
                }
                if (!fs.existsSync(originalImage)) {
                    return '';
                }
                let ext = path.extname(originalImage);
                if (!fs.existsSync(convertImage) && ext !== '.svg') {
                    //@ts-ignore
                    const content = yield jimp.read(originalImage);
                    if (width !== 0 && height !== 0) {
                        if (ext === '.png') {
                            content.contain(width, height).quality(90).write(convertImage);
                        }
                        else {
                            content.background(0xFFFFFFFF).contain(width, height).quality(90).write(convertImage);
                        }
                    }
                    else {
                        content.quality(90).write(convertImage);
                    }
                    yield (0, plugin_1.pluginEvent)('onImageResize', { width, height, image, convertImage });
                }
                else if (ext === '.svg') {
                    convertImage = originalImage;
                }
                let imageUrl = common_1.HTTP_SERVER;
                const output = yield (0, plugin_1.pluginEvent)('onImageResizeAfter', { width, height, imageUrl, ext, image });
                if (output) {
                    ({ width, height, imageUrl, ext, image } = output);
                }
                if (ext === '.svg') {
                    return imageUrl + 'static/images/' + path.dirname(image) + '/' + path.basename(image, ext) + ext;
                }
                if (width !== 0 && height !== 0) {
                    return imageUrl + 'static/images/cache/' + width + 'x' + height + '/' + path.dirname(image) + '/' + path.basename(image, ext) + ext;
                }
                else {
                    return imageUrl + 'static/images/cache/' + path.dirname(image) + '/' + path.basename(image, ext) + ext;
                }
            }
            return '';
        });
    }
}
exports.default = Image;
//# sourceMappingURL=image.js.map