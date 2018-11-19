import * as path from 'path'
import * as fs from 'fs'
import {Controller as MainController} from './engine/controller'
import {Model as MainModel} from './engine/model'
import {config} from 'dotenv'
import {includes} from 'lodash'
import {storage} from 'rapin-config'

export let DIR_APPLICATION: string = path.resolve(__dirname, '')
export let DIR_IMAGE: string = path.resolve('', './static/images/')
export let DIR_STORAGE: string = storage || path.resolve('', './storage/')
export let DIR_STATIC: string = path.resolve('', './static/')
export let DIR_STYLESHEET: string = path.resolve('', './src/view/stylesheet/')
export let NODE_ENV: string = includes(process.argv, 'start') ? 'production' : 'development'

config({path: '.env.' + NODE_ENV})

if (!fs.existsSync(DIR_STORAGE)){
  fs.mkdirSync(DIR_STORAGE);
}

export let HTTP_SERVER: string =  process.env.HTTP_SERVER || 'http://localhost/'
export let PORT: string = process.env.PORT || '3000'
export let Controller: any = MainController
export let Model: any = MainModel
export let CORS: boolean = process.env.CORS === 'true' || false
export let BASE_URL: string = process.env.BASE_URL || '/'
