import {replace, each} from 'lodash'
import Action from './action'
import Registry from "./registry";
import Template from "@system/library/template";
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
        route = replace(route, /[^a-zA-Z0-9_\/]/, '')

        const {template_engine} = this.registry.get('config').get('defaultConfig')

        let template = new Template(template_engine)
        each(data, (key, value) => {
            template.set(key, value)
        })

        const output = template.render(route)
        return output
    }
    config(route, data) {

    }
    language(route) {
        return this.registry.get('language').load(route)
    }
}