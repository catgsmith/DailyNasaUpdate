angular.module('myNews.services')
    .service('dateService', function() {
    //  maintain a list of dates
    this.dateArray = [];
    // at least get todays date
    var today = new Date(); 
    this.dateArray.push(today);

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
});