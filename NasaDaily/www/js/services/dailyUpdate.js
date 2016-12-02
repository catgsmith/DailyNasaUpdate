angular.module('myNews.services')
    .factory('DailyUpdate',  function($http, $q, $ionicLoading, $rootScope, CacheFactory, dateService, NASA_APOD) {
        // This is a list of APOD objects to pass back to controller
        var apodResults = []; 
        
        // Check to make sure the cache doesn't already exist
        if (!CacheFactory.get('nasaCache')) {
            // 
            CacheFactory.createCache('nasaCache', {
                deleteOnExpire: 'aggressive', // Items will be deleted from this cache right when they expire.
                cacheFlushInterval: 5 * 60 * 1000, // This cache will clear itself every hour
                storageMode: 'localStorage' // This cache will use `localStorage`
            });
        }
        var nasaCache = CacheFactory.get('nasaCache');
        nasaCache.setOptions({
            onExpire: function(key,value) {
                getPicturesForNumberOfDays(apodResults.length).then( function(){
                    console.log("Cached data was automatically refreshed");
                }, function (){
                    console.log("Error on refresh of cache. Putting expired data back");
                    nasaCache.put(key,value);
                });
            }
        });


        // Create a APOD object constructor
        var APOD = function( apodDateVal, title, img_date, explanation, img_url ){
            this.apodDateVal = apodDateVal;
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
                        if(data.date !== null && data.date !== undefined) // Good data
                        apodResults.push( new APOD(data.apodDateVal, data.title, data.date, data.explanation, data.url));
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
                    return b.apodDateVal - a.apodDateVal;
                });
            }).then( function() { 
                $ionicLoading.hide();
                deferred.resolve(apodResults); }, 
                function(error){
                $ionicLoading.hide();
                console.log("~Log: Failure to load data");

                var offsetDays = dateService.getOffsetDays();
                // error.code === 500 INTERNAL SERVER ERROR
                if (numOfDays===1 && error.code === 500 && offsetDays === 0) {
                    var startDate = new Date();
                    startDate.setDate(startDate.getDate()-1); // use yesterday
                    dateService.setStartDate(startDate);
                    $rootScope.$broadcast("StartFromYesterday");
                }

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
                    var dataApodDateString = "";
                    // Add date object for sorting results array later
                    if (data.date !== null && data.date !== undefined) {
                        var split = data.date.split("-");
                        var dataApodDate = new Date(split[0], split[1]-1, split[2]);
                        data.apodDateVal = dataApodDate.getTime();
                        // Add data to cache - key by date in string format.
                        dataApodDateString = dataApodDate.toISOString().substr(0, 10);
                        nasaCache.put(dataApodDateString, data);
                    } 
                    var now = new Date();
                    console.log(now.toLocaleTimeString() + ': time taken for HTTP request on ['+ 
                        dataApodDateString +']: ' + (now.getTime() - start) + 'ms');    
                
                    deferred.resolve(data);
                    
                })
                .error(function(error) {
                    //process error scenario.
                    console.log("Error while making HTTP call.");
                    deferred.reject(error);
                });
            }
            // return promise of NASA APOD for given date
            return deferred.promise;
        } 
    return {
        getPicturesForNumberOfDays: getPicturesForNumberOfDays
    };
});