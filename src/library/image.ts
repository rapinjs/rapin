import {isEmpty} from 'lodash'
import {HTTP_SERVER, DIR_IMAGE} from '../common'
import axios from 'axios'
import * as path from 'path'
import * as fs from 'fs'
import * as wait from 'wait-for-stuff'

let Jimp = require('jimp')

export default class Image {
  public data: object

  constructor() {
    this.data = {}
  }

  public link(image, width = false, height = false) {
    if (!isEmpty(image)) {
      const originalImage = DIR_IMAGE + '/' + image
      let convertImage = path.resolve(DIR_IMAGE, 'cache/' + image)
      if (width && height) {
        convertImage = path.resolve(DIR_IMAGE, 'cache/' + width + 'x' + height + '/' + image)
      }
      if (!fs.existsSync(convertImage)) {
        const content = wait.for.promise(Jimp.read(originalImage))
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

  public googleMap(location:string, image_path:string, callback: any) {
    axios.get('https://maps.googleapis.com/maps/api/streetview/metadata?size=2048x2048&location=' + location + '&key=AIzaSyAzyY8oOq2pvypqzexAH2KchgAeSdqOZSY').then((response) => {
      if(response.data.status === 'OK') {
        const responseImage = axios.get('https://maps.googleapis.com/maps/api/streetview?size=2048x2048&location=' + location + '&key=AIzaSyAzyY8oOq2pvypqzexAH2KchgAeSdqOZSY', {responseType: 'stream'}).then((responseImage) => {
          responseImage.data.pipe(fs.createWriteStream(image_path)).on('finish', () => {
            callback()
          })
        }).catch(error => {
          callback(true)
          // console.log(error)
        })
      }
    }).catch((error) => {
      callback(true)
      // console.log(error)
    })
  }

  public download(uri:string, image_path:string) {

    try {
      const response = wait.for.promise(axios.get(uri, { responseType:"stream" }));
      response.data.pipe( fs.createWriteStream( image_path ) );
    } catch(e) {
      return false
    }

    return true
  }
}
