"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const common_1 = require("../common");
const axios_1 = require("axios");
const path = require("path");
const fs = require("fs");
const wait = require("wait-for-stuff");
let Jimp = require('jimp');
class Image {
    constructor() {
        this.data = {};
    }
    link(image, width = false, height = false) {
        if (!lodash_1.isEmpty(image)) {
            const originalImage = common_1.DIR_IMAGE + '/' + image;
            let convertImage = path.resolve(common_1.DIR_IMAGE, 'cache/' + image);
            if (width && height) {
                convertImage = path.resolve(common_1.DIR_IMAGE, 'cache/' + width + 'x' + height + '/' + image);
            }
            if (!fs.existsSync(convertImage)) {
                const content = wait.for.promise(Jimp.read(originalImage));
                if (width && height) {
                    content.resize(width, height).quality(90).write(convertImage);
                }
                else {
                    content.quality(90).write(convertImage);
                }
            }
            const ext = path.extname(originalImage);
            if (width && height) {
                return common_1.HTTP_SERVER + 'static/images/cache/' + width + 'x' + height + '/' + path.dirname(image) + '/' + path.basename(image, ext) + ext;
            }
            else {
                return common_1.HTTP_SERVER + 'static/images/cache/' + path.dirname(image) + '/' + path.basename(image, ext) + ext;
            }
        }
        return '';
    }
    googleMap(location, image_path, callback) {
        axios_1.default.get('https://maps.googleapis.com/maps/api/streetview/metadata?size=2048x2048&location=' + location + '&key=AIzaSyAzyY8oOq2pvypqzexAH2KchgAeSdqOZSY').then((response) => {
            if (response.data.status === 'OK') {
                const responseImage = axios_1.default.get('https://maps.googleapis.com/maps/api/streetview?size=2048x2048&location=' + location + '&key=AIzaSyAzyY8oOq2pvypqzexAH2KchgAeSdqOZSY', { responseType: 'stream' }).then((responseImage) => {
                    responseImage.data.pipe(fs.createWriteStream(image_path)).on('finish', () => {
                        callback();
                    });
                }).catch(error => {
                    callback(true);
                    // console.log(error)
                });
            }
        }).catch((error) => {
            callback(true);
            // console.log(error)
        });
    }
    download(uri, image_path) {
        try {
            const response = wait.for.promise(axios_1.default.get(uri, { responseType: "stream" }));
            response.data.pipe(fs.createWriteStream(image_path));
        }
        catch (e) {
            return false;
        }
        return true;
    }
}
exports.default = Image;
//# sourceMappingURL=image.js.map