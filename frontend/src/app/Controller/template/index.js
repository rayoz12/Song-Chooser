import angular from 'angular';
import routing from './routing';
import controller from './template.controller';

export default angular.module('app.template', [])
    .controller(controller.name, controller)
    .config(routing).name;