import fs from 'fs'
import moment from 'moment'
export default class Log {
    constructor(filename) {
        this.filename = 'system/storage/logs/'+filename
    }

    write(message) {
        fs.appendFileSync(this.filename,moment().format('Y-MM-DD HH:mm:ss') + ' - ' + message+'\r\n');
    }
}