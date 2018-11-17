import * as fs from 'fs'
import { isUndefined } from 'lodash'

export default class Language {
  public directory: string
  public data: object
  constructor(directory = 'en-gb') {
    this.directory = directory
    this.data = {}
  }

  public get(key) {
    return !isUndefined(this.data[key]) ? this.data[key] : key
  }

  public set(key, value) {
    this.data[key] = value
  }

  public all() {
    return this.data
  }

  public load(filename) {
    const filepath = 'src/language/' + this.directory + '/' + filename + '.json'

    let data = {}

    if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
      data = require('language/' + this.directory + '/' + filename)
    }

    this.data = { ...this.data, ...data }

    return this.data
  }
}
