import { initRegistry, } from "./common";
import Registry from "../engine/registry";
import { isUndefined } from "lodash";

let registry: Registry = initRegistry()
const listings = []

export const Listing = (action, type) => {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        if(isUndefined(listings[action])){
          listings[action] = []
        }
        listings[action].push({
            action: descriptor.value
        })
    }
}

export const triggerEvent = (action, type, args) => {
  console.log(action)
  console.log(type)
  console.log(args)
}

export const Trigger = (action, type) => {
    return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
      this.triggerEvent(action, type)
    }
}