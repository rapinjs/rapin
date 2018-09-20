import * as fs from 'fs'

export default class Template {
  public adaptor: any
  constructor(adaptor: string) {
    const filepath = 'system/library/template/' + adaptor + '.ts'
    if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
      const adaptorClass = require('system/library/template/' + adaptor).default
      this.adaptor = new adaptorClass()
    }
  }

  public set(key: String, value: Object|String|Object[]) {
    this.adaptor.set(key, value)
  }

  public render(template: string) {
    return this.adaptor.render(template)
  }
}
