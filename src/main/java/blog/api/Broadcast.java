package blog.api;

import java.util.Date;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;


@Entity
@XmlRootElement
public class Broadcast {
	@Id
	protected String id = new ObjectId().toString();
	protected String userName;
	private @Temporal(TemporalType.TIMESTAMP) Date timestamp;
	private String message;

	public Broadcast(){
		
	}
	
	public Broadcast(String id, String userName, Date timestamp, String message) {
		super();
		this.id = id;
		this.userName = userName;
		this.timestamp = timestamp;
		this.message = message;
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
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
}
