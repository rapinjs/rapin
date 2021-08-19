import {DIR_STYLESHEET, HTTP_SERVER, NODE_ENV} from '../../common'
import postcss from 'postcss'
import * as fs from 'fs'
const config = require('./postcss.config.js')

export default class Postcss {
  public expire: number

  constructor() {
  }

  public convert(stylePath) {
    const filePath = DIR_STYLESHEET + '/' + stylePath

    if (!fs.existsSync(filePath + '.css') || NODE_ENV !== 'production') {
      const fileContent = fs.readFileSync(filePath + '.pcss')
      const result = postcss(config()).process(fileContent, {
        from: filePath + '.pcss',
        to: filePath + '.css',
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
