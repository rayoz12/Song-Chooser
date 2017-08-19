import angular from 'angular';
import routing from './routing';
import controller from './songChooser.controller';

export default angular.module('app.songChooser', [])
    .controller(controller.name, controller)
    .config(routing).name;