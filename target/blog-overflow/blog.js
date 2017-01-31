$(document).ready(function() {
			
	var logged_user = ''
	var category = ''
	
	$("#login").click(function(event) {
	      event.preventDefault();
	      $("resMsg").empty();
	      $("#resMsg").html("");
	      $("#registerForm").hide();
	      $("#loginForm").show(500);
	  });
	  
	  $("#register").click(function(event) {
	      event.preventDefault();
	      $("resMsg").empty();
	      $("#resMsg").html("");
	      $("#loginForm").hide();
	      $("#registerForm").show(500);
	  });
	  $("#register_link").click(function(event) {
	      event.preventDefault();
	      $("resMsg").empty();
	      $("#resMsg").html("");
	      $("#loginForm").hide();
	      $("#registerForm").show(500);
	  });
	  
	  
	  $("#Register").click(function(event){
		  	event.preventDefault();
			var password = $("#password").val();
			var email = $("#email").val();
			var interestCategory = $("#interestCategory").val();
			var data = {
				"emailId" : email,
				"password" : password,
				"interestCategory" :interestCategory 
			};
			$.ajax({
				url : 'http://localhost:8080/blog-overflow/online/account/register',
				type : 'post',
				contentType : 'application/json',
				data : JSON.stringify(data),
				success : function(response) {
					if(response == 1){
						$("#resMsg").html("successfully   registered") ;
						 $("#registerForm").hide();
						 $("#loginForm").show(500);
						 document.getElementById('register-form').reset();
					}
					else{
						$("#resMsg").html("Not  registered") ;
					}
				}
			});
	   });
	  $("#blog_post").click(function(event){
		  	event.preventDefault();
			var blogHeading = $("#blog").val();
			var blogString = $("#content").val();
			var timestamp = new Date($.now());
			var data = {
				"blogHeading" : blogHeading,
				"blogString" : blogString,
				"timestamp" :timestamp,
				"section" : category,
				"userName" : logged_user
			};
			$.ajax({
				url : 'http://localhost:8080/blog-overflow/online/blogpost/create/' + logged_user,
				type : 'post',
				contentType : 'application/json',
				data : JSON.stringify(data),
				success : function(response) {
					if(response){
						$("#resMsg").html("Your Blog is Posted!") ;
						 $("#registerForm").hide();
						 $("#loginForm").hide();
						 document.getElementById('Blog-form').reset();
					}
					else{
						$("#resMsg").html("Oops! Please Repost!") ;
					}
				}
			});
	   });
	  	$("#blog_clear").click(function(event){
		  	event.preventDefault();
		  	document.getElementById('Blog-form').reset();
	  	});
	
	  $("#Login").click(function(event){
		  event.preventDefault();
		  var password = $("#password1").val();
		  var email = $("#email1").val();
		  var data = {
				  "emailId" : email,
				  "password" : password
		  };
		  $.ajax({
			  url : 'http://localhost:8080/blog-overflow/online/account/login',
			  type : 'post',
			  contentType : 'application/json',
			  data : JSON.stringify(data),
			  success : function(response) {
				  if(response){
					  	logged_user = email;
					  	category = response.interestCategory;
					  	$("#resMsg").html("successfully Logged in ") ;
					  	$("#loginForm").hide();
					  	document.getElementById('login-form').reset();
					  	$("#blogForm").show();
					  	$.ajax({
							url : 'http://localhost:8080/blog-overflow/online/blogpost/category/' + response.interestCategory ,
							type : 'get',
							contentType : 'application/json',
							
							success : function(response) {
								  if(response){
									  
									  var trHTML = '';
									  var topCat = '';
									  $.each(response, function (i, message) {
								            
								            trHTML += '<tr><td>' + response[i].blogHeading + '</td></tr><tr><td>' + response[i].blogString + '</td></tr>';
								            topCat += '<tr><td>' + response[i].blogHeading;
								        });
									  	$("#Login").hide();
									  	$("#Register").hide();
								        $("#display_blogs").html(trHTML);
										$("#display_blogs").show();
										$("#display_top_blogs").html(topCat);
										$("#display_top_blogs").show();
								  }
								  else{
									  }
								  }
						})
					  	/*$.ajax({
							url : 'http://localhost:8080/blog-overflow/online/blogpost/messages',
							type : 'get',
							contentType : 'application/json',
							success : function(response) {
								  if(response){
									  var trHTML = '';
									  $.each(response, function (i, message) {
								            
								            trHTML += '<tr><td>' + response[i].userName + '</td></tr><tr><td>' + response[i].message + '</td></tr>';
								        });
									  	$("#Login").hide();
									  	$("#Register").hide();
								        $("#display_messages").html(trHTML);
										$("#display_messages").show();
								  }
								  else{
									  }
								  }
						})*/
						
					  	showContent(email);
				  }
				  else{
					  $("#resMsg").html("Login Failed! Please Try Again!") ;
				  }
			  }
		  });
	});
	  
	function showContent(email){
		$.ajax({
			url : 'http://localhost:8080/blog-overflow/online/blogpost/messages',
			type : 'get',
			contentType : 'application/json',
			success : function(response) {
				  if(response){
					  var trHTML = '';
					  $.each(response, function (i, message) {
				            
				            trHTML += '<tr><td>' + response[i].userName + '</td></tr><tr><td>' + response[i].message + '</td></tr>';
				        });
					  	$("#Login").hide();
					  	$("#Register").hide();
				        $("#display_messages").html(trHTML);
						$("#display_messages").show();
				  }
				  else{
					  }
				  }
		})
	}
});

