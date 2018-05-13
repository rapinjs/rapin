import 'module-alias/register'
import Controller from './engine/controller'
import Model from './engine/model'
import Router from './engine/router'
import path from 'path'

global.Controller = Controller
global.Model = Model
global.DIR_IMAGE = path.resolve(__dirname, '../static/images/')
global.DIR_STATIC = path.resolve(__dirname, '../static/')

let router = new Router()

router.start()

