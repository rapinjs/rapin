import * as fs from 'fs'
import {render} from 'pug'

export default class Pug {
  public data: any
  constructor() {
    this.data = {}
  }

  public set(key: string, value: any) {
    this.data[key] = value
  }

  public render(template: string) {
    const content = fs.readFileSync('src/view/template/' + template + '.pug')

    return render(content, this.data)
  }
}
