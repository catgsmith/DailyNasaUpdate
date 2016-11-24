angular.module('myNews.services', [])

.factory('DailyUpdate', function($http) {
        var cachedData = [];

        // Sample code using expected data from http request
        var data_today = [{
            "copyright": "S\u00e9bastien Goz\u00e9",
            "date": "2016-11-23",
            "explanation": "Do you see the bubble in the center?  Seemingly adrift in a cosmic sea of stars and glowing gas, the delicate, floating apparition in this widefield view is cataloged as NGC 7635 - The Bubble Nebula. A mere 10 light-years wide, the tiny Bubble Nebula and the larger complex of interstellar gas and dust clouds are found about 11,000 light-years distant, straddling the boundary between the parental constellations Cepheus and Cassiopeia. Also included in the breathtaking vista is open star cluster M52 (upper left), some 5,000 light-years away. The featured image spans about two degrees on the sky corresponding to a width of about 375 light-years at the estimated distance of the Bubble Nebula.   Follow APOD on: Facebook,  Google Plus,  Instagram, or Twitter",
            "hdurl": "http://apod.nasa.gov/apod/image/1611/Bubble_Goze_1600.jpg",
            "media_type": "image",
            "service_version": "v1",
            "title": "NGC 7635: Bubble in a Cosmic Sea",
            "url": "http://apod.nasa.gov/apod/image/1611/Bubble_Goze_960.jpg"
        }];

        // TODO: use $http to load todays data    
        function getTodaysUpdate(callback) {

			// TODO: make url for today's date
            var url = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";

            $http.get(url)
                .success(function(data, status) {
                    console.log("Received DailyImage via HTTP", data, status);
                        //process success scenario.
                    callback(data);
                })
                .error(function() {
                    //process error scenario.
                    console.log("Error while making HTTP call.");
                });

            // TODO: If date not in array then save object to cachedData
            //  object made of date and nasa-data
        } 


    return {
        getTodaysUpdate: getTodaysUpdate,
        getData: function() {
            return JSON.stringify(data_today[0]);
            //return data_today[0];
        }
    };
});

