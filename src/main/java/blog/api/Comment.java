package blog.api;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	protected Long id;
	protected String userName;
	private @Temporal(TemporalType.TIMESTAMP) Date timestamp;
	protected String comment;
	
	public Comment() {
	}

	public Comment(Long id, String userName, BlogPost blog, Date timestamp, String comment) {
		super();
		this.id = id;
		this.userName = userName;
		this.timestamp = timestamp;
		this.comment = comment;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
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
