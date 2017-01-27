package blog.api;

import java.util.List;

public interface Account {
	public Long createUser(UserData user) throws UserAlreadyExistsException, InvalidPasswordException, PasswordConfirmFailException, InvalidDataException, UserException;
	public UserData loginUser(UserData user) throws UserNotFoundException, InvalidPasswordException, InvalidDataException, UserException;
	public UserData getUser(String email) throws UserNotFoundException, UserException;
	public UserData updatePassword(UserData user) throws InvalidDataException, UserNotFoundException, UserException;

	public Long createBlog(String email, BlogPost blog) throws InvalidDataException, BlogException, UserException;
	public BlogPost readBlog(Long blogId) throws BlogNotFoundException, BlogException, UserException;
	public void updateBlog(BlogPost blog) throws BlogNotFoundException, BlogException, UserException;
	Long createComment(Long blogId, Comment comment) throws InvalidDataException, BlogNotFoundException, UserException;
	Long createBroadcast(Broadcast message) throws InvalidDataException, UserException;
	List<Broadcast> getBroadcast() throws InvalidDataException, UserException;
	List<BlogPost> readBlogs(String category) throws CategoryNotFoundException, BlogException, UserException;
}
