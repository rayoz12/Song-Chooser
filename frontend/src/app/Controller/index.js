//TODO: Find a way to reduce this list

import songChooser from './songChooser';
import template from './template';
import songMaker from './songMaker'
import songUpload from './songUpload';

export default angular.module('app.controllers', [
    songChooser,
    template,
	songMaker,
	songUpload
]).name;