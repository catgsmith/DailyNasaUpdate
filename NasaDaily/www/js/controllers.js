angular.module('myNews.controllers', [])

.controller('mainCtrl', function($scope, $ionicScrollDelegate, DailyUpdate, settingsService, dateService) {
    // Add listener to page title - checking caching server 
    var _pageTitle = document.getElementById("pageTitle");
    // Refresh Picture of the Day from data service
    _pageTitle.addEventListener("click", getNasaData, false);


    $scope.$on('$ionicView.beforeEnter', function() {
      var currentNumOfDays = $scope.numOfDays;
      $scope.numOfDays = settingsService.getNumOfDays();
      // Scroll to top of page
      if($scope.numOfDays < currentNumOfDays) {
              $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop(); }
      
      console.log("==> mainCtrl: getNasaData for " + $scope.numOfDays + " days");
      getNasaData();
    });

    $scope.$on('StartFromYesterday', function(){ 
      getNasaData(); });

    // Get data from ADOP Service and bind to view
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
  };
});
