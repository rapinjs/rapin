import fs from 'fs'

export default class Template {
    constructor(adaptor){
        const filepath = 'system/library/template/'+adaptor+'.js'

        if(fs.existsSync(filepath) && fs.lstatSync(filepath).isFile()) {
            let adaptorClass = require('@system/library/template/'+adaptor)['default']
            this.adaptor = new adaptorClass()
        }
    }

    set(key, value) {
        this.adaptor.set(key, value)
    }

    render(template) {
        return this.adaptor.render(template)
    }
}