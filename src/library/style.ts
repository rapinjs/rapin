import * as fs from 'fs'

export default class Style {
  public style: any

  constructor(driver: string) {
    const filePath = 'system/library/style/' + driver + '.ts'
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
      const driverClass = require('system/library/style/' + driver).default
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
