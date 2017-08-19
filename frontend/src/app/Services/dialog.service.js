'use strict';

import angular from 'angular';
import BootstrapDialog from 'bootstrap3-dialog';
import $ from 'jquery';

export default angular.module('app.services.dialog', [])
    .factory('app.services.dialog', DialogService).name;

DialogService.$inject = [];
/**
 * @namespace DialogService
 * @description Create a variety of dialogs to alert the user.
 * @memberOf app.services
 */
function DialogService() {
    const service = {};
    //these change the colour on the dialog
    /**
     * Enum that describes the different types of dialogs that can be displayed.
     * @readonly
     * @enum {String}
     */
    service.dialogTypes = {
        default: BootstrapDialog.TYPE_DEFAULT,
        info: BootstrapDialog.TYPE_INFO,
        primary: BootstrapDialog.TYPE_PRIMARY,
        success: BootstrapDialog.TYPE_SUCCESS,
        warning: BootstrapDialog.TYPE_WARNING,
        danger: BootstrapDialog.TYPE_DANGER
    };

    /**
     * Informational dialog
     * @param {string} title The title for the dialog
     * @param {string} message The message in the dialog.
     * @param {String} [type=dialogTypes.info] The type of dialog to use when
     * @param {Function} [callback=null] An optional callback to execute when the dialog is closed.
     *      An instance of the closed dialog is supplied.
     * @method dialog
     * @memberOf app.services.DialogService#
     */
    service.dialog = function (title, message, type=service.dialogTypes.info, callback=null) {
        return BootstrapDialog.show({
            type: type,
            title: title,
            message: message,
            onhidden: (dialog) => {
                if (callback !== null) {
                    callback(dialog);
                }
            },
            buttons: [{
                label: 'Close',
                action: function (dialog) {
                    dialog.close();
                }
            }]
        })
    };
    /**
     * Error dialog
     * @param {string} title The title for the dialog
     * @param {string} message The message in the dialog.
     * @param {Function} [callback=null] An optional callback to execute when the dialog is closed.
     *      An instance of the closed dialog is supplied.
     * @method errorDialog
     * @memberOf app.services.DialogService#
     * @return {BootstrapDialog} The created bootstrap dialog instance.
     */
    service.errorDialog = function (title, message, callback = null) {
        return BootstrapDialog.show({
            type: BootstrapDialog.TYPE_DANGER,
            title: title,
            message: message,
            onhidden: (dialog) => {
                if (callback !== null) {
                    callback(dialog);
                }
            },
            buttons: [{
                label: 'Close',
                action: function (dialog) {
                    dialog.close();
                }
            }]
        });
    };
    /**
     * Specialised method that generates a dialog for CRUDService.
     * @param {string} verb CRUD verb
     * @param {string} tableName TableName is the name of data for verb
     * @method dataFail
     * @memberOf app.services.DialogService#
     */
    service.dataFail = function (verb, tableName) {

        const activeCrudDialogs = $.grep(Object.keys(BootstrapDialog.dialogs), function (dialog) {
            if (BootstrapDialog.dialogs[dialog].getData('crudDialog')) {
                return dialog;
            }
        });
        if (activeCrudDialogs.length > 1) {
            //stop opening more CRUD dialogs, max 2 at a time
            console.log("not showing CRUD dialog, verb:", tableName, ", table:", tableName);
            return;
        }
        BootstrapDialog.show({
            type: BootstrapDialog.TYPE_DANGER,
            title: "Failed to " + verb + " " + tableName,
            message: generateErrorMessage(verb, tableName),
            data: {
                'crudDialog': true
            },
            buttons: [{
                label: 'Close',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]
        })
    };

    service.requestDialog = function(title, message) {
        return BootstrapDialog.show({
            title: title,
            message: message,
            buttons: [{
                label: 'Close',
                action: function (dialogItself) {
                    dialogItself.close();
                }
            }]
        });
    };

    return service;
    /**
     * Builds a string based the verb and tableName
     * @param {string} verb CRUD verb
     * @param {string} tableName tableName is the name of data for verb
     * @private
     * @method
     * @memberOf app.services.DialogService#
     * @returns {string} The built string
     */
    function generateErrorMessage(verb, tableName) {
        let str = "Failed to " + verb + " for " + tableName + ". Please try again later.\n";
        str += "Possible reasons for the failure: \n" +
            "1. The server is offline\n" +
            "2. You haven't logged in\n" +
            "3. The record can't be deleted because it has associated records.";
        return str;
    }
}