angular.module('myNews.controllers', [])

.controller('todaysImageCtrl', function($scope, DailyUpdate) {
    var _pageTitle = document.getElementById("pageTitle");
    // Refresh Picture of the Day from data service
    _pageTitle.addEventListener("click", getNasaData, false);

    function getNasaData() {
        DailyUpdate.getTodaysUpdate().then(function(data) {
            dailyUpdate = data;

            $scope.title = dailyUpdate.title;
            $scope.img_date = dailyUpdate.date;
            $scope.explanation = dailyUpdate.explanation;
            $scope.img_url = dailyUpdate.url;

        });
    }

    // On page load - get Nasa Data
    getNasaData();

})

.controller('settingsCtrl', function($scope){
	$scope.fromDate='0'; // default to today

	$scope.setFromDate = function(noOfDays) {
    switch(noOfDays) {
      case '0':
        $scope.title = "today";
        break;
      case '7':
        $scope.title = "Week";
        break;       
      case '14':
        $scope.title = "Fortnight";
        break;
    }
  }
});
