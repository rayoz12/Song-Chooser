import express from 'express'
import * as bodyParser from "body-parser";
import fileUpload from 'express-fileupload'

import { TemplateController } from "./controllers/template.controller";
import { RootEndpoints } from '../../SC_Common/URLEndpoints';

class App {

    public app: express.Application;

    constructor() {
        this.app = express();
        this.initialiseMiddleware();
        this.initialiseControllers();
    }

    private initialiseMiddleware() {
        this.app.use(fileUpload({ preserveExtension: true }));

        // support application/json type post data
        this.app.use(bodyParser.json());

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private initialiseControllers() {
        this.app.use(RootEndpoints.TEMPLATE, TemplateController);
    }
}

export default new App().app;