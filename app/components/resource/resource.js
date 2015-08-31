'use strict';

angular.module('myApp.resource', [
  'ngResource',
  'myApp.resource.filter'
])

.factory('ConfigResource', ['$resource', function($resource) {
  return $resource('webresources/configs/:configId.json', {}, {
    query: {method:'GET', params:{configId:'config'}, isArray:true}
  });
}])

.factory('RoutineResource', ['$resource', function($resource) {
  return $resource('webresources/routines/:routineId.json', {}, {
    query: {method:'GET', params:{routineId:'sample_routine_1'}, isArray:true}
  });
}])

.factory('ActivityResource', ['$resource', function($resource) {
  return $resource('webresources/activities/:activityId.json', {}, {
    query: {method:'GET', isArray:true}
  });
}]);