package blog.data;

import java.util.List;

import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;
import org.mongodb.morphia.dao.BasicDAO;

import com.mongodb.MongoClient;

import blog.api.BlogPost;
import blog.api.Broadcast;
import blog.api.Comment;

public class MongoDao {
	static MongoClient mongo = new MongoClient("localhost", 27017);
	static Morphia morphia = new Morphia();
	static Datastore store = morphia.createDatastore(mongo, "blog-overflow-morphia");
	
	public BlogPost createBlogPost(BlogPost blog) {
		BasicDAO<BlogPost, Integer> dao = new BasicDAO<>(BlogPost.class, store);
		dao.save(blog);
		return blog;
	}
	public BlogPost readBlogPost(String blogId) {
		BasicDAO<BlogPost, Integer> dao = new BasicDAO<>(BlogPost.class, store);
		BlogPost blog = dao.createQuery().field("id").equal(blogId).get();
		return blog;
	}
	public List<BlogPost> getBlogPosts(String category) {
		BasicDAO<BlogPost, Integer> dao = new BasicDAO<>(BlogPost.class, store);
		List<BlogPost> blogs = dao.createQuery().field("section").equal(category).asList();
		return blogs;
	}
	public String createBroadcast(Broadcast message) {
		BasicDAO<Broadcast, Integer> dao = new BasicDAO<>(Broadcast.class, store);
		dao.save(message);
		return message.getId();
	}
	public List<Broadcast> getBroadcast() {
		BasicDAO<Broadcast, Integer> dao = new BasicDAO<>(Broadcast.class, store);
		List<Broadcast> messages = dao.createQuery().asList();
		return messages;
	}
	public Comment createComment(Comment comment) {
		BasicDAO<Comment, Integer> dao = new BasicDAO<>(Comment.class, store);
		dao.save(comment);
		return comment;
	}
	public List<Comment> getComments(String blogId) {
		BasicDAO<Comment, Integer> dao = new BasicDAO<>(Comment.class, store);
		List<Comment> comments = dao.createQuery().field("blogId").equal(blogId).asList();
		return comments;
	}
}
