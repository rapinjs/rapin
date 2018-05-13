import {forEach} from "lodash";
import express from 'express'
import cookieParser from 'cookie-parser'
const fileUpload = require('express-fileupload');

import Action from "./action";
import {routes} from '@config/routes'
import Request from "@system/library/request";
import Response from "@system/library/response";
import DB from "@system/library/db";
import Log from "@system/library/log";
import Cache from "@system/library/cache";
import Registry from "./registry";
import Loader from "./loader";
import Config from "@system/library/config";
import Language from "@system/library/language";

export default class Router {
    constructor () {
        this.app = express();
        this.app.use(express.json());
        this.app.use(fileUpload());
        this.app.use(cookieParser());
        this.app.use('/static', express.static(DIR_STATIC))
    }
    start() {
        this.app.use((req, res, next) => ::this.preRequest(req, res, next));
        forEach(routes, (route) => {
            if(route.type === 'GET') {
                this.app.get(route.path, (req, res) => ::this.postRequest(req, res, route))
            }
            if(route.type === 'POST') {
                this.app.post(route.path, (req, res) => ::this.postRequest(req, res, route))
            }
            if(route.type === 'PUT') {
                this.app.put(route.path, (req, res) => ::this.postRequest(req, res, route))
            }
        })

        this.app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });
    }

    preRequest(req, res, next) {
        this.registry = new Registry()
        this.registry.set('request', new Request(req))
        this.registry.set('response', new Response(res))
        this.registry.set('language', new Language())
        this.registry.set('config', new Config())
        this.registry.get('config').load('default')
        const defaultConfig = this.registry.get('config').get('defaultConfig')
        const {db_engine, db_hostname, db_username, db_password, db_database, db_port, error_filename, cache_engine, cache_expire} = defaultConfig
        this.registry.set('log', new Log(error_filename))
        this.registry.set('cache', new Cache(cache_engine, cache_expire))
        this.registry.set('load', new Loader(this.registry))
         try {
            this.registry.set('db', new DB(db_engine, db_hostname, db_username, db_password, db_database, db_port))
         } catch(e){
             this.handleError(e)
         }

         next();
    }

    postRequest(req, res, route) {
        try {
            let action = new Action(route.action)
            action.execute(this.registry)
        } catch(e){
            this.handleError(e)
        }
        res.send(this.registry.get('response').getOutput())
    }

    handleError(err) {
        this.registry.get('log').write(err.message + err.stack);
        this.registry.get('response').setOutput({status: 500, message: err.message})
    }
}