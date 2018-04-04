var permissao = false;


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
	.when("/loja/pedidoconfirmado/:codigoPedido", {
		controller : "lojaController",
		templateUrl: "loja/pedidoconfirmado.html"
	}) 
	.when("/loja/pedidos", {
		controller : "lojaController",
		templateUrl: "loja/pedidos.html"
	})
	.when("/grafico/media_pedido", {
		controller : "lojaController",
		templateUrl: "grafico/media_pedido.html"
	})
	
	.otherwise({
		redirectTo : "/"
	});
	
});

//====================== Mensagem de sucesso =========================//
function sucesso(msg){
	$.notify({
        message: msg
        },{
            type: 'success',
            timer: 1000
	});
}

//====================== Mensagem de erro =========================//
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