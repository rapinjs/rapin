import fs from 'fs'

export default class DB {
    constructor(adaptor, hostname, username, password, database, port=null){
        const filepath = 'system/library/db/'+adaptor+'.js'
        if(fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
            let adaptorClass = require('@system/library/db/'+adaptor)['default']
            this.adaptor = new adaptorClass(hostname, username, password, database, port)
        }
    }
    query(sql) {
        return this.adaptor.query(sql)
    }
    escape(value) {
        return this.adaptor.escape(value)
    }
    countAffected() {
        return this.adaptor.countAffected()
    }
    getLastId() {
        return this.adaptor.getLastId()
    }
    connected() {
        return this.adaptor.connected()
    }
}