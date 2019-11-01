declare interface CacheData {
  [x: string]: any
}

export declare class Cache {
  get(key: string): CacheData
  set(key: string, value: CacheData | string | CacheData[]): void
  delete(key: string): void
}
