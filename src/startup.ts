import './tsconfigpath'
import Router from './engine/router'
import {initPlugins} from './helper/plugin'

export const start = () => {
    initPlugins()
    const router = new Router()
    router.start()
}
