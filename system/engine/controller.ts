import Registry from 'system/engine/registry'

export class Controller {
  protected registry: Registry

  constructor(registry: Registry) {
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
