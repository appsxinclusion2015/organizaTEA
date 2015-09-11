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

.controller('RoutineController', ['$scope','$location','$routeParams','RoutineResource','ActivityResource', function($scope,$location,$routeParams,RoutineResource,ActivityResource) {
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
  
  $scope.goToCreateActivity = function(){
    $location.path('/newActivity');
  };
  
  $scope.$on('$viewContentLoaded', function() {
      componentHandler.upgradeDom();
  });
}]);