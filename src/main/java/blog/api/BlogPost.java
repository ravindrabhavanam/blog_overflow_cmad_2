package blog.api;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Indexes;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Index;

import org.mongodb.morphia.annotations.Field;


import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;
import static org.mongodb.morphia.utils.IndexType.TEXT;

@Entity
@XmlRootElement
@Indexes({
	@Index(fields = @Field(value = "blogHeading", type = TEXT)),
	@Index(fields = @Field(value = "blogString", type = TEXT)),
	@Index(fields = @Field(value = "userName", type = TEXT))
})
public class BlogPost {
	@Id
	protected String id = new ObjectId().toString();
	protected @Temporal(TemporalType.TIMESTAMP) Date timestamp;
	@Property
	protected String blogHeading;
	@Property
	protected String blogString;
	protected String section;
	protected String userName;
	
	public BlogPost(){
		
	}
	

	public BlogPost(String id, Date timestamp, String blogHeading, String blogString, String section, String userName,
			List<Comment> comments) {
		super();
		this.id = id;
		this.timestamp = timestamp;
		this.blogHeading = blogHeading;
		this.blogString = blogString;
		this.section = section;
		this.userName = userName;
	}


	public String getSection() {
		return section;
	}

	public void setSection(String section) {
		this.section = section;
	}

	public String getId() {
		return id;
	}
	public void setId(String id) {
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
	
}
