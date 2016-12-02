angular.module('myNews.services')
    .factory('dateService', function() {  
    var offsetDays = 0;    
    var startDate = new Date(); 
    var dateArray = []; 
    
    setStartDate = function(newStartDate) {
        offsetDays = getNumOfDays(startDate,newStartDate);
        //  maintain a list of dates
        dateArray = [];
        dateArray.push(newStartDate);
    };

    getOffsetDays = function() {
        return offsetDays;
    };

    getDateArray = function(numOfDays) {
        if ( dateArray.length > numOfDays) {
            return  dateArray.slice(0, numOfDays);

        } else if ( dateArray.length < numOfDays) { 
            // Calculate days from  today, back number of days
            for(var i=dateArray.length; i<numOfDays; i++) {
                var nextDate = new Date(dateArray[dateArray.length-1]);
                nextDate.setDate(nextDate.getDate()-1); 
                dateArray[i] = nextDate;
            }
        } 
        // Always return a shallow copy
        return dateArray.slice(); // this is how to make a copy
    };

    getNumOfDays = function(dateFrom, dateTo) {
        date1 = new Date(dateFrom.toISOString().substr(0, 10));
        date2 = new Date(dateTo.toISOString().substr(0, 10));
        diff = date1.getTime() - date2.getTime();
        var days = Math.round(Math.abs(diff/(1000*60*60*24)));
        return days;
    };
    // start with today's date 
    setStartDate(startDate);

    return {
        setStartDate: setStartDate,
        getOffsetDays: getOffsetDays,
        getDateArray: getDateArray,
        getNumOfDays: getNumOfDays
    };
});