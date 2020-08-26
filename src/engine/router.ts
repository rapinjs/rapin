import cookie from 'koa-cookie'
import * as Koa from 'koa'
import * as serve from 'koa-static'

import {forEach, isUndefined} from 'lodash'
import {initHelpers} from '../helper/common'
import {routes} from '../helper/request'
import {
  DIR_STATIC,
  PORT,
  BASE_URL,
  STATIC_BASE_URL,
  DIR_STYLESHEET,
  config as rapinConfig
} from '../common'
import Cache from '../library/cache'
import Config from '../library/config'
import Crypto from '../library/crypto'
import Error from '../library/error'
import Image from '../library/image'
import Language from '../library/language'
import Log from '../library/log'
import Request from '../library/request'
import Response from '../library/response'
import Pagination from '../library/pagination'
import Mail from '../library/mail'
import Style from '../library/style'
import Action from './action'
import Loader from './loader'
import Document from '../library/document'
import Registry from './registry'
import {triggerEvent} from '../helper/event'
import File from '../library/file'
import * as KoaRouter from 'koa-router'
import * as mount from 'koa-mount'
import * as koaBody from 'koa-body'
import * as session from 'koa-session'
import axios from 'axios'
import * as moment from 'moment'
import {pluginEvent} from '../helper/plugin'
import {Logger} from '../logger'

export default class Router {
  private registry: Registry
  private app: any

  constructor() {
    this.app = new Koa()
    this.app.proxy = true
    this.app.keys = [process.env.SECRET_KEY]

    this.app.use(cookie())
    this.app.use(session({
      key: 'koa.sess',
      maxAge: 86400000,
      overwrite: true, 
      httpOnly: true,
      signed: true, 
      rolling: false, 
      renew: false,
      secure: true, 
      sameSite: null,
    }, this.app))
    this.app.use(serve(DIR_STATIC))
    this.app.use(mount(STATIC_BASE_URL + '/static', serve(DIR_STATIC)))
    this.app.use(mount(STATIC_BASE_URL + '/stylesheet', serve(DIR_STYLESHEET)))
    this.app.use((ctx: Koa.Context, next) => this.preRequest(ctx, next))
  }

  public async start() {
    await pluginEvent('beforeInitRegistry', {
      app: this.app,
      config: rapinConfig,
    })
    let logger = new Logger('Initial registry')
    await this.initRegistry()
    logger.end()

    await pluginEvent('afterInitRegistry', {
      app: this.app,
      registry: this.registry,
      config: rapinConfig,
    })
    const router: KoaRouter = new KoaRouter()
    await pluginEvent('onBeforeInitRouter', {
      app: this.app,
      registry: this.registry,
      router,
      config: rapinConfig,
    })
    
    logger = new Logger('Load routes')

    const mapRoutes = routes(this.registry)

    logger.end()

    forEach(mapRoutes, route => {
      logger = new Logger(`Mapped {${route.path} ${route.type}} route`)
      if (route.type === 'GET') {
        router.get(route.path, koaBody({ multipart: true }), (ctx, next) =>
          this.postRequest(ctx, next, route)
        )
      }
      if (route.type === 'POST') {
        router.post(route.path, koaBody({ multipart: true }), (ctx, next) =>
          this.postRequest(ctx, next, route)
        )
      }
      if (route.type === 'PUT') {
        router.put(route.path, koaBody({ multipart: true }), (ctx, next) =>
          this.postRequest(ctx, next, route)
        )
      }
      if (route.type === 'DELETE') {
        router.delete(route.path, koaBody({ multipart: true }), (ctx, next) =>
          this.postRequest(ctx, next, route)
        )
      }
      logger.end()
    })

    logger = new Logger('Rapin JS application successfully started ')

    await pluginEvent('onAfterInitRouter', {
      app: this.app,
      registry: this.registry,
      router,
      config: rapinConfig,
    })
    this.app.use(router.routes())
    this.app.use(router.allowedMethods())
    this.app.use(mount(BASE_URL, router.middleware()))

    this.app.listen(PORT, () => {
      // tslint:disable-next-line:no-console
      logger.end()
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
    this.registry.set('axios', axios)
    this.registry.set('moment', moment)
    this.registry.set('mail', new Mail())
    this.registry.set('style', new Style())

    this.registry.set('log', new Log())
  }

  private async preRequest(ctx: Koa.Context, next) {
    ctx.registry = new Registry(this.registry.getAll())

    ctx.registry.set('error', new Error())

    ctx.registry.set('cache', new Cache())

    ctx.registry.set('document',  new Document())

    ctx.registry.set('load', new Loader(ctx.registry))

    ctx.registry.set(
      'request',
      new Request({
        ...ctx.request,
        query: ctx.query,
        cookie: ctx.cookies,
        session: ctx.session,
        params: ctx.params,
        ip: ctx.request.ip
      })
    );
    initHelpers(ctx.registry)

    await pluginEvent('onBeforeRequest', {
      app: this.app,
      registry: ctx.registry,
      ctx,
      config: rapinConfig
    })

    await next()
  }

  private async postRequest(ctx: Koa.Context, next, route: any) {
    ctx.registry.set('response', new Response(ctx))

    ctx.registry.set(
      'request',
      new Request({
        ...ctx.request,
        query: ctx.query,
        cookie: ctx.cookie,
        session: ctx.session,
        params: ctx.params,
        ip: ctx.request.ip
      })
    )

    await pluginEvent('onRequest', {
      app: this.app,
      registry: ctx.registry,
      ctx,
      route,
      config: rapinConfig
    })

    try {
      triggerEvent('controller/' + route.action, 'before', {data: {}})
      const action = new Action(route.action)

      const output = await action.execute(ctx.registry)

      triggerEvent('controller/' + route.action, 'after', {
        data: {},
        output
      })
    } catch (e) {
      await this.handleError(e, ctx)
    }
    const error = ctx.registry.get('error').get()
    if (error) {
      ctx.status = 400
      ctx.body = error
    } else if (ctx.response.status !== 302) {
      ctx.status = ctx.registry.get('response').getStatus()
      ctx.body = await ctx.registry.get('response').getOutput()
    }
  }

  private async handleError(err, ctx) {
    const {registry} = ctx
    await pluginEvent('onError', {
      app: this.app,
      err,
      ctx,
      registry,
      config: rapinConfig
    })

    registry.get('log').write(err.stack)
    if (!isUndefined(registry.get('response'))) {
      registry.get('response').setStatus(500)
      registry
        .get('response')
        .setOutput({status: 500, message: err.message, stack: err.stack})
    } else {
      // tslint:disable-next-line:no-console
      console.log(err.message)
    }
  }
}
