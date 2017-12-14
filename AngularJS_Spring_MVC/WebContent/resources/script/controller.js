/* config 		-> Use este método para registrar o trabalho que precisa ser executado no carregamento do módulo.
 * when			-> Adiciona uma nova definição de rota ao serviço $route.	
 * otherwise	-> Define a definição de rota que será usada na mudança de rota quando nenhuma outra defininção
 */

var app = angular.module('loja',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when("/", {controller: "listController", templateUrl: "lista.html"}) // Listar
	.when("/edit/:name", {controller: "editController", templateUrl: "form.html"}) // Editar
	.when("/new", {controller: "newController", templateUrl: "form.html"}) // Novo]
	.otherwise({redirectTo: "/"});
});

// Registro de trabalho que deve ser ralizado quando o injetor é feito carregamento todos os módulos.
app.run(function($rootScope){
	$rootScope.frutas = ['banana', 'melancia', 'pera'];
});

app.controller('listController', ['$scope', '$routeParams', '$rootScope', '$route', '$location',
	function($scope, $routeParams, $rootScope, $route, $location){

}]);

//$scope é o escopo da aplicação html
//$location redirecionamento entre rotas
//$routeParams são os parametros repassador pela url
app.controller('editController',['$scope','$routeParams','$rootScope','$route','$location', 
	function editController($scope, $routeParams, $rootScope, $route, $location){
	$scope.title = 'Editar frutas'; // adicionando titulo a página
	$scope.fruta = $routeParams.name; //pegando o nome da fruta para editar
	$scope.frutaIndex = $scope.frutas.IndexOf($scope.fruta); // pegando a fruta dentro da lista
	
	$scope.salvar = function(){
		$scope.frutas[$scope.frutaIndex] = $scope.fruta; // pega o novo nome da fruta editada
		$location.path('/'); // volta para o index
	};
}]);

// Novo registro
app.controller('newController',['$scope','$routeParams','$rootScope','$route','$location', 
	function newController($scope, $routeParams, $rootScope, $route, $location){
	$scope.title = 'Nova Fruta';
	$scope.fruta = '';
	
	$scope.salvar = function(){
		$scope.frutas.push($scope.fruta); //add nova fruta.
		$location.path('/'); // volta para o index
	};
}]);