import * as fs from 'fs'
import * as path from 'path'
import {cache} from 'rapin-config'

export default class Cache {
  public cache: any
  constructor() {
    const {engine, expire} = cache
    const filePath = path.resolve(__dirname, './cache/' + engine + '.js')
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      const driverClass = require('./cache/' + engine).default
      this.cache = new driverClass(expire)
    }
  }
  public get(key: string) {
    return this.cache.get(key)
  }
  public set(key: string, value: object|string|object[]) {
    return this.cache.set(key, value)
  }
  public delete(key: string) {
    return this.cache.delete(key)
  }
}
