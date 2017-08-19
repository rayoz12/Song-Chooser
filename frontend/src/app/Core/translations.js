/**
 * Created by Ryan on 24/07/2017.
 */

import angular from 'angular';

let engTranslations = {
    CENTRE: 'Centre',
    CENTRE_NAME: 'Centre Name',
    WEBSITE: 'Website',
};

let chiTranslations = {
    CENTRE: '中央',
    CENTRE_NAME: '中心名称',
    WEBSITE: '网站',
};

angular.module('app').config(['$translateProvider', function ($translateProvider) {
    // add translation table
    $translateProvider
        .translations('en', engTranslations)
        .translations('zh', chiTranslations)
        .preferredLanguage('en');
}]);