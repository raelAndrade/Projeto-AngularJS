var app = angular.module('loja', ['ngRoute']);

app.controller('namesController', function($scope){
	$scope.names = ["Emil", "Tobias", "Linus"];
});