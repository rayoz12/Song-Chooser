'use strict';

import $ from 'jquery';
import angular from 'angular';
import moment from 'moment';

/**
 * @namespace app.directives
 * @memberOf app
 */
const app = angular.module('app.directives', []);
/**
 * TypeAhead implementation. This binds a keyup event to an element then calls the scope function search.
 * Please note that this is not an isolate scope it interacts with the scope it is used in.
 * @member search
 * @memberOf app.directives
 * @example <caption>HTML</caption>
 * <input search/>
 * @example <caption>JS scope callback</caption>
 * $scope.search(valueOfElement, element) {}
 */
app.directive('search', function () {
    return function ($scope, element) {
        const trigger = () => {
            const val = element.val();
            $scope.search(val, element);
        };
        element.bind("keyup", function (event) {
            const val = element.val();
            //only execute after 3 letters
            if (val.length >= 3) {
                $scope.search(val, element);
            }
        });
        //This also attaches a click handler to the search icon on the search bar if it can find it.
        //This is not clickable by default due to bootstrap disabling pointer events however some CSS
        //in index.css enables it again.
        const nextElem = element[0].nextElementSibling;
        if (nextElem.className.indexOf("fa fa-search") > -1) {
            //contains search icon, correct element to attach to
            $(nextElem).on("click", trigger);
        }
    };
})
//these conversion directives are in the format of model to UI
/**
 * Convert a number to string from the model to view. Used as a utility to auto convert without manual intervention
 * Requires ng-model
 * @member numberToString
 * @memberOf app.directives
 * @example
 * <any ng-model="..." number-to-string></any>
 */
.directive('numberToString', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(val) {
                return parseInt(val, 10);
            });
            ngModel.$formatters.push(function(val) {
                return '' + val;
            });
        }
    };
})
/**
 * Convert a string to number from the model to view. Used as a utility to auto convert without manual intervention.
 * Useful for a model that is a string while the view only allows numbers (like &lt;input type="number"/&gt;)
 * Requires ng-model
 * @member stringToNumber
 * @memberOf app.directives
 * @example
 * <any ng-model="..." string-to-number></any>
 */
.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value);
            });
        }
    };
})
/**
 * Convert a moment to string from the model to view. Used as a utility to auto convert without manual intervention.
 * Requires ng-model
 * @member momentToString
 * @memberOf app.directives
 * @example
 * <any ng-model="..." moment-to-string></any>
 */
.directive('momentToString', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return new moment(value, "DD-MM-YYYY");
            });
            ngModel.$formatters.push(function (value) {
                if (value === null || typeof value === "undefined")
                    return;
                //if the model is a string for some reason, this converts it to a moment then formats
                const date = moment(value, [moment.ISO_8601, "DD-MM-YYYY"], true);
                if (date.isValid()) {
                    return date.format("DD-MM-YYYY");
                } else {
                    return moment().format("DD-MM-YYYY");
                }
            });
        }
    };
})
/**
 * Convert an ISO date and time string to a user readable one from the model to view.
 * Used as a utility to auto convert without manual intervention.
 * Requires ng-model
 * @member prettyTime
 * @memberOf app.directives
 * @example
 * <any ng-model="..." pretty-time></any>
 */
.directive('prettyTime', function () {
    return {
        restrict: "A",
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                //view to model
                return value;
            });
            ngModel.$formatters.push(function (value) {
                //for some reason angular makes value null and calls this on page load
                //model to view
                if (value === null)
                    return;
                return value.slice(11, -5);
            });
        }
    };
})

/**
 * Initialises a jquery UI datepicker on calling elements.
 * It also converts the date picked to a date string in the format YYYY-MM-DD.
 * @member datepicker
 * @memberOf app.directives
 * @example
 * <any ng-model="..." datepicker></any>
 */
.directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModel) {
            //This creates the datepicker and sets it to update the model on change of datepicker.
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModel.$setViewValue(dateText);
                });
            };
            const options = {
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            $(elem).datepicker(options);
            //These are the formatting functions to convert the UI format (dd-mm-yy) to the model
            //format so it can be saved without being converted by the controller manually.
            //This works when the model is a string. When model is a moment use momentToString
            ngModel.$parsers.push(function (value) {
                //view to model
                const parsedMoment = moment(value, "DD-MM-YYYY", true);
                if (parsedMoment.isValid()) {
                    console.log("Directive:Datepicker", value);
                    return parsedMoment.format("YYYY-MM-DD");
                } else {
                    console.log("Date is not valid going to model, date: ", value);
                    return "";
                }
            });
            ngModel.$formatters.push(function (value) {
                //for some reason angular makes value null and calls this on page load
                //model to view
                const parsedMoment = moment(value, ["YYYY-MM-DD", moment.ISO_8601], true);
                if (parsedMoment.isValid()) {
                    console.log("Directive:Datepicker", value);
                    if (value === null || typeof value === "undefined")
                        return;
                    return parsedMoment.format("DD-MM-YYYY")
                } else {
                    console.log("Date is not valid going to view, date: ", value);
                    return null;
                }
            });
        }
    }
});

export default app.name;