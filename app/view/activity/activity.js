'use strict';

angular.module('myApp.activity', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/newActivity', {
      templateUrl: 'view/activity/newActivity.html',
      controller: 'NewActivityController'
    })
    .when('/activity/:activityId', {
      templateUrl: 'view/activity/activity.html',
      controller: 'ActivityController'
    });
}])

.controller('ActivityController', ['$scope','$routeParams','RoutineResource','ActivityResource',function($scope,$routeParams,RoutineResource,ActivityResource) {
  var activityId = $routeParams.activityId;
  var showCongratulateGif = !!$routeParams.showCongratulateGif;
  
  ActivityResource.get({activityId:activityId}, function(activity){
    $scope.activity = activity;
  });
  
  $scope.isShowingCongratulateGif = showCongratulateGif;
  
  $scope.showCongratulateGif = function(){
    $scope.isShowingCongratulateGif = true;
  };
  
  $scope.hideCongratulateGif = function(){
    $scope.isShowingCongratulateGif = false;
  };
}])

.controller('NewActivityController', ['$scope', function($scope) {
  $scope.activity = {
    id: 'sample_activity_id',
    title: 'NUEVA ACTIVIDAD',
    description: 'NUEVA ACTIVIDAD',
    banner: 'http://placehold.it/350x150',
    duration: 5000,
    resources: [
      {src: 'https://www.youtube.com/embed/ScMzIvxBSi4', enabled: true}
    ]
  };
  
  $scope.newResourceSrc;
  
  $scope.addResource = function() {
    $scope.activity.resources.push({src:$scope.newResourceSrc,enabled:true});
    $scope.newResourceSrc = null;
  };
  
}]);