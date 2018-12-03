import 'reflect-metadata';
export default class DB {
    private connection;
    constructor();
    init(): Promise<void>;
    queryBuilder(table: string): import("typeorm").SelectQueryBuilder<{}>;
    queryMany(query: any): Promise<Object>;
    queryCount(query: any): Promise<Object>;
    repository(table: string): import("typeorm").Repository<{}>;
    findOne(table: string, conditions?: any, options?: any): Promise<{}>;
    find(table: string, options?: any): Promise<{}[]>;
    create(table: string): {};
    save(table: string, entity: any): Promise<any>;
    delete(table: string, options: any): Promise<import("typeorm").DeleteResult>;
}
