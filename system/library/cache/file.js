import fs from 'fs'
import {replace, forEach, last, isEmpty, toNumber} from 'lodash'
import glob from 'glob'
import moment from 'moment'
export default class File {
    constructor(expire = 3600) {
        this.expire = expire

        const files = glob.sync('system/storage/cache/cache.*')

        if(files) {
            forEach(files, (file) => {
                const time = last(file.split('.'))
                if(toNumber(time) < moment().unix()){
                    if(fs.existsSync(file)) {
                        fs.unlinkSync(file)
                    }
                }
            })
        }
    }

    get(key) {
        const files = glob.sync('system/storage/cache/cache.'+replace(key, '/[^A-Z0-9\._-]/î', '')+'.*')

        if(!isEmpty(files)) {
            const content = fs.readFileSync(files[0])
            return JSON.parse(content)
        }
        return false
    }

    set(key, value) {
        this.delete(key)

        const file = 'system/storage/cache/cache.'+replace(key, '/[^A-Z0-9\._-]/î', '') +'.'+ (moment().unix() + this.expire)
        fs.writeFileSync(file, JSON.stringify(value))
    }

    delete(key) {
        const files = glob.sync('system/storage/cache/cache.'+replace(key, '/[^A-Z0-9\._-]/î', '')+'.*')

        if(!isEmpty(files)) {
            forEach(files, (file) => {
                if(fs.existsSync(file)) {
                    fs.unlinkSync(file)
                }
            })
        }
    }
}