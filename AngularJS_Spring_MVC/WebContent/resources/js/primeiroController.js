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

// Ativando a injeção de dependencia
primeiroUserController.$inject = ["$scope", "UserService"];

// Segundo controller
todosUserController = app.controller("todosUserController", function($scope, UserService){
	$scope.todos = UserService.all();
});

// Ativando a injeção de dependencia
todosUserController.$inject = ["$scope", "UserService"];


// Filtrando dados da tabela
app.controller("filterController", function($scope){
	$scope.friends = [
		{
			name : "Mario",
			lastname :"Silva",
			age : 20
		},
		{
			name : "Maria",
			lastname :"Aparecida",
			age : 56
		},
		{
			name : "João",
			lastname :"Benedito",
			age : 44
		},
	];
});