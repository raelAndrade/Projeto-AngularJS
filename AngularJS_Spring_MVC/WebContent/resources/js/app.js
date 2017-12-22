// Configuração do módulo
var app = angular.module('loja',['ngRoute','ngResource','ngAnimate']);


// Configurando as rotas
app.config(function($routeProvider, $provide, $httpProvider, $locationProvider){
	
	$routeProvider.when("/clientelist", {
		controller : "clienteController",
		templateUrl: "cliente/list.html"
	}) // listar
	
	.when("/clienteedit/:id", {
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

app.controller("clienteController", function($scope, $http, $location, $routeParams){
	
	//$scope.cliente = {};
	
	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != ''){
		$http.get("cliente/buscarcliente/" + $routeParams.id).success(function(response){
			$scope.cliente =  response;
		}).error(function(data, status, headers, config){
			erro("Erro:" + status);
		});
	}else{
		$scope.cliente = {};
	}
	
	//Editar
	$scope.editarCliente = function(id){
		//alert($routeParams.id);
		$location.path('clienteedit/' + id);
		
	};
	
	// Salvar
	$scope.salvarCliente = function name(){		
		//alert($scope.cliente.telefone);		
		$http.post("cliente/salvar", $scope.cliente).success(function(response){
			$scope.cliente = {};
		}).error(function(data, status, headers, config) {
			alert("Error:" + status);
		});
	};
	
	// Listar todos
	$scope.listarClientes = function(){
		$http.get("cliente/listar").success(function(response){
			$scope.data =  response;
		}).error(function(response){
			alert("Erro" + response);
		});
	};
	
	// Remover
	$scope.removerCliente = function(codCliente){
		//alert(codCliente);
		$http.delete("cliente/deletar/"+codCliente).success(function(response){
			$scope.listarClientes();
		}).error(function(data, status, headers, config){
			alert("Error:" + status);
		});
	};
	
});