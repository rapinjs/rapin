import fs from 'fs'
import {isUndefined} from 'lodash'

export default class Language {
    constructor(directory = 'en-gb') {
        this.directory = directory;
        this.data = {}
    }

    get(key) {
        return !isUndefined(this.data[key])? this.data[key] : key
    }

    set(key, value) {
        this.data[key] = value
    }

    all() {
        return this.data
    }

    load(filename) {
        const filepath = 'src/language/'+this.directory+'/'+filename+'.json'

        let data = {}

        if(fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()){
            data = require('@language/'+this.directory+'/'+filename)
        }

        this.data = {...this.data, ...data}

        return this.data
    }
}