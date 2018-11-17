import * as path from 'path'
import {Controller as MainController} from './engine/controller'
import {Model as MainModel} from './engine/model'
import {config} from 'dotenv'

export let DIR_APPLICATION: string = path.resolve(__dirname, '../')
export let DIR_IMAGE: string = path.resolve(__dirname, '../static/images/')
export let DIR_STATIC: string = path.resolve(__dirname, '../static/')
export let DIR_STYLESHEET: string = path.resolve(__dirname, '../src/view/stylesheet/')
export let NODE_ENV: string = process.env.NODE_ENV || 'production'

config({path: '.env.' + NODE_ENV})

export let HTTP_SERVER: string =  process.env.HTTP_SERVER || 'http://localhost/'
export let PORT: string = process.env.PORT || '3000'
export let Controller: any = MainController
export let Model: any = MainModel
export let CORS: boolean = process.env.CORS === 'true' || false
export let BASE_URL: string = process.env.BASE_URL || '/'
