package com.spring.angular.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.spring.angular.dao.DaoImpl;
import com.spring.angular.dao.DaoInterface;
import com.spring.angular.model.Estados;

@Controller
@RequestMapping(value = "/estados")
public class EstadosController extends DaoImpl<Estados> implements DaoInterface<Estados> {

	public EstadosController(Class<Estados> persistenceClass) {
		super(persistenceClass);	
	}
	
	@RequestMapping(value = "listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar() throws Exception{
		
		return new Gson().toJson(super.lista());
		
	}

}
