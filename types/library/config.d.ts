declare interface ConfigData {
  [x: string]: any
}

export declare class Config {
  get(key: string): ConfigData
  set(key: string, value: ConfigData): void
  has(name: string): boolean
  load(filename: string): ConfigData
}
