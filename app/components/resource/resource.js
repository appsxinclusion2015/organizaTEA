'use strict';

angular.module('myApp.resource', [
  'ngResource',
  'myApp.resource.filter'
])

.factory('ConfigResource', ['$resource', function($resource) {
  return $resource('webresources/configs/:configId.json', {}, {});
}])

.factory('RoutineResource', ['$resource', function($resource) {
  return $resource('webresources/routines/:routineId.json', {}, {
    query: {method:'GET', isArray:true, params: {routineId:'query'}}
  });
}])

.factory('ActivityResource', ['$resource', function($resource) {
  return $resource('webresources/activities/:activityId.json', {}, {});
}]);