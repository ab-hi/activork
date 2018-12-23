(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "../../connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

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
function follow_unfollow_magazine(el) {

//e.preventDefault();

var csrftoken = getCookie('csrftoken');

var html_value = $(el).text();
var magazine_id = $(el).attr('id');


//alert(magazine_id);
alert($("#session_id").val());

data = {}
data['csrfmiddlewaretoken'] = csrftoken;
data['SESSION_ID'] = $("#session_id").val();
data['magazine_id'] = magazine_id;

//This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post

$.ajax({
url : "http://ec2-54-70-76-23.us-west-2.compute.amazonaws.com/api-follow-magazine/", // the endpoint,commonly same url
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


 function open_textarticle_modal(){

    $('#setcoverpic').modal('hide');
    $('#textarticle').modal('show');

  }

  function share_magazine(){

    var csrftoken = getCookie('csrftoken');
    data = {}
    var title = $("#magazine_title").text();
    console.log(title);
    data['csrfmiddlewaretoken'] = csrftoken;
    data['email'] = $('#email').val();
    data['sender'] = $('#sender').val();
    data['message'] = $('#message').val();
    url = "index3ebc.html?id=64"
    image_link = "../../ec2-54-70-76-23.us-west-2.compute.amazonaws.com/media/article_images/Sun_tan.png" 
    data['html_content'] = "<!DOCTYPE html><html><head></head><body><h3>Check out this really cool magazine from <a href='http://privatebeta.activork.com/articles/'>ACTIVORK</a> - <a href="+url+">"+title+"</a></h3><a href="+url+"><img src="+image_link+" /></a></body></html>"


    $.ajax({
url : "http://privatebeta.activork.com/share-magazine/", // the endpoint,commonly same url
type : "POST", // http method
data : data, // data sent with the post request

// handle a successful response
success : function(json) {
console.log(json); // another sanity check
if(json == "success"){

  $("#email_address").css('display','none');
  $("#share_text").html("Shared");
}
else {

  $("#email_address").css('display','none');
  $("#share_text").html("There is some error. We are looking at it"); 

}

//On success show the data posted to server as a message
//alert('Hi '+json['email'] +'!.' + ' You have entered password:'+      json['password']);
},

// handle a non-successful response
error : function(xhr,errmsg,err) {
console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
}
});
  }

$('.checkbox').click(function () {
    var checked = $('input', this).is(':checked');
    $('#span_text', this).text(checked ? 'Private - Make this a private magazine' :'Public - Let everyone see my magazine');

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
function create_magazine() {

//e.preventDefault();

var csrftoken = getCookie('csrftoken');

var title = $("#title").val();
var description = $("#description").val();
var checked = $('input', '.checbox').is(':checked');


if(checked){
  var visible = "public";
}
else
{
  var visible = "private";
} 

console.log(title);
console.log(description);
console.log(checked);

alert(visible);

data = {}
data['csrfmiddlewaretoken'] = csrftoken;
data['SESSION_ID'] = $("#session_id").val();
data['visible'] = visible;
data['title'] = title;
data['description'] = description;

//This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post

$.ajax({
url : "http://ec2-54-70-76-23.us-west-2.compute.amazonaws.com/api-add-to-magazine/", // the endpoint,commonly same url
type : "POST", // http method
data : data, // data sent with the post request

// handle a successful response
success : function(json) {
console.log(json); // another sanity check
if (json.status){
  $("#magazine_body").prepend('<div style="padding-left:0px;padding-right:5px;" class="col-lg-3 col-sm-4 col-xs-6"><div class="text-center" style="margin:25%;color:white;font-size:18px;position:absolute;z-index:1;">'+json.data.title+'</div><img  id='+json.data.id+' onclick="select_image(this)" class="thumbnail img-responsive" src="http://ec2-54-70-76-23.us-west-2.compute.amazonaws.com'+json.data.cover_pic+'"></div>');
}
else{
  alert("Already there");
}



$("#createMagazine .close").click()


//On success show the data posted to server as a message
//alert('Hi '+json['email'] +'!.' + ' You have entered password:'+      json['password']);
},

// handle a non-successful response
error : function(xhr,errmsg,err) {
console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
}
});
};


 function send_article_id(el){
    var article_id = $(el).attr('id');
//alert(article_id);
$("#magazine_body").prepend("<input type='hidden' id='article_id' value="+article_id+" />");
$("#myModal").css('display', 'block');

}

function save_textarticle(){
  alert("working");
  var csrftoken = getCookie('csrftoken');

  var html_value = $("#article_text").val();
  var magazine_id = $(".magazine_id").attr('id');
  var textarticle_id = $(".textarticle_id").attr("id");

//alert(magazine_id);
alert(html_value);

data = {}
data['csrfmiddlewaretoken'] = csrftoken;
data['SESSION_ID'] = $("#session_id").val();
data['magazine_id'] = magazine_id;
data["content"] = html_value;
data["textarticle_id"] = textarticle_id;

//This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post

$.ajax({
url : "http://ec2-54-70-76-23.us-west-2.compute.amazonaws.com/api/save-textarticle/", // the endpoint,commonly same url
type : "POST", // http method
data : data, // data sent with the post request

// handle a successful response
success : function(json) {
console.log(json); // another sanity c
$("#textarticle").modal("hide");  
window.location.reload(); 
},

// handle a non-successful response
error : function(xhr,errmsg,err) {
console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
}
});
}

function render_data_inmodal(el){

  var textarticle_id = $(el).attr('id');
  var textarticle_content = $("#content_"+textarticle_id).text();
  $(".textarticle_id").attr("id",textarticle_id);
  $("#article_text").val(textarticle_content);
  $("#textarticle").modal("show");

}


function select_image(el){
$('.selected').removeClass('selected'); // removes the previous selected class
$(el).addClass('selected'); // adds the class to the clicked image
};




function add_to_magazine() {

//e.preventDefault();

var csrftoken = getCookie('csrftoken');

var magazine_id = $(".selected").attr('id');
var article_id = $("#article_id").val();

console.log(magazine_id);
console.log(article_id);

data = {}
data['csrfmiddlewaretoken'] = csrftoken;
data['SESSION_ID'] = $("#session_id").val();
data['magazine_id'] = magazine_id;
data['article_id'] = article_id;


//This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post

$.ajax({
url : "http://ec2-54-70-76-23.us-west-2.compute.amazonaws.com/api-add-to-magazine/", // the endpoint,commonly same url
type : "POST", // http method
data : data, // data sent with the post request

// handle a successful response
success : function(json) {

console.log(json); // another sanity check
window.location.href="http://privatebeta.activork.com/magazine-content/?id="+magazine_id+""


},

// handle a non-successful response
error : function(xhr,errmsg,err) {
console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
}
});
};


//For doing AJAX post
function set_coverpic() {

//e.preventDefault();

var csrftoken = getCookie('csrftoken');

var magazine_id = $(".magazine_id").attr('id');
var article_id = $(".selected").attr('id');


var checked = $('input', '.checbox').is(':checked');


if(checked){
  var visible = "public";
}
else
{
  var visible = "private";
}

//alert(visible); 

//alert(magazine_id);
//alert($("#session_id").val());

data = {}
data['csrfmiddlewaretoken'] = csrftoken;
data['SESSION_ID'] = $("#session_id").val();
data['magazine_id'] = magazine_id;
data['article_id'] = article_id;
data['visible'] = visible
data['description'] = $("#description_magazine").val();
data["title"] = $("#title_magazine").val();
//This is the Ajax post.Observe carefully. It is nothing but details of where_to_post,what_to_post

$.ajax({
url : "http://ec2-54-70-76-23.us-west-2.compute.amazonaws.com/api-set-coverpic/", // the endpoint,commonly same url
type : "POST", // http method
data : data, // data sent with the post request

// handle a successful response
success : function(json) {
console.log(json); // another sanity check
window.location.reload();

//On success show the data posted to server as a message
//alert('Hi '+json['email'] +'!.' + ' You have entered password:'+      json['password']);
},

// handle a non-successful response
error : function(xhr,errmsg,err) {
console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
}
});
};


