package com.spring.angular.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.spring.angular.dao.DaoImpl;
import com.spring.angular.dao.DaoInterface;
import com.spring.angular.model.Cliente;

@Controller
@RequestMapping(value = "/cliente")
public class ClienteController extends DaoImpl<Cliente> implements DaoInterface<Cliente> {

	public ClienteController(Class<Cliente> persistenceClass) {
		super(persistenceClass);	
	}
	
	@RequestMapping(value = "listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar() throws Exception{
		
		return new Gson().toJson(super.lista());
		
		// Injetando dados estáticos		
		/*List<Cliente> clientes = new ArrayList<Cliente>();
		
		Cliente cliente = new Cliente();		
		cliente.setId(10L);
		cliente.setNome("Israel");
		cliente.setEndereco("Peixoto de Castro");
		cliente.setTelefone("12 3301 - 1587");	
		
		clientes.add(cliente);		
		
		cliente = new Cliente();		
		cliente.setId(102L);
		cliente.setNome("Davi");
		cliente.setEndereco("Raul rios");
		cliente.setTelefone("12 3157 - 3722");	
		
		clientes.add(cliente);
		
		return new Gson().toJson(clientes);	*/
		
	}
	
	@RequestMapping(value = "deletar/{codCliente}", method = RequestMethod.DELETE)
	public @ResponseBody String deletar (@PathVariable("codCliente") String codCliente) throws Exception {
		//System.out.println(codCliente);
		Cliente objeto = new Cliente();
		objeto.setId(Long.parseLong(codCliente));
		super.deletar(objeto);
		return "";
	}

}
