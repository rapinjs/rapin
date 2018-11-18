import 'reflect-metadata';
export default class DB {
    private connection;
    constructor();
    init(): Promise<void>;
    queryBuilder(table: string): import("typeorm/query-builder/SelectQueryBuilder").SelectQueryBuilder<{}>;
    queryMany(query: any): Promise<Object>;
    queryCount(query: any): Promise<Object>;
    repository(table: string): import("typeorm/repository/Repository").Repository<{}>;
    findOne(table: string, conditions?: any, options?: any): Promise<{}>;
    find(table: string, options?: any): Promise<{}[]>;
    create(table: string): {};
    save(table: string, entity: any): Promise<any>;
}
