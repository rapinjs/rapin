declare interface ResponseData {
  [x: string]: any
}

export declare class Response {
  set(field: string,  val: string | string[]): void
  getOutput(): string | ResponseData
  setOutput(output: string | ResponseData): void
  getStatus(): number
  setStatus(status: number): void
  redirect(url: string): void
}