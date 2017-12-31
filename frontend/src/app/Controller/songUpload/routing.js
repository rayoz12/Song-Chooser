import controller from './songUpload.controller';

config.$inject = ['$routeProvider'];
export default function config($routeProvider) {
    $routeProvider.when('/SongUpload/', {
        controller: controller.name,
        template: require('../../View/songUpload/songUpload.view.html'),
        controllerAs: controller.name
    })
}