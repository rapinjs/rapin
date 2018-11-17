import { isUndefined } from 'lodash'
import Registry from '../engine/registry'

export default class Decorator {
  public registry: Registry
  constructor(registry: Registry) {
    this.registry = registry
    // global.required = this.required.bind(this)
  }

  public required(list) {
    return (target, propertyKey, descriptor) => {
      const originalMethod = descriptor.value
      descriptor.value = function(...args) {
        for (const key in list) {
          if (isUndefined(this.request.post[list[key]])) {
            this.registry.get('error').set('missing_' + list[key])
          }
        }
        if (!this.registry.get('error').get()) {
          return originalMethod.apply(this, args)
        }
      }
    }
  }
}
