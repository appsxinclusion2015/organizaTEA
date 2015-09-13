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
    type: "routine",
    title: "",
    description: "",
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
    $location.path('/create');
  };
  
  $scope.cancel = function(){
    $location.path('/create');
  };
  
}])

.controller('NewActivityController', ['$scope','$rootScope','$location', function($scope,$rootScope,$location) {
  $scope.activity = {
    title: '',
    description: 'NUEVA ACTIVIDAD',
    banner: '',
    duration: 5000,
    resources: []
  };
  
  $scope.previewUrl = 'http://placehold.it/350x150';
  $scope.resourceSelectionList = [];
  
  $rootScope.resourceList.forEach(function(resource){
    $scope.resourceSelectionList.push({resource:resource,enabled:false});
  });
  
  $scope.previewActivity = function(){
    $scope.previewUrl = $scope.activity.banner;
  };
  
  $scope.saveActivity = function(){
    $scope.resourceSelectionList.forEach(function(resourceSelection){
      if(resourceSelection.enabled) {
        $scope.activity.resources.push(resourceSelection.resource.id);
      }
    });
    
    $rootScope.saveActivity($scope.activity);
    $location.path('/create');
  }; 
  
  $scope.cancel = function(){
    $location.path('/create');
  };
}])

.controller('NewResourceController', ['$scope','$rootScope','$location', function($scope,$rootScope,$location) {
  var videoPattern = /https?:\/\/(?:.*?)\.?(youtube|vimeo)\.com\/(watch\?[^#]*v=([a-z_A-Z0-9\-]{11}))*$/;
  
  $scope.resource = {
    type: 'video',
    src: '',
    title: ''
  };
  
  $scope.previewResource = function(){
    var matches = $scope.resource.src.match(videoPattern);
    var provider = matches[1];
    var id = provider === 'vimeo' ? matches[2] : matches[3];
    
    if(provider === 'youtube'){
      $scope.previewUrl = 'https://www.youtube.com/embed/' + id;
    }
    
    if(provider === 'vimeo'){
      // not implemented
    }
  };
  
  $scope.saveResource = function(){
    var matches = $scope.resource.src.match(videoPattern);
    var provider = matches[1];
    var id = provider === 'vimeo' ? matches[2] : matches[3];
    
    if(provider === 'youtube'){
      $scope.resource.src = 'https://www.youtube.com/embed/' + id;
    }

    $rootScope.saveResource($scope.resource);
    $location.path('/create');
  };
  
  $scope.cancel = function(){
    $location.path('/create');
  };
}]);