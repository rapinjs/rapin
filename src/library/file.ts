import * as fs from 'fs'

export default class File {
  constructor() {
  }

  public upload(file, path) {
    const reader = fs.createReadStream(file.path)
    const stream = fs.createWriteStream(path)
    reader.pipe(stream)
  }
}
