'use strict';

angular.module('myApp.routine', ['ngRoute', 'ngAnimate'])

.controller('RoutineController', ['$scope', '$location', '$routeParams', '$rootScope', function ($scope, $location, $routeParams, $rootScope) {
  var routineId = $routeParams.routineId;

  //Initialize the routine selected
  $scope.model = null;

  $scope.form = null;

  $scope.activitySelectionList = [];

  $scope.reset = function () {
    //Initialize the routine selected
    $scope.model = $rootScope.initializeRoutine(routineId);

    if (!$scope.model) return;

    $scope.form = {
      title: $scope.model.routine.title
    };

    $scope.updateActivityList();
  };

  $scope.updateRoutine = function () {
    $scope.model.routine.title = $scope.form.title;
    $scope.model.routine.activities = [];

    $scope.activitySelectionList.forEach(function (activitySelection) {
      if (activitySelection.enabled) {
        $scope.model.routine.activities.push(activitySelection.activity.id);
      }
    });

    $rootScope.updateRoutine($scope.model.routine);
    $scope.reset();
  };

  $scope.deleteRoutine = function () {
    $rootScope.deleteRoutine(routineId);
    $scope.model = null;
  };

  $scope.updateActivityList = function () {
    $scope.activitySelectionList = [];

    $rootScope.activityList.forEach(function (activity) {
      var isEnabled = $scope.model.routine.activities.indexOf(activity.id) !== -1;

      $scope.activitySelectionList.push({
        activity: activity,
        enabled: isEnabled
      });
    });
  };

  $scope.goToActivity = function (activityId) {
    $location.path('/activity/' + activityId);
  };

  $scope.reset();
}]);