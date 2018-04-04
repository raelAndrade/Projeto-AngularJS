//================= Configurações do controller de clientes ========================//
app.controller('clienteController', function($scope, $http, $location, $routeParams){

	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != ''){
		
		// Entra para editar
		$http.get("cliente/buscarcliente/" + $routeParams.id).success(function(response){
			$scope.cliente =  response;
			
			document.getElementById("imagemCliente").src = $scope.cliente.foto;
			
			// Carrega estados e cidades do cliente
			setTimeout(function(){
				$("#selectEstados").prop('selectedIndex', (new Number($scope.cliente.estados.id) + 1));
				$http.get("cidades/listar/" + $scope.cliente.estados.id).success(function(response){
					$scope.cidades = response;
					setTimeout(function(){
						$("#selectCidades").prop('selectedIndex', buscarKeyJson(response, 'id', $scope.cliente.cidades.id));
					}, 1000);
				}).error(function(data, status, headers, config){
					erro("Error: " + status);
				});
			}, 1000);
			
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
		$scope.cliente.foto = document.getElementById("imagemCliente").getAttribute("src");		
		$http.post("cliente/salvar", $scope.cliente).success(function(response){			
			$scope.cliente = {};			
			document.getElementById("imagemCliente").src = '';			
			sucesso("Salvo com sucesso!");			
		}).error(function(response) {
			//alert("Error:" + status);
			erro("Error: " + response);
		});
	};
	
	// Listar todos clientes
	$scope.listarClientes = function(numeroPagina){
		$scope.numeroPagina = numeroPagina;
		$http.get("cliente/listar/" + numeroPagina).success(function(response){
			
			// Função para ocultar botões de paginação
			if(response == null || response == ''){
				$scope.ocultarNavegacao = true;
			}else{
				$scope.ocultarNavegacao = false;
			}
			
			$scope.data = response;
			
			//-------- Inicio total página
			$http.get("cliente/totalPagina").success(function(response){
				$scope.totalPagina = response;
			}).error(function(response){
				//alert("Erro" + response);
				erro("Error: " + response);
			});
			//--------- Fim total página
			
		}).error(function(response){
			//alert("Erro" + response);
			erro("Error: " + response);
		});
	};
	
	// Paginação da tabela de clientes
	$scope.proximo = function(){
		if(new Number($scope.numeroPagina) < new Number($scope.totalPagina)){
			$scope.listarClientes(new Number($scope.numeroPagina + 1));	
		}		
	};
	
	// Paginação da tabela de clientes
	$scope.anterior = function(){
		if(new Number($scope.numeroPagina) > 1){
			$scope.listarClientes(new Number($scope.numeroPagina - 1));	
		}		
	};
	
	// Remover clientes
	$scope.removerCliente = function(codCliente){
		//alert(codCliente);
		$http.delete("cliente/deletar/" + codCliente).success(function(response){
			$scope.listarClientes($scope.numeroPagina);
			sucesso("Removido com sucesso!");
		}).error(function(data, status, headers, config){
			//alert("Error:" + status);
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
			$scope.dataEstados =  response;
		}).error(function(response){
			//alert("Erro" + response);
			erro("Error: " + response);
		});
	};
	
});