package blog.data;

import java.util.List;

import blog.api.BlogPost;
import blog.api.Broadcast;
import blog.api.Comment;
import blog.api.UserData;

public interface DAO {
	Long createUser(UserData user);
	
	UserData readUser(String email);

	void updateUser(UserData user);

	UserData readUserData(String email);

	BlogPost createBlogPost(BlogPost blog);

	BlogPost readBlogPost(String blogId);

	void updateBlogPost(BlogPost blog);

	Comment createComment(Comment comment);

	String createBroadcast(Broadcast message);

	List<Broadcast> getBroadcast();

	List<BlogPost> getBlogPosts(String category);
}