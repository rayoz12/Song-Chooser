'use strict';

import angular from 'angular';

export default angular.module('app.services.utility', [])
    .factory('app.services.utility', UtilityService).name;

UtilityService.$inject = [];
/**
 * @namespace UtilityService
 * @description Provides a set of utility functions
 * @memberOf app.services
 */
function UtilityService() {
    const service = {};

    service.getDate = getDate;
    service.getTime = getTime;
    service.getRecordByID = getRecordByID;

    return service;
    /**
     * Get the current date as a string in the format of YYYY-MM-DD
     * @method
     * @memberOf app.services.UtilityService#
     * @returns {string} A string in the format of YYYY-MM-DD
     */
    function getDate() {
        const date = new Date();
        return date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);
    }

    /**
     * Get the current time as a string in format of HH:MM:SS
     * @method
     * @memberOf app.services.UtilityService#
     * @returns {string} A string in the format of HH:MM:SS
     */
    function getTime() {
        const date = new Date();
        return ('0' + (date.getHours())).slice(-2) + ":" + ('0' + (date.getMinutes())).slice(-2) + ":" + ('0' + date.getSeconds()).slice(-2);
    }

    /**
     * Get a record from an Array with a given ID
     * @param {Object[]} records an array of records to search through
     * @param {number|string} id ID of the record to find
     * @method
     * @memberOf app.services.UtilityService#
     * @returns {null|Object} The Object if it is found or null if not
     */
    function getRecordByID(records, id) {
        let returnVal = records.find(function (item) {
            return item.id === id;
        });
        if (typeof returnVal === "undefined") {
            return null;
        }
        else {
            return returnVal;
        }
    }
}