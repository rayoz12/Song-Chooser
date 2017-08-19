'use strict';

import angular from 'angular';

export default  angular.module('app.services.flash', [])
    .factory('app.services.flash', FlashService).name;

FlashService.$inject = ['$rootScope'];
function FlashService($rootScope) {
    var service = {};

    service.Success = Success;
    service.Error = Error;
    service.Clear = Clear;

    initService();

    return service;

    function initService() {
        $rootScope.$on('$locationChangeStart', function () {
            clearFlashMessage();
        });

        function clearFlashMessage() {
            var flash = $rootScope.flash;
            if (flash) {
                if (!flash.keepAfterLocationChange) {
                    delete $rootScope.flash;
                } else {
                    // only keep for a single location change
                    flash.keepAfterLocationChange = false;
                }
            }
        }
    }

    function Success(message, keepAfterLocationChange) {
        $rootScope.flash = {
            message: message,
            type: 'success',
            keepAfterLocationChange: keepAfterLocationChange
        };
    }

    function Error(message, keepAfterLocationChange) {
        $rootScope.flash = {
            message: message,
            type: 'error',
            keepAfterLocationChange: keepAfterLocationChange
        };
    }

    function Clear() {
        var flash = $rootScope.flash;
        if (flash) {
            delete $rootScope.flash;
        }
    }
}