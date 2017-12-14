var app = angular.module('loja', ['ngRoute']);

// INICIO ANGULAR HTTP
/*app.controller('pegarResposta', function($scope, $http){
	$scope.pegarResposta = function(){
		$http.get('pegarResposta').then(function (response) {
			document.getElementById('resposta').value = "" + response.data;
		});
	}
});

app.controller('pegarResposta2', function($scope, $http){
	$scope.pegarResposta2 = function(){
		$http.get('pegarResposta2').then(function (response) {
			document.getElementById('resposta2').value = "" + response.data;
			document.getElementById('resposta3').value = "" + response.status;
			document.getElementById('resposta4').value = "" + response.statusText;
		});
	};
});
*/
app.controller('pegarRespostaJson', function($scope, $http){
	$http.get("pegarRespostaJson").then(function (response){
		$scope.lista = response.data;
	});
});

