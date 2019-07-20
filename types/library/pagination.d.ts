declare interface PaginationSort {
  direction: string
  property: string
}
declare interface PaginationResult<T> {
  content: T[]
        first: boolean
        last: boolean
        number: number
        numberOfElements: number
        size: number
        totalElements: number
        sort: PaginationSort
        totalPages:number
}
export declare class Pagination<T> {
  init(items: Array<T>, sortBy: string, sortDirection: string, total: number, limit?: number): void
  format(page?: number): PaginationResult<T>
}