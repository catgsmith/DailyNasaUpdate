angular.module('myNews.directives', [])
    .directive('mybackbutton', [function () {
        return {
            restrict: 'E',
            replace: true,
            scope: false,
            template: '<a class="button button-icon icon icon-left" href="#/home"></a>',
            compile: function (element, attrs) {
                var icon = ionic.Platform.isIOS() ? 'ion-ios-arrow-back' : 'ion-android-arrow-back';
                angular.element(element[0]).addClass(icon);
            }
        };
    }])