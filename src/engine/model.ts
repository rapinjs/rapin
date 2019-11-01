/// <reference path="../types/Proxy.d.ts" />
import Registry from './registry'
export class Model {
  public registry: Registry

  constructor(registry: Registry) {
    this.registry = registry
    return new Proxy(this, this)
  }

  protected get $context() {
    return this.registry.getAll()
  }

  public get(target, name) {
    if (name in target) {
      return target[name]
    } else {
      return this.registry.get(name)
    }
  }
}
