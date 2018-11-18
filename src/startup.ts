#!/usr/bin/env ts-node
import './tsconfigpath'
import Router from './engine/router'
import {initPlugins} from './helper/plugin'

initPlugins()

const router = new Router()

router.start()
