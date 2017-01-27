package blog.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


import blog.api.Account;
import blog.api.UserData;
import blog.biz.BasicAccount;


@Path("/account")
public class AccountController {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/register")
	public Response register(UserData user) {
		Account account = new BasicAccount();
		Long userId = account.createUser(user);
		return Response.ok().entity(userId + "").build();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/login")
	public Response login(UserData user){
		Account account = new BasicAccount();
		UserData login_user = account.loginUser(user);
		return Response.ok().entity(login_user).build();
	}

	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/get/{email}")
	public Response get(@PathParam("email") String email){
		Account account = new BasicAccount();
		UserData user = account.getUser(email);
		return Response.ok().entity(user).build();
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/update")
	public Response update(UserData user) {
		Account account = new BasicAccount();
		account.updatePassword(user);
		return Response.ok().entity(user).build();
	}
	
	public AccountController() {
		// TODO Auto-generated constructor stub
	}

}
