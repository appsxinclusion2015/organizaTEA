'use strict';

angular.module('myApp.home', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'view/home/home.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', ['$scope','$location','$rootScope',function($scope,$location,$rootScope) {
  $scope.routineList = $rootScope.getRoutineList();
  
  $scope.goToRoutine = function(routineId) {
    $location.path('/routine/' + routineId );
  };
  
  $scope.goToCreate = function(){
    $location.path('/create');
  };
}]);