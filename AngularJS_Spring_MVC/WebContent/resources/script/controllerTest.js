var app = angular.module('loja', ['ngRoute']);

app.controller('controller', ['$scope', function($scope){
	$scope.user = {meuNome :'Israel Gonçalves'};
	
	$scope.contador = 0;
	
	$scope.addContador = function(){
		$scope.contador++;
	};
	
	$scope.pessoas = ['Maria', 'José', 'Ana'];
}]);

app.directive("w3TestDirective", function(){
	return{
		template : "Foi feito em um construtor de diretriz!"
	};
});

app.controller('personCtrl', function($scope){
	$scope.firstName = "John";
	$scope.lastName = "Doe";
});

app.controller('namesCtrl', function($scope){
	$scope.names = [
		{name:'Jani', country:'Norway'},
		{name:'Carl', country:'Sweden'},
		{name:'Margareth', country:'England'},
		{name:'Hege', country:'Norway'},
		{name:'Joe', country:'Denmark'},
		{name:'Gustav', country:'Sweden'},
		{name:'Birgit', country:'Denmark'},
		{name:'Mary', country:'England'},
		{name:'Kai', country:'Norway'}	
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



