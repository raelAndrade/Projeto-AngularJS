var app = angular.module('loja',['ngRoute']);

app.controller('personCtrl', function($scope){
	$scope.firstName = "John";
	$scope.lastName = "Doe";
});

app.controller("namesCtrl", function($scope){
	$scope.names = [
		{name:'Jani', country:'Norway'},
		{name:'Carl', country:'Sweden'},
		{name:'Margareth', country:'England'},
		{name:'Hege', country:'Norway'},
		{name:'Joe', country:'Denmark'},
		{name:'Gustav', country:'Sweden'},
	];
});