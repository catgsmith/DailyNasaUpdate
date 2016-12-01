angular.module('myNews.controllers', [])

.controller('mainCtrl', function($scope, DailyUpdate, settingsService) {
    // Add listener to page title - checking caching server 
    var _pageTitle = document.getElementById("pageTitle");
    // Refresh Picture of the Day from data service
    _pageTitle.addEventListener("click", getNasaData, false);


    $scope.$on('$ionicView.beforeEnter', function() {
      console.log("==> mainCtrl: getNasaData for" + $scope.numOfDays + " days");
      getNasaData();
    });


    function getNasaData() {
        $scope.numOfDays = settingsService.getNumOfDays();
        DailyUpdate.getPicturesForNumberOfDays($scope.numOfDays)
        .then(function(data) {
            $scope.apodListing = data; 
        });
    }
})

.controller('settingsCtrl', function($scope, settingsService){

  $scope.$on('$ionicView.beforeEnter', function() {
    $scope.numOfDays = settingsService.getNumOfDays();
    console.log("~Log $scope.numOfDays settingsCtrl: " + $scope.numOfDays);
  });

	$scope.setNumOfDays = function(noOfDays) {
    settingsService.setNumOfDays(noOfDays);

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
});
