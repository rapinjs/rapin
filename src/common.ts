import * as path from 'path'
import * as fs from 'fs'
import {Controller as MainController} from './engine/controller'
import {Model as MainModel} from './engine/model'
import * as dotenv from 'dotenv'
import {includes} from 'lodash'
export let isDev = process.env.NODE_ENV === 'development'
export let NODE_ENV = process.env.NODE_ENV

dotenv.config({path: '.env.' + process.env.NODE_ENV})
import * as rapinConfig from 'config.js'
import * as rapinConfigDefault from '../rapin.config'
const {storage} = rapinConfig

export let config = {...rapinConfigDefault, ...rapinConfig}
export let DIR_APPLICATION: string = path.resolve(__dirname, '')
export let DIR_IMAGE: string = path.resolve('', './static/images/')
export let DIR_LANGUAGE: string = path.resolve('', './language/')
export let DIR_STORAGE: string = storage || path.resolve('', './storage/')
export let DIR_STATIC: string = path.resolve('', './static/')
export let DIR_STYLESHEET: string = path.resolve('', './view/stylesheet/')

if (!fs.existsSync(DIR_STORAGE)) {
    fs.mkdirSync(DIR_STORAGE)
}

export let HTTP_SERVER: string = process.env.HTTP_SERVER || 'http://localhost/'
export let PORT: string = process.env.PORT || '3000'
export let Controller: any = MainController
export let Model: any = MainModel
export let BASE_URL: string = process.env.BASE_URL || '/'
export let STATIC_BASE_URL: string = process.env.BASE_URL || ''
