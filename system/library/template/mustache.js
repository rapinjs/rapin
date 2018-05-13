import MustacheCompiler from 'mustache';
import fs from 'fs'

export default class Mustache {
    constructor() {
        this.data = {}
    }

    set(key, value) {
        this.data[key] = value
    }

    render(template) {
        const content = fs.readFileSync('src/view/template/'+template+'.mustache')

        let output = MustacheCompiler.render(content.toString(), this.data);
        return output
    }
}