import {each, replace, join, map, split, capitalize} from 'lodash'
import Template from 'system/library/template'
import Action from './action'
import Registry from './registry'

export default class Loader {
  public registry: Registry

  constructor(registry: Registry) {
    this.registry = registry
  }

  public controller(route: string, data: object) {
    const action = new Action(route)
    return action.execute(this.registry, data)
  }

  public model(route: string) {
    route = replace(route, /[^a-zA-Z0-9_\/]/, '')

    if (!this.registry.has('model_' + replace(route, '/', '_'))) {
      let model = require('model/' + route)

      const modelName = 'Model' + join(map(split(route, '/'), (value) => (capitalize(value))), '')

      model = model[modelName]

      this.registry.set('model_' + replace(route, '/', '_'), new model(this.registry))
    }
  }

  public view(route: string, data: object) {
    route = replace(route, /[^a-zA-Z0-9_\/]/, '')

    const {templateEngine} = this.registry.get('config').get('defaultConfig')

    const template = new Template(templateEngine)

    each(data, (value, key) => {
      template.set(key, value)
    })

    const output = template.render(route)
    return output
  }

  public config(route: string) {
    this.registry.get('config').load(route)
  }

  public language(route: string) {
    return this.registry.get('language').load(route)
  }
}
