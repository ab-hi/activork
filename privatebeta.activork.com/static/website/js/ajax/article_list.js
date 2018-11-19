/*function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
*/

var index = 5;


function like_article(el){
	var csrftoken = getCookie('csrftoken');
	var article_id = $(el).id;
	alert(article_id);
	data = {};
	data["article_id"] = article_id;
	data["csrftoken"] = csrftoken;
	$.ajax({
		url:"http://ec2-52-43-13-235.us-west-2.compute.amazonaws.com/api-like/",
		type:"POST",
		data:data,
		success : function(data){
			console.log(data);
			$("#anchor_like_"+article_id).html(data);
		},
	})
}

$(window).on('load', function() {
  console.log('Ajax Home Page Load');
  $("#load-more").on('click', function() {
    event.preventDefault();
    console.log('asd');

    var hidden_cards = $('.hide-card');

    hidden_cards.each(function (i, val) {
      console.log($('#card'+index).attr('id'));

      if (i < 5) {
        $('#card'+index).removeClass('hide-card');
        $('#card'+index).addClass('animated fadeIn');
        $('#m-card'+index).removeClass('hide-card');
        $('#m-card'+index).addClass('animated fadeIn');
        index++;
      }
    });
  });

  div = ''

  // $.ajax({
  //   url: 'http://ec2-52-43-13-235.us-west-2.compute.amazonaws.com/mobile/featured_objects/',
  //   type: 'GET',
  //   success: function(res) {
  //     $.each(res['images'], function(i) {
  //       console.log(res['images'][i])
  //       div += '<div>'
  //       div += '  <div class="slider-parent">'
  //       div += '    <img src="http://ec2-52-43-13-235.us-west-2.compute.amazonaws.com'+ res['images'][i] +'" />'
  //       div += '    <div class="slider-child">'
  //       div += '      <h3>'+ res['titles'][i] +'</h3>'
  //       div += '      <p>'
  //       div += '        Dolor sit amet, consectetur adipiscing elit. Fusce ut ornare enim.'
  //       div += '      </p>'
  //       div += '    </div>'
  //       div += '  </div>'
  //       div += '</div>'
  //     })
  //
  //     $('#owl-carousel').html(div)
  //     console.log($('#owl-carousel').attr('class'));
  //   }
  // })

});
