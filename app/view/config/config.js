'use strict';

angular.module('myApp.config', ['ngRoute'])

.controller('ConfigController', ['$scope','ConfigResource',function($scope,ConfigResource) {
  ConfigResource.get({configId:'config'},function(config){
    $scope.config = config;
  });
}]);