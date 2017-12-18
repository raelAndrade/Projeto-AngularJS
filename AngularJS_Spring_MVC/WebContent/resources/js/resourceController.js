var app = angular.module('loja', ['ngRoute','ngResource']);

app.controller('controllerPessoa', function($scope, $resource){
	
	// Com Spring Framework RestFull
	//pessoas = $resource("/pessoas/:codPessoa");
	
	// Com servlets
	pessoas = $resource("/AngularJS_Spring_MVC/pessoas/?codPessoa=:codPessoa");
	
	$resource.getPorId = function(){
		pessoas.get({codPessoa: $scope.$codPessoa}, function(data){
			$scope.objetoPessoa = data;
		});
	}
	
	// Buscar todos
	$scope.getPorTodos = function(){
		pessoas.query(function(data){
			$scope.objetoPessoa = data;
		});
	}
	
	// Salvar pessoa
	$scope.salvarPessoa = function(){
		p = new pessoa();
		p.$save();
		p.numero = '12345678';
	};
	
	// Deletar pessoa
	$scope.deletarPessoa = function(){
		pessoas.$delete({codPessoa:"60"});
	};
	
});