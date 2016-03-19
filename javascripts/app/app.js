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
            .when('/resultado/:candidateId/:total/:dontknow/:know/:dontmatter', {
                templateUrl: '/templates/reporte.html',
                controller: 'ResultController',
                controllerAs: 'result'
            })
            .otherwise({
                redirecTo: '/'
            });

        $locationProvider.html5Mode(true);
}])