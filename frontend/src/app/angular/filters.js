import angular from 'angular';
import moment from 'moment';

/**
 * @namespace app.filters
 * @memberOf app
 */
const app = angular.module('app.filters', []);
/**
 * Converts UTC Dates to australian dates via moment
 * @member prettyDate
 * @memberOf app.filters
 * @example <caption>HTML</caption>
 * {{model.field | prettyDate}}
 */
app.filter('prettyDate', function () {
    return function (item) {
        return moment(item).format("DD-MM-YYYY");
    };
});

/**
 * Converts UTC Times to a more readable format
 * @member prettyTime
 * @memberOf app.filters
 * @example <caption>HTML</caption>
 * {{model.field | prettyTime}}
 */
app.filter('prettyTime', function () {
    return function (item) {
        if (typeof item === "string")
            return item.slice(11, -5);
        return item;
    };
});

export default app.name;