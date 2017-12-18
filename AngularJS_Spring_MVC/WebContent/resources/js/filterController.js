var app = angular.module('loja', ['ngRoute']);

app.controller('personCtrl', function($scope){
	$scope.firstName = "Doe";
	$scope.lastName = "John";
});

app.controller("namesCtrl", function($scope){
	$scope.names = [
		{name:'Jani', country:'Norway'},
		{name:'Carl', country:'Sweden'},
		{name:'Margareth', country:'England'},
		{name:'Hege', country:'Norway'},
		{name:'Joe', country:'Denmark'},
		{name:'Gustav', country:'Sweden'}
	];
});

app.controller('costCtrl', function($scope) {
	$scope.price = 58;
});

app.controller('namesCtrl2', function($scope) {
	$scope.names = [
		'Jani',
		'Carl',
		'Margareth',
		'hege',
		'Joe',
		'Gustav',
		'Birgit',
		'Mary',
		'kai'
	];
});

app.controller('namesCtrl3', function($scope){
	$scope.names = [
		'Jani',
		'Carl',
		'Margareth',
		'hege',
		'Joe',
		'Gustav',
		'Birgit',
		'Mary',
		'kai'
	];
});

app.controller('namesCtrl4', function($scope){
	$scope.names = [
		{name:'Jani', country:'Norway'},
		{name:'Carl', country:'Sweden'},
		{name:'Margareth', country:'England'},
		{name:'Hege', country:'Norway'},
		{name:'Joe', country:'Denmark'},
		{name:'Gustav', country:'Sweden'},
		{name:'Birgit', country:'Denmark'},
		{name:'Mary', country:'England'},
		{name:'kai', country:'Norway'}
	];
	$scope.orderByMe = function(x){
		$scope.myOrderBy = x;
	}
});