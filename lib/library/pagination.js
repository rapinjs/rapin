"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class Pagination {
    constructor() {
    }
    init(items, total, limit) {
        this.items = items;
        this.limit = lodash_1.toNumber(limit);
        this.total = lodash_1.toNumber(total);
    }
    format(page) {
        if (page) {
            const floatedPages = this.total / this.limit;
            const totalPages = floatedPages - (floatedPages) % 1 + ((floatedPages) % 1 < 1 && (floatedPages) % 1 > 0 ? 1 : 0);
            return {
                content: this.items,
                first: lodash_1.toNumber(page) === 1,
                last: lodash_1.toNumber(page) === totalPages,
                number: lodash_1.toNumber(page),
                numberOfElements: lodash_1.size(this.items),
                size: this.limit,
                totalElements: this.total,
                totalPages,
            };
        }
        else {
            return {
                content: this.items,
                first: true,
                last: true,
                number: page,
                numberOfElements: lodash_1.size(this.items),
                size: this.total,
                totalElements: this.total,
                totalPages: 1,
            };
        }
    }
}
exports.default = Pagination;
//# sourceMappingURL=pagination.js.map