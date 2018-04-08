import {replace} from 'lodash'
import Action from './action'
import Registry from "./registry";
export default class Loader {
    constructor(registry) {
        this.registry = registry
    }

    controller(route, data) {
        let action = new Action(route.action)
        return action.execute(Registry, data)
    }
    model(route) {
        route = replace(route, /[^a-zA-Z0-9_\/]/, '')

        if (!this.registry.has('model_' + replace(route, '/', '_'))) {

            let model = new require('@model/'+route)['default']

           this.registry.set('model_' + replace(route, '/', '_'), new model(this.registry))
        }
    }
    view(route, data) {

    }
    config(route, data) {

    }
    language(route) {
        return this.registry.get('language').load(route)
    }
}