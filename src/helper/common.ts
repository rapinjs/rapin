import Registry from "../engine/registry";

let registry: Registry;

export const initHelpers = (registryOption: Registry) => {
    registry = registryOption
}

export const initRegistry = (): Registry => {
   return registry
}
 