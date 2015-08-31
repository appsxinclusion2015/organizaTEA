'use strict';

angular.module('myApp.activity', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/activity/:activityId', {
    templateUrl: 'view/activity/activity.html',
    controller: 'ActivityController'
  });
}])

.controller('ActivityController', ['$scope','$routeParams','ActivityResource',function($scope,$routeParams,ActivityResource) {
  var activityId = $routeParams.activityId;
  var routineId = $routeParams.routineId;
  
  $scope.routineId = routineId;
  $scope.activityProgress = 0;
  $scope.progressBarStyle = {
    width: '0%'
  };
  
  $scope.$watch('activityProgress', function(newVal){
    $scope.progressBarStyle.width = newVal + '%';

  });
  
  ActivityResource.get({activityId:activityId}, function(activity){
    $scope.activity = activity;
  });
  
  $scope.startProgress = function(){
    $scope.activityProgress = 0;
    $scope.updateProgress();
  };
  
  $scope.updateProgress = function(){
    setTimeout(function(){
      $scope.$apply(function(){
        $scope.activityProgress += $scope.activity.duration / 1000;
        
        if($scope.activityProgress < 100) {
          $scope.updateProgress();
        }
      });
    }, 1000); // update every second  
  };
}]);