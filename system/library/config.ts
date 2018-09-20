import * as fs from 'fs'
import { isUndefined } from 'lodash'

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
    const filepath: string = 'system/config/' + filename + '.ts'

    let data = {}

    if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
      data = require('system/config/' + filename)
    }

    this.data = { ...this.data, ...data }

    return this.data
  }
}
