'use strict';

angular.module('myApp.resourceView', ['ngRoute', 'ngAnimate'])

.controller('ResourceController', ['$scope', '$location', '$routeParams', '$rootScope', function ($scope, $location, $routeParams, $rootScope) {
  var resourceId = $routeParams.resourceId;

  //Initialize the routine selected
  $scope.model = null;

  $scope.form = null;

  $scope.reset = function () {
    //Initialize the routine selected
    $scope.model = $rootScope.initializeResource(resourceId);

    if (!$scope.model) return;

    $scope.form = {
      title: $scope.model.resource.title
    };
  };

  $scope.updateResource = function () {
    $scope.model.resource.title = $scope.form.title;
    
    $rootScope.updateResource($scope.model.resource);
    $scope.reset();
  };

  $scope.deleteResource = function () {
    $rootScope.deleteResource(resourceId);
    $scope.model = null;
  };

  $scope.reset();
}]);