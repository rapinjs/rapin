import * as fs from 'fs'
import * as path from 'path'
import {template} from 'rapin-config'
export default class Style {
  public style: any

  constructor() {
    const {engine} = template
    
    const filePath = path.resolve(__dirname, './style/' + engine + '.js')
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      const driverClass = require('./style/' + engine).default
      this.style = new driverClass()
    }
  }

  link(link) {
    return this.style.link(link)
  }

  path(path) {
    return this.style.path(path)
  }
}
