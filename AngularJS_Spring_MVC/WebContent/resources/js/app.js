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

	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != ''){
		$http.get("cliente/buscarcliente/" + $routeParams.id).success(function(response){
			$scope.cliente =  response;
		}).error(function(data, status, headers, config){
			//erro("Erro:" + status);
			erro("Error: " + status);
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
			sucesso("Salvo com sucesso!");
		}).error(function(data, status, headers, config) {
			//alert("Error:" + status);
			erro("Error: " + status);
		});
	};
	
	// Listar todos
	$scope.listarClientes = function(){
		$http.get("cliente/listar").success(function(response){
			$scope.data =  response;
		}).error(function(response){
			//alert("Erro" + response);
			erro("Error: " + response);
		});
	};
	
	// Remover
	$scope.removerCliente = function(codCliente){
		//alert(codCliente);
		$http.delete("cliente/deletar/"+codCliente).success(function(response){
			$scope.listarClientes();
			sucesso("Removido com sucesso!");
		}).error(function(data, status, headers, config){
			//alert("Error:" + status);
			erro("Error: " + status);
		});
	};
	
	$scope.carregarCidades = function(estado) {
		if (identific_nav() != 'chrome') {
			$http.get("cidades/listar/" + estado.id).success(function(response) {
				$scope.cidades = response;
			}).error(function(data, status, headers, config) {
				erro("Error: " + status);
			});
	  }
	};
	
	$scope.carregarEstados = function(){
		$scope.dataEstados = [{}];
		$http.get("estados/listar").success(function(response){
			$scope.dataEstados =  response;
		}).error(function(response){
			//alert("Erro" + response);
			erro("Error: " + response);
		});
	};
	
});

function sucesso(msg){
	$.notify({
        message: msg
        },{
            type: 'success',
            timer: 1000
	});
}

function erro(msg){
	$.notify({
        message: msg
        },{
            type: 'danger',
            timer: 1000
	});
}