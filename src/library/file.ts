import * as fs from 'fs'

export default class File {
  constructor() {
  }

  public upload(file, path) {
    if (typeof file.then === 'function') {
      file.then(({ createReadStream }) => {
        const reader = createReadStream()
        const stream = fs.createWriteStream(path)
        reader.pipe(stream)
      })
    } else {
      const reader = fs.createReadStream(file.path)
      const stream = fs.createWriteStream(path)
      reader.pipe(stream)
    }

  }

}
