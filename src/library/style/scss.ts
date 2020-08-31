import { DIR_STYLESHEET, HTTP_SERVER, NODE_ENV } from '../../common'
import * as sass from 'node-sass'
import * as fs from 'fs'
import * as path from 'path'

export default class Postcss {
  public expire: number

  constructor() {
  }

  public convert(stylePath) {
    const filePath =path.resolve(DIR_STYLESHEET,'./' + stylePath)

    if (!fs.existsSync(filePath + '.css') || NODE_ENV !== 'production') {
      const fileContent = fs.readFileSync(filePath + '.scss').toString()
      const result = sass.renderSync({
        data: fileContent
      }).css

      fs.writeFileSync(filePath + '.css', result)
    }
  }

  public link(link) {
    this.convert(link)
    return HTTP_SERVER + 'stylesheet/' + link + '.css'
  }

  public path(filePath) {
    this.convert(filePath)

    return DIR_STYLESHEET + '/' + filePath + '.css'
  }
}
