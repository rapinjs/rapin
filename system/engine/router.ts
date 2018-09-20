import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import {forEach, isUndefined} from 'lodash'

import {routes} from 'config/routes'
import * as fileUpload from 'express-fileupload'
import {DIR_STATIC, PORT, CORS, BASE_URL} from 'system/common'
import Cache from 'system/library/cache'
import Config from 'system/library/config'
import Crypto from 'system/library/crypto'
import DB from 'system/library/db'
import Decorator from 'system/library/decorator'
import Error from 'system/library/error'
import Image from 'system/library/image'
import Language from 'system/library/language'
import Log from 'system/library/log'
import Request from 'system/library/request'
import Response from 'system/library/response'
import Pagination from 'system/library/pagination'
import User from 'system/library/user'
import Action from './action'
import Loader from './loader'
import Registry from './registry'

export default class Router {
  private app: express.Application
  private registry: Registry

  constructor() {
    this.app = express()

    this.app.use(cors({
      allowedHeaders: 'content-type,token',
      origin: CORS ? '*' : false,
    }))

    this.app.use(express.json())
    this.app.use(fileUpload())
    this.app.use(cookieParser())
    this.app.use(BASE_URL + 'static', express.static(DIR_STATIC))
    new Decorator(this.registry)
  }

  public start() {
    this.initRegistry()

    const router: express.Router = express.Router()

    router.use((req, res, next) => this.preRequest(req, res, next)).bind(this)

    forEach(routes(this.registry), (route) => {
      if (route.type === 'GET') {
        router.get(route.path, (req, res) => this.postRequest(req, res, route)).bind(this)
      }
      if (route.type === 'POST') {
        router.post(route.path, (req, res) => this.postRequest(req, res, route)).bind(this)
      }
      if (route.type === 'PUT') {
        router.put(route.path, (req, res) => this.postRequest(req, res, route)).bind(this)
      }
    })
    this.app.use(BASE_URL, router)

    this.app.listen(PORT, () => {
      console.log('Example app listening on port ' + PORT + '!')
    })
  }

  private initRegistry() {
    this.registry = new Registry()

    this.registry.set('language', new Language())
    this.registry.set('crypto', new Crypto())
    this.registry.set('config', new Config())
    this.registry.set('image', new Image())
    this.registry.set('pagination', new Pagination())

    this.registry.get('config').load('default')
    const defaultConfig = this.registry.get('config').get('defaultConfig')

    const {
      dbEngine, dbHostname, dbUsername, dbPassword, dbDatabase, dbPort, errorFilename,
    } = defaultConfig
    this.registry.set('log', new Log(errorFilename))
    this.registry.set('load', new Loader(this.registry))
    this.registry.set('log', new Log(errorFilename))

    try {
      this.registry.set('db', new DB(dbEngine, dbHostname, dbUsername, dbPassword, dbDatabase, dbPort))
    } catch (e) {
      this.handleError(e)
    }
  }

  private preRequest(req: express.Request, res: express.Response, next: express.NextFunction) {
    this.registry.set('error', new Error())
    this.registry.set('request', new Request(req))
    this.registry.set('response', new Response())
    this.registry.set('user', new User(this.registry))
    const defaultConfig = this.registry.get('config').get('defaultConfig')
    const { cacheEngine, cacheExpire } = defaultConfig
    this.registry.set('cache', new Cache(cacheEngine, cacheExpire))

    next()
  }

  private postRequest(req: express.Request, res: express.Response, route: any) {
    const token = !isUndefined(req.headers.token) ? req.headers.token : false

    if ((route.auth && token && this.registry.get('user').verify(token)) || !route.auth) {
      try {
        const action = new Action(route.action)

        action.execute(this.registry)
      } catch (e) {
        this.handleError(e)
      }
      const error = this.registry.get('error').get()

      if (error) {
        res.status(400).send(error)
      } else {
        res.status(this.registry.get('response').getStatus()).send(this.registry.get('response').getOutput())
      }
    } else {
      res.status(401).send('Unauthorized')
    }
  }

  private handleError(err) {
    console.log(err)
    // this.registry.get('log').write(err.message + err.stack)
    // this.registry.get('response').setStatus(500)
    // this.registry.get('response').setOutput({ status: 500, message: err.message })
  }
}
