
import angular from 'angular';

import CRUDService from '../Services/crud.service';
import DialogService from '../Services/dialog.service';
import FlashService from '../Services/flash.service';
import SettingsService from '../Services/settings.service';
import UtilityService from '../Services/utility.service';
import SongService from './song.service'
/**
 * App services
 * @namespace app.services
 * @memberOf app
 */
export default angular
    .module('app.services', [
        CRUDService,
        DialogService,
        FlashService,
        SettingsService,
        UtilityService,
		SongService,
    ]).name;