"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Crypto {
    constructor() {
        this.data = {};
    }
    getHashPassword(password, salt = this.token(9)) {
        return this.sha512(password, salt);
    }
    sha512(password, salt) {
        const hash = crypto.createHmac('sha512', salt);
        hash.update(password);
        const value = hash.digest('hex');
        return {
            salt,
            hash: value,
        };
    }
    token(length) {
        return crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, length);
    }
}
exports.default = Crypto;
//# sourceMappingURL=crypto.js.map