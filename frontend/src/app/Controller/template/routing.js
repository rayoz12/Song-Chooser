import controller from './template.controller';

config.$inject = ['$routeProvider'];
export default function config($routeProvider) {
    $routeProvider.when('/template', {
        controller: controller.name,
        template: require('../../View/template/template.list.view.html'),
        controllerAs: controller.name
    })
}