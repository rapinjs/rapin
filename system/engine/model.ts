export class Model {
  public registry: any
  constructor(registry) {
    this.registry = registry
    return new Proxy(this, this)
  }
  public get(target, name) {
    if (name in target) {
      return target[name]
    } else {
      return this.registry.get(name)
    }
  }
}
