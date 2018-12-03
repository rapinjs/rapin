export default class Pagination {
    private total;
    private limit;
    private items;
    private sortBy;
    private sortDirection;
    constructor();
    init(items: Array<any>, sortBy: string, sortDirection: string, total: number, limit?: number): void;
    format(page?: number): {
        content: any;
        first: boolean;
        last: boolean;
        number: number;
        numberOfElements: number;
        size: number;
        totalElements: number;
        sort: {
            direction: string;
            property: string;
        };
        totalPages: number;
    };
}
