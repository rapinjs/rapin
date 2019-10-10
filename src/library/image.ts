import {isEmpty} from 'lodash'
import {HTTP_SERVER, DIR_IMAGE} from '../common'
import * as path from 'path'
import * as jimp from 'jimp'
import {pluginEvent} from '../helper/plugin'
import * as fs from 'fs'

export default class Image {
  public data: object

  constructor() {
    this.data = {}
  }

  public async link(image: string, width: number = 0, height: number = 0) {

    if (!isEmpty(image)) {
      const originalImage = DIR_IMAGE + '/' + image
      let convertImage = path.resolve(DIR_IMAGE, 'cache/' + image)
      if (width && height) {
        convertImage = path.resolve(DIR_IMAGE, 'cache/' + width + 'x' + height + '/' + image)
      }
      if (!fs.existsSync(originalImage)) {
        return ''
      }

      let ext = path.extname(originalImage)


      if (!fs.existsSync(convertImage) && ext !== '.svg') {
        //@ts-ignore
        const content = await jimp.read(originalImage)
        if (width !== 0 && height !== 0) {
          if(ext === '.png') {
            content.contain(width, height).quality(90).write(convertImage);
          } else {
            content.background(0xFFFFFFFF).contain(width, height).quality(90).write(convertImage);
          }
        } else {
          content.quality(90).write(convertImage)
        }
        await pluginEvent('onImageResize', {width, height, image, convertImage})
      } else if(ext === '.svg') {
        convertImage = originalImage
      }
      let imageUrl = HTTP_SERVER

      const output = await pluginEvent('onImageResizeAfter', {width, height, imageUrl, ext, image})
      if (output) {
        ({width, height, imageUrl, ext, image} = output)
      }
      if (ext === '.svg') {
        return imageUrl + 'static/images/' + path.dirname(image) + '/' + path.basename(image, ext) + ext
      }
      if (width !== 0 && height !== 0) {
        return imageUrl + 'static/images/cache/' + width + 'x' + height + '/' + path.dirname(image) + '/' + path.basename(image, ext) + ext
      } else {
        return imageUrl + 'static/images/cache/' + path.dirname(image) + '/' + path.basename(image, ext) + ext
      }
    }

    return ''
  }
}
