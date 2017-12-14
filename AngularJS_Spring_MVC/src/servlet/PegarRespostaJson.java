package servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Servlet implementation class PegarRespostaJson
 */
@WebServlet("/pegarRespostaJson")
public class PegarRespostaJson extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public PegarRespostaJson() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json");
		response.setHeader("Cache-Control", "nocache");
		response.setCharacterEncoding("utf-8");

		JSONArray jsonArray = new JSONArray();

		JSONObject jsonObject = new JSONObject();
		jsonObject.put("nome", "Alex");
		jsonObject.put("cidade", "Mariná");
		jsonArray.put(jsonObject);

		jsonObject = new JSONObject();

		jsonObject.put("nome", "João");
		jsonObject.put("cidade", "Curitiba");
		jsonArray.put(jsonObject);

		jsonObject = new JSONObject();

		jsonObject.put("nome", "maria");
		jsonObject.put("cidade", "São Paulo");
		jsonArray.put(jsonObject);
		
		jsonObject = new JSONObject();

		jsonObject.put("nome", "José");
		jsonObject.put("cidade", "Minas Gerais");
		jsonArray.put(jsonObject);

		response.getWriter().write(jsonArray.toString());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}

}
