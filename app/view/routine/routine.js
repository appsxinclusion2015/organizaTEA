'use strict';

angular.module('myApp.routine', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/routine/:routineId', {
      templateUrl: 'view/routine/routine.html',
      controller: 'RoutineController'
    });
}])

.controller('RoutineController', ['$scope','$location','$routeParams','$rootScope', function($scope,$location,$routeParams,$rootScope) {
  var routineId =  $routeParams.routineId;
  
  //Initialize the routine selected
  $scope.model = $rootScope.initializeRoutine(routineId); 
  
  $scope.goToActivity = function(activityId) {
    $location.path('/activity/' + activityId);
  };
}])