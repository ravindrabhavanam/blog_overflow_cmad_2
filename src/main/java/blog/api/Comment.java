package blog.api;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

import org.bson.types.ObjectId;

@Entity
@XmlRootElement
public class Comment {
	@Id
	protected String id = new ObjectId().toString();
	protected String userName;
	private @Temporal(TemporalType.TIMESTAMP) Date timestamp;
	protected String comment;
	protected String blogId;
	
	public Comment() {
	}

	public Comment(String id, String userName, BlogPost blog, Date timestamp, String comment) {
		super();
		this.id = id;
		this.userName = userName;
		this.timestamp = timestamp;
		this.comment = comment;
	}

	public String getBlogId() {
		return blogId;
	}

	public void setBlogId(String blogId) {
		this.blogId = blogId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

}
