import * as fs from "fs"
import * as path from "path"
import { config } from "../common"
export default class Template {
  public adaptor: any
  constructor() {
    const { engine } = config.template
    const filepath = path.resolve(__dirname, "./template/" + engine + ".js")
    if (fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
      const adaptorClass = require("./template/" + engine).default
      this.adaptor = new adaptorClass()
    }
  }

  public set(key: String, value: Object | String | Object[]) {
    this.adaptor.set(key, value)
  }

  public render(template: string) {
    return this.adaptor.render(template)
  }
}
