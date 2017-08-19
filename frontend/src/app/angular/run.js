import DialogService from '../Services/dialog.service';
import SettingsService from '../Services/settings.service';



run.$inject = ['$rootScope', '$location', DialogService, SettingsService, '$templateCache'];
/**
 * @description
 *      Configures app when started. It checks if the user's session is stored in cache and restores with that.
 *      Also configures angular to enforce user login to visit any pages.
 *      This also sets defaults on datepicker and locales
 *      Templates are also set here to be used anywhere in the app.
 * @memberOf app
 * @member run
 * @method
 * @param {$rootScope} $rootScope
 * @param {$location} $location
 * @param {DialogService} DialogService
 * @param {SettingsService} SettingsService
 */
export default function run($rootScope, $location, DialogService, SettingsService, $templateCache) {
    //set templates
    $templateCache.put('header-nav.html', require("../View/Templates/header-nav.html"));
    $templateCache.put('sidebar-nav.html', require("../View/Templates/sidebar-nav.html"));
}