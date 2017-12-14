var app = angular.module('loja', ['ngRoute', 'ngResource', 'ngAnimate']);

// Criação do service

app.factory("UserService", function(){
	var users = ["Ivete", "Alex", "Paulo"]; // aqui viria do banco de dados
	
	return {
		all: function(){
			return users;
		},
		primeiro: function(){
			return users[0];
		}
	};
});

// Criação do controller
primeiroUserController = app.controller("primeiroUserController", function($scope, UserService) { 
		$scope.primeiro = UserService.primeiro();
});