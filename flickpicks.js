//IFFE Function
(function(){
    var flickPicks = angular.module("FlickPicks", ['firebase']);
    
    function Main($scope, $firebase) {
        $scope.favMovies = $firebase(new Firebase('https://flickpick.firebaseio.com/movies'));
        $scope.movies = [];
        $scope.favMovies.$on('value', function(){
            $scope.movies = [];
            var mvs = $scope.favMovies.$getIndex();
            for (var i = 0; i < mvs.length; i++) {
                $scope.movies.push({
                    name: $scope.favMovies[mvs[i]].name,
                    key: mvs[i]
                });
            };
        });
        
        $scope.saveToList = function(event) {
            if (event.which == 13 || event.keyCode == 13) {
                var mvName = $scope.mvName.trim();
                if(mvName.length > 0) {
                    $scope.favMovies.$add({
                        name: mvName
                    });
                    movieName.value = ';'
                }
            }
        }
        
        $scope.edit = function(index) {
            var mv = $scope.movies[index];
            var newName = prompt("update the movie name", mv.name);
            if (newName && newName.length > 0) {
                var updateMovieRef = buildEndPoint(mv.key, $firebase);
                updateMovieRef.$set({
                    name: newName;
                });
            }
        }
        
        $scope.del = function(index) {
            var mv = $scope.movies[index];
            var response = confirm("Are you sure you want to delete \"" + mv.name + "\" from the list?");
        }
    }
}());