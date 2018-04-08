import fs from 'fs'
import {isUndefined} from 'lodash'

export default class Config {
    constructor() {
        this.data = {}
    }

    get(key) {
        return !isUndefined(this.data[key])? this.data[key] : key
    }

    set(key, value) {
        this.data[key] = value
    }

    has(name) {
        return !isUndefined(this.data[name])
    }

    load(filename) {
        const filepath = 'system/config/'+filename+'.js'

        let data = {}

        if(fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()){
            data = require('@system/config/'+filename)
        }

        this.data = {...this.data, ...data}

        return this.data
    }
}