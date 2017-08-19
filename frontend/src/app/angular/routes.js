"use strict";

config.$inject = ['$routeProvider'];
export default function config($routeProvider) {
    //set default routing config here
    $routeProvider.otherwise({redirectTo: '/SongChooser'});
}