import Registry from "../engine/registry";

let registry: Registry;

export const initHelpers = (registryOption: Registry) => {
    registry = new Registry(registryOption.getAll())
}

export const initRegistry = (): Registry => {
   return registry
}
 