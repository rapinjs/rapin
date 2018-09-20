import * as fs from 'fs'
import { capitalize, isEmpty, join, map, replace, split } from 'lodash'
export default class Action {
  public route: string
  public method: string
  constructor(route: string) {
    const parts = split(replace(route, /[^a-zA-Z0-9_\/]/, ''), '/')

    while (parts) {
      const filename = 'src/controller/' + join(parts, '/') + '.ts'
      if (isEmpty(parts)) {
        break
      }
      if (fs.existsSync(filename) && fs.lstatSync(filename).isFile()) {
        this.route = join(parts, '/')

        break
      } else {
        this.method = parts.pop()
      }
    }
  }
  public execute(registry: any, args: object = {}) {
    let controller = require('controller/' + this.route)

    const controllerName = 'Controller' + join(map(split(this.route, '/'), (value) => (capitalize(value))), '')

    controller = controller[controllerName]

    controller = new controller(registry)

    return controller[this.method](args)
  }
}
