package blog.api;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class BlogPost {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	protected Long id;
	protected @Temporal(TemporalType.TIMESTAMP) Date timestamp;
	protected String blogHeading;
	protected String blogString;
	protected String section;
	protected String userName;
	@OneToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
	protected List<Comment> comments;
	
	public BlogPost(){
		
	}
	

	public BlogPost(Long id, Date timestamp, String blogHeading, String blogString, String section, String userName,
			List<Comment> comments) {
		super();
		this.id = id;
		this.timestamp = timestamp;
		this.blogHeading = blogHeading;
		this.blogString = blogString;
		this.section = section;
		this.userName = userName;
		this.comments = comments;
	}


	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
	
	public String getBlogHeading() {
		return blogHeading;
	}

	public void setBlogHeading(String blogHeading) {
		this.blogHeading = blogHeading;
	}

	public String getBlogString() {
		return blogString;
	}

	public void setBlogString(String blogString) {
		this.blogString = blogString;
	}

	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	
}
