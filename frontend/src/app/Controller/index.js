//TODO: Find a way to reduce this list

import songChooser from './songChooser';
import template from './template';
import songMaker from './songMaker'

export default angular.module('app.controllers', [
    songChooser,
    template,
	songMaker
]).name;