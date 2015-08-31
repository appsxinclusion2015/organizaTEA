'use strict';

angular.module('myApp.routine', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/routine/:routineId', {
    templateUrl: 'view/routine/routine.html',
    controller: 'RoutineController'
  });
}])

.controller('RoutineController', ['$scope','$routeParams','RoutineResource','ActivityResource', function($scope,$routeParams,RoutineResource,ActivityResource) {
  var routineId =  $routeParams.routineId;
  
  RoutineResource.get({routineId:routineId}, function(routine){
    $scope.routine = routine;
    $scope.activityList = [];
    
    routine.activities.forEach(function(activityId,index){
      ActivityResource.get({activityId:activityId}, function(activity){
        $scope.activityList.push(activity);
      });
    });
  });
}]);