/* global window, _ */

'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.resource',
  'myApp.home',
  'myApp.config',
  'myApp.routine',
  'myApp.activity',
  'myApp.resourceView',
  'myApp.create',
  'myApp.version'
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
    .when('/edit_routine/:routineId', {
      templateUrl: 'view/routine/edit_routine.html',
      controller: 'RoutineController'
    })
    .when('/activity/:activityId', {
      templateUrl: 'view/activity/activity.html',
      controller: 'ActivityController'
    })
    .when('/edit_activity/:activityId', {
      templateUrl: 'view/activity/edit_activity.html',
      controller: 'ActivityController'
    })
    .when('/edit_resource/:resourceId', {
      templateUrl: 'view/resource/edit_resource.html',
      controller: 'ResourceController'
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
   * Helper methods
   */
  $rootScope.saveLocalStorageItem = function (item, object) {
    window.localStorage.setItem(item, JSON.stringify(object));
  };

  $rootScope.getLocalStorageItem = function (item) {
    return JSON.parse(window.localStorage.getItem(item));
  };

  $rootScope.identity = Date.now();

  /**
   * Routine Methods
   */
  $rootScope.saveRoutineList = function () {
    $rootScope.saveLocalStorageItem('routines', $rootScope.routineList);
  };

  $rootScope.getRoutineList = function () {
    return $rootScope.getLocalStorageItem('routines');
  };

  $rootScope.saveRoutine = function (routine) {
    routine.id = 'routine_' + (++$rootScope.identity);
    $rootScope.routineList.push(routine);
    $rootScope.saveRoutineList();
  };

  $rootScope.getRoutine = function (routineId) {
    return $filter('filter')($rootScope.routineList, {
      id: routineId
    })[0];
  };

  $rootScope.updateRoutine = function (routine) {
    var index = _.findIndex($rootScope.routineList, {
      id: routine.id
    });

    if (index >= 0) {
      $rootScope.routineList[index] = routine;
      $rootScope.saveRoutineList();
    }
  };

  $rootScope.deleteRoutine = function (routineId) {
    var index = _.findIndex($rootScope.routineList, {
      id: routineId
    });

    if (index >= 0) {
      $rootScope.routineList.splice(index, 1);
      $rootScope.saveRoutineList();
    }
  };

  $rootScope.initializeRoutine = function (routineId) {
    var routine = $rootScope.getRoutine(routineId);

    if (!routine) return null;

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
    $rootScope.saveLocalStorageItem('activities', $rootScope.activityList);
  };

  $rootScope.getActivityList = function () {
    return $rootScope.getLocalStorageItem('activities');
  };

  $rootScope.saveActivity = function (activity) {
    activity.id = 'activity_' + (++$rootScope.identity);
    $rootScope.activityList.push(activity);
    $rootScope.saveActivityList();
  };

  $rootScope.getActivity = function (activityId) {
    return $filter('filter')($rootScope.activityList, {
      id: activityId
    })[0];
  };

  $rootScope.updateActivity = function (activity) {
    var index = _.findIndex($rootScope.activityList, {
      id: activity.id
    });

    if (index >= 0) {
      $rootScope.activityList[index] = activity;
      $rootScope.saveActivityList();
    }
  };

  $rootScope.deleteActivity = function (activityId) {
    var index = _.findIndex($rootScope.activityList, {
      id: activityId
    });

    if (index >= 0) {
      $rootScope.activityList.splice(index, 1);
      $rootScope.saveActivityList();
    }
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
    $rootScope.saveLocalStorageItem('resources', $rootScope.resourceList);
  };

  $rootScope.getResourceList = function () {
    return $rootScope.getLocalStorageItem('resources');
  };

  $rootScope.saveResource = function (resource) {
    resource.id = 'resource_' + (++$rootScope.identity);
    $rootScope.resourceList.push(resource);
    $rootScope.saveResourceList();
  };

  $rootScope.getResource = function (resourceId) {
    return $filter('filter')($rootScope.resourceList, {
      id: resourceId
    })[0];
  };

  $rootScope.updateResource = function (resource) {
    var index = _.findIndex($rootScope.resourceList, {
      id: resource.id
    });

    if (index >= 0) {
      $rootScope.resourceList[index] = resource;
      $rootScope.saveResourceList();
    }
  };

  $rootScope.deleteResource = function (resourceId) {
    var index = _.findIndex($rootScope.resourceList, {
      id: resourceId
    });

    if (index >= 0) {
      $rootScope.resourceList.splice(index, 1);
      $rootScope.saveResourceList();
    }
  };
  
  $rootScope.initializeResource = function (resourceId) {
    var resource = $rootScope.getResource(resourceId);

    return {
      resource: resource
    };
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
})

.controller('NavController', ['$scope', '$location', function ($scope, $location) {
  $scope.showBackButton = $location.path() !== '/home';

  $scope.$watch(function () {
    return $location.path();
  }, function (newVal) {
    if (newVal === '/home') {
      $scope.showBackButton = false;
    } else {
      $scope.showBackButton = true;
    }
  });

  $scope.goBack = function () {
    window.history.back();
  };
}]);