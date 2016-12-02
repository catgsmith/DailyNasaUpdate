angular.module('myNews.services')
    .service('dateService', function() {    
    
    this.setStartDate = function(startDate) {
        //  maintain a list of dates
        this.dateArray = [];
        this.dateArray.push(startDate);
    }

    this.getDateArray = function(numOfDays) {
        

        if ( this.dateArray.length > numOfDays) {
            return  this.dateArray.slice(0, numOfDays);

        } else if ( this.dateArray.length < numOfDays) { 
            // Calculate days from  today, back number of days
            for(var i=this.dateArray.length; i<numOfDays; i++) {
                var nextDate = new Date(this.dateArray[this.dateArray.length-1]);
                nextDate.setDate(nextDate.getDate()-1); 
                this.dateArray[i] = nextDate;
            }
        } 
        // Always return a shallow copy
        return this.dateArray.slice(); // this is how to make a copy
    };
    // start with today's date
    var today = new Date(); 
    this.setStartDate(today);
});