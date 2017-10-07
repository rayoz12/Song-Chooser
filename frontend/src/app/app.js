'use strict';
//NOTE ALL IMPORTS ARE LOADED BEFORE FILE IS EXECUTED

//import css
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'jquery-ui-themes/themes/flick/jquery-ui.min.css';
import 'jquery-ui-themes/themes/flick/theme.css';
import 'angular-xeditable/dist/css/xeditable.min.css';
import '../app/CSS/index.css';
import '../app/CSS/app.css';

//JS Frameworks
import 'jquery';
import 'jquery-ui';
import angular from 'angular';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap3-dialog/dist/css/bootstrap-dialog.min.css'
import 'sortablejs';
import 'angular-legacy-sortablejs-maintained'
import 'angular-route';
import 'angular-xeditable';
import 'angular-file-saver';
import angularUI from 'angular-ui-bootstrap';
//locales
import 'moment/min/locales.min';
import 'jquery-ui/ui/i18n/datepicker-en-AU';
import 'jquery-ui/ui/i18n/datepicker-fr';
import 'jquery-ui/ui/i18n/datepicker-zh-CN';
import 'jquery-ui/ui/i18n/datepicker-en-GB';
//Angular configuration
import config from './angular/config';
import routing from './angular/routes';
import run from './angular/run';
//App Features
import services from './Services';
import directives from './angular/directives';
import filters from './angular/filters';
import controllers from './Controller';

//some comments

/**
 * The entry point of the web app
 * @namespace app
 */
const app = angular.module('app', ['ngRoute', 'xeditable', "ng-sortable", angularUI, controllers, services, directives, filters]);
app.config(config);
app.config(routing);
app.run(run);



