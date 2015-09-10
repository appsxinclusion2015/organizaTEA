'use strict';

angular.module('myApp.directive', [])

.directive('buttonBack', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function (scope, elem, attrs) {
      elem.attr('class','mdl-button mdl-js-button mdl-button--fab mdl-button--colored app-back-button');
      elem.append('<i class="material-icons">arrow_back</i>');
      
      elem.bind('click', function () {
        $window.history.back();
      });
      
      componentHandler.upgradeElement(elem[0]);
    }
  };
}]);