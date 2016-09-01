'use strict';

angular.module('myApp.home', ['ngRoute', 'ngAnimate'])

.controller('HomeController', ['$scope', '$location', '$rootScope', '$routeParams', 'AppResource', function ($scope, $location, $rootScope, $routeParams, AppResource) {
  // load an app from the app service
  if ($routeParams.appId) {
    AppResource.get({
      appId: $routeParams.appId
    }, function (app) {
      $rootScope.routineList = app.routines;
      $rootScope.activityList = app.activities;
      $rootScope.resourceList = app.resources;
      $rootScope.initializeDB();

      $scope.routineList = $rootScope.getRoutineList();
    });
  } else {
    $scope.routineList = $rootScope.getRoutineList();
  }

  $scope.goToRoutine = function (routineId) {
    $location.path('/routine/' + routineId);
  };

  $scope.goToCreate = function () {
    $location.path('/create');
  };
}]);