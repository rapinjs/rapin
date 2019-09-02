import * as fs from 'fs'
import { DIR_IMAGE } from '../common'

export default class File {
  constructor() {
  }

  public async upload(file, path) {

    const image = path + '/' +
      Math.random()
        .toString(36)
        .substring(2, 15) +
      '.jpg'

    if (typeof file.then === 'function') {
      const {createReadStream} = await file
      const reader = createReadStream()
      const stream = fs.createWriteStream(DIR_IMAGE + '/' + image)
      reader.pipe(stream)
    } else {
      const reader = fs.createReadStream(file.path)
      const stream = fs.createWriteStream(DIR_IMAGE + '/' + image)
      reader.pipe(stream)
    }

    return image
  }

}
