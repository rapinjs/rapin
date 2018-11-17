import Registry from "../engine/registry";
import "reflect-metadata";

let registry: Registry;

export const initHelpers = (registryOption: Registry) => {
    registry = registryOption
}

export const initRegistry = (): Registry => {
   return registry
}
 