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
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const rapin_config_1 = require("rapin-config");
class DB {
    constructor() { }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield typeorm_1.createConnection({
                type: rapin_config_1.db.engine,
                host: rapin_config_1.db.host,
                port: rapin_config_1.db.port,
                username: rapin_config_1.db.username,
                password: rapin_config_1.db.password,
                database: rapin_config_1.db.database,
                synchronize: false,
                logging: false,
                entities: [
                    'entities/**/*.ts',
                ],
            });
            if (this.connection instanceof Error) {
                throw new Error(this.connection.message);
            }
        });
    }
    queryBuilder(table) {
        return this.connection.getRepository(table).createQueryBuilder(table);
    }
    queryMany(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield query.getMany();
            return !lodash_1.isUndefined(result) ? result : {};
        });
    }
    queryCount(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield query.getCount();
            return !lodash_1.isUndefined(result) ? result : 0;
        });
    }
    repository(table) {
        return this.connection.getRepository(table);
    }
    findOne(table, conditions, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.connection.getRepository(table);
            const result = yield repository.findOne(conditions, options);
            return !lodash_1.isUndefined(result) ? result : {};
        });
    }
    find(table, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.connection.getRepository(table);
            const result = yield repository.find(options);
            return !lodash_1.isUndefined(result) ? result : [];
        });
    }
    create(table) {
        const repository = this.connection.getRepository(table);
        return repository.create();
    }
    save(table, entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.connection.getRepository(table);
            const result = yield repository.save(entity);
            return result;
        });
    }
    delete(table, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = this.connection.getRepository(table);
            const result = yield repository.delete(options);
            return result;
        });
    }
}
exports.default = DB;
//# sourceMappingURL=db.js.map