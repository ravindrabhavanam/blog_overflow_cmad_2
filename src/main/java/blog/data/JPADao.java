package blog.data;


import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.NoResultException;
import javax.persistence.Persistence;

import blog.api.BlogPost;
import blog.api.Broadcast;
import blog.api.Comment;
import blog.api.UserData;

public class JPADao implements DAO {
	static EntityManagerFactory factory = Persistence.createEntityManagerFactory("blog");

	@Override
	public Long createUser(UserData userdata) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		//userdata.setBlogPosts(new ArrayList<BlogPost>());
		em.persist(userdata);
		em.getTransaction().commit();
		em.close();
		return userdata.getUserId();
	}

	@Override
	public UserData readUser(String email) {
		EntityManager em = factory.createEntityManager();
		//UserData user = em.find(UserData.class, email);
		try{
			UserData user = new UserData();
			user.setEmailId(email);
			user.setPassword(em.createQuery("SELECT user.password FROM UserData user WHERE user.emailId = :value1",String.class)
					.setParameter("value1", email).getSingleResult());
/*			UserData user = em.createQuery("SELECT user FROM UserData user WHERE user.emailId = :value1", UserData.class)
				.setParameter("value1", email).getSingleResult();*/
			em.close();
			return user;
		}
		catch (final NoResultException nre) {
			em.close();
	        return null;
	    }

	}
	
	
	@Override
	public UserData readUserData(String email) {
		EntityManager em = factory.createEntityManager();
		//UserData user = em.find(UserData.class, email);
		try{
			UserData user = em.createQuery("SELECT user FROM UserData user "
					+ "LEFT JOIN user.blogPosts "
					+ "WHERE user.emailId = :value1", UserData.class)
				.setParameter("value1", email).getSingleResult();
			em.close();
			return user;
		}
		catch (final NoResultException nre) {
			em.close();
	        return null;
	    }

	}
	
	@Override
	public void updateUser(UserData userdata) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		em.merge(userdata);
		em.getTransaction().commit();
		em.close();
	}
	
	@Override
	public BlogPost createBlogPost(BlogPost blog) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		//blog.setComments(new ArrayList<Comment>());
		em.persist(blog);
		em.getTransaction().commit();
		em.close();
		return blog;
	}
	
	@Override
	public BlogPost readBlogPost(Long blogId) {
		EntityManager em = factory.createEntityManager();
		BlogPost blog = em.find(BlogPost.class, blogId);
		em.close();
		return blog;
	}
	
	@Override
	public List<BlogPost> getBlogPosts(String category) {
		EntityManager em = factory.createEntityManager();
		List<BlogPost> blogs = em.createQuery("SELECT blog FROM BlogPost blog "
				+ "LEFT JOIN blog.comments "
				+ "WHERE blog.section = :value1", BlogPost.class)
			.setParameter("value1", category).getResultList();
		em.close();
		return blogs;
	}
	
	@Override
	public void updateBlogPost(BlogPost blog) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		em.merge(blog);
		em.getTransaction().commit();
		em.close();
	}
	
	@Override
	public Comment createComment(Comment comment) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		em.persist(comment);
		em.getTransaction().commit();
		em.close();
		return comment;
	}
	
	@Override
	public Long createBroadcast(Broadcast message) {
		EntityManager em = factory.createEntityManager();
		em.getTransaction().begin();
		em.persist(message);
		em.getTransaction().commit();
		em.close();
		return message.getId();
	}

	@Override
	public List<Broadcast> getBroadcast() {
		EntityManager em = factory.createEntityManager();
		List<Broadcast> messages = em.createQuery("SELECT m from Broadcast m",Broadcast.class).getResultList();
		em.close();
		return messages;
	}
}
