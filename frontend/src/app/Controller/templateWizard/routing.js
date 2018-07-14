import controller from './templateWizard.controller';

config.$inject = ['$routeProvider'];
export default function config($routeProvider) {
    $routeProvider.when('/templateWizard/', {
        controller: controller.name,
        template: require('../../View/templateWizard/templateWizard.view.html'),
        controllerAs: controller.name
    })
}