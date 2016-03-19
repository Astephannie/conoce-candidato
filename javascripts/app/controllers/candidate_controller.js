jne.controller('CandidateController', ['$scope', '$http', function($scope, $http) {
    console.log('mizhaa');
    $http.get('http://jne-api.herokuapp.com/api/v1/candidates')
    .then(
        function(response) {
            console.log('mizhita');
            $scope.candidates = response.data.candidates;
        },
        function(response) {
            console.log('mizhita pof!');
            console.log(response);
        })
}])