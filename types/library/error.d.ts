declare interface ErrorItem {
  error: string
  code: number
  message: string
  system_message: string
}

export declare class Error {
  set(error: string, system_message?: string): void
  get(): boolean | ErrorItem
}