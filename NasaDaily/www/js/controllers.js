angular.module('myNews.controllers', [])

.controller('todaysImageCtrl', function($scope, DailyUpdate) {

	DailyUpdate.getTodaysUpdate().then(function(data) {
		dailyUpdate = data;

		$scope.title = dailyUpdate.title;
		$scope.img_date = dailyUpdate.date;
		$scope.explanation = dailyUpdate.explanation;
		$scope.img_url = dailyUpdate.url;

	});
});
