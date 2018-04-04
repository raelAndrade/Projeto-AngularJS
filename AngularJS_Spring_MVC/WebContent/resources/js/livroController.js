//================= Configurações do controller de livros ========================//
app.controller('livroController', function($scope, $http, $location, $routeParams){

	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != ''){		
		// Entra para editar livro
		$http.get("livro/buscarlivro/" + $routeParams.id).success(function(response){
			$scope.livro =  response;
			
			document.getElementById("imagemLivro").src = $scope.livro.foto;

				$http.get("fornecedor/listartodos").success(function(response){
					$scope.fornecedoresList = response;
					setTimeout(function(){
						$("#selectFornecedor").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.livro.fornecedor.id));
					}, 1000);
				}).error(function(data, status, headers, config){
					erro("Error: " + status);
				});			
		}).error(function(data, status, headers, config){
			erro("Error: " + status);
		});
		
	}else{
		$scope.livro = {};
	}
	
	//Editar livro
	$scope.editarLivro = function(id){
		$location.path('livroedit/' + id);
	};
	
	// Salvar livro
	$scope.salvarLivro = function name(){		
		$scope.livro.foto = document.getElementById("imagemLivro").getAttribute("src");
		
		$http.post("livro/salvar", $scope.livro).success(function(response){			
			$scope.livro = {};			
			document.getElementById("imagemLivro").src = '';			
			sucesso("Salvo com sucesso!");			
		}).error(function(response) {
			erro("Error: " + response);
		});
	};
	
	// Listar todos livros
	$scope.listarLivros = function(numeroPagina){
		$scope.numeroPagina = numeroPagina;
		$http.get("livro/listar/" + numeroPagina).success(function(response){
			
			// Função para ocultar os botões de paginação
			if(response == null || response == ''){
				$scope.ocultarNavegacao = true;
			}else{
				$scope.ocultarNavegacao = false;
			}
			
			$scope.data = response;
			
			//-------- Inicio total página
			$http.get("livro/totalPagina").success(function(response){
				$scope.totalPagina = response;
			}).error(function(response){
				erro("Error: " + response);
			});
			//--------- Fim total página
			
		}).error(function(response){
			erro("Error: " + response);
		});
	};
	
	// Paginação da tabela de livros
	$scope.proximo = function(){
		if(new Number($scope.numeroPagina) < new Number($scope.totalPagina)){
			$scope.listarLivros(new Number($scope.numeroPagina + 1));	
		}		
	};
	
	// Paginação da tabela de livros
	$scope.anterior = function(){
		if(new Number($scope.numeroPagina) > 1){
			$scope.listarLivros(new Number($scope.numeroPagina - 1));	
		}		
	};
	
	// Remover livro
	$scope.removerLivro = function(codLivro){
		$http.delete("livro/deletar/" + codLivro).success(function(response){
			$scope.listarLivros($scope.numeroPagina);
			sucesso("Removido com sucesso!");
		}).error(function(data, status, headers, config){
			erro("Error: " + status);
		});
	};
	
	$scope.listarFornecedores = function(){
		$http.get("fornecedor/listartodos").success(function(response) {
			$scope.fornecedoresList = response;
		}).error(function(data, status, headers, config) {
			erro("Error: " + status);
		})
	};
	
});