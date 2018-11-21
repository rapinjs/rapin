import cookie from 'koa-cookie'
import * as cors from '@koa/cors'
import * as Koa from 'koa'
import * as serve from 'koa-static'

import {forEach, isUndefined} from 'lodash'
import {initHelpers} from '../helper/common'
import {routes} from '../helper/request'
import {DIR_STATIC, PORT, CORS, BASE_URL, DIR_STYLESHEET} from '../common'
import Cache from '../library/cache'
import Config from '../library/config'
import Crypto from '../library/crypto'
import DB from '../library/db'
import Decorator from '../library/decorator'
import Error from '../library/error'
import Image from '../library/image'
import Language from '../library/language'
import Log from '../library/log'
import Request from '../library/request'
import Response from '../library/response'
import Pagination from '../library/pagination'
import Mail from '../library/mail'
import User from '../library/user'
import Inky from '../library/inky'
import Style from '../library/style'
import Action from './action'
import Loader from './loader'
import Registry from './registry'
import { triggerEvent } from '../helper/event'
import File from '../library/file'
import * as KoaRouter from 'koa-router'
import * as mount from 'koa-mount'
import * as koaBody from 'koa-body'
import * as session from 'koa-session'
import axios from 'axios'
import {pluginEvent} from '../helper/plugin'


export default class Router {
  private app: Koa
  private registry: Registry

  constructor() {
    this.app = new Koa()

    if (CORS) {
        this.app.use(cors({
          allowedHeaders: 'content-type,token',
          origin: '*',
        }))
    }

    this.app.use(koaBody({multipart: true}))
    this.app.use(cookie())
    this.app.use(session(this.app))
    this.app.use(serve(DIR_STATIC))
    this.app.use(mount(BASE_URL + 'static', serve(DIR_STATIC)))
    this.app.use(mount(BASE_URL + 'stylesheet', serve(DIR_STYLESHEET)))

    new Decorator(this.registry)
  }

  public async start() {
    pluginEvent('beforeInitRegistry', {app: this.app})
    await this.initRegistry()
    pluginEvent('afterInitRegistry', {app: this.app, registry: this.registry})
    const router: KoaRouter = new KoaRouter()
    pluginEvent('onBeforeInitRouter', {app: this.app, registry: this.registry})
    this.app.use((ctx, next) => this.preRequest(ctx, next))

    forEach(routes(this.registry), (route) => {
      if (route.type === 'GET') {
        router.get(route.path, (ctx, next) => this.postRequest(ctx, next, route))
      }
      if (route.type === 'POST') {
        router.post(route.path, (ctx, next) => this.postRequest(ctx, next, route))
      }
      if (route.type === 'PUT') {
        router.put(route.path, (ctx, next) => this.postRequest(ctx, next, route))
      }
    })

    this.app.use(router.routes())
    this.app.use(router.allowedMethods())
    this.app.use(mount(BASE_URL, router.middleware()))

    pluginEvent('onAfterInitRouter', {app: this.app, registry: this.registry})

    this.app.listen(PORT, () => {
      // tslint:disable-next-line:no-console
      console.log('Example app listening on port ' + PORT + '!')
    })
  }

  private async initRegistry() {
    this.registry = new Registry()
    initHelpers(this.registry)
    this.registry.set('language', new Language())
    this.registry.set('file', new File())
    this.registry.set('crypto', new Crypto())
    this.registry.set('config', new Config())
    this.registry.set('image', new Image())
    this.registry.set('pagination', new Pagination())
    this.registry.set('inky', new Inky())
    this.registry.set('axios', axios)
    this.registry.set('mail', new Mail())
    this.registry.set('style', new Style())

    this.registry.set('log', new Log())
    this.registry.set('load', new Loader(this.registry))

    try {
      this.registry.set('db', new DB())
      await this.registry.get('db').init()
    } catch (e) {
      this.handleError(e)
    }
  }

  private async preRequest(ctx, next) {
    this.registry.set('error', new Error())
    this.registry.set('request', new Request({...ctx.request, query: ctx.query, cookie: ctx.cookie, session: ctx.session, params: {}}))
    this.registry.set('user', new User(this.registry))
    this.registry.set('cache', new Cache())

    await next()
  }

  private async postRequest(ctx, next, route: any) {
    this.registry.set('request', new Request({...ctx.request, query: ctx.query, cookie: ctx.cookie, session: ctx.session, params: ctx.params}))
    this.registry.set('response', new Response(ctx))
    pluginEvent('onRequest', {app: this.app, registry: this.registry, ctx, route})

    const token = !isUndefined(ctx.request.headers.token) ? ctx.request.headers.token : false

    let verify = false

    if(token) {
        verify = await this.registry.get('user').verify(token)
    }       

    if ((route.auth && token && verify) || !route.auth) {
      try {
        triggerEvent('controller/'+route.action, 'before', {data: {}})
        const action = new Action(route.action)

        const output = await action.execute(this.registry)

        triggerEvent('controller/'+route.action, 'after', {data: {}, output})

      } catch (e) {
        this.handleError(e)
      }
      const error = this.registry.get('error').get()
      if (error) {
        ctx.status = 400
        ctx.body = error
      } else if(ctx.response.status !== 302) {
        ctx.status = this.registry.get('response').getStatus()
        ctx.body = this.registry.get('response').getOutput()
      }
    } else {
      ctx.status = 401
      ctx.body = 'Unauthorized'
    }
  }

  private handleError(err) {
    pluginEvent('onError', {app: this.app, err, registry: this.registry})
    // tslint:disable-next-line:no-console
    console.log(err)
    // this.registry.get('log').write(err.message + err.stack)
    // this.registry.get('response').setStatus(500)
    // this.registry.get('response').setOutput({ status: 500, message: err.message })
  }
}
