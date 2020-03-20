import {config} from '../common'
import {each, isUndefined, isEmpty} from 'lodash'
import { Logger } from '../logger'

const listings = []

export const initPlugins = () => {
  each(config.plugins, value => {
    let logger = new Logger(`Init plugin - ${value}`)
    const plugin = require(value)
    listings.push({
      name: value,
      plugin: new plugin.default()
    })
    logger.end()
  })
}

export const pluginEvent = async (action: string, args: any): Promise<any> => {
  for (const value of listings) {
    if (!isUndefined(value.plugin[action])) {

      let logger = new Logger(`Event plugin(${action}) - ${value.name}`)
      const output = await value.plugin[action](args)
      if (!isEmpty(output)) {
        return output
      }
      logger.end()
    }
  }
  return false
}
