import {Session} from './koa-session'
import {Context} from 'koa'
declare interface RequestData {
  [x: string]: any
}
export declare class Request {
  ip: string
  post: any
  get: RequestData
  readonly cookie: Context['cookies']
  readonly files: RequestData
  params: RequestData
  readonly session: Session
  readonly headers: any
}
