package com.spring.angular.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.spring.angular.dao.DaoImpl;
import com.spring.angular.dao.DaoInterface;
import com.spring.angular.model.Pedido;

@Controller
@RequestMapping(value = "/pedido")
public class PedidoController extends DaoImpl<Pedido> implements DaoInterface<Pedido> {

	@Autowired
	private ItemPedidoController itemPedidoController;
	
	public PedidoController(Class<Pedido> persistenceClass) {
		super(persistenceClass);
	}
	
}
