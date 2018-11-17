import * as fs from 'fs'
import * as moment from 'moment'
export default class Log {
  public filename: string
  constructor(filename: string) {
    this.filename = 'system/storage/logs/' + filename
  }

  public write(message: string) {
    fs.appendFileSync(this.filename, moment().format('Y-MM-DD HH:mm:ss') + ' - ' + message + '\r\n')
  }
}
