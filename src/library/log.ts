import * as fs from 'fs'
import * as moment from 'moment'
import {log} from 'rapin-config'
import {DIR_STORAGE} from '../common'

if (!fs.existsSync(DIR_STORAGE+'/logs')){
  fs.mkdirSync(DIR_STORAGE+'/logs');
}
export default class Log {
  public filename: string
  constructor() {
    const {filename} = log
    this.filename = DIR_STORAGE+'/logs/' + filename
  }

  public write(message: string) {
    fs.appendFileSync(this.filename, moment().format('Y-MM-DD HH:mm:ss') + ' - ' + message + '\r\n')
  }
}
