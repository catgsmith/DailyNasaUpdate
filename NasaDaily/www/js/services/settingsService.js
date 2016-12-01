angular.module('myNews.services', [])
    .service('settingsService', function($rootScope) {
    this.dateRange = 1; // default for viewing Picture of the Day

    this.setNumOfDays = function(setting) {
        this.dateRange = setting;
        $rootScope.$broadcast("settingUpdated"); 
    };
    this.getNumOfDays = function() {
        return this.dateRange;
    };
});

