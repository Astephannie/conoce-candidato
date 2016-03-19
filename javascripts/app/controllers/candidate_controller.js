jne.controller('CandidateController', ['$scope', '$window', '$http', function($scope, $window, $http) {
    $scope.candidates = {};
    $scope.showSpinner = true   ;
    
    $http.get('http://jne-api.herokuapp.com/api/v1/candidates')
    .then(
        function(response) {
            $scope.candidates = response.data.candidates;
            $scope.showSpinner = false;
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
        $scope.showSpinner = true;
        
        $http.get('http://jne-api.herokuapp.com/api/v1/candidates_infos/' + $scope.candidate_id)
        .then(
            function(response) {
                $scope.statements = response.data.info;
                $scope.total = $scope.statements.length;
                if ($scope.total == 0) {
                    alert('Aun no tenemos información disponible de este candidato. =S');
                    $location.path('/');
                }
                setCurrentStatement();
                $scope.showSpinner = false;
            },
            function(error) {
                console.log(error);
                $scope.showSpinner = false;
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
        
        // function getStatementIndex(statements) {
        //     available = statements.filter(function(statement) {
        //         if (statement.hasOwnProperty("taken")) {
        //             return statement.taken == false;
        //         }
        //         else {
        //             return true;
        //         }
        //     })
        //      return Math.floor(Math.random()*available.length);
        // }
        
        function setCurrentStatement() {
            $scope.last_statement_index = makeUniqueRandom();
            // $scope.statements[$scope.last_statement_index].taken = true;
            $scope.current_statement = $scope.statements[$scope.last_statement_index];
        }
        
        var uniqueRandoms = [];
        
        function makeUniqueRandom() {
            // refill the array if needed
            if (!uniqueRandoms.length) {
                for (var i = 0; i < $scope.total; i++) {
                    uniqueRandoms.push(i);
                }
            }
            var index = Math.floor(Math.random() * uniqueRandoms.length);
            var val = uniqueRandoms[index];
        
            // now remove that value from the array
            uniqueRandoms.splice(index, 1);
        
            return val;
        
        }
    }
])

jne.controller('ResultController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $scope.candidate_id = $routeParams.candidateId;
    $scope.total = $routeParams.total;
    $scope.dontknow = $routeParams.dontknow;
    $scope.know = $routeParams.know;
    $scope.dontmatter = $routeParams.dontmatter;
    
    var dontknow_percent = $scope.dontknow / $scope.total;
    var know_percent = $scope.know / $scope.total;
    var dontmatter_percent = $scope.dontmatter / $scope.total;
    
    if (know_percent >= 0.5) {
            $scope.message = "Muy bien, conoces a tu candidato! =)";
    } else {
        if (dontknow_percent >= 0.5) {
            $scope.message = "Infórmate más y decídete!";    
        } else {
            if (dontmatter_percent >= 0.5) {
                $scope.message = "Al parecer no te interesa la política.";
            } else {
                $scope.message = "Puedes informarte más de tu candidato si consultas nuestras fuentes. =)"
            }
        }
    }
    
    $http.get('http://jne-api.herokuapp.com/api/v1/candidates/' + $scope.candidate_id)
    .then(
        function(response) {
            $scope.candidate = response.data.candidate;    
        }, function(error) {
            console.log(error);
        }
    )
}])

jne.controller('IntroController', ['$scope', '$location', function($scope, $location) {
    var skipIntro = localStorage.getItem('skipIntro');
    if (skipIntro == 1) {
        $location.path('/home');
    }
    $scope.slide = 1;
    $scope.nextSlide = function () {
        if ($scope.slide == 3) {
            localStorage.setItem('skipIntro', 1);
            $location.path('/home');
        }
        $scope.slide++;
    }
    $scope.skipIntro = function() {
        localStorage.setItem('skipIntro', 1);
        $location.path('/home');
    }
}])