/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);

// Script for cover image carousel//

// var slider = {
  
// 	// Not sure if keeping element collections like this
// 	// together is useful or not.
// 	el: {
// 	  slider: $("#slider"),
// 	  allSlides: $(".slide"),
// 	  sliderNav: $(".slider-nav"),
// 	  allNavButtons: $(".slider-nav > a")
// 	},
	
// 	timing: 800,
// 	slideWidth: 300, // could measure this
   
// 	// In this simple example, might just move the
// 	// binding here to the init function
// 	init: function() {
// 	  this.bindUIEvents();
// 	},
	
// 	bindUIEvents: function() {
// 	  // You can either manually scroll...
// 	  this.el.slider.on("scroll", function(event) {
// 		slider.moveSlidePosition(event);
// 	  });
// 	  // ... or click a thing
// 	  this.el.sliderNav.on("click", "a", function(event) {
// 		slider.handleNavClick(event, this);
// 	  });
// 	  // What would be cool is if it had touch
// 	  // events where you could swipe but it
// 	  // also kinda snapped into place.
// 	},
	
// 	moveSlidePosition: function(event) {
// 	  // Magic Numbers =(
// 	  this.el.allSlides.css({
// 		"background-position": $(event.target).scrollLeft()/6-100+ "px 0"
// 	  });  
// 	},
	
// 	handleNavClick: function(event, el) {
// 	  event.preventDefault();
// 	  var position = $(el).attr("href").split("-").pop();
	  
// 	  this.el.slider.animate({
// 		scrollLeft: position * this.slideWidth
// 	  }, this.timing);
	  
// 	  this.changeActiveNav(el);
// 	},
	
// 	changeActiveNav: function(el) {
// 	  this.el.allNavButtons.removeClass("active");
// 	  $(el).addClass("active");
// 	}
	
//   };
  
//   slider.init();
  
//   // https://codepen.io/BaylorRae/pen/ImGBC
//   // Originally added click links, so I ported over and re-wrote