import { size, toNumber } from 'lodash'

export default class Pagination {
  private total: number
  private limit: number
  private items: any
  private sortBy: string
  private sortDirection: string

  constructor() {
  }

  public init(items: Array<any>, sortBy: string, sortDirection: string, total: number, limit?: number) {
    this.items = items
    this.limit = toNumber(limit)
    this.total = toNumber(total)
    this.sortBy = sortBy
    this.sortDirection = sortDirection
  }

  public format(page?: number) {
    if (page) {
      const floatedPages = this.total / this.limit
      const totalPages = floatedPages - (floatedPages) % 1 + ((floatedPages) % 1 < 1 && (floatedPages) % 1 > 0 ? 1 : 0)

      return {
        content: this.items,
        first: toNumber(page) === 1,
        last: toNumber(page) === totalPages,
        number: toNumber(page),
        numberOfElements: size(this.items),
        size: this.limit,
        totalElements: this.total,
        sort: {
            direction: this.sortDirection,
            property: this.sortBy,
        },
        totalPages,
      }
    } else {
      return {
        content: this.items,
        first: true,
        last: true,
        number: page,
        numberOfElements: size(this.items),
        size: this.total,
        totalElements: this.total,
        totalPages: 1,
        sort: {
            direction: this.sortDirection,
            property: this.sortBy,
        },
      }
    }
  }
}
