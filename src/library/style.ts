import * as fs from 'fs'
import * as path from 'path'

export default class Style {
  public style: any

  constructor(driver: string) {
    const filePath = path.resolve(__dirname, './style/' + driver + '.js')
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      const driverClass = require('./style/' + driver).default
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
