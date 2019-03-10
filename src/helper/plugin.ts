import {config} from '../common'
import {each, isUndefined, isEmpty} from 'lodash'

const listings = []

export const initPlugins = () => {
  each(config.plugins, value => {
    const plugin = require(value)
    listings.push(new plugin.default())
  })
}

export const pluginEvent = async (action: string, args: any): Promise<any> => {
  for (const value of listings) {
    if (!isUndefined(value[action])) {
      const output = await value[action](args)
      if (!isEmpty(output)) {
        return output
      }
    }
  }
  return false
}
