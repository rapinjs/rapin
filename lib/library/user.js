"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const lodash_1 = require("lodash");
class User {
    constructor(registry) {
        this.registry = registry;
        this.db = this.registry.get('db');
        this.crypto = this.registry.get('crypto');
        this.token = '';
        this.userId = 0;
        this.firstName = '';
        this.middleName = '';
        this.lastName = '';
        this.email = '';
        this.telephone = '';
        this.image = '';
        this.roleType = '';
    }
    login(email, password) {
        const user = this.db.findOne('User', { email });
        const passwordHash = this.crypto.getHashPassword(password, user.salt);
        const userInfo = this.db.findOne('User', { email, password: passwordHash.hash, salt: passwordHash.salt });
        if (!lodash_1.isEmpty(userInfo)) {
            this.token = jwt.sign(lodash_1.toPlainObject(userInfo), process.env.SECRET_KEY, {
                expiresIn: 21600,
            });
            this.userId = userInfo.id;
            this.firstName = userInfo.firstName;
            this.middleName = userInfo.middleName;
            this.lastName = userInfo.lastName;
            this.email = userInfo.email;
            this.telephone = userInfo.telephone;
            this.image = userInfo.image;
            this.roleType = userInfo.roleId;
            return this.token;
        }
        else {
            return false;
        }
    }
    verify(token) {
        try {
            const user = jwt.verify(token, lodash_1.toString(process.env.SECRET_KEY));
            const userInfo = this.db.findOne('User', { email: user.email });
            if (userInfo) {
                this.token = token;
                this.userId = userInfo.id;
                this.firstName = userInfo.firstName;
                this.middleName = userInfo.middleName;
                this.lastName = userInfo.lastName;
                this.email = userInfo.email;
                this.telephone = userInfo.telephone;
                this.image = userInfo.image;
                this.roleType = userInfo.roleId;
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
    getId() {
        return this.userId;
    }
    getFirstName() {
        return this.firstName;
    }
    getMiddleName() {
        return this.middleName;
    }
    getLastName() {
        return this.lastName;
    }
    getEmail() {
        return this.email;
    }
    getTelephone() {
        return this.telephone;
    }
    getImage() {
        return this.image;
    }
    getRoleType() {
        return this.roleType;
    }
    isLogged() {
        return !!this.token;
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map