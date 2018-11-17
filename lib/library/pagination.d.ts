export default class Pagination {
    private total;
    private limit;
    private items;
    constructor();
    init(items: Array<any>, total: number, limit?: number): void;
    format(page?: number): {
        content: any;
        first: boolean;
        last: boolean;
        number: number;
        numberOfElements: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
}
