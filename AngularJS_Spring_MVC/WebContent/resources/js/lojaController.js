//===================== Configurações do controller da loja online ======================//

app.controller('lojaController', function($scope, $http, $location, $routeParams){

		// listar pedidos
		$scope.listarPedidos = function () {
			$http.get("pedido/listar").success(function(response) {
				$scope.pedidosData = response;
			}).error(function(response) {
				erro("Error: " + response);
			});
		};
	
	// remover pedido
	$scope.removerPedido = function (codPedido) {
		$http.delete("pedido/deletar/"+codPedido).success(function(response) {
			$scope.pedidosData = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
	};
	
	
	if ($routeParams.codigoPedido != null){
		$scope.codigoPedido = $routeParams.codigoPedido;
	}
	
	// finalizar pedido
	$scope.finalizarPedido = function () {

		$scope.pedidoObjeto.cliente = $scope.clienteAdicionado;
		
		$http.post("pedido/finalizar", {"pedido" : $scope.pedidoObjeto,
			"itens" : $scope.itensCarrinho}).success(function(response) {
			$scope.pedidoObjeto = {};
			$scope.itensCarrinho = {};
			
			$location.path("loja/pedidoconfirmado/"+response);
			
			sucesso("Pedido Finalizado!");
		}).error(function(response) {
			erro("Error: " + response);
		});
	};
	
	// Buscar cliente por nome
	$scope.buscarClienteNome = function () {
		$http.get("cliente/buscarnome/" + $scope.filtroCliente).success(function(response) {
			$scope.clientesPesquisa = response;
		}).error(function(response) {
			erro("Error: " + response);
		});
	};
	
	// adicionar cliente no carrinho
	$scope.adicionarClienteCarrinho = function (cliente) {
		$scope.pedidoObjeto.cliente = cliente;
		$scope.clienteAdicionado = cliente;
		$scope.clientesPesquisa = {};
		$scope.filtroCliente = "";
	};
	
	if ($routeParams.itens != null && $routeParams.itens.length > 0){
		
		$http.get("itempedido/processar/"+ $routeParams.itens).success(function(response) {
			
			$scope.itensCarrinho = response;
			$scope.pedidoObjeto = response[0].pedido;
			
		}).error(function(response) {
			erro("Error: " + response);
		});
		
	}else {
		$scope.carrinhoLivro = new Array();
	}
	
	// adicionar livro no carrinho
	$scope.addLivro = function (livroid) {
		$scope.carrinhoLivro.push(livroid);
		
	};
	
	// recaular o valor dos itens no carrinho
	$scope.recalculo = function (quantidade, livro) {
		var valorTotal = new Number();
		for (var i = 0; i < $scope.itensCarrinho.length; i++){
				var valorLivro = $scope.itensCarrinho[i].livro.valor.replace("R","").replace("$", "").replace(".","").replace(",", ".");
				if ($scope.itensCarrinho[i].livro.id == livro){
					valorTotal += parseFloat(valorLivro * quantidade);
				}else {
					valorTotal += parseFloat(valorLivro * $scope.itensCarrinho[i].quantidade);
				}
				
		}
		 $scope.pedidoObjeto.valorTotal = 'R$' + valorTotal.toString();
	};
	
	// remover livro do carrinho
	$scope.removerLivroCarrinho = function (livroid) {
		
		$scope.intensTemp = new Array();
		var valorTotal = new Number();
		for (var i = 0; i < $scope.itensCarrinho.length; i++){
			if ($scope.itensCarrinho[i].livro.id === livroid){
			}else {
				// itens validos
				$scope.intensTemp.push($scope.itensCarrinho[i]);
				
				var valorLivro = $scope.itensCarrinho[i].livro.valor.replace("R","").replace("$", "").replace(".","").replace(",", ".");
				valorTotal += parseFloat(valorTotal) + parseFloat(valorLivro * $scope.itensCarrinho[i].quantidade);
				
			};
		}
		 $scope.pedidoObjeto.valorTotal = 'R$' + valorTotal.toString();
		 $scope.itensCarrinho = $scope.intensTemp;
	};
	
	// fechar pedido
	$scope.fecharPedido = function(){
		$location.path('loja/itensLoja/' + $scope.carrinhoLivro);
	};
	
	// listar todos os livros
	$scope.listarLivros = function(numeroPagina) {
		$scope.numeroPagina = numeroPagina;
		$http.get("livro/listar/" + numeroPagina).success(function(response) {
			$scope.data = response;
			
			//---------Inicio total página----------
				$http.get("livro/totalPagina").success(function(response) {
					$scope.totalPagina = response;
				}).error(function(response) {
					erro("Error: " + response);
				});
			//---------Fim total página----------
			
		}).error(function(response) {
			erro("Error: " + response);
		});
		
	};
	
	$scope.proximo = function () {
		if (new Number($scope.numeroPagina) < new Number($scope.totalPagina)) {
		 $scope.listarLivros(new Number($scope.numeroPagina + 1));
		} 
	}; 
	
	$scope.anterior = function () {
		if (new Number($scope.numeroPagina) > 1) {
		  $scope.listarLivros(new Number($scope.numeroPagina - 1));
		}
	};
	
});