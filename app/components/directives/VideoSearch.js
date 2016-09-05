App.directive('actionButton', ['$ionicModal', function ($ionicModal) {
    return {
        restrict: 'E',
        templateUrl: 'directive/action-button.html',
        scope: {
            title: '@',
            items: '='
        },
        link: function (scope, element, attrs) {
            $ionicModal.fromTemplateUrl('directive/action-modal.html', {
                scope: scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                scope.modal = modal;
            });

            scope.show = function () {
                scope.modal.show();
            };

            scope.hide = function () {
                scope.modal.hide();
            };
            
            scope.onItemClicked = function (item) {
                // dismiss the modal dialog
                scope.hide();
                // execute item action
                item.action();
            };
        }
    };
}]);