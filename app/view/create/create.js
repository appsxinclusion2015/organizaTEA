'use strict';

angular.module('myApp.create', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/create', {
      templateUrl: 'view/create/create.html',
      controller: 'CreateController'
    })
    .when('/create/activity', {
      templateUrl: 'view/create/newActivity.html',
      controller: 'NewActivityController'
    })
    .when('/create/routine', {
      templateUrl: 'view/create/newRoutine.html',
      controller: 'NewRoutineController'
    })
    .when('/create/resource', {
      templateUrl: 'view/create/newResource.html',
      controller: 'NewResourceController'
    })
}])

.controller('CreateController', ['$scope','$routeParams','$filter', '$rootScope',function($scope,$routeParams, $filter, $rootScope) {
  
}])

.controller('NewRoutineController', ['$scope','$location','$rootScope', function($scope,$location,$rootScope) {
  
  $scope.routine = {
    id: 'sample_routine_id',
    type: "routine",
    title: "NUEVA RUTINA",
    description: "NUEVA RUTINA",
    activities: []
  };
  
  $scope.activitySelectionList = [];
  
  $rootScope.activityList.forEach(function(activity){
    $scope.activitySelectionList.push({activity:activity,enabled:false});
  });
  
  $scope.saveRoutine = function() {
    $scope.activitySelectionList.forEach(function(activitySelection){
      if(activitySelection.enabled) {
        $scope.routine.activities.push(activitySelection.activity.id);
      }
    });
    
    $rootScope.saveRoutine($scope.routine);
  };
  
  $scope.cancel = function(){
    $location.path('/create');
  };
  
}])

.controller('NewActivityController', ['$scope','$rootScope','$location', function($scope,$rootScope,$location) {
  $scope.activity = {
    title: 'NUEVA ACTIVIDAD',
    description: 'NUEVA ACTIVIDAD',
    banner: 'http://placehold.it/350x150',
    duration: 5000,
    resources: []
  };
  
  $scope.resourceSelectionList = [];
  
  $rootScope.resourceList.forEach(function(resource){
    $scope.resourceSelectionList.push({resource:resource,enabled:false});
  });
  
  $scope.saveActivity = function(){
    $scope.resourceSelectionList.forEach(function(resourceSelection){
      if(resourceSelection.enabled) {
        $scope.activity.resources.push(resourceSelection.resource.id);
      }
    });
    
    $rootScope.saveActivity($scope.activity);
  }; 
  
  $scope.cancel = function(){
    $location.path('/create');
  };
}])

.controller('NewResourceController', ['$scope','$rootScope','$location', function($scope,$rootScope,$location) {
  $scope.resource = {
    type: 'video',
    src: ''
  };
  
  $scope.saveResource = function(){
    $rootScope.saveResource($scope.resource);
  };
  
  $scope.cancel = function(){
    $location.path('/create');
  };
}]);