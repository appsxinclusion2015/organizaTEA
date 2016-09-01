'use strict';

angular.module('myApp.routine', ['ngRoute','ngAnimate'])

.controller('RoutineController', ['$scope','$location','$routeParams','$rootScope', function($scope,$location,$routeParams,$rootScope) {
  var routineId =  $routeParams.routineId;
  
  //Initialize the routine selected
  $scope.model = $rootScope.initializeRoutine(routineId); 
  
  $scope.goToActivity = function(activityId) {
    $location.path('/activity/' + activityId);
  };
}])