'use strict';

angular.module('myApp.activity', ['ngRoute'])

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

.controller('ActivityController', ['$scope','$routeParams','$filter', '$rootScope',function($scope,$routeParams, $filter, $rootScope) {
  var activityId = $routeParams.activityId;
  var showCongratulateGif = !!$routeParams.showCongratulateGif;
  
  $rootScope.saveActivityList = function(){
    window.localStorage.setItem('activities', JSON.stringify($rootScope.activityList));    
  };
  
  $rootScope.getActivityList = function(){
    return JSON.parse(window.localStorage.getItem('activities'));
  }; 
  
  $scope.activity = $rootScope.getActivity(activityId);
  
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
  
  $scope.addActivity = function(){
    //Add the new activity to the list and save the list
    $rootScope.activityList.push($scope.activity);
    $rootScope.saveActivityList();
  }
  
  $scope.newResourceSrc;
  
  $scope.addResource = function() {
    $scope.activity.resources.push({src:$scope.newResourceSrc,enabled:true});
    $scope.newResourceSrc = null;
  };
  
}]);