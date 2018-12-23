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