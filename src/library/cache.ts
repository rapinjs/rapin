import * as fs from 'fs'

export default class Cache {
  public cache: any
  constructor(driver: string, expire: number = 3600) {
    const filePath = 'system/library/cache/' + driver + '.ts'
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      const driverClass = require('system/library/cache/' + driver).default
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
