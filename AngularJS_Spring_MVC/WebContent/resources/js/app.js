// Configuração do módulo
var app = angular.module('loja',['ngRoute','ngResource','ngAnimate']);


// Configurando as rotas
app.config(function($routeProvider, $provide, $httpProvider, $locationProvider){
	
	$routeProvider.when("/clientelist", {
		controller : "clienteController",
		templateUrl: "cliente/list.html"
	}) // listar
	
	.when("/cliente/:id", {
		controller : "clienteController",
		templateUrl: "cliente/cadastro.html"
	}) //editar
	
	.when("/cliente/cadastro", {
		controller : "clienteController",
		templateUrl: "cliente/cadastro.html"
	}) // novo
	
	.otherwise({
		redirectTo : "/"
	});
	
});

app.controller("clienteController", function($scope, $http){
	
	$scope.listarClientes = function(){
		$http.get("cliente/listar").success(function(response){
			$scope.data =  response;
		}).error(function(response){
			alert("Erro" + response);
		});
	};
	
	$scope.removerCliente = function(codCliente){
		//alert(codCliente);
		$http.delete("cliente/deletar/"+codCliente).success(function(response){
			$scope.listarClientes();
		}).error(function(data, status, headers, config){
			alert("Error:" + status);
		});
	};
});