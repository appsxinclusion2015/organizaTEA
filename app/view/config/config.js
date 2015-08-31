'use strict';

angular.module('myApp.config', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/config', {
    templateUrl: 'view/config/config.html',
    controller: 'ConfigController'
  });
}])

.controller('ConfigController', ['$scope','ConfigResource',function($scope,ConfigResource) {
  ConfigResource.get({configId:'config'},function(config){
    $scope.config = config;
  });
}]);