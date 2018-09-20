import * as fs from 'fs'
import * as glob from 'glob'
import { forEach, isEmpty, last, replace, toNumber, toString } from 'lodash'
import * as moment from 'moment'
export default class File {
  public expire: number
  constructor(expire: number = 3600) {
    this.expire = expire

    const files = glob.sync('system/storage/cache/cache.*')

    if (files) {
      forEach(files, (file) => {
        const time = last(file.split('.'))
        if (toNumber(time) < moment().unix()) {
          if (fs.existsSync(file)) {
            fs.unlinkSync(file)
          }
        }
      })
    }
  }

  public get(key) {
    const files = glob.sync('system/storage/cache/cache.' + replace(key, '/[^A-Z0-9\._-]/î', '') + '.*')

    if (!isEmpty(files)) {
      const content = fs.readFileSync(files[0])
      return JSON.parse(toString(content))
    }
    return false
  }

  public set(key, value) {
    this.delete(key)

    const file = 'system/storage/cache/cache.' + replace(key, '/[^A-Z0-9\._-]/î', '') + '.' + (moment().unix() + this.expire)
    fs.writeFileSync(file, JSON.stringify(value))
  }

  public delete(key) {
    const files = glob.sync('system/storage/cache/cache.' + replace(key, '/[^A-Z0-9\._-]/î', '') + '.*')

    if (!isEmpty(files)) {
      forEach(files, (file) => {
        if (fs.existsSync(file)) {
          fs.unlinkSync(file)
        }
      })
    }
  }
}
