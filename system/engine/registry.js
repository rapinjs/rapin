import {isUndefined} from 'lodash'
export default class Registry {
    constructor() {
        this.data = {}
    }
    get(name) {
        return this.data[name]
    }

    set(name, value) {
        this.data[name] = value
    }

    has(name) {
        return !isUndefined(this.data[name])
    }
}