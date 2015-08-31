'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'view/home/home.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', ['$scope','ConfigResource',function($scope,ConfigResource) {
  ConfigResource.get({configId:'config'}, function(config){
    $scope.config = config;
  });
}]);