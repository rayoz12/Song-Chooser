'use strict';

import angular from 'angular';
import $ from 'jquery';
import moment from 'moment';

export default angular
    .module('app.services.settings', [])
    .factory('app.services.settings', SettingsService).name;

/**
 * A locale with the require fields
 * @typedef {Object} Locale
 * @property {string} moment The moment string to set moment's locale.
 * @property {string} datepicker The datepicker string to set datepicker's locale
 * @property {string} currency The currency symbol for that locale
 */

const locales = {
    'en-au': {"moment": 'en-au', "datepicker": 'en-AU', "currency": "$"},
    'fr': {"moment": 'fr', "datepicker": 'fr', "currency": "€"},
    'zh-cn': {"moment": 'zh-cn', "datepicker": 'zh-CN', "currency": "¥"},
    "en-gb": {"moment": 'en-gb', "datepicker": 'en-GB', "currency": "£"},
};

SettingsService.$inject = ['$rootScope'];
/**
 * @namespace SettingsService
 * @description Pre runtime settings can be configured here and settings set.
 * @memberOf app.services
 * @param {$rootScope} $rootScope
 */
function SettingsService($rootScope) {
    const service = {};
    /**
     * Protocol of API
     * @constant
     * @type {string}
     * @memberOf app.services.SettingsService
     */
    const protocol = `${location.protocol}//`;
    /**
     * Domain name of API
     * @constant
     * @type {string}
     * @memberOf app.services.SettingsService
     */
    const url = document.domain;// + location.pathname.slice(0, -1);

    /**
     * Port of API
     * @type {string}
     * @memberOf app.services.SettingsService
     */
    let port;
    if (location.port) {
        if (location.port === "8080") {
            port = ":1337/"
        }
        else {
            port = `:${location.port}/`;
        }
    } else {
        port = "/"
    }

    /**
     * The locales already pre configured in code.
     * @constant
     * @type {Locale[]}
     * @public
     * @memberOf app.services.SettingsService
     */
    service.locales = locales;
    /**
     * The default locale to set when the app is run.
     * @public
     * @constant defaultLocaleKey
     * @type {string}
     * @memberOf app.services.SettingsService
     * @default en-au
     */
    service.defaultLocaleKey = 'en-au';
    /**
     * The default locale
     * @public
     * @constant defaultLocale
     * @memberOf app.services.SettingsService
     * @type {Locale}
     */
    service.defaultLocale = locales[service.defaultLocaleKey];
    /**
     * The complete URL for the API
     * @public
     * @constant apiAccess
     * @memberOf app.services.SettingsService
     * @type {string}
     */
    service.apiAccess = protocol + url + port;

    service.setLocale = setLocale;

    return service;

    /**
     * Sets the locale for the App with the given {@link Locale}
     * @param {Locale} localeObject The Locale you want to set.
     * @method
     * @memberOf app.services.SettingsService
     * @public
     */
    function setLocale(localeObject) {
        moment.locale(localeObject.moment);
        $.datepicker.setDefaults($.datepicker.regional[localeObject.datepicker]);
        $.datepicker.setDefaults({dateFormat: "dd-mm-yy"});
        $rootScope.currency = localeObject.currency;
    }

}