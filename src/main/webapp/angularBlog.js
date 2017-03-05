var blogApp = angular.module('blogApp', []);
blogApp.controller('BlogListController' );


blogApp.controller('BlogListController', [ '$scope', 'CreateBlog', 'ListBlog',function ($scope, CreateBlog,ListBlog) {
	
	ListBlog.getBlogs().then(function(data) {
		$scope.blogList = data;
	});
	}
]);

myApp.service('ListBlog', ['$http',function($http){
	
	this.getBlogs = function(){
		var promise = $http.get('http://localhost:8080/blog-overflow/online/blogpost/category/cmad')
							.then(function(response){
								alert(response.data);
								return response.data;
							},function(response){
								alert('error');
							});
		return promise;
	}

}]);




$(document).ready(function() {
	
	var logged_user = ''
	var category = ''
	var display_name = ''
	
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
	  $("#logout").click(function(event) {
	      event.preventDefault();
	      $("#resMsg").html("Logged out successfully!");
	      $("#loginForm").show(500);
	      $("#registerForm").hide();
	      $("#LoginTab").show(500);
		  $("#RegisterTab").show(500);
		  $("#logged_user").html("");
		  $("#logged_user").hide();
		  $("#greet_user").hide();
		  $("#blogForm").hide();
		  $("#chatForm").hide();
		  $("#commentForm").hide();
		  $("#display_blogs").html("");
		  $("#display_blogs").hide();
		  $("#view_blog").html("");
		  $("#view_blog").hide();
		  $("#display_top_blogs").html("");
		  $("#display_top_blogs").hide();
		  $("#display_messages").html("");
		  $("#display_messages").hide();
		  $("#LogoutTab").hide();
		  $("#HomeTab").hide();
		  logged_user = ''
		  category = ''
		  display_name = ''
	  });
	  $("#home").click(function(event){
		  event.preventDefault();
		  $("#resMsg").html("");
		  $("#blogForm").show();
		  $("#chatForm").show();
		  $("#commentForm").hide();
		  $("#view_blog").hide();
		  showBlogs(logged_user, category);
		  showMessages();
		  
	  });
	  /*jQuery('#viewBlog')[0].on('click',function(){*/
	  /*$("#viewBlog").click(function(event){*/
	  function viewBlog(blog_id){
		  alert("yes")
		  event.preventDefault();
		  /*blog_id = $(this).attr('href');*/
		  /*blog_id = 2*/
		  $("#resMsg").html(blog_id);
		  $.ajax({
				url : 'http://localhost:8080/blog-overflow/online/blogpost/view/' + blog_id,
				type : 'get',
				contentType : 'application/json',
				success : function(response) {
					if(response){
						trHTML += '<th>' + response[i].blogHeading + '</th><tr><td>' + response[i].blogString + '</td></tr><tr><td align="right">'  + humanTime  + '</td></tr>';
						
						$.each(response["comments"], function (i, comment) {  
							trHTML += '<tr><td>' + comment.userName + '</td></tr><tr><td><span style="font-weight:bold">' + comment.comment + '</span></td></tr>';
						});
						$("#view_blog").html(trHTML);
						$("#view_blog").show();
						$("#commentForm").show();
					}
					else{
						$("#resMsg").html("Oops! Unable to retrieve blog, try again!") ;
					}
				}
			});
	  }
	  
	  $("#Register").click(function(event){
		  	event.preventDefault();
			var password = $("#password").val();
			var email = $("#email").val();
			var firstName = $("#firstName").val();
			var lastName = $("#lastName").val();
			var interestCategory = $("#interestCategory").val();
			var data = {
				"emailId" : email,
				"firstName" : firstName,
				"lastName" : lastName,
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
						$("#resMsg").html("Failed to Register, Please try again!") ;
					}
				}
			});
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
					  	$("#resMsg").html("successfully Logged in!") ;
					  	$("#loginForm").hide();
					  	document.getElementById('login-form').reset();
					  	/*display_name = response.firstName + " " + response.lastName;*/
					  	$("#logged_user").html(response.firstName + " " + response.lastName);
					  	$("#greet_user").show();
					  	$("#LogoutTab").show();
					  	$("#HomeTab").show();
					  	$("#blogForm").show();
					  	$("#chatForm").show();
					  	$("#LoginTab").hide();
					  	$("#RegisterTab").hide();
					  	$("#view_blog").hide();
						$("#commentForm").hide();
					  	//showBlogs(email, response.interestCategory);
					  	showMessages();
				  }
				  else{
					  $("#resMsg").html("Login Failed! Please Try Again!") ;
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
						 //showBlogs(logged_user, category);
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
	
	  
	  $("#chat_box").click(function(event){
		  	event.preventDefault();
			var message = $("#chat").val();
			var userName = logged_user;
			var timestamp = new Date($.now());
			var data = {
				"message" : message,
				"timestamp" : timestamp,
				"userName" : logged_user
			};
			$.ajax({
				url : 'http://localhost:8080/blog-overflow/online/blogpost/broadcast',
				type : 'post',
				contentType : 'application/json',
				data : JSON.stringify(data),
				success : function(response) {
					if(response){
						 $("#registerForm").hide();
						 $("#loginForm").hide();
						 document.getElementById('Chat-form').reset();
						 showMessages();
					}
					else{
						
					}
				}
			});
	   });
	  
	function showBlogs(email, section){
		$.ajax({
			url : 'http://localhost:8080/blog-overflow/online/blogpost/category/' + section ,
			type : 'get',
			contentType : 'application/json',
			
			success : function(response) {
				  if(response){
					  
					  var trHTML = '';
					  var topCat = '<ul>';
					  $.each(response, function (i, message) {
						  	var humanTime = unixTimeToHumanTime(response[i].timestamp)
				            trHTML += '<tr><td><span style="font-weight:bold">' + response[i].blogHeading + '</span></td><td><span style="font-weight:italic"> <tab1>-by ' + response[i].userName + '</tab1></span></td><td align="right">' + humanTime + '</td></tr><tr><td>' + response[i].blogString + '</td></tr><br/>';
						  	/*topCat += '<li><a href="#" onclick="return viewBlog(' + response[i].id + ')  id="view_blog">' + response[i].blogHeading + '</a></li><br/>';
						  	
						  	topCat += '<li><a ' + response[i].id + 'id="view_blog" onclick="document.getElementById("viewBlog").click()">' + response[i].blogHeading + '</a></li><br/>';
				           
						  	topCat += '<li><a href="#viewBlog" id="view_blog">' + response[i].blogHeading + '</a></li><br/>';
					        */
						  	topCat += '<li> <a href="javascript:viewBlog(' + response[i].id + ');" id="view_blog">' + response[i].blogHeading + '</a></li><br/>';
					           
					  });
					  /*topCat += '<li id="LoginTab"><a href="#Login" id="login"  class="top_tab">Login</a></li>'
					  */topCat += '</ul>';
					  
					  	
				        $("#display_blogs").html(trHTML);
						$("#display_blogs").show();
						$("#display_top_blogs").html(topCat);
						$("#display_top_blogs").show();
				  }
				  else{
					  }
				  }
		})
	}
	function showMessages(){
		$.ajax({
			url : 'http://localhost:8080/blog-overflow/online/blogpost/messages',
			type : 'get',
			contentType : 'application/json',
			success : function(response) {
				  if(response){
					  var trHTML = '';
					  $.each(response, function (i, message) {
				            var humanTime = unixTimeToHumanTime(response[i].timestamp)
				            trHTML += '<tr><td><span style="font-weight:bold">' + response[i].userName + '</span></td><td align="right">' + humanTime + '</td></tr><tr><td>' + response[i].message + '</td></tr><br/>';
				        });
					  	
				        $("#display_messages").html(trHTML);
						$("#display_messages").show();
				  }
				  else{
					  }
				  }
		})
	}


	function unixTimeToHumanTime(UNIX_timestamp){
	  var a = new Date(UNIX_timestamp);
	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	  var year = a.getFullYear();
	  var month = months[a.getMonth()];
	  var date = a.getDate();
	  var hour = a.getHours();
	  var min = a.getMinutes();
	  var sec = a.getSeconds();
	  var time = month + ' ' + date + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	  return time;
	}


});

