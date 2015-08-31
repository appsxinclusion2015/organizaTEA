'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.resource',
  'myApp.home',
  'myApp.config',
  'myApp.routine',
  'myApp.activity',
  'myApp.version'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
