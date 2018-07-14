import angular from 'angular';
import routing from './routing';
import controller from './templateWizard.controller';

export default angular.module('app.templateWizard', [])
    .controller(controller.name, controller)
    .config(routing).name;