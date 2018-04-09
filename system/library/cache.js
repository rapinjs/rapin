import fs from 'fs'

export default class Cache {
    constructor(driver, expire=3600){
        const filePath = 'system/library/cache/'+driver+'.js'
        if(fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
            let driverClass = require('@system/library/cache/'+driver)['default']
            this.cache = new driverClass(expire)
        }
    }
    get(key) {
        return this.cache.get(key)
    }
    set(key, value) {
        return this.cache.set(key, value)
    }
    delete (key) {
        return this.cache.delete(key)
    }
}