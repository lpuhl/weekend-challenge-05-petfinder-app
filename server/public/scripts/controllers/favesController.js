myApp.controller("favesController", ["$scope", "$http", function($scope, $http) {
  console.log("pet faves controller working!");
  $scope.pet = "";
  $scope.pets = [];
  getPets();

  // retrieve tasks from the server
  function getPets() {
    $http.get('/favesroute').then(function(response) {
      console.log('data', response.data);
      $scope.pets = response.data;
      $scope.petCount = $scope.pets.length;
      console.log($scope.petCount);
    });

  }
}]);

  // // send update request to server for this task
  // $scope.completeTask = function(id) {
  //   console.log('this task id ', id);
  //
  //   $http.put('/tasks/' + id, {taskID: id})
  //     .then(function(response) {
  //       if(response.status == 200) {
  //         getTasks();
  //       } else {
  //         console.log('error updating task');
  //       }
  //     });
  // }
  //
  // // delete this task from the server
  // $scope.deleteTask = function(id) {
  //   if(confirm("Delete this task??!")) {
  //     console.log('delete task id ', id);
  //     $http.delete('/tasks/' + id).then(function(response) {
  //       if(response.status == 202) {
  //         getTasks();
  //       } else {
  //         console.log('error deleting task');
  //       }
  //     });
  //   };
  // }
