package blog.rest;

import java.util.List;

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
import blog.api.BlogPost;
import blog.api.Broadcast;
import blog.api.Comment;
import blog.biz.BasicAccount;


@Path("/blogpost")
public class BlogController {

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/create/{email}")
	public Response create(@PathParam("email") String email, BlogPost blog) {
		Account account = new BasicAccount();
		String blogId = account.createBlog(email, blog);
		return Response.ok().entity(blogId + "").build();
	}
	
	@GET
	@Path("/delete/{blogId}")
	public Response delete(@PathParam("blogId") String blogId){
		//Account account = new BasicAccount();
		//UserData user = account.getUser(email);
		return Response.ok().entity("SUCCESS").build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/view/{blogId}")
	public Response view(@PathParam("blogId") String blogId){
		Account account = new BasicAccount();
		BlogPost blog = account.readBlog(blogId);
		return Response.ok().entity(blog).build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/category/{category}")
	public Response viewAll(@PathParam("category") String category){
		Account account = new BasicAccount();
		List<BlogPost> blogs = account.readBlogs(category);
		return Response.ok().entity(blogs).build();
	}
	
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/update")
	public Response update(BlogPost blog) {
		Account account = new BasicAccount();
		account.updateBlog(blog);
		return Response.ok().entity(blog).build();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/comment/{blogId}")
	public Response comment(@PathParam("blogId") String blogId, Comment comment) {
		Account account = new BasicAccount();
		String commentId = account.createComment(blogId, comment);
		return Response.ok().entity(commentId + "").build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/comments/{blogId}")
	public Response comments(@PathParam("blogId") String blogId) {
		Account account = new BasicAccount();
		List<Comment> comments= account.getComments(blogId);
		return Response.ok().entity(comments).build();
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/broadcast")
	public Response broadcast(Broadcast message) {
		Account account = new BasicAccount();
		String messageId = account.createBroadcast(message);
		return Response.ok().entity(messageId + "").build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/messages")
	public Response messages() {
		Account account = new BasicAccount();
		List<Broadcast> messages = account.getBroadcast();
		return Response.ok().entity(messages).build();
	}
	
	public BlogController() {
		// TODO Auto-generated constructor stub
	}

}
