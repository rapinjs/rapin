import * as fs from 'fs'
import * as path from 'path'
export default class Template {
  public adaptor: any
  constructor(adaptor: string) {
    const filepath = path.resolve(__dirname, './template/' + adaptor + '.js')
    if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
      const adaptorClass = require('./template/' + adaptor).default
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
