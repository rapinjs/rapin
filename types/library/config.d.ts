declare interface ConfigData {
  [x: string]: any
}

export declare class Config {
  get<T>(key: string): T
  set(key: string, value: ConfigData | string | number): void
  has(name: string): boolean
  load(filename: string): ConfigData
}
