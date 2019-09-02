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

    let reader;

    if (typeof file.then === 'function') {
      const {createReadStream} = await file
      reader = createReadStream()
    } else {
      reader = fs.createReadStream(file.path)
    }

    const stream = fs.createWriteStream(DIR_IMAGE + '/' + image)

    reader.pipe(stream)

    const end = new Promise(function(resolve, reject) {
      stream.on('end', resolve);
      reader.on('error', reject);
    });

    await end

    return image
  }

}
