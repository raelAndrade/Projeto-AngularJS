// Configuração do módulo
var app = angular.module('loja',['ngRoute','ngResource','ngAnimate']);

// Configurando as rotas
app.config(function($routeProvider, $provide, $httpProvider, $locationProvider){
	
	//================= Cliente =======================//
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
	
	//================= Fornecedor =======================//
	$routeProvider.when("/fornecedorlist", {
		controller : "fornecedorController",
		templateUrl: "fornecedor/list.html"
	}) // listar
	
	.when("/fornecedoredit/:id", {
		controller : "fornecedorController",
		templateUrl: "fornecedor/cadastro.html"
	}) //editar
	
	.when("/fornecedor/cadastro", {
		controller : "fornecedorController",
		templateUrl: "fornecedor/cadastro.html"
	}) // novo
	
	//================= Livro =======================//
	$routeProvider.when("/livrolist", {
		controller : "livroController",
		templateUrl: "livro/list.html"
	}) // listar
	
	.when("/livroedit/:id", {
		controller : "livroController",
		templateUrl: "livro/cadastro.html"
	}) //editar
	
	.when("/livro/cadastro", {
		controller : "livroController",
		templateUrl: "livro/cadastro.html"
	}) // novo
	
	//====================== Loja =========================//
	.when("/loja/online", {
		controller : "lojaController",
		templateUrl: "loja/online.html"
	}) // novo
	.when("/loja/itensLoja/:itens", {
		controller : "lojaController",
		templateUrl: "loja/itensLoja.html"
	}) // novo
	
	.otherwise({
		redirectTo : "/"
	});
	
});

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

		$scope.pedidoObjeto.cliente = $scope.clienteAdiconado;
		
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
		$scope.clienteAdiconado = cliente;
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


//===================== Configurações do controller do fornecedor ======================//
app.controller('fornecedorController', function($scope, $http, $location, $routeParams){

	if($routeParams.id != null && $routeParams.id != undefined && $routeParams.id != ''){
		
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

// Faz a identificação da posição correta da cidade do registro para mostrar em edição
function buscarKeyJson(obj, key, value)
{
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] == value) {
            return i + 2;
        }
    }
    return null;
}

// Carregar cidades quando é navegador chrome usando jQuery
function carregarCidadesChrome(estado) {
	// Executa se for chrome
	if (identific_nav() === 'chrome') {
		$.get("cidades/listarchrome", { idEstado : estado.value}, function(data) {
			 var json = JSON.parse(data);
			 html = '<option value="">Selecione</option>';
			 for (var i = 0; i < json.length; i++) {
				  html += '<option value='+json[i].id+'>'+json[i].nome+'</option>';
			 }
			 $('#selectCidades').html(html);
		});
  }
}

// Identificar navegador
function identific_nav(){
    var nav = navigator.userAgent.toLowerCase();
    if(nav.indexOf("msie") != -1){
       return browser = "msie";
    }else if(nav.indexOf("opera") != -1){
    	return browser = "opera";
    }else if(nav.indexOf("mozilla") != -1){
        if(nav.indexOf("firefox") != -1){
        	return  browser = "firefox";
        }else if(nav.indexOf("firefox") != -1){
        	return browser = "mozilla";
        }else if(nav.indexOf("chrome") != -1){
        	return browser = "chrome";
        }
    }else{
    	alert("Navegador desconhecido!");
    }
}

// Adiciona a imagem ao campo html img
function visualizarImg() {
	 var preview = document.querySelectorAll('img').item(1);
	  var file    = document.querySelector('input[type=file]').files[0];
	  var reader  = new FileReader();

	  reader.onloadend = function () {
		  // carrega em base64 a img
		  preview.src = reader.result;		  
	  };

	  if (file) {
	    reader.readAsDataURL(file);		    
	  } else {
	    preview.src = "";
	  }
	  
}