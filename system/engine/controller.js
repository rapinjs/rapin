export default class Controller {
    constructor(registry){
        this.registry = registry
        return new Proxy(this, this)

    }
    get (target, name) {
        if (name in target) {
            return target[name]
        } else {
            return this.registry.get(name)
        }
    }
}