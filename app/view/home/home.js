'use strict';

angular.module('myApp.home', ['ngRoute','ngAnimate'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'view/home/home.html',
    controller: 'HomeController'
  });
}])

.controller('HomeController', ['$scope','$location','$rootScope',function($scope,$location,$rootScope) {
  
  // Set to empty or load from localstorage when start the app
  //TODO: change this to retrieve from the current values in localStorage
  //$rootScope.activityList = JSON.parse(window.localStorage.getItem('activities'));
  //$rootScope.routineList = JSON.parse(window.localStorage.getItem('routines'));
  
  $rootScope.routineList = [{
    "id": "sample_routine_1",
    "type": "routine",
    "title": "RUTINA 1",
    "description": "Rutina de ejemplo 1",
    "activities": [
      "sample_activity_1",
      "sample_activity_2"
    ]
    },
    {
      "id": "sample_routine_2",
      "type": "routine",
      "title": "RUTINA 2",
      "description": "Rutina de ejemplo 2",
      "activities": [
        "sample_activity_1",
        "sample_activity_2"
      ]
    }];
  
  $rootScope.activityList = [{
    "id": "sample_activity_1",
    "title": "DESPERTARSE",
    "description": "Actividad de ejemplo 1",
    "banner": "http://previews.123rf.com/images/blueringmedia/blueringmedia1412/blueringmedia141200517/34694731-Un-dibujo-de-una-ni-a-de-despertarse-con-una-alarma-sobre-un-fondo-blanco-Foto-de-archivo.jpg",
    "duration": 5000,
    "resources": [
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/I2uGevUBZKo",
        "thumbnails": [
          "http://img.youtube.com/vi/I2uGevUBZKo/0.jpg",
          "http://img.youtube.com/vi/I2uGevUBZKo/1.jpg",
          "http://img.youtube.com/vi/I2uGevUBZKo/2.jpg",
          "http://img.youtube.com/vi/I2uGevUBZKo/3.jpg"
        ],
        "caption": "caption 1"
      },
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/i8ju_10NkGY",
        "thumbnails": [
          "http://img.youtube.com/vi/i8ju_10NkGY/0.jpg",
          "http://img.youtube.com/vi/i8ju_10NkGY/1.jpg",
          "http://img.youtube.com/vi/i8ju_10NkGY/2.jpg",
          "http://img.youtube.com/vi/i8ju_10NkGY/3.jpg"
        ],
        "caption": "caption 2"
      }
    ]
  }, {
  "id": "sample_activity_2",
  "title": "A LA ESCUELA",
  "description": "Actividad de ejemplo 2",
  "banner": "http://static.ellahoy.es/ellahoy/fotogallery/625X0/144771/dibujos-para-pintar-de-la-escuela.jpg",
  "duration": 5000,
  "resources": [
      {
        "type": "video",
        "src": "https://www.youtube.com/embed/djk3hrPKAV4",
        "thumbnails": [
          "http://img.youtube.com/vi/djk3hrPKAV4/0.jpg",
          "http://img.youtube.com/vi/djk3hrPKAV4/1.jpg",
          "http://img.youtube.com/vi/djk3hrPKAV4/2.jpg",
          "http://img.youtube.com/vi/djk3hrPKAV4/3.jpg"
        ],
        "caption": "caption 1"
      }
    ]
  }];
  
  //Set controller routine to root scope
  $scope.routines = $rootScope.routineList;
  
  $scope.goToRoutine = function(routineId) {
    $location.path('/routine/' + routineId );
  };
  
  $scope.goToCreateRoutine = function(){
    $location.path('/newRoutine');
  };
}]);