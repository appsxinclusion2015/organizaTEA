'use strict';

angular.module('myApp.create', ['ngRoute', 'ngAnimate'])

.controller('CreateController', ['$scope', '$routeParams', '$filter', '$rootScope', function ($scope, $routeParams, $filter, $rootScope) {
  $scope.showRoutines = false;
  $scope.showActivities = false;
  $scope.showResources = false;
  
  $scope.toggleRoutines = function () {
    $scope.showRoutines = !$scope.showRoutines;
  };
  
  $scope.toggleActivities = function () {
    $scope.showActivities = !$scope.showActivities;
  };
  
  $scope.toggleResources = function () {
    $scope.showResources = !$scope.showResources;
  };
}])

.controller('NewRoutineController', ['$scope', '$location', '$rootScope', function ($scope, $location, $rootScope) {

  $scope.routine = {
    type: "routine",
    title: "",
    description: "",
    activities: []
  };

  $scope.updateActivityList = function () {
    $scope.activitySelectionList = [];

    $rootScope.activityList.forEach(function (activity) {
      $scope.activitySelectionList.push({
        activity: activity,
        enabled: false
      });
    });
  };

  $scope.reset = function () {
    $scope.routine = {
      type: "routine",
      title: "",
      description: "",
      activities: []
    };

    $scope.updateActivityList();
  };

  $scope.$watch(function () {
    return $rootScope.activityList.length;
  }, function (newVal) {
    if (!newVal) return;

    $scope.updateActivityList();
  });

  $scope.saveRoutine = function () {
    $scope.activitySelectionList.forEach(function (activitySelection) {
      if (activitySelection.enabled) {
        $scope.routine.activities.push(activitySelection.activity.id);
      }
    });

    $rootScope.saveRoutine($scope.routine);
    $scope.reset();
    $location.path('/create');
  };

  $scope.cancel = function () {
    $scope.reset();
    $location.path('/create');
  };

  $scope.reset();
}])

.controller('NewActivityController', ['$scope', '$rootScope', '$location', '$http', function ($scope, $rootScope, $location, $http) {

  $scope.previewUrl = 'http://placehold.it/350x150';

  $scope.resourceSelectionList = [];
  
  $scope.searchResults = [];
  
  $scope.searchQuery = '';
  
  $scope.activity = {
    title: '',
    description: 'NUEVA ACTIVIDAD',
    banner: '',
    duration: 5000,
    resources: []
  };

  $scope.updateSelectionList = function () {
    $scope.resourceSelectionList = [];

    $rootScope.resourceList.forEach(function (resource) {
      $scope.resourceSelectionList.push({
        resource: resource,
        enabled: false
      });
    });
  };

  $scope.reset = function () {
    $scope.previewUrl = 'http://placehold.it/350x150';

    $scope.resourceSelectionList = [];
    
    $scope.searchResults = [];
    
    $scope.searchQuery = '';

    $scope.activity = {
      title: '',
      description: 'NUEVA ACTIVIDAD',
      banner: '',
      duration: 5000,
      resources: []
    };

    $scope.updateSelectionList();
  };

  $scope.$watch(function () {
    return $rootScope.resourceList.length;
  }, function (newVal) {
    if (!newVal) return;

    $scope.updateSelectionList();
  });

  $scope.searchImages = function () {
    var apiKey = 'AIzaSyAFpaimWjjFzXtsUA7ck6RPHcuu8Gdwmj0';
    var cx = '000958933864851666858:7tq9ddv54gu';
    var q = $scope.searchQuery;
    
    $http({
      method: 'GET',
      url: 'https://www.googleapis.com/customsearch/v1?q=' + q + ' &cx=' + cx + '&fileType=png&key=' + apiKey
    }).then(function (response) {
      $scope.searchResults = response.data.items;
    }, function (error) {
      console.error(error);
    });
  };
  
  $scope.previewActivity = function (result) {
    $scope.activity.banner = result.pagemap.cse_image[0].src; 
    $scope.previewUrl = result.pagemap.cse_image[0].src;
  };

  $scope.saveActivity = function () {
    $scope.resourceSelectionList.forEach(function (resourceSelection) {
      if (resourceSelection.enabled) {
        $scope.activity.resources.push(resourceSelection.resource.id);
      }
    });

    $rootScope.saveActivity($scope.activity);
    $scope.reset();
    $location.path('/create');
  };

  $scope.cancel = function () {
    $scope.reset();
    $location.path('/create');
  };

  $scope.reset();
}])

.controller('NewResourceController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
  var videoPattern = /https?:\/\/(?:.*?)\.?(youtube|vimeo)\.com\/(watch\?[^#]*v=([a-z_A-Z0-9\-]{11}))*$/;

  $scope.searchQuery = '';

  $scope.searchResults = [];

  $scope.previewUrl = null;

  $scope.resource = {
    type: 'video',
    src: '',
    title: ''
  };;

  $scope.reset = function () {
    $scope.resource = {
      type: 'video',
      src: '',
      title: ''
    };
    $scope.searchQuery = '';
    $scope.searchResults = [];
    $scope.previewUrl = null;
  };

  $scope.searchResources = function () {
    var request = gapi.client.youtube.search.list({
      part: 'snippet',
      type: 'video',
      q: $scope.searchQuery,
    });

    request.execute(function (data) {
      $scope.searchResults = data.items;
      $scope.$digest();
    });
  };

  $scope.previewResource = function (resource) {
    $scope.resource.src = 'https://www.youtube.com/embed/' + resource.id.videoId;
    $scope.resource.title = resource.snippet.title;
    $scope.previewUrl = $scope.resource.src;
  };

  $scope.saveResource = function () {
    $rootScope.saveResource($scope.resource);
    $scope.reset();
    $location.path('/create');
  };

  $scope.cancel = function () {
    $scope.reset();
    $location.path('/create');
  };

  $scope.reset();
}]);