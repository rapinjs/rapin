import { Loader } from './engine/loader'
import { Cache } from './library/cache'
import { Config } from './library/config'
import { Crypto } from './library/crypto'
import { Error } from './library/error'
import { File } from './library/file'
import { Image } from './library/image'
import { Language } from './library/language'
import { Log } from './library/log'
import { Mail } from './library/mail'
import { Pagination } from './library/pagination'
import { Request } from './library/request'
import { Response } from './library/response'
import { Style } from './library/style'
export * from './helpers/request'
export * from './helpers/event'
export * from './helpers/plugin'

export declare class Registry {
  get(name: string): Promise<any>
  set(name: string, value: any): void 
  has(name: string): boolean
}

export declare interface Context {
  load: Loader
  cache: Cache
  config: Config
  crypto: Crypto
  error: Error
  file: File
  image: Image
  language: Language
  log: Log
  mail: Mail
  pagination: Pagination<any>
  request: Request
  response: Response
  style: Style
  [x: string]: any
}

export declare class Controller {
    constructor(registry: Registry)
    $context: Context
    [x: string]: any
}
export declare class Model {
    constructor(registry: Registry)
    $context: Context
    [x: string]: any
}

export declare const DIR_IMAGE: string
export declare const DIR_APPLICATION: string
export declare const DIR_STORAGE: string
export declare const DIR_STATIC: string
export declare const DIR_STYLESHEET: string
export declare const HTTP_SERVER: string
export declare const PORT: string
export declare const BASE_URL: string
export declare const STATIC_BASE_URL: string
export declare const start: () => void
