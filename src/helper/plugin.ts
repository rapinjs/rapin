import { initRegistry } from "./common"
import { config } from "../common"
import Registry from "../engine/registry"
import { each } from "lodash"
import { isUndefined } from "util"

let registry: Registry = initRegistry()
const listings = []

export const initPlugins = () => {
  each(config.plugins, value => {
    const plugin = require(value)
    listings.push(new plugin["default"]())
  })
}

export const pluginEvent = async (action, args) => {
  for (const value of listings) {
    if (!isUndefined(value[action])) {
      await value[action](args)
    }
  }
}
