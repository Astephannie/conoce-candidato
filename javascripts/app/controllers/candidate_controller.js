jne.controller('CandidateController', ['$scope', '$window', '$http', function($scope, $window, $http) {
    $scope.candidates = {};
    
    $http.get('http://jne-api.herokuapp.com/api/v1/candidates')
    .then(
        function(response) {
            $scope.candidates = response.data.candidates;
        },
        function(error) {
            console.log(error);
        });
}]);

jne.controller('KnowWhatController', ['$scope', '$routeParams', '$http', '$location', 
    function ($scope, $routeParams, $http, $location) {
        $scope.candidate_id = $routeParams.candidateId;
        $scope.count = 0;
        $scope.total = 1;
        $scope.dont_know_count = 0;
        $scope.know_count = 0;
        $scope.dont_matter = 0;
        $scope.current_statement = "El chisme se hace esperar :)";
        
        $http.get('http://jne-api.herokuapp.com/api/v1/candidates_infos/' + $scope.candidate_id)
        .then(
            function(response) {
                $scope.statements = response.data.info;
                $scope.total = $scope.statements.length;
                setCurrentStatement();
            },
            function(error) {
                console.log(error);
            }
        );
        
        $scope.addCounter = function(btn_id) {
            switch (btn_id) {
                case 1:
                    $scope.dont_know_count++;
                    break;
                case 2:
                    $scope.know_count++;
                    break;
                case 3:
                    $scope.dont_matter++;
                    break;
                default: 
                    console.log('Error');
                    break;
            }
            $scope.count++;
            if ($scope.total == $scope.count) {
                $location.path('/resultado/' + $scope.candidate_id + '/' 
                    + $scope.total + '/' + $scope.dont_know_count + '/' + 
                    $scope.know_count + '/' + $scope.dont_matter);
            }
            setCurrentStatement();
        }
        
        function getStatementIndex(statements) {
            available = statements.filter(function(statement) {
                if (statement.hasOwnProperty("taken")) {
                    return statement.taken == false;
                }
                else {
                    return true;
                }
            })
             return Math.floor(Math.random()*available.length);
        }
        
        function setCurrentStatement() {
            $scope.last_statement_index = getStatementIndex($scope.statements);
            $scope.statements[$scope.last_statement_index].taken = true;
            $scope.current_statement = $scope.statements[$scope.last_statement_index];
        }
    }
])

jne.controller('ResultController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.candidate_id = $routeParams.candidateId;
    $scope.total = $routeParams.total;
    $scope.dontknow = $routeParams.dontknow;
    $scope.know = $routeParams.know;
    $scope.dontmatter = $routeParams.dontmatter;
    
    $http.get('http://jne-api.herokuapp.com/api/v1/candidates/' + $scope.candidate_id)
    .then(
        function(response) {
            $scope.candidate = response.data.candidate;    
        }, function(error) {
            console.log(error);
        }
    )
}])