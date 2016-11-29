angular.module('myNews.controllers', [])

.controller('mainCtrl', function($scope, DailyUpdate, settingService) {
    var _pageTitle = document.getElementById("pageTitle");
    // Refresh Picture of the Day from data service
    _pageTitle.addEventListener("click", getNasaData, false);


    function getNasaData(numOfDays) {

        DailyUpdate.getPicturesForNumberOfDays(numOfDays).then(function(data) {
            dailyUpdate = data;

            $scope.title = dailyUpdate.title;
            $scope.img_date = dailyUpdate.date;
            $scope.explanation = dailyUpdate.explanation;
            $scope.img_url = dailyUpdate.url;

        });
    }

    // On page load - get Nasa Data
    $scope.numOfDays = settingService.getNumOfDays();
    getNasaData($scope.numOfDays);

    $scope.$on('settingUpdated', function() {
      $scope.numOfDays = settingService.getNumOfDays();
      console.log("~Log $scope.numOfDays mainCtrl: " + $scope.numOfDays);
    });

})

.controller('settingsCtrl', function($scope, settingService){
	$scope.numOfDays = settingService.getNumOfDays();

	$scope.setNumOfDays = function(noOfDays) {
    settingService.setNumOfDays(noOfDays);

    switch(noOfDays) {
      case 1:
        $scope.title = "today";
        break;
      case 7:
        $scope.title = "Week";
        break;       
      case 14:
        $scope.title = "Fortnight";
        break;
    }
  };

  $scope.$on('settingUpdated', function() {
    $scope.numOfDays = settingService.getNumOfDays();
    console.log("~Log $scope.numOfDays settingsCtrl: " + $scope.numOfDays);
  });
});
