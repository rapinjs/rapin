import * as fs from 'fs'
import { isUndefined } from 'lodash'
import {DIR_LANGUAGE} from '../common'

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
    const filepath = DIR_LANGUAGE + '/' + this.directory + '/' + filename + '.json'

    let data = {}

    if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
      data = require(DIR_LANGUAGE+'/' + this.directory + '/' + filename)
    }

    this.data = { ...this.data, ...data }

    return this.data
  }
}
