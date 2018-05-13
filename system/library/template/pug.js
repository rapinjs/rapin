import pugCompiler from 'pug'
import fs from 'fs'

export default class Pug {
    constructor() {
        this.data = {}
    }

    set(key, value) {
        this.data[key] = value
    }

    render(template) {
        const content = fs.readFileSync('src/view/template/'+template+'.pug')

        return pugCompiler.render(content, this.data);
    }
}