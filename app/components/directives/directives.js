/* global console */

'use strict';

angular.module('myApp.directives', ['ngRoute', 'ngAnimate'])

.directive('imageSearch', ['$http', function ($http) {
	return {
		restrict: 'E',
		templateUrl: 'directive/image-search.html',
		scope: {
			selected: '='
		},
		link: function (scope, element, attrs) {
			scope.previewUrl = 'http://placehold.it/350x150';
			scope.searchQuery = '';
			scope.searchResults = [];
			scope.loading = false;
			scope.noResults = false;

			scope.$watch('selected', function (newVal, oldVal) {
				if (!newVal) {
					scope.previewUrl = 'http://placehold.it/350x150';
					scope.searchQuery = '';
					scope.searchResults = [];
					scope.loading = false;
					scope.noResults = false;
				} else {
					scope.previewUrl = newVal;
				}
			});

			scope.search = function () {
				var apiKey = 'AIzaSyAFpaimWjjFzXtsUA7ck6RPHcuu8Gdwmj0';
				var cx = '000958933864851666858:7tq9ddv54gu';
				var q = scope.searchQuery;
				scope.loading = true;
				scope.noResults = false;

				$http({
					method: 'GET',
					url: 'https://www.googleapis.com/customsearch/v1?q=' + q + ' &cx=' + cx + '&fileType=png,jpg,jpeg&key=' + apiKey
				}).then(function (response) {
					scope.searchResults = response.data.items;
					scope.loading = false;
					
					if(!scope.searchResults) {
						scope.noResults = true;
					}
					else if(scope.searchResults.length === 0) {
						scope.noResults = true;
					}
				}, function (error) {
					console.error(error);
					scope.loading = false;
					scope.noResults = true;
				});
			};

			scope.preview = function (result) {
				scope.selected = result.pagemap.cse_image[0].src;
			};
		}
	};
}])

.directive('videoSearch', ['$http', function ($http) {
	return {
		restrict: 'E',
		templateUrl: 'directive/video-search.html',
		scope: {
			selected: '='
		},
		link: function (scope, element, attrs) {
			var videoPattern = /https?:\/\/(?:.*?)\.?(youtube|vimeo)\.com\/(watch\?[^#]*v=([a-z_A-Z0-9\-]{11}))*$/;
			scope.searchQuery = '';
			scope.searchResults = [];
			scope.previewUrl = null;
			scope.loading = false;
			scope.noResults = false;

			scope.$watch('selected', function (newVal) {
				if (!newVal) {
					scope.searchQuery = '';
					scope.searchResults = [];
					scope.previewUrl = null;
					scope.loading = false;
					scope.noResults = false;
				} else {
					scope.previewUrl = newVal;
				}
			});

			scope.search = function () {
				scope.noResults = false;
				scope.loading = true;

				var request = gapi.client.youtube.search.list({
					part: 'snippet',
					type: 'video',
					q: scope.searchQuery,
				});

				request.execute(function (data) {
					scope.loading = false;
					scope.searchResults = data.items;

					if (scope.searchResults.length === 0) {
						scope.noResults = true;
					}

					scope.$digest();
				});
			};

			scope.preview = function (resource) {
				scope.selected = 'https://www.youtube.com/embed/' + resource.id.videoId;
			};
		}
	};
}])

.directive('inputGroup', [function () {
	return {
		restrict: 'E',
		templateUrl: 'directive/input-group.html',
		scope: {
			title: '@',
            type: '@',
            value: '=',
            placeholder: '@'
		},
		link: function (scope, element, attrs) {}
	};
}]);