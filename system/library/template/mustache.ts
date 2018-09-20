import * as fs from 'fs'
import {render} from 'mustache'

export default class Mustache {
  public data: any
  constructor() {
    this.data = {}
  }

  public set(key: string, value: object|string|number) {
    this.data[key] = value
  }

  public render(template: string) {
    const content = fs.readFileSync('src/view/template/' + template + '.mustache')

    const output = render(content.toString(), this.data)
    return output
  }
}
