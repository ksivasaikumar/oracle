

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class application
 */
@WebServlet("/check")
public class application extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public application() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		String uid=request.getParameter("userid");
		String uname=request.getParameter("username");
		String sal=request.getParameter("salary");
		String desig=request.getParameter("desgination");
		String com=request.getParameter("company");
		String gender=request.getParameter("gender");
		String phone=request.getParameter("number");
		response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        out.println(uid);
        out.println(uname);
        out.println(sal);
        out.println(desig);
        out.println(com);
        out.println(gender);
        out.println(phone);
        
	
	}

	
}
