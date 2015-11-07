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
  
  $scope.searchQuery = '';
  
  $scope.searchResults = [];
  
  $scope.resource = {
    type: 'video',
    src: '',
    title: ''
  };
  
  $scope.searchResources = function(){
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        q: $scope.searchQuery,
    });

    request.execute(function(data){
      $scope.searchResults = data.items;
      $scope.$digest();
      componentHandler.upgradeDom();
    });
  };
  
  $scope.previewResource = function(resource){
    $scope.resource.src = 'https://www.youtube.com/embed/' + resource.id.videoId;
    $scope.resource.title = resource.snippet.title;
    $scope.previewUrl = $scope.resource.src;
  };
  
  $scope.saveResource = function(){
    $rootScope.saveResource($scope.resource);
    $location.path('/create');
  };
  
  $scope.cancel = function(){
    $location.path('/create');
  };
}]);