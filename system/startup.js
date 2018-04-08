import 'module-alias/register'
import Controller from './engine/controller'
import Model from './engine/model'
import Router from './engine/router'

global.Controller = Controller
global.Model = Model

let router = new Router()

router.start()

