jne.controller('CandidateController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {
    $rootScope.candidates = {};
    
    $http.get('http://jne-api.herokuapp.com/api/v1/candidates')
    .then(
        function(response) {
            $rootScope.candidates = response.data.candidates;
        },
        function(response) {
            console.log(response);
        });
}]);

jne.controller('CandidateInfoController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $scope.get_noticed = function() {
        $scope.candidates_selected = $rootScope.candidates.filter(function(candidate) {
            if (candidate.hasOwnProperty('selected')) {
                return candidate.selected == true;
            } else {
                return false;
            }
        })
    }
}])