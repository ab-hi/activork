

function getCookie(name) {
       var cookieValue = null;
       if (document.cookie && document.cookie != '') {
         var cookies = document.cookie.split(';');
         for (var i = 0; i < cookies.length; i++) {
         var cookie = jQuery.trim(cookies[i]);
         // Does this cookie string begin with the name we want?
         if (cookie.substring(0, name.length + 1) == (name + '=')) {
             cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
             break;
          }
     }
 }
 return cookieValue;
}


	// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }
// This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
 };

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '211645365910434',
      xfbml      : true,
      version    : 'v2.8'
    });
   
};
//  FB.getLoginStatus(function(response) {
  //  statusChangeCallback(response);
 // });

 

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,name,email,picture', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
	console.log(response);
	var csrftoken = getCookie('csrftoken');
	data = {}
  	data['csrfmiddlewaretoken'] = csrftoken;
	data['email'] = response.email;
	data['username'] = response.name.split(" ")[0];
	data['password']=response.id;
	data['source'] = "facebook";
	data['uid'] = response.id;
	data['image'] = response.picture.data.url;
	FB.logout()
	url = "http://privatebeta.activork.com/social-login/"
	
	$.ajax({
         url : url, // the endpoint,commonly same url
         type : "POST", // http method
         data : data, // data sent with the post request

		 // handle a successful response
	 success : function(json) {
		console.log(json);
		var obj = JSON.parse(json);
		//console.log(json);
      		//console.log(obj.status); // another sanity check
		if(obj.status == 1){
			window.location.href="http://privatebeta.activork.com/articles/"
		}
		else {
			console.log(json);
			//window.location.href="http://privatebeta.activork.com/login/?error="+json.error+"";
		}

     	
 		},

	 // handle a non-successful response
	 error : function(xhr,errmsg,err) {
		 console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
		 }
 	});
	
		
    });
  }


	function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  signOut();
  var csrftoken = getCookie('csrftoken');
	data = {}
  	data['csrfmiddlewaretoken'] = csrftoken;
	data['email'] = profile.getEmail();
	data['username'] = profile.getName().split(" ")[0];
	data['password']=profile.getId()
	data['source'] = "google";
	data['uid'] = profile.getId();
	data['image'] = profile.getImageUrl();
	url = "http://privatebeta.activork.com/social-login/"
	
	$.ajax({
         url : url, // the endpoint,commonly same url
         type : "POST", // http method
         data : data, // data sent with the post request

		 // handle a successful response
	 success : function(json) {
		console.log(json);
		var obj = JSON.parse(json);
		//console.log(json);
      		//console.log(obj.status); // another sanity check
		if(obj.status == 1){
			window.location.href="http://privatebeta.activork.com/articles/"
		}
		else {
			console.log(json);
			window.location.href="http://privatebeta.activork.com/login/?error=User already exists";
		}

     	
 		},

	 // handle a non-successful response
	 error : function(xhr,errmsg,err) {
		 console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
		 }
 	});
	
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


$('#menu-location-btn').on('click', function() {
        $('#location-menu').css('display', 'block');
        if ($("#location-menu").hasClass("slideInDown")) {
          $("#location-menu").removeClass('animated slideInDown');
          $("#location-menu").addClass('animated slideOutUp');
        } else {
          $("#location-menu").removeClass('animated slideOutUp');
          $("#location-menu").addClass('display-block animated slideInDown');
        }
        if (navigator.geolocation) {
          console.log('Geolocation is supported');
            var startPos;
            var geoSuccess = function(position) {
              startPos = position;
              console.log(startPos.coords.latitude)
              console.log(startPos.coords.longitude)
              $.ajax({
                url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+ startPos.coords.latitude +','+ startPos.coords.longitude +'&sensor=true',
                type: 'GET',
              }).then(function(res) {
                console.log(res);
                $('#location-detail').html(res['results'][0]['formatted_address']);
              });

            };
            try {
              navigator.geolocation.getCurrentPosition(geoSuccess);
            } catch(e) {
              console.log(e);
            }

        } else {
            console.log('Geolocation is not supported')
        }
      })

      $('button[id^="mobile-post"]').on('click', function(e) {
        console.log(e);
      })