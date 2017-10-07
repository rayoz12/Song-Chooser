import controller from './songMaker.controller';

config.$inject = ['$routeProvider'];
export default function config($routeProvider) {
    $routeProvider.when('/SongChooser/:template?', {
        controller: controller.name,
        template: require('../../View/songChooser/songChooser.view.html'),
        controllerAs: controller.name
    })
}