/**
* Created by Ryan on 6/02/2017.
*/
'use strict';
import angular from 'angular'
import $ from 'jquery';
import DialogService from './dialog.service';
import SettingsService from './settings.service';

export default angular.module('app.services.crud', [])
    .factory('app.services.crud', CRUDService).name;
/**
 * @ignore
 */
CRUDService.$inject = ['$http', DialogService, SettingsService];
function CRUDService($http, DialogService, SettingsService) {
    //model is a String indicating what the CRUD is under. E.g for company
    //new CRUDService("Company"), this will generate requests like: 'http://localhost:1337/Company/getAll
    /**
     * @namespace CRUDService
     * @description A class that maps the web api to callable methods
     * @memberOf app.services
     * @param api The mounting point of the data you want to access
     * @constructor
     */
    const crud = function (api) {
        this.api = api;
        this.completeURL = SettingsService.apiAccess + this.api;
    };
    //static vars

    /**
     * Gets All of the API
     * @method GetAll
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object[]>} A Promise that resolves with an array of all the records
     */
    crud.prototype.GetAll = function (paginationOptions = {}) {
        if (Object.keys(paginationOptions).length !== 0) paginationOptions.paging = "1";
        const url = this.completeURL + '/GetAll?' + $.param(paginationOptions);
        console.log("GET ", url, ": Request");
        const api = this.api;
        return $http.get(url).then(handleSuccess, function (reason) {
            DialogService.dataFail("get all", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Gets a record by ID
     * @method GetById
     * @param id The ID of the record.
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object>} A Promise that resolves with an array of all the records
     */
    crud.prototype.GetById = function (id) {
        const url = this.completeURL + '/GetById';
        console.log("GET ", url, ": Request:", id);
        const api = this.api;
        return $http.get(url, {params: {"id": id}}).then(handleSuccess, function (reason) {
            DialogService.dataFail("get ID", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Create a new record
     * @method Create
     * @param {Object} newCrud An object
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object>} A Promise that resolves with an object with an inserted_id field (referenced as return.data.inserted_id)
     */
    crud.prototype.Create = function (newCrud) {
        const url = this.completeURL + '/Create';
        normaliseMetaFields(newCrud);
        checkIDArray(newCrud);
        console.log("POST", url, ": Request:", newCrud);
        const api = this.api;
        return $http.post(url, newCrud).then(handleSuccess, function (reason) {
            DialogService.dataFail("Creating", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Create Batch records on the mount point.
     * @method CreateBatch
     * @param {Object[]} newCruds
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object[]>} A Promise that resolves with an array of inserted_id's
     */
    crud.prototype.CreateBatch = function (newCruds) {
        const url = this.completeURL + '/CreateBatch';
        console.log("POST", url, ": Request:", newCruds);
        for (let i=0;i<newCruds.length;i++) {
            normaliseMetaFields(newCruds[i]);
            checkIDArray(newCruds[i]);
        }
        const api = this.api;
        return $http.post(url, {data: newCruds}).then(handleSuccess, function (reason) {
            DialogService.dataFail("CreateBatch", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Update a record with the ID in updatedCrud. The model's fields must map to the values to update. Any fields not in the model will be ignored.
     * @method Update
     * @param {Object} updatedCrud The Updated record must have a key ID with the id of the record
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object[]>} A Promise that resolves with an array of all the records
     */
    crud.prototype.Update = function (updatedCrud) {
        const url = this.completeURL + '/Edit';
        console.log("PUT ", url, ": Request:", updatedCrud);
        normaliseMetaFields(updatedCrud);
        checkIDArray(updatedCrud);
        const api = this.api;
        return $http.put(url, updatedCrud).then(handleSuccess, function (reason) {
            DialogService.dataFail("Update", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Update records given in the array
     * @method UpdateBatch
     * @param {Object[]} updatedCruds An Array of record objects
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object[]>} A Promise that resolves with an array of all the records
     */
    crud.prototype.UpdateBatch = function (updatedCruds) {
        const url = this.completeURL + '/EditBatch';
        console.log("PUT ", url, ": Request:", updatedCruds);
        for (let i=0;i<updatedCruds.length;i++) {
            normaliseMetaFields(updatedCruds[i]);
            checkIDArray(updatedCruds[i]);
        }
        const api = this.api;
        return $http.put(url, {data: updatedCruds}).then(handleSuccess, function (reason) {
            DialogService.dataFail("Batch Update", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Delete a record with the given ID
     * @param {Number|String} id The ID of the record to delete
     * @method Delete
     * @memberOf app.services.CRUDService#
     * @returns {Promise} A promise that resolves with no data
     */
    crud.prototype.Delete = function (id) {
        const url = this.completeURL + '/Delete';
        console.log("POST", url, ": Request:", id);
        const api = this.api;
        return $http.post(url, {'id': id}).then(handleSuccess, function (reason) {
            DialogService.dataFail("Delete", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Delete records from the table conditionally. If no fields from the model are matched an error is thrown
     * @method DeleteWhere
     * @param {Object} filter Maps fields to values to match
     * @memberOf app.services.CRUDService#
     * @returns {Promise} A Promise that resolves with an array of all the records
     */
    crud.prototype.DeleteWhere = function (filter) {
        const url = this.completeURL + '/DeleteWhere';
        console.log("POST", url, ": Request:", filter);
        const api = this.api;
        return $http.post(url, filter).then(handleSuccess, function (reason) {
            DialogService.dataFail("Delete Where", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Find records that match the filter provided.
     * @method Where
     * @param {Object} filter A filter which maps model's fields to the values to select.
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object[]>} A Promise that resolves with an array of the selected records
     */
    crud.prototype.Where = function (filter) {
        const url = this.completeURL + '/Where';
        console.log("POST", url, ": Request:", filter);
        const api = this.api;
        return $http.post(url, filter).then(handleSuccess, function (reason) {
            DialogService.dataFail("Where", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Inner join Tables requested with an optional where filter to select records.
     * @description When using a where filter to filter for columns from other tables you must specify which table it is from
     * instead of just the column name. E.G. "Roll.centre_id" when the CRUD API is Booking. rather than just centre_id.
     * @method InnerJoin
     * @param {Object[]} fields An Object that describes the tables and columns to inner join on.
     * @param {Object} whereFilter An optional filter to select particular records. Pass null if you don't this need a filter.
     * @param {Object} [paginationOptions={}] Options for pagination
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object[]>} A Promise that resolves with an array of all the records
     */
    crud.prototype.InnerJoin = function (fields, whereFilter, paginationOptions={}) {
        if (Object.keys(paginationOptions).length !== 0) paginationOptions.paging = "1";
        const url = this.completeURL + '/InnerJoin?' + $.param(paginationOptions);
        console.log("POST", url, ": Request:", fields, whereFilter);
        const api = this.api;
        return $http.post(url, {'data': fields, "where": whereFilter}).then(handleSuccess, function (reason) {
            DialogService.dataFail("InnerJoin", api);
            return {success: false, message: reason};
        });
    };

    /* Naming Convention for transactions
     * <Verb>Transaction: Denotes an action taken on a transaction
     * Transaction<CRUDVerb>: Denotes adding an operation or statement to a transaction.
     */

    /**
     * Starts a new transaction
     * @description Starts a new transaction on the server.
     * @method newTransaction
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object>} A Promise that resolves with the transaction id.
     */
    crud.prototype.newTransaction = function () {
        const url = this.completeURL + '/Transaction/New';
        console.log("GET ", url);
        const api = this.api;
        return $http.get(url).then(handleSuccess, function (reason) {
            DialogService.dataFail("new transaction", api);
            return {success: false, message: reason};
        });
    };

    crud.prototype.runTransaction = function (transaction_id) {
        const url = this.completeURL + '/Transaction/Run';
        console.log("POST", url, transaction_id);
        const api = this.api;
        return $http.post(url, {transaction: transaction_id}).then(handleSuccess, function (reason) {
            DialogService.dataFail("run transaction", api);
            return {success: false, message: reason};
        });
    };

    crud.prototype.cancelTransaction = function (transaction_id) {
        const url = this.completeURL + '/Transaction/Cancel';
        console.log("POST ", url);
        const api = this.api;
        return $http.post(url, {transaction: transaction_id}).then(handleSuccess, function (reason) {
            DialogService.dataFail("cancel transaction", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Create a new record
     * @method TransactionCreate
     * @param {Object} newCrud An object
     * @param {Number|String} transactionId The transaction to add to.
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object>} A Promise that resolves with an object with an inserted_id field (referenced as return.data.inserted_id)
     */
    crud.prototype.TransactionCreate = function (newCrud, transactionId) {
        const url = this.completeURL + '/Transaction/Create';
        normaliseMetaFields(newCrud);
        console.log("POST", url, ": Request:", newCrud);
        const api = this.api;
        return $http.post(url, {data: newCrud, transaction: transactionId}).then(handleSuccess, function (reason) {
            DialogService.dataFail("Creating", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Create Batch records on the mount point.
     * @method TransactionCreateBatch
     * @param newCruds
     * @param {Number|String} transactionId The transaction to add to.
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object[]>} A Promise that resolves with an array of inserted_id's
     */
    crud.prototype.TransactionCreateBatch = function (newCruds, transactionId) {
        const url = this.completeURL + '/Transaction/CreateBatch';
        console.log("POST", url, ": Request:", newCruds);
        for (let i=0;i<newCruds.length;i++)
            normaliseMetaFields(newCruds[i]);
        const api = this.api;
        return $http.post(url, {data: newCruds, transaction: transactionId}).then(handleSuccess, function (reason) {
            DialogService.dataFail("CreateBatch", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Update a record with the ID in updatedCrud. The model's fields must map to the values to update. Any fields not in the model will be ignored.
     * @method TransactionUpdate
     * @param {Object} updatedCrud The Updated record must have a key ID with the id of the record
     * @param {Number|String} transactionId The transaction to add to.
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object[]>} A Promise that resolves with an array of all the records
     */
    crud.prototype.TransactionUpdate = function (updatedCrud, transactionId) {
        const url = this.completeURL + '/Transaction/Edit';
        console.log("PUT ", url, ": Request:", updatedCrud);
        normaliseMetaFields(updatedCrud);
        const api = this.api;
        return $http.put(url, {data: updatedCrud, transaction: transactionId}).then(handleSuccess, function (reason) {
            DialogService.dataFail("Update", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Update records given in the array
     * @method TransactionUpdateBatch
     * @param {Object[]} updatedCruds An Array of record objects
     * @param {Number|String} transactionId The transaction to add to.
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object[]>} A Promise that resolves with an array of all the records
     */
    crud.prototype.TransactionUpdateBatch = function (updatedCruds, transactionId) {
        const url = this.completeURL + '/Transaction/EditBatch';
        console.log("PUT ", url, ": Request:", updatedCruds);
        for (let i=0;i<updatedCruds.length;i++)
            normaliseMetaFields(updatedCruds[i]);
        const api = this.api;
        return $http.put(url, {data: updatedCruds, transaction: transactionId}).then(handleSuccess, function (reason) {
            DialogService.dataFail("Batch Update", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Delete a record with the given ID
     * @param {Number|String} id The ID of the record to delete
     * @param {Number|String} transactionId The transaction to add to.
     * @method TransactionDelete
     * @memberOf app.services.CRUDService#
     * @returns {Promise} A promise that resolves with no data
     */
    crud.prototype.TransactionDelete = function (id, transactionId) {
        const url = this.completeURL + '/Transaction/Delete';
        console.log("POST", url, ": Request:", id);
        const api = this.api;
        return $http.post(url, {data: {id}, transaction: transactionId}).then(handleSuccess, function (reason) {
            DialogService.dataFail("Delete", api);
            return {success: false, message: reason};
        });
    };

    /**
     * Delete records from the table conditionally. If no fields from the model are matched an error is thrown
     * @method TransactionDeleteWhere
     * @param {Object} filter Maps fields to values to match
     * @param {Number|String} transactionId The transaction to add to.
     * @memberOf app.services.CRUDService#
     * @returns {Promise} A Promise that resolves with an array of all the records
     */
    crud.prototype.TransactionDeleteWhere = function (filter, transactionId) {
        const url = this.completeURL + '/Transaction/DeleteWhere';
        console.log("POST", url, ": Request:", filter);
        const api = this.api;
        return $http.post(url, {data: filter, transaction: transactionId}).then(handleSuccess, function (reason) {
            DialogService.dataFail("Delete Where", api);
            return {success: false, message: reason};
        });
    };

    //data is JSON for which the endpoint expects, endpoint is a String of the endpoint, must have a /(slash) at the front
    //method must be one angular expects.
    /**
     * Request a custom endpoint
     * @param {String} endPoint The mount point of the endpoint under the api.
     * @param {Object} data The data to pass to the endpoint
     * @param {String} method the HTTP method to access the endpoint. $http must support the method.
     * @method customEndpoint
     * @memberOf app.services.CRUDService#
     * @returns {Promise<Object>} A Promise that resolves with an array of the response from the server.
     */
    crud.prototype.customEndpoint = function (endPoint, data, method) {
        const url = this.completeURL + endPoint;
        data = data || {};
        data = (method === "get" ? {params: data} : data);
        console.log(method.toUpperCase(), url, ": Request:", data);
        return $http[method](url, data).then(handleSuccess, function (reason) {
            DialogService.dataFail("Custom", api);
            return {success: false, message: reason};
        });
    };

    // private functions
    /**
     * Removes redundant data before sending request.
     * @private
     * @method normaliseMetaFields
     * @memberOf app.services.CRUDService#
     * @param {Object} data record to normalise
     */
    function normaliseMetaFields(data) {
        if (data.hasOwnProperty("owner")) {
            if (Array.isArray(data.owner)) {
                data.owner = data.owner[0];
            }
        }
        if (data.hasOwnProperty("created_by")) {
            if (Array.isArray(data.created_by)) {
                data.created_by = data.created_by[0];
            }
        }
        if (data.hasOwnProperty("last_modified_by")) {
            if (Array.isArray(data.last_modified_by)) {
                data.last_modified_by = data.last_modified_by[0];
            }
        }
        if (data.hasOwnProperty("created_at")) {
            if (Array.isArray(data.created_at)) {
                data.created_at = data.created_at[0];
            }
        }
        if (data.hasOwnProperty("last_updated_at")) {
            if (Array.isArray(data.last_updated_at)) {
                data.last_updated_at = data.last_updated_at[0];
            }
        }
    }

    function checkIDArray(object) {
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                if (key.indexOf("id") > -1 && object[key] !== null) {
                    if (object[key].constructor === Array) {
                        //this is an id field that is an array, issue a warning.
                        console.log(`WARNING: KEY ${key} has an Array as value: ${object[key]}`);
                    }
                }
            }
        }
    }

    function handleSuccess(res) {
        console.log(res.config.method, res.config.url, ": Response:", res.data);
        return res.data;
    }

    return crud;
}