'use strict';

angular.module('myApp.resource', [
  'ngResource',
  'myApp.resource.filter'
])

.factory('ConfigResource', ['$resource', function($resource) {
  return $resource('webresources/configs/:configId.json', {}, {});
}])

.factory('AppResource', ['$resource', function($resource) {
  return $resource('webresources/apps/:appId.json', {}, {});
}]);