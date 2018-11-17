import 'reflect-metadata';
import { SelectQueryBuilder } from 'typeorm';
export default class DB {
    private connection;
    constructor(type: any, host: string, username: string, password: string, database: string, port?: number);
    queryBuilder(table: string): SelectQueryBuilder<{}>;
    queryMany(query: any): Object;
    queryCount(query: any): Object;
    repository(table: string): import("typeorm/repository/Repository").Repository<{}>;
    findOne(table: string, conditions?: any, options?: any): any;
    find(table: string, options?: any): any;
    create(table: string): {};
    save(table: string, entity: any): any;
}
