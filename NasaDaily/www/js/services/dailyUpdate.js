angular.module('myNews.services')
    .factory('DailyUpdate',  function($http, $q, $ionicLoading, $timeout, CacheFactory, dateService, NASA_APOD) {
        // This is a list of APOD objects to pass back to controller
        var apodResults = []; 
        
        // Check to make sure the cache doesn't already exist
        if (!CacheFactory.get('nasaCache')) {
            // 
            CacheFactory.createCache('nasaCache', {
                deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
                cacheFlushInterval: 10 * 60 * 1000, // This cache will clear itself every 10 mins
                storageMode: 'localStorage' // This cache will use `localStorage`
            });
        }
        var nasaCache = CacheFactory.get('nasaCache');
        nasaCache.setOptions({
            onExpire: function(key,value) {
                getPicturesForNumberOfDays(apodResults.length).then( function(){
                    console.log("Cached data was automatically refreshed")
                }, function (){
                    console.log("Error on refresh of cache. Putting expired data back");
                    nasaCache.put(key,value);
                });
            }
        });


        // Create a APOD object constructor
        var APOD = function( apodDate, title, img_date, explanation, img_url ){
            this.apodDate = apodDate;
            this.title = title;
            this.img_date = img_date;
            this.explanation = explanation;
            this.img_url = img_url;
        };

        // Use $http to load todays data 
        function getPicturesForNumberOfDays(numOfDays) {
            // recalculate aray of APOD objects to pass back to controller
            apodResults = []; 

            var deferred = $q.defer();  // control promisses
            var promises = [];
            var promise = {};

            $ionicLoading.show({ template: 'Loading...'});
            
            // Get dates that correspond to number of prior days
            var apodDateArray = dateService.getDateArray(numOfDays);

            // For each date get a picture from Nasa APOD remote service
            for(var i=0; i<apodDateArray.length; i++) {
                // Call getPictureForDate then push to apodResults array
                promise = getPictureForDate(apodDateArray[i])
                    .then(function(data) {
                        if(data.code !== 500) // Server error
                        apodResults.push( new APOD(data.apodDate, data.title, data.date, data.explanation, data.url));
                    });
                promises.push(promise);
                   
            }
            
            // Resolve all promises in array of promises
            $q.all(promises).then
            (function() {
                console.log("Number of APOD objects loaded: " + apodResults.length);
                // sort the result array when all the new APOD objects have been added
                apodResults.sort(function(a,b){
                // Sort in descending date order    
                return b.apodDate.valueOf() - a.apodDate.valueOf();
                });
            }).then( function() { 
                $ionicLoading.hide();
                deferred.resolve(apodResults); }, 
                function(error){
                $ionicLoading.hide();
                console.log("~Log: " + error.message);
            });
            // return promise of array of APOD objects 
            return deferred.promise;
        }

        // PRIVATE Function : get Picture For Given Date Object
        function getPictureForDate(apodDate) {
            // Format the date to insert into the url for NASA APOD service
            apodDateString = apodDate.toISOString().substr(0, 10);
            var url = NASA_APOD.API_URL +"date="+ apodDateString + "&api_key=" + NASA_APOD.API_KEY;

            //Promises simplify asynchronous code by avoiding the so-called pyramid of doom 
            //that result from continuously nested callbacks. They also make async error handling easier.
            var deferred = $q.defer();

            if (nasaCache.get(apodDateString)) {
                console.log('loaded from cache: '+ apodDateString);
                deferred.resolve(nasaCache.get(apodDateString));
            } else {

                // if not in Cache then call out to NASA APOD service over http
                var start = new Date().getTime(); // keep track of how long http takes

                $http.get(url)
                .success(function(data, status) {
                    console.log('time taken for HTTP request: ' + (new Date().getTime() - start) + 'ms');
                    // Add date object for sorting results array later
                        if (data.title !== null && data.title !== undefined) {
                              var split = data.date.split("-");
                                
                            data.apodDate = new Date(split[0], split[1]-1, split[2]);
                            //data.apodDate = apodDate;
                            // Add data to cache - key by date in string format.
                            nasaCache.put(apodDateString, data);
                        }     
                    
                        deferred.resolve(data);
                    
                })
                .error(function() {
                    //process error scenario.
                    console.log("Error while making HTTP call.");
                    deferred.reject();
                });
            }
            // return promise of NASA APOD for given date
            return deferred.promise;
        } 
    return {
        getPicturesForNumberOfDays: getPicturesForNumberOfDays
    };
});