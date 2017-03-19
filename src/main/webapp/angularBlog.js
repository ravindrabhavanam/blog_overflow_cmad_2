//var jwt = require('jwt-simple');
var JWT_SECRET = 'cmad';
var blogApp = angular.module('blogApp', []);

var logged_user = '';
var category = '';
blogApp.controller('BlogListController');

blogApp.controller('BlogListController', [ '$scope','ListBlog','searchBlogList', 'viewBlogList','loginData', function ($scope, ListBlog, searchBlogList, viewBlogList, loginData) {

	$scope.searchBlogList = searchBlogList.getsearchBlogList;
	$scope.blogComments = viewBlogList.getBlogComments;
	$scope.blogItem = viewBlogList.getBlogItem;
	$scope.allBlogList = loginData.getAllBlogList;
	$scope.messageList = loginData.getMessageList;
	//$scope.blogId = viewBlogList.getBlogId();
	$scope.quantity = 20;
	
	if (window.localStorage.getItem('currentUser') === null){
		//do nothing;
	}
	else if(logged_user === '' || category === ''){
		logged_user = JSON.parse(window.localStorage.getItem('currentUser')).emailId;
		category = JSON.parse(window.localStorage.getItem('currentUser')).interestCategory;
		ListBlog.getBlogs(category).then(function(data) {
			loginData.setAllBlogList(data);
		});
		ListBlog.getMessages().then(function(data) {
			loginData.setMessageList(data);
		});
	}
	$scope.login = function(){
		ListBlog.login($scope.email1,$scope.password1).then(function(data) {
			if(data){
				logged_user = data.emailId;
				category = data.interestCategory;
				window.localStorage['currentUser'] = angular.toJson(data);
				ListBlog.getBlogs(category).then(function(data) {
					loginData.setAllBlogList(data);
				});
				ListBlog.getMessages().then(function(data) {
					loginData.setMessageList(data);
				});
				$("#resMsg").html("successfully Logged in!") ;
				$("#loginForm").hide();
				$("#logged_user").html(logged_user);
				$("#greet_user").show();
				$("#LogoutTab").show();
				$("#HomeTab").show();
				$("#blogForm").show();
				$("#chatForm").show();
				$("#LoginTab").hide();
				$("#RegisterTab").hide();
				$("#view_blog").hide();
				$("#commentForm").hide();
				$("#search_form").show();
				$("#display_blogs").show();
				$("#display_top_blogs").show();
				$("#display_messages").show();
				$("#search_blogs").hide();
				$("#view_blog").hide();
				$("#searchForm").show();
			}
			else{
				$("#resMsg").html("Login Failed! Please Try Again!") ;
			}
		});
	};
	$scope.createBlog = function(){
		ListBlog.postBlog($scope.blogHeading, $scope.blogString, category, logged_user).then(function(data) {
			if(data){
				$("#resMsg").html("Your Blog is Posted!") ;
				$("#registerForm").hide();
				$("#loginForm").hide();
				$scope.blogHeading = '';
				$scope.blogString = '';
				ListBlog.getBlogs(category).then(function(data) {
					loginData.setAllBlogList(data);
				});
			}
			else{
				$("#resMsg").html("Oops! Please Repost!") ;
			}
			
		});
	};
	$scope.cancelEdit = function(){
		$scope.blogHeading = '';
		$scope.blogString = '';
	};
	$scope.createMessage = function(){
		ListBlog.postMessage($scope.message, logged_user).then(function(data){
			if(data){
				$scope.message = '';
				ListBlog.getMessages().then(function(data) {
					loginData.setMessageList(data);
				});
			}
		});
	};
	$scope.createComment = function(){
		blogId = viewBlogList.getBlogId();
		ListBlog.postComment($scope.comment,blogId, logged_user).then(function(data){
			if(data){
				$scope.comment = '';
				ListBlog.getComments(blogId).then(function(data) {
					viewBlogList.setBlogComments(data);
				});
			}
		});
	};
	$scope.searchBlogs = function(){
		console.log($scope.searchString);
		ListBlog.searchBlogs($scope.searchString).then(function(data) {
			searchBlogList.setsearchBlogList(data);
		});
		$("#commentForm").hide();
		$("#view_blog").hide();
		$("#display_blogs").hide();
		$("#search_blogs").show();  
		$("#greet_user").show();
		$("#LogoutTab").show();
		$("#HomeTab").show();
		$("#blogForm").show();
		$("#chatForm").show();
		$("#LoginTab").hide();
		$("#RegisterTab").hide();
		$("#searchForm").show();
	};

	$scope.viewBlog = function(blogId){
		console.log(blogId);
		viewBlogList.setBlogId(blogId);
		ListBlog.viewBlog(blogId).then(function(data) {
			viewBlogList.setBlogItem(data);
		});
		ListBlog.getComments(blogId).then(function(data) {
			viewBlogList.setBlogComments(data);
		});
		$("#view_blog").show();
		$("#commentForm").show();
		$("#display_blogs").hide();
		$("#search_blogs").hide();
		$("#greet_user").show();
		$("#LogoutTab").show();
		$("#HomeTab").show();
		$("#blogForm").show();
		$("#chatForm").show();
		$("#LoginTab").hide();
		$("#RegisterTab").hide();
		$("#searchForm").show();
	};
	$scope.unixTimeToHumanTime = function(UNIX_timestamp){
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
}
]);
blogApp.service('searchBlogList', function(){
	var searchBlogList = [];
	return {

		getsearchBlogList: function() {
			return searchBlogList;
		},
		setsearchBlogList: function(list) {
			searchBlogList = list;
		}
	};
});
blogApp.service('viewBlogList', function(){
	var blogId = '';
	var blogItem = {};
	var blogComments = [];
	return {
		getBlogId: function() {
			return blogId;
		},
		setBlogId: function(id) {
			blogId = id;
		},
		getBlogItem: function() {
			return blogItem;
		},
		setBlogItem: function(blog) {
			blogItem = blog;
		},
		getBlogComments: function() {
			return blogComments;
		},
		setBlogComments: function(list) {
			blogComments = list;
		}
	};
});
blogApp.service('loginData', function(){
	var allBlogList = [];
	var messageList = [];
	return {
		getAllBlogList: function() {
			return allBlogList;
		},
		setAllBlogList: function(blogs) {
			allBlogList = blogs;
		},
		getMessageList: function() {
			return messageList;
		},
		setMessageList: function(messages) {
			messageList = messages;
		}
	};
});
blogApp.service('ListBlog', ['$http',function($http){
	this.login = function(email, password){
		console.log(email);
		console.log(password);
		var config = {
				headers : {
					'Content-Type': 'application/json; charset=utf-8'
				}
		};
		var data = {
				emailId : email,
				password : password
		};
		data = JSON.stringify(data);
		var promise = $http.post('/blog-overflow/online/account/login', data, config)
		.then(function(response){
			return response.data;
		},function(response){
			alert('Login Failed!');
		});
		return promise;
	}
	
	this.postBlog = function(blogHeading, blogString, category, logged_user){
		var timestamp = new Date($.now());
		var config = {
				headers : {
					'Content-Type': 'application/json; charset=utf-8'
				}
		};
		var data = {
				"blogHeading" : blogHeading,
				"blogString" : blogString,
				"timestamp" :timestamp,
				"section" : category,
				"userName" : logged_user
		};
		data = JSON.stringify(data);

		var promise = $http.post('/blog-overflow/online/blogpost/create/' + logged_user, data, config)
		.then(function(response){
			return response.data;
		},function(response){
			alert('Blog Post Failed!');
		});
		return promise;
	}
	this.postMessage = function(message, logged_user){
		var timestamp = new Date($.now());
		var config = {
				headers : {
					'Content-Type': 'application/json; charset=utf-8'
				}
		};
		var data = {
				"message" : message,
				"timestamp" : timestamp,
				"userName" : logged_user
		};
		data = JSON.stringify(data);

		var promise = $http.post('/blog-overflow/online/blogpost/broadcast', data, config)
		.then(function(response){
			return response.data;
		},function(response){
			alert('Message Send Failed!');
		});
		return promise;
		
	}
	this.postComment = function(comment, blogId, logged_user){
		var timestamp = new Date($.now());
		var config = {
				headers : {
					'Content-Type': 'application/json; charset=utf-8'
				}
		};
		var data = {
				"comment" : comment,
				"timestamp" : timestamp,
				"userName" : logged_user,
				"blogId" : blogId
		};
		data = JSON.stringify(data);

		var promise = $http.post('/blog-overflow/online/blogpost/comment/' + blogId, data, config)
		.then(function(response){
			return response.data;
		},function(response){
			alert('Comment Failed!');
		});
		return promise;
		
	}
	this.getBlogs = function(category){
		var promise = $http.get('/blog-overflow/online/blogpost/category/' + category)
		.then(function(response){
			return response.data;
		},function(response){
			alert('error');
		});
		return promise;
	}

	this.getMessages = function(){
		var promise = $http.get('/blog-overflow/online/blogpost/messages')
		.then(function(response){
			return response.data;
		},function(response){
			alert('error');
		});
		return promise;
	}

	this.searchBlogs = function(searchString){
		var promise = $http.get('/blog-overflow/online/blogpost/search/' + searchString)
		.then(function(response){
			return response.data;
		},function(response){
			alert('error');
		});
		return promise;
	}

	this.viewBlog = function(blogId){
		var promise = $http.get('/blog-overflow/online/blogpost/view/' + blogId)
		.then(function(response){
			return response.data;
		},function(response){
			alert('error');
		});
		return promise;
	}
	this.getComments = function(blogId){
		var promise = $http.get('/blog-overflow/online/blogpost/comments/' + blogId)
		.then(function(response){
			return response.data;
		},function(response){
			alert('error');
		});
		return promise;
	}
}]);




$(document).ready(function() {
	if (window.localStorage.getItem('currentUser') === null) {
		event.preventDefault();
		$("resMsg").empty();
		$("#resMsg").html("");
		$("#registerForm").hide();
		$("#loginForm").show(500);
		$("#LoginTab").show(500);
		$("#RegisterTab").show(500);
		$("#logged_user").hide();
		$("#greet_user").hide();
		$("#blogForm").hide();
		$("#chatForm").hide();
		$("#commentForm").hide();
		//$("#display_blogs").html("");
		$("#display_blogs").hide();
		//$("#view_blog").html("");
		$("#view_blog").hide();
		//$("#display_top_blogs").html("");
		$("#display_top_blogs").hide();
		//$("#display_messages").html("");
		$("#display_messages").hide();
		$("#LogoutTab").hide();
		$("#HomeTab").hide();
		//$("#search_blogs").html("");
		$("#search_blogs").hide();
		$("#searchForm").hide();
		logged_user = '';
		category = '';
		display_name = '';
	}
	else{

		
		event.preventDefault();
		$("#resMsg").html("");
		$("#loginForm").hide();
		$("#logged_user").html(window.localStorage.getItem('currentUser').emailId);
		$("#greet_user").show();
		$("#LogoutTab").show();
		$("#HomeTab").show();
		$("#blogForm").show();
		$("#chatForm").show();
		$("#LoginTab").hide();
		$("#RegisterTab").hide();
		$("#view_blog").hide();
		$("#commentForm").hide();
		$("#search_form").show();
		$("#display_blogs").show();
		$("#display_top_blogs").show();
		$("#display_messages").show();
		$("#search_blogs").hide();
		$("#view_blog").hide();
		$("#searchForm").show();
	}


	var display_name = '';
	/*
		  $("#search").click(function(event){
			  event.preventDefault();
			  $("#commentForm").hide();
			  $("#view_blog").hide();
			  $("#display_blogs").hide();
			  $("#search_blogs").show();
			  $("#greet_user").show();
			  	$("#LogoutTab").show();
			  	$("#HomeTab").show();
			  	$("#blogForm").show();
			  	$("#chatForm").show();
			  	$("#LoginTab").hide();
			  	$("#RegisterTab").hide();
			  	$("#searchForm").show();
		  });
		  $("#viewBlog").click(function(event){
			  event.preventDefault();
			 $("#view_blog").show();
			  $("#commentForm").show();
			  $("#display_blogs").hide();
			  $("#search_blogs").hide();
			  $("#greet_user").show();
			  	$("#LogoutTab").show();
			  	$("#HomeTab").show();
			  	$("#blogForm").show();
			  	$("#chatForm").show();
			  	$("#LoginTab").hide();
			  	$("#RegisterTab").hide();
			  	$("#searchForm").show();
		  });
	 */
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
		//$("#logged_user").html("");
		$("#logged_user").hide();
		$("#greet_user").hide();
		$("#blogForm").hide();
		$("#chatForm").hide();
		$("#commentForm").hide();
		//$("#display_blogs").html("");
		$("#display_blogs").hide();
		//$("#view_blog").html("");
		$("#view_blog").hide();
		//$("#display_top_blogs").html("");
		$("#display_top_blogs").hide();
		//$("#display_messages").html("");
		$("#display_messages").hide();
		$("#LogoutTab").hide();
		$("#HomeTab").hide();
		//$("#search_blogs").html("");
		$("#search_blogs").hide();
		$("#searchForm").hide();
		logged_user = '';
		category = '';
		display_name = '';
		delete window.localStorage['currentUser'];
	});
	$("#home").click(function(event){
		event.preventDefault();
		$("#resMsg").html("");
		$("#blogForm").show();
		$("#chatForm").show();
		$("#commentForm").hide();
		//$("#view_blog").html("");
		$("#view_blog").hide();
		//$("#search_blogs").html("");
		$("#search_blogs").hide();
		$("#display_blogs").show();
		$("#searchForm").show();
		//showBlogs(logged_user, category);
		//showMessages();

	});
	/*jQuery('#viewBlog')[0].on('click',function(){*/
	/* $("#viewBlog").click(function(event){
		  viewBlog();
	  });
	 */
	/*
	  function viewBlog(blog_id){
		  alert("yes")
		  event.preventDefault();
		  //blog_id = $(this).attr('href');
		  //blog_id = 2
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
						$("#search_blogs").hide();
					}
					else{
						$("#resMsg").html("Oops! Unable to retrieve blog, try again!") ;
					}
				}
			});
	  }*/

	/*
	  $("#search").click(function(event){
		  var searchString = $("#searchString").val();
		  $.ajax({
				url : 'http://localhost:8080/blog-overflow/online/blogpost/search/' + searchString ,
				type : 'get',
				contentType : 'application/json',

				success : function(response) {
					  if(response){

						  var trHTML = '';

						  $.each(response, function (i, message) {
							  	var humanTime = unixTimeToHumanTime(response[i].timestamp)
					            trHTML += '<tr><td><span style="font-weight:bold">' + response[i].blogHeading + '</span></td><td><span style="font-weight:italic"> <tab1>-by ' + response[i].userName + '</tab1></span></td><td align="right">' + humanTime + '</td></tr><tr><td>' + response[i].blogString + '</td></tr><br/>';

						  });
						  //topCat += '<li id="LoginTab"><a href="#Login" id="login"  class="top_tab">Login</a></li>'



					        $("#search_blogs").html(trHTML);
							$("#search_blogs").show();
							$("#commentForm").hide();
							  $("#view_blog").hide();
							  $("#display_blogs").hide();
					  }
					  else{
						  }
					  }
			})
	  });
	 */

	$("#Register").click(function(event){
		event.preventDefault();
		var password = $("#password").val();
		var password2 = $("#password2").val();
		if (!(password === password2)){
			alert("Passwords don't match, Please confirm the password!");
			$("#resMsg").html("Passwords don't match, Please confirm the password!");
		}
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
			url : '/blog-overflow/online/account/register',
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
	/*
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
					$("#search_form").show();
					//showBlogs(email, response.interestCategory);
					//showMessages();
					$("#display_blogs").show();
					$("#display_top_blogs").show();
					$("#display_messages").show();
					$("#search_blogs").hide();
					$("#view_blog").hide();
					$("#searchForm").show();
					token = '';
					//var token = jwt.encode(data, JWT_SECRET);

					console.log(token);
					//return response.json({token: token});

				}
				else{
					$("#resMsg").html("Login Failed! Please Try Again!") ;
				}
			}
		});
	});
	 */
	/*
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
	*/
	/*
	$("#blog_clear").click(function(event){
		event.preventDefault();
		document.getElementById('blogForm').reset();
	});
	*/
	/*
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
					//showMessages();
				}
				else{

				}
			}
		});
	});
	*/
	/*
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
						//topCat += '<li><a href="#" onclick="return viewBlog(' + response[i].id + ')  id="view_blog">' + response[i].blogHeading + '</a></li><br/>';

						  	//topCat += '<li><a ' + response[i].id + 'id="view_blog" onclick="document.getElementById("viewBlog").click()">' + response[i].blogHeading + '</a></li><br/>';

						  	//topCat += '<li><a href="#viewBlog" id="view_blog">' + response[i].blogHeading + '</a></li><br/>';
						 
						topCat += '<li> <a href="javascript:viewBlog(' + response[i].id + ');" id="view_blog">' + response[i].blogHeading + '</a></li><br/>';

					});
					//topCat += '<li id="LoginTab"><a href="#Login" id="login"  class="top_tab">Login</a></li>'
					 topCat += '</ul>';


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
	*/

});

