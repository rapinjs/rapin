import * as path from 'path'
import * as fs from 'fs'
import {Controller as MainController} from './engine/controller'
import {Model as MainModel} from './engine/model'
import * as dotenv from 'dotenv'
import * as tsConfigPaths from 'tsconfig-paths'
import {includes} from 'lodash'
if (typeof process.env.NODE_ENV === 'undefined') {
  process.env.NODE_ENV = 'development'
}
if (includes(process.argv, "start")) {
  process.env.NODE_ENV = 'production'
}
export let isDev = process.env.NODE_ENV === 'development'
export let NODE_ENV = process.env.NODE_ENV


export let DIR_APPLICATION: string = path.resolve(__dirname, '')
export let DIR_ROOT: string =  path.resolve('')

tsConfigPaths.register({
  baseUrl: DIR_ROOT,
  paths: {
    "*": [
      "*",
      "system/*",
      "src/*",
      "system/helper/*"
    ]
  }
})
export let DIR_IMAGE: string = path.resolve('', './static/images/')
export let DIR_STATIC: string = path.resolve('', './static/')
export let DIR_CATALOG: string = fs.existsSync(DIR_ROOT + '/lib') ?
path.resolve(DIR_ROOT + '/lib/') :
path.resolve(DIR_ROOT + '/src/') 
let dirTemplate = ''
let dirStylesheet = ''
if (fs.existsSync(DIR_CATALOG+'/view')) {
  dirTemplate = path.resolve(DIR_CATALOG, './view')
  dirStylesheet = path.resolve(DIR_CATALOG, './view/stylesheet/')
} else {
  dirTemplate = path.resolve(DIR_ROOT, './view')
  dirStylesheet = path.resolve(DIR_ROOT, './view/stylesheet/')
}

export let DIR_TEMPLATE = dirTemplate
export let DIR_STYLESHEET: string = dirStylesheet

let dirLanguage = ''

if (fs.existsSync(DIR_CATALOG+'/language')) {
  dirLanguage = path.resolve(DIR_CATALOG, './language/')
} else {
  dirLanguage = path.resolve(DIR_ROOT, './language/')
}

export let DIR_LANGUAGE: string = dirLanguage

if (fs.existsSync(DIR_ROOT+'/' + '.env.' + process.env.NODE_ENV)) {
  dotenv.config({path: DIR_ROOT+'/' + '.env.' + process.env.NODE_ENV})
} else if (fs.existsSync(DIR_ROOT+'/.env')) {
  dotenv.config({path: DIR_ROOT+'/.env'})
}

//@ts-ignore
let rapinConfig: any = {}

if (fs.existsSync(DIR_ROOT+'/config.js')) {
  rapinConfig = require(DIR_ROOT+'/config.js')
} else if (fs.existsSync(DIR_ROOT+'/config.ts')) {
  rapinConfig = require(DIR_ROOT+'/config.ts')
} else if (fs.existsSync(DIR_ROOT+'/rapin.config.js')) {
  rapinConfig = require(DIR_ROOT+'/rapin.config.js')
} else if (fs.existsSync(DIR_ROOT+'/rapin.config.ts')) {
  rapinConfig = require(DIR_ROOT+'/rapin.config.ts')
}

import * as rapinConfigDefault from '../rapin.config'
export let config = {...rapinConfigDefault, ...rapinConfig}

const {storage} = rapinConfig

export let DIR_STORAGE: string = storage || path.resolve('', './storage/')
if (!fs.existsSync(DIR_STORAGE)) {
  fs.mkdirSync(DIR_STORAGE)
}
export let HTTP_SERVER: string = process.env.HTTP_SERVER || 'http://localhost/'
export let PORT: string = process.env.PORT || '3000'
export let Controller: any = MainController
export let Model: any = MainModel
export let BASE_URL: string = process.env.BASE_URL || '/'
export let STATIC_BASE_URL: string = process.env.BASE_URL || ''
