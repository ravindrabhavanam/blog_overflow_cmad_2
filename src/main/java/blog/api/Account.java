package blog.api;

import java.util.List;

public interface Account {
	public Long createUser(UserData user) throws UserAlreadyExistsException, InvalidPasswordException, PasswordConfirmFailException, InvalidDataException, UserException;
	public UserData loginUser(UserData user) throws UserNotFoundException, InvalidPasswordException, InvalidDataException, UserException;
	public UserData getUser(String email) throws UserNotFoundException, UserException;
	public UserData updatePassword(UserData user) throws InvalidDataException, UserNotFoundException, UserException;

	public String createBlog(String email, BlogPost blog) throws InvalidDataException, BlogException, UserException;
	public BlogPost readBlog(String blogId) throws BlogNotFoundException, BlogException, UserException;
	public void updateBlog(BlogPost blog) throws BlogNotFoundException, BlogException, UserException;
	String createComment(String blogId, Comment comment) throws InvalidDataException, BlogNotFoundException, UserException;
	String createBroadcast(Broadcast message) throws InvalidDataException, UserException;
	List<Broadcast> getBroadcast() throws InvalidDataException, UserException;
	List<BlogPost> readBlogs(String category) throws CategoryNotFoundException, BlogException, UserException;
	List<Comment> getComments(String blogId) throws InvalidDataException, BlogNotFoundException, UserException;
	List<BlogPost> searchBlogPosts(String searchString) throws InvalidDataException, BlogNotFoundException, UserException;
}
