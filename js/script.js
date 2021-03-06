/*jshint jquery:true */

$(document).ready(function($) {
	"use strict";
	$(document).on("scroll", onScroll);

	/* global google: false */
	/*jshint -W018 */

	/*-------------------------------------------------*/
	/* =  portfolio isotope
	/*-------------------------------------------------*/

	var winDow = $(window);
		// Needed variables
		var $container=$('.iso-call');
		var $filter=$('.filter');

		try{
			$container.imagesLoaded( function(){
				$container.trigger('resize');
				$container.isotope({
					filter:'*',
					layoutMode:'masonry',
					animationOptions:{
						duration:750,
						easing:'linear'
					}
				});
			});
		} catch(err) {
		}

		winDow.bind('resize', function(){
			var selector = $filter.find('a.active').attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {
			}
			return false;
		});
		
		// Isotope Filter 
		$filter.find('a').click(function(){
			var selector = $(this).attr('data-filter');

			try {
				$container.isotope({ 
					filter	: selector,
					animationOptions: {
						duration: 750,
						easing	: 'linear',
						queue	: false,
					}
				});
			} catch(err) {

			}
			return false;
		});


	var filterItemA	= $('.filter li a');

		filterItemA.on('click', function(){
			var $this = $(this);
			if ( !$this.hasClass('active')) {
				filterItemA.removeClass('active');
				$this.addClass('active');
			}
		});

	/*-------------------------------------------------*/
	/* =  browser detect
	/*-------------------------------------------------*/
	try {
		$.browserSelector();
		// Adds window smooth scroll on chrome.
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	}

	try {

		var SliderPost = $('.flexslider');

		SliderPost.flexslider({
			slideshowSpeed: 3000,
			easing: "swing"
		});
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  Search animation
	/*-------------------------------------------------*/
	
	var searchToggle = $('.open-search'),
		inputAnime = $(".form-search"),
		body = $('body');

	searchToggle.on('click', function(event){
		event.preventDefault();

		if ( !inputAnime.hasClass('active') ) {
			inputAnime.addClass('active');
		} else {
			inputAnime.removeClass('active');			
		}
	});

	body.on('click', function(){
		inputAnime.removeClass('active');
	});

	var elemBinds = $('.open-search, .form-search');
	elemBinds.bind('click', function(e) {
		e.stopPropagation();
	});

	/* ---------------------------------------------------------------------- */
	/*	Accordion
	/* ---------------------------------------------------------------------- */
	var clickElem = $('a.accord-link');

	clickElem.on('click', function(e){
		e.preventDefault();

		var $this = $(this),
			parentCheck = $this.parents('.accord-elem'),
			accordItems = $('.accord-elem'),
			accordContent = $('.accord-content');
			
		if( !parentCheck.hasClass('active')) {

			accordContent.slideUp(400, function(){
				accordItems.removeClass('active');
			});
			parentCheck.find('.accord-content').slideDown(400, function(){
				parentCheck.addClass('active');
			});

		} else {

			accordContent.slideUp(400, function(){
				accordItems.removeClass('active');
			});

		}
	});

	/*-------------------------------------------------*/
	/* =  Animated content
	/*-------------------------------------------------*/

	try {
		/* ================ ANIMATED CONTENT ================ */
        if ($(".animated")[0]) {
            $('.animated').css('opacity', '0');
        }

        $('.triggerAnimation').waypoint(function() {
            var animation = $(this).attr('data-animate');
            $(this).css('opacity', '');
            $(this).addClass("animated " + animation);

        },
                {
                    offset: '75%',
                    triggerOnce: true
                }
        );
	} catch(err) {

	}

	/*-------------------------------------------------*/
	/* =  remove animation in mobile device
	/*-------------------------------------------------*/
	if ( winDow.width() < 992 ) {
		$('div.triggerAnimation').removeClass('animated');
		$('div.triggerAnimation').removeClass('triggerAnimation');
	}
	
	/*-------------------------------------------------*/
	/* = slider Testimonial
	/*-------------------------------------------------*/

	var slidertestimonial = $('.bxslider');
	try{		
		slidertestimonial.bxSlider({
			mode: 'vertical'
		});
	} catch(err) {
	}

	/* ---------------------------------------------------------------------- */
	/*	Contact Form
	/* ---------------------------------------------------------------------- */

	var submitContact = $('#submit_contact'),
		message = $('#msg');

	submitContact.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#contact-form').serialize(),
			success: function(data) {
				if(data.success){
					$this.parents('form').find('input:not([type=submit]),textarea,select').filter(':visible').val('').removeClass('error');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.success).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					if (data.reason) {
						if (data.reason === "email") {
							$this.parents('form').find('#email').addClass('error').delay(8300).queue(function(next){
								$(this).removeClass("error");
								next();
							});
						}
						if (data.reason === "name") {
							$this.parents('form').find('#name').addClass('error').delay(8300).queue(function(next){
								$(this).removeClass("error");
								next();
							});
						}
					}
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.error).fadeIn('slow').delay(5000).fadeOut(3000);
				}
			}
		});
	});

	
	/* ---------------------------------------------------------------------- */
	/*	Contact Map
	/* ---------------------------------------------------------------------- */
	var contact = {"lat":"55.727446", "lon":"37.450328"}; //Change a map coordinate here!

	try {
		var mapContainer = $('#map');
		mapContainer.gmap3({
			action: 'addMarker',
			marker:{
				options:{
					icon : new google.maps.MarkerImage('images/marker.png')
				}
			},
			latLng: [contact.lat, contact.lon],
			map:{
				center: [contact.lat, contact.lon],
				zoom: 17
				},
			},
			{action: 'setOptions', args:[{scrollwheel:false}]}
		);
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	magnific-popup
	/* ---------------------------------------------------------------------- */

	try {
		// Example with multiple objects
		$('.zoom').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});

	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Header animate after scroll
	/* ---------------------------------------------------------------------- */

	(function() {

		var docElem = document.documentElement,
			didScroll = false,
			changeHeaderOn = 50;
			document.querySelector( 'header' );
		function init() {
			window.addEventListener( 'scroll', function() {
				if( !didScroll ) {
					didScroll = true;
					setTimeout( scrollPage, 100 );
				}
			}, false );
		}
		
		function scrollPage() {
			var sy = scrollY();
			if ( sy >= changeHeaderOn ) {
				$( 'header' ).addClass('active');
			}
			else {
				$( 'header' ).removeClass('active');
			}
			didScroll = false;
		}
		
		function scrollY() {
			return window.pageYOffset || docElem.scrollTop;
		}
		
		init();
		
	})();

	/* ---------------------------------------------------------------------- */
	/*	menu responsive
	/* ---------------------------------------------------------------------- */
	var menuClick = $('a.elemadded'),
		navbarVertical = $('.nav-menu');
		
	menuClick.on('click', function(e){
		e.preventDefault();

		if( navbarVertical.hasClass('active') ){
			navbarVertical.removeClass('active');
		} else {
			navbarVertical.addClass('active');
		}
	});

	winDow.bind('resize', function(){
		navbarVertical.removeClass('active');
	});

	// smooth anchor scroll
	$('.smooth-anchor').click(function(){
		var links = $('.smooth-anchor');
		links.each(function() {
			links.removeClass('active');
		});
		$(this).addClass('active');
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 500);
		return false;
	});

	//follow scroll
	function onScroll(event){
		var scrollPos = $(document).scrollTop();
		$('.smooth-anchor').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (currLink.attr("href") === "#services") {
				if (refElement.position().top - 140 <= scrollPos
					&& refElement.position().top + refElement.innerHeight() > scrollPos) {
					highlistSidebarLi(currLink);
					return false;
				}
			} else if (currLink.attr("href") === "#contacts") {
				if (refElement.position().top - 500 <= scrollPos
					&& refElement.position().top + refElement.innerHeight() > scrollPos) {
					highlistSidebarLi(currLink);
					return false;
				}
			} else if (refElement.position().top <= scrollPos
				&& refElement.position().top + refElement.innerHeight() > scrollPos) {
				highlistSidebarLi(currLink);
				//return false;
			}
			else {
				currLink.removeClass("active");
			}
		});
	}

	function highlistSidebarLi(currLink) {
		$('.smooth-anchor').removeClass("active");
		currLink.addClass("active");
	}

});

	//Quote Form
	var submitQuote = $('#submit-quote'),
		message = $('#quote-msg');

	submitQuote.on('click', function(e){
		e.preventDefault();

		var $this = $(this);
		
		$.ajax({
			type: "POST",
			url: 'contact.php',
			dataType: 'json',
			cache: false,
			data: $('#quote-form').serialize(),
			success: function(data) {

				if (data.info !== 'error') {
					$this.parents('form').find('input:not([type=submit]),textarea').filter(':visible').val('');
					$this.parents('form').find('select').filter(':visible');
					message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				} else {
					message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			}
		});
	});