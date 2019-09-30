import * as fs from 'fs'
import * as nPath from 'path'
import { DIR_IMAGE } from '../common'

export default class File {
  constructor() {
  }

  public async upload(file, path) {
    let image = path + '/' +
      Math.random()
        .toString(36)
        .substring(2, 15)

    let reader;

    if (typeof file.then === 'function') {
      const { createReadStream, filename} = await file

      const ext = nPath.extname(filename)
      image += ext

      reader = createReadStream()
    } else {
      reader = fs.createReadStream(file.path)

      const ext = nPath.extname(file.name)
      image += ext
    }

    const stream = fs.createWriteStream(DIR_IMAGE + '/' + image)

    reader.pipe(stream)

    const end = new Promise(function(resolve, reject) {
      stream.on('finish', resolve);
      reader.on('error', reject);
    });

    await end

    return image
  }

}
