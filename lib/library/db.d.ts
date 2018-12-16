import "reflect-metadata";
export default class DB {
    private connection;
    private repositoryType;
    constructor();
    init(): Promise<void>;
    queryBuilder(table: string): any;
    queryMany(query: any): Promise<Object>;
    queryCount(query: any): Promise<Object>;
    repository(table: string): any;
    findOne(table: string, conditions?: any, options?: any): Promise<any>;
    find(table: string, options?: any): Promise<any>;
    create(table: string): any;
    save(table: string, entity: any): Promise<any>;
    delete(table: string, options: any): Promise<any>;
}
