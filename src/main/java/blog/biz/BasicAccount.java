package blog.biz;

import blog.data.JPADao;
import blog.data.MongoDao;
import blog.data.DAO;

import java.util.List;

import blog.api.Account;
import blog.api.BlogException;
import blog.api.BlogNotFoundException;
import blog.api.BlogPost;
import blog.api.Broadcast;
import blog.api.CategoryNotFoundException;
import blog.api.Comment;
import blog.api.InvalidDataException;
import blog.api.InvalidPasswordException;
import blog.api.PasswordConfirmFailException;
import blog.api.UserData;
import blog.api.UserAlreadyExistsException;
import blog.api.UserException;
import blog.api.UserNotFoundException;

public class BasicAccount implements Account {
	private DAO dao;
	private MongoDao mongoDao;
	public BasicAccount() {
		// TODO Auto-generated constructor stub
		dao = new JPADao();
		mongoDao = new MongoDao();
	}

	@Override
	public Long createUser(UserData user) throws UserAlreadyExistsException, InvalidPasswordException,
			PasswordConfirmFailException, InvalidDataException, UserException {
		// TODO Add various checks for throwing exceptions
		if (user == null || user.getEmailId() == null || user.getEmailId().trim().length() == 0){
			throw new InvalidDataException();
		}
		Long userId = dao.createUser(user);
		return userId;
	}

	@Override
	public UserData loginUser(UserData user)
			throws UserNotFoundException, InvalidPasswordException, InvalidDataException, UserException {
		// TODO Add various checks for throwing exceptions
		if (user.getEmailId() == null || user.getEmailId().trim().length() == 0){
			throw new InvalidDataException();
		}
		UserData login_user = dao.readUser(user.getEmailId());
		if (login_user == null){
			throw new UserNotFoundException();
		}
		if (user.getPassword() == null || !user.getPassword().equals(login_user.getPassword())){
			throw new InvalidPasswordException();
		}
		return login_user;
	}
	
	@Override
	public UserData getUser(String email)
			throws UserNotFoundException, UserException {
		// TODO Auto-generated method stub
		if (email == null || email.trim().length() == 0){
			throw new InvalidDataException();
		}
		UserData user = dao.readUserData(email);
		if (user == null){
			throw new UserNotFoundException();
		}
		return user;
	}

	@Override
	public UserData updatePassword(UserData user) throws InvalidDataException, UserNotFoundException, UserException {
		// TODO Auto-generated method stub
		if (user.getEmailId() == null || user.getEmailId().trim().length() == 0){
			throw new InvalidDataException();
		}
		UserData login_user = dao.readUser(user.getEmailId());
		if (login_user == null){
			throw new UserNotFoundException();
		}
		if (user.getPassword() == null){
			throw new InvalidPasswordException();
		}
		login_user.setPassword(user.getPassword());
		dao.updateUser(login_user);
		return login_user;
	}

	@Override
	public String createBlog(String email, BlogPost blog) throws InvalidDataException, BlogException, UserException {
		// TODO Auto-generated method stub
		if (blog == null || blog.getBlogString() == null || blog.getBlogString().trim().length() == 0){
			throw new InvalidDataException();
		}
		UserData login_user = dao.readUserData(email);
		blog.setUserName(email);
		BlogPost new_blog = mongoDao.createBlogPost(blog);
		if (login_user == null){
			throw new UserNotFoundException();
		}
		return new_blog.getId();
	}

	@Override
	public BlogPost readBlog(String blogId) throws BlogNotFoundException, BlogException, UserException {
		// TODO Auto-generated method stub
		BlogPost blog = mongoDao.readBlogPost(blogId);
		if (blog == null){
			throw new BlogNotFoundException();
		}
		return blog;
	}
	
	@Override
	public List<BlogPost> readBlogs(String category) throws CategoryNotFoundException, BlogException, UserException {
		// TODO Auto-generated method stub
		if (category == null || category.trim().length() == 0){
			throw new CategoryNotFoundException();
		}
		List<BlogPost> blogs = mongoDao.getBlogPosts(category);
		return blogs;
	}

	@Override
	public void updateBlog(BlogPost blog) throws BlogNotFoundException, BlogException, UserException {
		// TODO Auto-generated method stub
		if (blog == null){
			throw new BlogNotFoundException();
		}
		dao.updateBlogPost(blog);
	}
	
	@Override
	public String createComment(String blogId, Comment comment)
			throws InvalidDataException, BlogNotFoundException, UserException {
		// TODO Auto-generated method stub
		if (comment == null || comment.getComment() == null || comment.getComment().trim().length() == 0) {
			throw new InvalidDataException();
		}
		comment.setBlogId(blogId);
		Comment new_comment = mongoDao.createComment(comment);
		BlogPost blog = mongoDao.readBlogPost(blogId);
		if (blog == null) {
			throw new BlogNotFoundException();
		}
		return new_comment.getId();
	}
	
	@Override
	public String createBroadcast(Broadcast message) throws InvalidDataException, UserException {
		// TODO Add various checks for throwing exceptions
		if (message == null || message.getUserName() == null || message.getMessage().trim().length() == 0){
			throw new InvalidDataException();
		}
		String id = mongoDao.createBroadcast(message);
		return id;
	}
	
	@Override
	public List<Broadcast> getBroadcast() throws InvalidDataException, UserException {
		// TODO Add various checks for throwing exceptions
		List<Broadcast> messages= mongoDao.getBroadcast();
		return messages;
	}
	
	@Override
	public List<Comment> getComments(String blogId) throws InvalidDataException, BlogNotFoundException, UserException {
		// TODO Add various checks for throwing exceptions
		List<Comment> comments= mongoDao.getComments(blogId);
		return comments;
	}
	@Override
	public List<BlogPost> searchBlogPosts(String searchString) throws InvalidDataException, BlogNotFoundException, UserException {
		// TODO Add various checks for throwing exceptions
		List<BlogPost> blogs= mongoDao.searchBlogPosts(searchString);
		return blogs;
	}
}
