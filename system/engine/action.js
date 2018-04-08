import {split, join, replace, isEmpty} from 'lodash'
import fs from 'fs'
export default class Action {
    constructor(route) {
        const parts =split(replace(route, /[^a-zA-Z0-9_\/]/, ''), '/')

        while(parts) {
            const filename = 'src/controller/'+join(parts, '/')+'.js'
                  if(isEmpty(parts)){
                break;
            }
            if(fs.existsSync(filename) && fs.lstatSync(filename).isFile()){
                this.route = join(parts, '/');

                break;
            } else {
                this.method = parts.pop()
            }
        }
    }
    execute (registry, args = {}) {
        let controller = new require('@controller/'+this.route)['default']

        controller = new controller(registry)

        return controller[this.method](args)
    }
}