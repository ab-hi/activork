$(document).on('click', '#close-preview', function(){ 
  $('.image-preview').popover('hide');
// Hover befor close the preview
$('.image-preview').hover(
  function () {
    $('.image-preview').popover('show');
  }, 
  function () {
    $('.image-preview').popover('hide');
  }
  );    
});

$(function() {
// Create the close button
var closebtn = $('<button/>', {
  type:"button",
  text: 'x',
  id: 'close-preview',
  style: 'font-size: initial;',
});
closebtn.attr("class","close pull-right");
// Set the popover default content
$('.image-preview').popover({
  trigger:'manual',
  html:true,
  title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
  content: "There's no image",
  placement:'bottom'
});
// Clear event
$('.image-preview-clear').click(function(){
  $('.image-preview').attr("data-content","").popover('hide');
  $('.image-preview-filename').val("");
  $('.image-preview-clear').hide();
  $('.image-preview-input input:file').val("");
  $(".image-preview-input-title").text("Browse"); 
}); 
// Create the preview image
$(".image-preview-input input:file").change(function (){     
  var img = $('<img/>', {
    id: 'dynamic',
    width:250,
    height:200
  });      
  var file = this.files[0];
  var reader = new FileReader();
// Set preview image into the popover data-content
reader.onload = function (e) {
  $(".image-preview-input-title").text("Change");
  $(".image-preview-clear").show();
  $(".image-preview-filename").val(file.name);            
  img.attr('src', e.target.result);
  $(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
}        
reader.readAsDataURL(file);
});  
});



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
});

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


//For doing AJAX post
function follow_unfollow(el) {

//e.preventDefault();

var csrftoken = getCookie('csrftoken');

var html_value = $(el).text();
var user_id = $(el).attr('id');


// alert(user_id);
// alert($("#session_id").val());

data = {}
data['csrfmiddlewaretoken'] = csrftoken;
data['SESSION_ID'] = $("#session_id").val();
if (html_value.toLowerCase() == "follow"){
  term = 'follow';
//	alert(term);
data['follow'] = user_id;
url = "http://ec2-54-70-76-23.us-west-2.compute.amazonaws.com/api-follow-user/"
}
else
{
  term = 'unfollow'
  data['unfollow'] = user_id
  url = "http://ec2-54-70-76-23.us-west-2.compute.amazonaws.com/api-unfollow-user/"
}

//This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post

$.ajax({
url : url, // the endpoint,commonly same url
type : "POST", // http method
data : data, // data sent with the post request

// handle a successful response
success : function(json) {
console.log(json); // another sanity check
if(html_value.toLowerCase() == "follow"){
  $(el).html("unfollow");
}
else {
  $(el).html("follow");
}

//On success show the data posted to server as a message
//alert('Hi '+json['email'] +'!.' + ' You have entered password:'+      json['password']);
},

// handle a non-successful response
error : function(xhr,errmsg,err) {
console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
}
});
};