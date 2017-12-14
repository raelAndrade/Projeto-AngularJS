package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class PegarResposta
 */
@WebServlet("/pegarResposta")
public class PegarResposta extends HttpServlet {
	
	private static final long serialVersionUID = 1L;

    public PegarResposta() {
       super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Servidor Funcionando");
		response.getWriter().write("Servlet Ajax AngularJS OK!");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	}

}
