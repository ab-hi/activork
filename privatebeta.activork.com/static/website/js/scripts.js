function showNav() {
	if ($("#mob-nav-list").hasClass("slideInDown")) {
		$("#mob-nav-list").removeClass('animated slideInDown');
		$("#mob-nav-list").addClass('animated slideOutUp');
	} else {
		$("#mob-nav-list").removeClass('animated slideOutUp');
		$("#mob-nav-list").addClass('display-block animated slideInDown');
	}
}

$(window).click(function() {

})

$("#interests").click(function() {
	console.log("toggle interest");
	$("#interests-sub-list").toggle(200);
});

/*function fix_interest_bar() {
	var window_top = $(window).scrollTop();

	
	console.log( $("#fix-anchor").length);
	var bar_top = $("#fix-anchor").offset().top;
	

	if (window_top > bar_top) {
		$("#interest-bar").addClass('fix-interest-bar');
		$('#fix-anchor').height($('#interest-bar').outerHeight());
	} else {
		$("#interest-bar").removeClass('fix-interest-bar');
		$('#fix-anchor').height(0);
	}
	
}*/

/*$(window).scroll(fix_interest_bar);
fix_interest_bar();
*/
$(document).ready(function() {
	$("#interest-mob-btn").click(function(e) {
		var interests = $(".list-of-interests");
		console.log(interests);
		var disp = interests.css('display');
		console.log(disp);
		e.stopPropagation();
		if (disp == 'none') {
			interests.slideDown(200);
		} else {
			interests.slideUp(200);
		}
	});
});

$(window).on('click', function() {
	var interests = $(".list-of-interests");
	var disp = interests.css('display');

	if (disp == 'block') {
		interests.slideUp(200);
	}
})

$("#add-post").click(function() {
	$(".shadow").addClass('display-block animated fadeIn');
	$("#mobile-events").addClass('animated fadeIn');
	$('#mobile-events').css('display', 'block');
	if (!Cookies.get('user_session_cookie')) {
		$('button[id^="mobile-post-"]').css('display', 'none');
	}
});

$(".shadow").click(function() {
	$(".shadow").removeClass('display-block animated fadeIn');
	$('#mobile-events').css('display', 'none');
	$("#mobile-events").removeClass('animated fadeIn');
});

var interest_drop_down = $(".interest-drop-down > ul");
var display_interest = $("#display-interest");

interest_drop_down.css("display", "none");

display_interest.click(function() {
	if (interest_drop_down.css("display") == "none") {
		interest_drop_down.slideDown(200);
	} else {
		interest_drop_down.slideUp(200);
	}
});

select_option = $("li.interest-drop-down > ul > li > a");
select_option.click(function() {
	interest_drop_down.css("display", "none");
	display_interest.html($(this).text());
});

function commentBox_placeholder() {
	$("#commentBox").click(function() {
		$(this).html('');
	});

	$("#commentBox").blur(function() {
		if ($("#commentBox").val() == '')
			$(this).html('Post Comment');
	});
}

commentBox_placeholder();

function localScr() {
	$('.comment-section').localScroll({duration:800});
}

$('#tags').on('change', function() {
	console.log($('#tags').val());
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
})