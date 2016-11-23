angular.module('myNews.controllers', [])

.controller('todaysImageCtrl', function($scope, DailyUpdate) {

	var dailyUpdate = JSON.parse(DailyUpdate.getTodaysUpdate());
	$scope.title = dailyUpdate.title;
	$scope.img_date = dailyUpdate.date;
	$scope.explanation = dailyUpdate.explanation;
	$scope.img_url = dailyUpdate.url;
});