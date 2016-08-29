var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/partials/home.html',
      controller: "homeController"
    })
    .when('/faves', {
      templateUrl: '/views/partials/faves.html',
      controller: "favesController"
    })
    .otherwise({
      redirectTo: '/home'
    })
}]);

myApp.controller("homeController", ["$scope", "$http", function($scope, $http) {
  var key = '6548e87d74878b803546bec3eaa699fb';
  var baseURL = 'http://api.petfinder.com/';

  $scope.petTypes = ['barnyard', 'bird', 'cat', 'dog', 'horse', 'pig', 'reptile', 'smallfurry'];
  console.log($scope.petTypes);

  $scope.getRandomPet = function() {
    var query = baseURL + 'pet.getRandom';
    query += '?key=' + key;
    query += '&animal=' + $scope.selectedPetType;
    query += '&output=basic';
    query += '&format=json';

    console.log('query: ', query);

    var request = encodeURI(query) + '&callback=JSON_CALLBACK';

    $http.jsonp(request).then(function(response) {
      $scope.pet = response.data.petfinder.pet
      console.log($scope.pet);
    });
  }

  $scope.addFavorite = function() {
      console.log($scope.pet);
      console.log($scope.pet.id.$t);
      var description = $scope.pet.description.$t;
      var petReq = {
          name: $scope.pet.name.$t,
          photo: $scope.pet.media.photos.photo[0].$t,
          description: description.substring(0,100),
          id: $scope.pet.id.$t
      };

      console.log(petReq);
      $http({
          method: "POST",
          url: '/favesroute',
          data: petReq,
      }).then(function() {
          console.log("Added to favorites");
      }, function() {
          console.log("Ugh, this sucks.");
      });
  }

}]);
