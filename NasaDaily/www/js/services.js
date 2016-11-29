angular.module('myNews.services', [])
.service('settingService', function($rootScope) {
    this.dateRange = 1; // default for viewing Picture of the Day

    this.setNumOfDays = function(setting) {
        this.dateRange = setting;
        $rootScope.$broadcast("settingUpdated"); 
    };
    this.getNumOfDays = function() {
        return this.dateRange;
    };
})
.service('dateService', function() {
    var today = new Date();
    this.getToday = function() {
        return today.toISOString().substr(0, 10);
    };
    this.getDatesForNumOfDays = function() {}; 
})
.factory('DailyUpdate', function($http, $q, $ionicLoading, $timeout, CacheFactory, dateService, NASA_APOD) {

        // Check to make sure the cache doesn't already exist
        if (!CacheFactory.get('nasaCache')) {
            // 
            CacheFactory.createCache('nasaCache', {
                deleteOnExpire: 'aggressive',
                recycleFreq: 60000
            });
        }

        var nasaCache = CacheFactory.get('nasaCache');

        // Use $http to load todays data 
        function getPicturesForNumberOfDays(numOfDays) {
            var apodDate = dateService.getToday();
            return getPictureForDate(apodDate);
        }   
        function getPictureForDate(apodDate) {
            var start = new Date().getTime();
            //Promises simplify asynchronous code by avoiding the so-called pyramid of doom 
            //that result from continuously nested callbacks. They also make async error handling easier.
            var deferred = $q.defer();

            if (nasaCache.get(apodDate)) {
                console.log('loaded from cache: '+ apodDate);
                deferred.resolve(nasaCache.get(apodDate));
            } else {

            $ionicLoading.show({ template: 'Loading...'});

			// TODO: make url for given date for instance ?date=2016-11-23&api_key=DEMO_KEY
            var url = NASA_APOD.API_URL + "api_key=" + NASA_APOD.API_KEY;

            $http.get(url)
                .success(function(data, status) {
                    console.log('time taken for HTTP request: ' + (new Date().getTime() - start) + 'ms');
                    // Simulate a delay over http to show the loading modal popup
                    // TODO : take the timeout function before going live
                    $timeout(function(){
                        //process success scenario.
                        $ionicLoading.hide();
                        nasaCache.put(apodDate, data);
                        deferred.resolve(data);
                    }, 2000);
                })
                .error(function() {
                    //process error scenario.
                    $ionicLoading.hide();
                    console.log("Error while making HTTP call.");
                    deferred.reject();
                });
            }
            // TODO: Cache other dates not just today
            return deferred.promise;
        } 


    return {
        getPicturesForNumberOfDays: getPicturesForNumberOfDays,
    };
});
