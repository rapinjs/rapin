declare interface ResponseData {
  [x: string]: any
}

export declare class Response {
  getOutput(): string | ResponseData
  setOutput(output: string | ResponseData): void
  getStatus(): number
  setStatus(status: number): void
  redirect(url: string): void
}