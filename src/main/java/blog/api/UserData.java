package blog.api;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class UserData {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	protected Long userId;
	@Column(nullable = false, unique=true)
	protected String emailId;
	protected String password;
	@OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	protected List<BlogPost> blogPosts;
	protected String interestCategory;
	
	public UserData(){
		
	}
	public UserData(Long userId, String emailId, String password, List<BlogPost> blogPosts,
			List<Broadcast> broadcastMessages, List<Comment> comments, String interestCategory) {
		super();
		this.userId = userId;
		this.emailId = emailId;
		this.password = password;
		this.blogPosts = blogPosts;
		this.interestCategory = interestCategory;
	}
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<BlogPost> getBlogPosts() {
		return blogPosts;
	}
	public void setBlogPosts(List<BlogPost> blogPosts) {
		this.blogPosts = blogPosts;
	}
	public String getInterestCategory() {
		return interestCategory;
	}
	public void setInterestCategory(String interestCategory) {
		this.interestCategory = interestCategory;
	}
	
}
