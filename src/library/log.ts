import * as fs from 'fs'
import * as moment from 'moment'
import {log} from 'rapin-config'
export default class Log {
  public filename: string
  constructor() {
    const {filename} = log
    this.filename = 'system/storage/logs/' + filename
  }

  public write(message: string) {
    fs.appendFileSync(this.filename, moment().format('Y-MM-DD HH:mm:ss') + ' - ' + message + '\r\n')
  }
}
