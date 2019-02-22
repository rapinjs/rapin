import {isEmpty} from 'lodash'
import {HTTP_SERVER, DIR_IMAGE} from '../common'
import * as path from 'path'
import * as fs from 'fs'

let Jimp = require('jimp')

export default class Image {
  public data: object

  constructor() {
    this.data = {}
  }

  public async link(image, width = false, height = false) {
    if (!isEmpty(image)) {
      const originalImage = DIR_IMAGE + '/' + image
      let convertImage = path.resolve(DIR_IMAGE, 'cache/' + image)
      if (width && height) {
        convertImage = path.resolve(DIR_IMAGE, 'cache/' + width + 'x' + height + '/' + image)
      }
      if(!fs.existsSync(originalImage)){
        return ''
      }
      if (!fs.existsSync(convertImage)) {
        const content = await Jimp.read(originalImage)
        if (width && height) {
          content.resize(width, height).quality(90).write(convertImage)
        } else {
          content.quality(90).write(convertImage)
        }
      }
      const ext = path.extname(originalImage)
      if (width && height) {
        return HTTP_SERVER + 'static/images/cache/' + width + 'x' + height + '/' + path.dirname(image) + '/' + path.basename(image, ext) + ext
      } else {
        return HTTP_SERVER + 'static/images/cache/' + path.dirname(image) + '/' + path.basename(image, ext) + ext
      }
    }

    return ''
  }
}
