import angular from 'angular';
import routing from './routing';
import controller from './songUpload.controller';

export default angular.module('app.songUpload ', [])
    .controller(controller.name, controller)
    .config(routing).name;