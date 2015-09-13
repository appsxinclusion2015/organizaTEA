'use strict';

angular.module('myApp.activity', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/activity/:activityId', {
      templateUrl: 'view/activity/activity.html',
      controller: 'ActivityController'
    });
}])

.controller('ActivityController', ['$scope','$routeParams', '$rootScope',function($scope,$routeParams,$rootScope) {
  var activityId = $routeParams.activityId;
  var showCongratulateGif = !!$routeParams.showCongratulateGif;
  
  $scope.model = $rootScope.initializeActivity(activityId);
  
  $scope.isShowingCongratulateGif = showCongratulateGif;
  
  $scope.showCongratulateGif = function(){
    $scope.isShowingCongratulateGif = true;
  };
  
  $scope.hideCongratulateGif = function(){
    $scope.isShowingCongratulateGif = false;
  };
}])

