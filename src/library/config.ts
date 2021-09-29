import * as fs from 'fs'
import { isUndefined } from 'lodash'
import {isDev, DIR_CATALOG, DIR_ROOT } from '../common'

export default class Config {
  public data: object
  constructor() {
    this.data = {}
  }

  public get(key) {
    return !isUndefined(this.data[key]) ? this.data[key] : key
  }

  public set(key, value) {
    this.data[key] = value
  }

  public has(name) {
    return !isUndefined(this.data[name])
  }

  public load(filename: string) {
    let filepath: string = DIR_CATALOG + '/config/' + filename
    let data: any = {}
    try {
      filepath = require.resolve(filepath)
      data = require(filepath)
    } catch(e) {
    }
    filepath = DIR_ROOT + '/config/' + filename
    try {
      filepath = require.resolve(filepath)
      data = require(filepath)
    } catch(e) {
    }

    if(data.default) {
      data = data.default
    }

    this.data = { ...this.data, ...data }

    return this.data
  }
}
