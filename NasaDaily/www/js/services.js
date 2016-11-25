angular.module('myNews.services', [])

.factory('DailyUpdate', function($http, $q) {
        var cachedData = [];

        // Use $http to load todays data    
        function getTodaysUpdate() {
            //Promises simplify asynchronous code by avoiding the so-called pyramid of doom 
            //that result from continuously nested callbacks. They also make async error handling easier.
            var deferred = $q.defer();

			// TODO: make url for today's date
            var url = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";

            $http.get(url)
                .success(function(data, status) {
                    console.log("Received DailyImage via HTTP"); // ..., data, status);
                    //process success scenario.
                    deferred.resolve(data);
                })
                .error(function() {
                    //process error scenario.
                    console.log("Error while making HTTP call.");
                    deferred.reject();
                });

            // TODO: If date not in array then save object to cachedData
            //  object made of date and nasa-data
            return deferred.promise;
        } 


    return {
        getTodaysUpdate: getTodaysUpdate,
        getData: function() {
            return JSON.stringify(data_today[0]);
            //return data_today[0];
        }
    };
});

