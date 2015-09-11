'use strict';

angular.module('myApp.routine', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/newRoutine', {
      templateUrl: 'view/routine/newRoutine.html',
      controller: 'NewRoutineController'
    })
    .when('/routine/:routineId', {
      templateUrl: 'view/routine/routine.html',
      controller: 'RoutineController'
    });
}])

.controller('RoutineController', ['$scope','$location','$routeParams','$rootScope', '$filter', function($scope,$location,$routeParams,$rootScope, $filter) {
  var routineId =  $routeParams.routineId;
  $scope.activityList = [];  
 
  $rootScope.saveRoutineList = function(){
    window.localStorage.setItem('routines', JSON.stringify($rootScope.routineList));    
  };
  
  $rootScope.getRoutineList = function(){
    return JSON.parse(window.localStorage.getItem('routines'));
  }; 
  
  $rootScope.getRoutine = function(routineId){
    return $filter('filter')($rootScope.routineList, {id: routineId})[0];
  };
  
  $rootScope.getActivity = function(activityId){
    return $filter('filter')($rootScope.activityList, {id: activityId})[0];
  }; 
  
  $scope.initializeRoutine = function(routineId){
      $scope.routine =  $scope.getRoutine(routineId);
      $scope.routine.activities.forEach(function(activityId){
        var activity = $rootScope.getActivity(activityId);
        $scope.activityList.push(activity);
      });
      return $scope.routine;
  };
  
  //Initialize the routine selected
  $scope.routine = $scope.initializeRoutine(routineId);
  
  $scope.goToActivity = function(activityId) {
    $location.path('/activity/' + activityId);
  };
}])

.controller('NewRoutineController', ['$scope','$location', function($scope,$location) {
  
  $scope.routine = {
    id: 'sample_routine_id',
    type: "routine",
    title: "NUEVA RUTINA",
    description: "NUEVA RUTINA",
    activities: [
      'sample_activity_1'
    ]
  };
  
  $scope.saveRoutine = function() {    
    $rootScope.routineList.push($scope.routine);
    $rootScope.saveRoutineList();
  };
  
  $scope.goToCreateActivity = function(){
    $location.path('/newActivity');
  };
  
  $scope.$on('$viewContentLoaded', function() {
      componentHandler.upgradeDom();
  });
}]);