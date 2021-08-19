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
import { Document } from './library/document'
export * from './helpers/request'
export * from './helpers/event'
export * from './helpers/plugin'
import {AxiosInstance} from 'axios'
import * as moment from 'moment'

export declare class Registry {
  constructor(data?: any)
  get(name: string): any
  getAll(): any
  set(name: string, value: any): void
  has(name: string): boolean
}

export declare interface Context {
  axios: AxiosInstance
  moment: moment.Moment
  /**
   * For work with styles, links and scripts
   */
  document: Document
  /**
   * For load controllers, models, views. configs and languages
   */
  load: Loader
  /**
   * Class to work with cache
   */
  cache: Cache
  /**
   * Class for getting and setting configs
   */
  config: Config
  /**
   * Class for provides cryptographic functionality
   */
  crypto: Crypto
  /**
   * Class for working with errors
   */
  error: Error
  /**
   * Class for processing received files
   */
  file: File
  /**
   * Class for working with images
   */
  image: Image
  /**
   * Class for receiving translations
   */
  language: Language
  /**
   * Class to work with logs
   */
  log: Log
  /**
   * Class for sending mail through the package "nodemailer"
   */
  mail: Mail
  /**
   * Class for creating pagination from the list of item
   */
  pagination: Pagination<any>
  /**
   * Class for retrieving request data
   */
  request: Request
  /**
   * Class for setting data for response
   */
  response: Response
  /**
   * Class to work with styles
   */
  style: Style
  [x: string]: any
}

export declare class Controller {
  constructor(registry: Registry)
  data: any
  /**
   * Global object with system data
   */
  $context: Context
  [x: string]: any
}
export declare class Model {
  constructor(registry: Registry)
  data: any
  /**
   * Global object with system data
   */
  $context: Context
  [x: string]: any
}

export declare const DIR_IMAGE: string
export declare const DIR_APPLICATION: string
export declare const DIR_STORAGE: string
export declare const DIR_STATIC: string
export declare const DIR_STYLESHEET: string
export declare const DIR_LANGUAGE: string
export declare const HTTP_SERVER: string
export declare const DIR_CATALOG: string
export declare const DIR_TEMPLATE: string
export declare const PORT: string
export declare const BASE_URL: string
export declare const STATIC_BASE_URL: string
export declare const isDev: boolean
export declare const start: () => void
export declare const config: {[x: string]: any;}