import * as fs from 'fs'
import {compile} from 'jade'

export default class Jade {
  public data: any
  constructor() {
    this.data = {}
  }

  public set(key: string, value: object|string|number) {
    this.data[key] = value
  }

  public render(template: string) {
    const content = fs.readFileSync('src/view/template/' + template + '.jade')
    const fn = compile(content, this.data)
    return fn()
  }
}
