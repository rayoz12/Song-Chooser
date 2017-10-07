import angular from 'angular';
import routing from './routing';
import controller from './songMaker.controller';

export default angular.module('app.songMaker', [])
    .controller(controller.name, controller)
    .config(routing).name;