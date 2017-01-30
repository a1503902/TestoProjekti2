$(document).ready(function() {
	$("#login").click(function(){
	      var username = $("input[name=username]").val()
	      var password = $("input[name=password]").val()
	      $.ajax({
	        method: 'POST',
	        type: 'JSON',
	        url: 'http://localhost:8080/api/authenticate',
	        data: {username: username, password: password},
	        success: function(data){
	          alert(JSON.stringify(data))
	        },
	        error: function(err){
	          alert(JSON.stringify(err))
	        }
	      })
	    })
})
