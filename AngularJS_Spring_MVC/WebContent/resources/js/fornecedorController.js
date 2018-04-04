//===================== Configurações do controller do fornecedor ======================//
app.controller('fornecedorController', function($scope, $http, $location, $routeParams){

	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != ''){ // Se estiver editando o fornecedor
		
		// Entra para editar fornecedor
		$http.get("fornecedor/buscarfornecedor/" + $routeParams.id).success(function(response){
			$scope.fornecedor = response;
			
			document.getElementById("imagemFornecedor").src = $scope.fornecedor.foto;
			
			// Carrega estados e cidades do fornecedor
			setTimeout(function(){
				$("#selectEstados").prop('selectedIndex', (new Number($scope.fornecedor.estados.id) + 1));
				$http.get("cidades/listar/" + $scope.fornecedor.estados.id).success(function(response){
					$scope.cidades = response;
					setTimeout(function(){
						$("#selectCidades").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.fornecedor.cidades.id));
					}, 1000);
				}).error(function(data, status, headers, config){
					erro("Error: " + status);
				});
			}, 1000);
			
		}).error(function(data, status, headers, config){
			erro("Error: " + status);
		});
	}else{
		$scope.fornecedor = {};
	}
	
	//Editar Fornecedor
	$scope.editarFornecedor = function(id){
		$location.path('fornecedoredit/' + id);
	};
	
	// Salvar Fornecedor
	$scope.salvarFornecedor = function name(){		
		$scope.fornecedor.foto = document.getElementById("imagemFornecedor").getAttribute("src");		
		$http.post("fornecedor/salvar", $scope.fornecedor).success(function(response){			
			$scope.fornecedor = {};			
			document.getElementById("imagemFornecedor").src = '';			
			sucesso("Salvo com sucesso!");			
		}).error(function(response) {
			erro("Error: " + response);
		});
	};
	
	// Listar todos fornecedor
	$scope.listarFornecedor = function(numeroPagina){
		$scope.numeroPagina = numeroPagina;
		$http.get("fornecedor/listar/" + numeroPagina).success(function(response){
			
			// Função para ocultar o botões de paginação
			if(response == null || response == ''){
				$scope.ocultarNavegacao = true;
			}else{
				$scope.ocultarNavegacao = false;
			}
			
			$scope.data =  response;
			
			//-------- Inicio total página
			$http.get("fornecedor/totalPagina").success(function(response){
				$scope.totalPagina = response;
			}).error(function(response){
				erro("Error: " + response);
			});
			//--------- Fim total página
			
		}).error(function(response){
			erro("Error: " + response);
		});
	};
	
	// Paginação da tabela de fornecedor
	$scope.proximo = function(){
		if(new Number($scope.numeroPagina) < new Number($scope.totalPagina)){
			$scope.listarFornecedor(new Number($scope.numeroPagina + 1));	
		}		
	};
	
	// Paginação da tabela de fornecedor
	$scope.anterior = function(){
		if(new Number($scope.numeroPagina) > 1){
			$scope.listarFornecedor(new Number($scope.numeroPagina - 1));	
		}		
	};
	
	// Remover fornecedor
	$scope.removerFornecedor = function(codForn){
		$http.delete("fornecedor/deletar/" + codForn).success(function(response){
			$scope.listarFornecedor($scope.numeroPagina);
			sucesso("Removido com sucesso!");
		}).error(function(data, status, headers, config){
			erro("Error: " + status);
		});
	};
	
	// Carregar as cidades
	$scope.carregarCidades = function(estado) {
		if (identific_nav() != 'chrome') {
			$http.get("cidades/listar/" + estado.id).success(function(response) {
				$scope.cidades = response;
			}).error(function(data, status, headers, config) {
				erro("Error: " + status);
			});
	  }
	};
	
	// Carregar os estados
	$scope.carregarEstados = function(){
		$scope.dataEstados = [{}];
		$http.get("estados/listar").success(function(response){
			$scope.dataEstados = response;
		}).error(function(response){
			erro("Error: " + response);
		});
	};
	
});