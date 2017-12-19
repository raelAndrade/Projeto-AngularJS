package com.spring.angular.controller;

import org.springframework.stereotype.Controller;

import com.spring.angular.dao.DaoImpl;
import com.spring.angular.dao.DaoInterface;
import com.spring.angular.model.Cliente;

@Controller
public class ClienteController extends DaoImpl<Cliente> implements DaoInterface<Cliente> {

	public ClienteController(Class<Cliente> persistenceClass) {
		super(persistenceClass);
		
	}

}
