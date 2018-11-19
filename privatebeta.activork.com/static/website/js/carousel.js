$(document).ready(function() {
	 // Stuff to do as soon as the DOM is ready
	 console.log("Welcome!");

   $(".owl-carousel").owlCarousel({
     nav:true,
     autoplay: false,
     responsive:{
          0:{
              items:1
          },
          600:{
              items:1
          },
          1000:{
              items:1
          }
      }
	 });

	 $("#owl-carousel").owlCarousel({
		 navigation: false,
		 autoPlay: true,
		 singleItem:true,
		 autoplay: 2000,
	 });

	 $('#owl-add-images').owlCarousel({
		 items: 2,
		 singleItem: true,
		 navigation: false,
	 });
});
