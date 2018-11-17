"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const wait = require("wait-for-stuff");
class DB {
    constructor(type, host, username, password, database, port = null) {
        this.connection = wait.for.promise(typeorm_1.createConnection({
            type,
            host,
            port,
            username,
            password,
            database,
            synchronize: false,
            logging: false,
            entities: [
                'entities/**/*.ts',
            ],
        }));
        if (this.connection instanceof Error) {
            throw new Error(this.connection.message);
        }
    }
    queryBuilder(table) {
        return this.connection.getRepository(table).createQueryBuilder(table);
    }
    queryMany(query) {
        const result = wait.for.promise(query.getMany());
        return !lodash_1.isUndefined(result) ? result : {};
    }
    queryCount(query) {
        const result = wait.for.promise(query.getCount());
        return !lodash_1.isUndefined(result) ? result : 0;
    }
    repository(table) {
        return this.connection.getRepository(table);
    }
    findOne(table, conditions, options) {
        const repository = this.connection.getRepository(table);
        const result = wait.for.promise(repository.findOne(conditions, options));
        return !lodash_1.isUndefined(result) ? result : {};
    }
    find(table, options) {
        const repository = this.connection.getRepository(table);
        const result = wait.for.promise(repository.find(options));
        return !lodash_1.isUndefined(result) ? result : [];
    }
    create(table) {
        const repository = this.connection.getRepository(table);
        return repository.create();
    }
    save(table, entity) {
        const repository = this.connection.getRepository(table);
        const result = wait.for.promise(repository.save(entity));
        return result;
    }
}
exports.default = DB;
//# sourceMappingURL=db.js.map