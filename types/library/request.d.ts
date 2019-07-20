declare interface RequestData {
  [x: string]: any
}

export declare class Request {
  post: any
  get: RequestData
  readonly cookie: RequestData
  readonly files: RequestData
  params: RequestData
  readonly session: RequestData
}
