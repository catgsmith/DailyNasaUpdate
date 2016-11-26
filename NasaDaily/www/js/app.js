// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('myNews', ['ionic', 'myNews.controllers', 'myNews.services', 'myNews.values', 'angular-cache'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function ($stateProvider, $urlRouterProvider, CacheFactoryProvider) {
    //Let's have items which are added to cache expire after an hour
    angular.extend(CacheFactoryProvider.defaults, { maxAge: 60 * 60 * 1000 }); // 1 hour

    $stateProvider
    .state('homeState', {
        url: "/home",
        templateUrl: "templates/home.html",
        controller: "todaysImageCtrl"
    })
    .state('settingsState', {
        url: "/settings",
        templateUrl: "templates/settings.html",
        controller: "settingsCtrl"
    });
    // if none of the above states are matched, use this as the fallpack
    $urlRouterProvider.otherwise('/home');

});