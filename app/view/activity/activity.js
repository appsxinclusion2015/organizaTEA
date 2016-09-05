'use strict';

angular.module('myApp.activity', ['ngRoute','ngAnimate'])

.controller('ActivityController', ['$scope','$routeParams', '$rootScope',function($scope,$routeParams,$rootScope) {
  var activityId = $routeParams.activityId;
  var showCongratulateGif = !!$routeParams.showCongratulateGif;
  
  $scope.model = null;
  
  $scope.form = {};
  
  $scope.resourceSelectionList = [];
  
  $scope.isShowingCongratulateGif = showCongratulateGif;
  
  $scope.showCongratulateGif = function(){
    $scope.isShowingCongratulateGif = true;
  };
  
  $scope.hideCongratulateGif = function(){
    $scope.isShowingCongratulateGif = false;
  };
  
  $scope.reset = function () {
    //Initialize the activity selected
    $scope.model = $rootScope.initializeActivity(activityId);

    if (!$scope.model) return;

    $scope.form.title = $scope.model.activity.title;
		$scope.form.banner = $scope.model.activity.banner;

    $scope.updateResourceList();
  };

  $scope.updateActivity = function () {
    $scope.model.activity.title = $scope.form.title;
		$scope.model.activity.banner = $scope.form.banner;
    $scope.model.activity.resources = [];

    $scope.resourceSelectionList.forEach(function (resourceSelection) {
      if (resourceSelection.enabled) {
        $scope.model.activity.resources.push(resourceSelection.resource.id);
      }
    });

    $rootScope.updateActivity($scope.model.activity);
    $scope.reset();
  };

  $scope.deleteActivity = function () {
    $rootScope.deleteActivity(activityId);
    $scope.model = null;
  };

  $scope.updateResourceList = function () {
    $scope.resourceSelectionList = [];

    $rootScope.resourceList.forEach(function (resource) {
      var isEnabled = $scope.model.activity.resources.indexOf(resource.id) !== -1;

      $scope.resourceSelectionList.push({
        resource: resource,
        enabled: isEnabled
      });
    });
  };
  
  $scope.reset();
}]);

