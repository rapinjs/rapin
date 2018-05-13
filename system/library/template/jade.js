import jadeCompiler from 'jade'
import fs from 'fs'

export default class Jade {
    constructor() {
        this.data = {}
    }

    set(key, value) {
        this.data[key] = value
    }

    render(template) {
        const content = fs.readFileSync('src/view/template/'+template+'.jade')
        const fn = jadeCompiler.compile(content, this.data);
        return fn();
    }
}