'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.resource',
  'myApp.home',
  'myApp.config',
  'myApp.routine',
  'myApp.activity',
  'myApp.create',
  'myApp.version',
  'myApp.directive'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}])

.run(function($rootScope,$filter) {
  // Set to empty or load from localstorage when start the app
  //TODO: change this to retrieve from the current values in localStorage
  //$rootScope.activityList = JSON.parse(window.localStorage.getItem('activities'));
  //$rootScope.routineList = JSON.parse(window.localStorage.getItem('routines'));
  
  $rootScope.routineList = [
    {
      "id": "routine_0",
      "type": "routine",
      "title": "DEMO",
      "description": "RUTINA DEMO",
      "activities": [
        "activity_0",
        "activity_1"
      ]
    }
  ];
  
  $rootScope.activityList = [
    {
      "id": "activity_0",
      "title": "DESPERTARSE",
      "description": "Actividad de ejemplo 1",
      "banner": "http://previews.123rf.com/images/blueringmedia/blueringmedia1412/blueringmedia141200517/34694731-Un-dibujo-de-una-ni-a-de-despertarse-con-una-alarma-sobre-un-fondo-blanco-Foto-de-archivo.jpg",
      "duration": 5000,
      "resources": [
        "resource_0",
        "resource_1"
      ]
    }, 
    {
      "id": "activity_1",
      "title": "A LA ESCUELA",
      "description": "Actividad de ejemplo 2",
      "banner": "http://static.ellahoy.es/ellahoy/fotogallery/625X0/144771/dibujos-para-pintar-de-la-escuela.jpg",
      "duration": 5000,
      "resources": [
        "resource_2"
      ]
    }
  ];
  
  $rootScope.resourceList = [
    {
      "id": "resource_0",
      "type": "video",
      "src": "https://www.youtube.com/embed/I2uGevUBZKo"
    },
    {
      "id": "resource_1",
      "type": "video",
      "src": "https://www.youtube.com/embed/i8ju_10NkGY"
    },
    {
      "id": "resource_2",
      "type": "video",
      "src": "https://www.youtube.com/embed/QH2-TGUlwu4"
    }
  ];
  
  $rootScope.saveRoutineList = function(){
    window.localStorage.setItem('routines', JSON.stringify($rootScope.routineList));    
  };
  
  $rootScope.getRoutineList = function(){
    return JSON.parse(window.localStorage.getItem('routines'));
  };
  
  $rootScope.saveActivityList = function(){
    window.localStorage.setItem('activities', JSON.stringify($rootScope.activityList));    
  };
  
  $rootScope.getActivityList = function(){
    return JSON.parse(window.localStorage.getItem('activities'));
  };
  
  $rootScope.saveResourceList = function(){
    window.localStorage.setItem('resources', JSON.stringify($rootScope.resourceList));    
  };
  
  $rootScope.getResourceList = function(){
    return JSON.parse(window.localStorage.getItem('resources'));
  };
  
  $rootScope.saveRoutine = function(routine){
    routine.id = 'routine_' + $rootScope.routineList.length;
    $rootScope.routineList.push(routine);
    $rootScope.saveRoutineList();
  };
  
  $rootScope.getRoutine = function(routineId){
    return $filter('filter')($rootScope.routineList, {id: routineId})[0];
  };
  
  $rootScope.saveActivity = function(activity){
    activity.id = 'activity_' + $rootScope.activityList.length;
    $rootScope.activityList.push(activity);
    $rootScope.saveActivityList();
  };
  
  $rootScope.getActivity = function(activityId){
    return $filter('filter')($rootScope.activityList, {id: activityId})[0];
  };
  
  $rootScope.saveResource = function(resource){
    resource.id = 'resource_' + $rootScope.resourceList.length;
    $rootScope.resourceList.push(resource);
    $rootScope.saveResourceList();
  };
  
  $rootScope.getResource = function(resourceId){
    return $filter('filter')($rootScope.resourceList, {id: resourceId})[0];
  };
  
  $rootScope.initializeRoutine = function(routineId){
    var routine =  $rootScope.getRoutine(routineId);
    var activityList = [];

    routine.activities.forEach(function(activityId){
      var activity = $rootScope.getActivity(activityId);
      activityList.push(activity);
    });

    return {routine: routine, activityList: activityList};
  };
  
  $rootScope.initializeActivity = function(activityId){
    var activity =  $rootScope.getActivity(activityId);
    var resourceList = [];
    
    activity.resources.forEach(function(resourceId){
      var resource = $rootScope.getResource(resourceId);
      resourceList.push(resource);
    });

    return {activity: activity, resourceList: resourceList};
  };
  
  // initialize the db
  $rootScope.initializeDB = function(){
    $rootScope.saveRoutineList();
    $rootScope.saveActivityList();
    $rootScope.saveResourceList();
  };
  
  $rootScope.initializeDB();
  
  window.app = {
    $rootScope: $rootScope
  };
});
