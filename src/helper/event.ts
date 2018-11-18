import { initRegistry, } from "./common";
import Registry from "../engine/registry";
import { isUndefined, each, filter } from "lodash";

let registry: Registry = initRegistry()
const listings = []

export const Listing = (action, type) => {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        if(isUndefined(listings[action])){
          listings[action] = []
        }
        listings[action].push({
            action: descriptor.value,
            type
        })
    }
}

export const triggerEvent = (action, type, args) => {
  const result: any = filter(listings[action], {type})

  each(result, (value) => {
    value.action(args)
  })
}

export const Trigger = (action, type) => {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
      this.triggerEvent(action, type)
    }
}