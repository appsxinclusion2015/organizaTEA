'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.resource',
  'myApp.home',
  'myApp.config',
  'myApp.routine',
  'myApp.activity',
  'myApp.create',
  'myApp.version',
  'myApp.directive'
])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/home', {
      templateUrl: 'view/home/home.html',
      controller: 'HomeController'
    })
    .when('/home/:appId', {
      templateUrl: 'view/home/home.html',
      controller: 'HomeController'
    })
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
    .when('/config', {
      templateUrl: 'view/config/config.html',
      controller: 'ConfigController'
    })
    .when('/routine/:routineId', {
      templateUrl: 'view/routine/routine.html',
      controller: 'RoutineController'
    })
    .when('/activity/:activityId', {
      templateUrl: 'view/activity/activity.html',
      controller: 'ActivityController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}])

.run(function ($rootScope, $filter) {
  $rootScope.routineList = [];
  $rootScope.activityList = [];
  $rootScope.resourceList = [];

  /**
   * Routine Methods
   */
  $rootScope.saveRoutineList = function () {
    window.localStorage.setItem('routines', JSON.stringify($rootScope.routineList));
  };

  $rootScope.getRoutineList = function () {
    return JSON.parse(window.localStorage.getItem('routines'));
  };

  $rootScope.saveRoutine = function (routine) {
    routine.id = 'routine_' + $rootScope.routineList.length;
    $rootScope.routineList.push(routine);
    $rootScope.saveRoutineList();
  };

  $rootScope.getRoutine = function (routineId) {
    return $filter('filter')($rootScope.routineList, {
      id: routineId
    })[0];
  };
  
  $rootScope.initializeRoutine = function (routineId) {
    var routine = $rootScope.getRoutine(routineId);
    var activityList = [];

    routine.activities.forEach(function (activityId) {
      var activity = $rootScope.getActivity(activityId);
      activityList.push(activity);
    });

    return {
      routine: routine,
      activityList: activityList
    };
  };

  /**
   * Activity Methods
   */
  $rootScope.saveActivityList = function () {
    window.localStorage.setItem('activities', JSON.stringify($rootScope.activityList));
  };

  $rootScope.getActivityList = function () {
    return JSON.parse(window.localStorage.getItem('activities'));
  };

  $rootScope.saveActivity = function (activity) {
    activity.id = 'activity_' + $rootScope.activityList.length;
    $rootScope.activityList.push(activity);
    $rootScope.saveActivityList();
  };

  $rootScope.getActivity = function (activityId) {
    return $filter('filter')($rootScope.activityList, {
      id: activityId
    })[0];
  };

  $rootScope.initializeActivity = function (activityId) {
    var activity = $rootScope.getActivity(activityId);
    var resourceList = [];

    activity.resources.forEach(function (resourceId) {
      var resource = $rootScope.getResource(resourceId);
      resourceList.push(resource);
    });

    return {
      activity: activity,
      resourceList: resourceList
    };
  };

  /**
   * Resources Methods
   */
  $rootScope.saveResourceList = function () {
    window.localStorage.setItem('resources', JSON.stringify($rootScope.resourceList));
  };

  $rootScope.getResourceList = function () {
    return JSON.parse(window.localStorage.getItem('resources'));
  };

  $rootScope.saveResource = function (resource) {
    resource.id = 'resource_' + $rootScope.resourceList.length;
    $rootScope.resourceList.push(resource);
    $rootScope.saveResourceList();
  };

  $rootScope.getResource = function (resourceId) {
    return $filter('filter')($rootScope.resourceList, {
      id: resourceId
    })[0];
  };

  /**
   * DB Methods
   */
  $rootScope.initializeDB = function () {
    $rootScope.routineList = $rootScope.getRoutineList() || [];
    $rootScope.activityList = $rootScope.getActivityList() || [];
    $rootScope.resourceList = $rootScope.getResourceList() || [];
  };

  // initialize the db
  $rootScope.initializeDB();

  // debugging
  window.app = {
    $rootScope: $rootScope
  };
});