
import * as glob from 'glob'
import {replace, isUndefined} from 'lodash'
import Registry from '../engine/registry'
const results = []
let controllerPath: string = ''
let registry: Registry

export const Auth = () => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    for (const key in results) {
      if (results[key].action === controllerPath + '/' + propertyKey) {
        results[key].auth = true
      }
    }
  }
}

export const GET = (path, type = 'json') => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    results.push({
      path,
      type: 'GET',
      contentType: type,
      auth: false,
      action: controllerPath + '/' + propertyKey,
    })
  }
}

export const POST = (path, type = 'json') => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    results.push({
      path,
      type: 'POST',
      contentType: type,
      auth: false,
      action: controllerPath + '/' + propertyKey,
    })
  }
}
export const DELETE = (path, type = 'json') => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    results.push({
      path,
      type: 'DELETE',
      contentType: type,
      auth: false,
      action: controllerPath + '/' + propertyKey,
    })
  }
}

export const PUT = (path, type = 'json') => {
  return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
    results.push({
      path,
      type: 'PUT',
      contentType: type,
      auth: false,
      action: controllerPath + '/' + propertyKey,
    })
  }
}

export const required = (list) => {
  return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
    const originalMethod = descriptor.value
    descriptor.value = function(...args: any[]) {
      for (const key in list) {
        if (isUndefined(registry.get('request').post[list[key]])) {
          registry.get('error').set('missing_' + list[key])
        }
      }
      if (!registry.get('error').get()) {
        return originalMethod.apply(this, args)
      }
    }
  }
}

export const routes = (registryOption: Registry) => {
  registry = registryOption
  const controllers = glob.sync('src/controller/**/*.ts')

  for (const controller of controllers) {
    controllerPath = replace(controller, 'src/controller/', '')
    controllerPath = replace(controllerPath, '.ts', '')
    require('src/controller/' + controllerPath).default
  }

  return results
}
