'use strict';

angular.module('myApp.resourceView', ['ngRoute', 'ngAnimate'])

.controller('ResourceController', ['$scope', '$location', '$routeParams', '$rootScope', function ($scope, $location, $routeParams, $rootScope) {
  var resourceId = $routeParams.resourceId;

  //Initialize the routine selected
  $scope.model = null;

  $scope.form = null;

  $scope.searchQuery = null;

  $scope.previewUrl = null;

  $scope.searchResults = [];

  $scope.reset = function () {
    //Initialize the routine selected
    $scope.model = $rootScope.initializeResource(resourceId);

    $scope.searchQuery = null;

    $scope.searchResults = [];

    $scope.previewUrl = null;

    if (!$scope.model) return;

    $scope.form = {
      title: $scope.model.resource.title,
      src: $scope.model.resource.src
    };
  };

  $scope.updateResource = function () {
    $scope.model.resource.title = $scope.form.title;
    $scope.model.resource.src = $scope.form.src;

    $rootScope.updateResource($scope.model.resource);
    $scope.reset();
  };

  $scope.deleteResource = function () {
    $rootScope.deleteResource(resourceId);
    $scope.model = null;
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
    $scope.form.src = 'https://www.youtube.com/embed/' + resource.id.videoId;
  };

  $scope.reset();
}]);