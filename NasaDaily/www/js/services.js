angular.module('myNews.services', [])
.service('dateService', function() {
    this.getToday = function() {
        var today = new Date();
        return today.toISOString().substr(0, 10);
    }
})

.factory('DailyUpdate', function($http, $q, $ionicLoading, $timeout, CacheFactory, dateService, NASA_APOD) {
        var today = dateService.getToday();

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
        function getTodaysUpdate() {
            var start = new Date().getTime();
            //Promises simplify asynchronous code by avoiding the so-called pyramid of doom 
            //that result from continuously nested callbacks. They also make async error handling easier.
            var deferred = $q.defer();

            if (nasaCache.get(today)) {
                console.log('loaded from cache: '+ today);
                deferred.resolve(nasaCache.get(today));
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
                        nasaCache.put(today, data);
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
        getTodaysUpdate: getTodaysUpdate,
    };
});
