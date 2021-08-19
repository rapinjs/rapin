import {each, replace, join, map, split, capitalize} from 'lodash'
import Template from '../library/template'
import Action from './action'
import Registry from './registry'
import {triggerEvent} from '../helper/event'
import { DIR_CATALOG } from '../common'

export default class Loader {
  public registry: Registry

  constructor(registry: Registry) {
    this.registry = registry
  }

  public async controller(route: string, data: object = {}) {
    await triggerEvent('controller/' + route, 'before', {data, route})
    const action = new Action(route)
    const output = await action.execute(this.registry, data)

    await triggerEvent('controller/' + route, 'after', {data, route, output})

    return output
  }

  public model(route: string) {
    route = replace(route, /[^a-zA-Z0-9_\/]/, '')

    if (!this.registry.has('model_' + replace(route, '/', '_'))) {
      let model = require(DIR_CATALOG + '/model/' + route)

      const modelName = 'Model' + join(map(split(route, '/'), (value) => (capitalize(value))), '')

      model = model[modelName]

      this.registry.set('model_' + replace(route, '/', '_'), new model(this.registry))
    }
  }

  public async view(route: string, data: object = {}) {
    route = replace(route, /[^a-zA-Z0-9_\/]/, '')

    const template = new Template()

    each(data, (value, key) => {
      template.set(key, value)
    })

    await triggerEvent('view/' + route, 'before', {route, data})

    const output = await template.render(route)

    await triggerEvent('view/' + route, 'after', {route, data, output})

    return output
  }

  public config(route: string) {
    this.registry.get('config').load(route)
  }

  public language(route: string) {
    return this.registry.get('language').load(route)
  }
}
