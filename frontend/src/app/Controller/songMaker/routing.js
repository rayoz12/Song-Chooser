import controller from './songMaker.controller';

config.$inject = ['$routeProvider'];
export default function config($routeProvider) {
    $routeProvider.when('/SongMaker/', {
        controller: controller.name,
        template: require('../../View/songMaker/songMaker.view.html'),
        controllerAs: controller.name
    })
}