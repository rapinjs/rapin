import Registry from './registry'
/// <reference path="../types/Proxy.d.ts" />
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
