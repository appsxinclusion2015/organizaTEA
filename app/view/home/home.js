'use strict';

angular.module('myApp.home', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'view/home/home.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', ['$scope','$location','ConfigResource','RoutineResource',function($scope,$location,ConfigResource,RoutineResource) {
  ConfigResource.get({configId:'config'}, function(config){
    $scope.config = config;
  });
  
  RoutineResource.query({},function(routines){
    $scope.routines = [];
    
    routines.forEach(function(routine){
      RoutineResource.get({routineId: routine}, function(data){
        $scope.routines.push(data);
      });
    });
  });
  
  $scope.goToRoutine = function(routineId) {
    $location.path('/routine/' + routineId );
  };
  
  $scope.goToCreateRoutine = function(){
    $location.path('/newRoutine');
  };
}]);