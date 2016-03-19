var jne = angular.module('jne', ['ngRoute']);


jne.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'CandidateController',
                controllerAs: 'candidateCtrl'
            })
            .when('/sabias-que/:candidateId', {
                templateUrl: '/templates/sabias-que.html',
                controller: 'KnowWhatController',
                controllerAs: 'knowwhat'
            })
            .when('/resultado', {
                templateUrl: '/templates/reporte.html'
            })
            .otherwise({
                redirecTo: '/'
            });

        $locationProvider.html5Mode(true);
}])