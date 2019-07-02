var elems = {
	document: $(document),
	body : $('body'),
	header: $('header'),
	hamburger: $('header .navbar-toggler'),
	navigation: $('header #navigation'),
	submenu: $('#navigation .sub-menu'),
	sublinks: $('#navigation .sub-links'),
	closenav: $('#navigation .close-navigation'),
	prevnav: $('#navigation .prev-menu'),
	usernav: $('#navigation, .user-link'),
	usermenu: $('#navigation .user-dropdown'),
	searchform: $('header .search-form'),
	searchinput: $('header .search-form input'),
	autosuggest: $('header .search-form .auto-suggest'),
	searchbtn: $('header .search-toggler'),
	slideroption1: {
	    infinite: false,
	    slidesToScroll: 1,
	    arrows: false,
	    responsive :[{
		    	breakpoint: 599,
		    	settings : {
		    		slidesToShow: 1,
		    		infinite: true
		    	}
		    }, {
		    	breakpoint: 767,
		    	settings : {
		    		slidesToShow: 2,
		    		infinite: true
		    	}
		    },  {
		    	breakpoint: 1023,
		    	settings : {
		    		slidesToShow: 3,
		    		infinite: true,
		    		dots: true
		    	}
		    },  {
		    	breakpoint: 2700,
		    	settings : {
		    		slidesToShow: 4,
		    		infinite: true,
		    		dots: true
		    	}
		    }]
		}
}

elems.document.on('click', function(event){

	// hamburger event
	if(!elems.hamburger.is(event.target) && elems.hamburger.has(event.target).length === 0) {
		if(!elems.navigation.is(event.target) && elems.navigation.has(event.target).length === 0) {
			elems.navigation.removeAttr('style');
			elems.body.removeAttr('style');
		}
	} else {
		elems.body.attr('style', 'overflow: hidden');
		elems.navigation.attr('style', 'left: 0; position: fixed');
	}

	// close hamburger
	if(elems.closenav.is(event.target) || elems.closenav.has(event.target).length > 0) {
		elems.body.removeAttr('style');
		elems.navigation.removeAttr('style');
	}

	// submenu event
	if(!elems.submenu.closest('.nav-item').is(event.target) && elems.submenu.closest('.nav-item').has(event.target).length === 0) {
		if(!elems.sublinks.hasClass('d-none')) {
			elems.sublinks.addClass('d-none');
			elems.closenav.removeClass('d-none');
			elems.prevnav.addClass('d-none');
			elems.submenu.find('.glyphicon').removeClass('glyphicon-menu-up').addClass('glyphicon-menu-down');
		}
	} else {
		elems.submenu.find('.glyphicon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-up');
		elems.sublinks.removeClass('d-none');
		elems.closenav.addClass('d-none');
		elems.prevnav.removeClass('d-none');
	}

	// user profile event
	if(!elems.usernav.closest('.after-login').is(event.target) && elems.usernav.closest('.after-login').has(event.target).length === 0) {
		if(!elems.usermenu.hasClass('d-none')) {
			elems.usermenu.addClass('d-none');
		}
	} else {
		elems.usermenu.removeClass('d-none');
	}

	// search form event
	if(!elems.searchbtn.is(event.target) && elems.searchbtn.has(event.target).length === 0) {
		if(!elems.searchform.is(event.target) && elems.searchform.has(event.target).length === 0) {
			if(!elems.autosuggest.hasClass('d-none')) {
				elems.autosuggest.addClass('d-none');
			}
			elems.searchinput.val('');
			elems.searchform.removeAttr('style');
		}
	} else {
		elems.searchform.attr('style', 'top: 0');
	}

});

// search form auto complete event
elems.searchinput.on('keyup change', function(){
	var $this = $(this);
	if($.trim($this.val()).length > 0) {
		elems.autosuggest.removeClass('d-none');
	} else {
		elems.autosuggest.addClass('d-none');
	}
});

$('#best-seller .regular').slick(elems.slideroption1);

$('.trend-course a').on('click', function(){
	var $this = $(this),
		targetelm = $this.attr('href');
	if(!$(targetelm).find('.slick-slide').length > 0) {
		$(targetelm).find('.regular').slick(elems.slideroption1);
	} else {
		$(targetelm).find('.regular').slick('resize');
	}
});

var feedback_cover = $('.testimonials .carousel-cover'),
	feedback_block = feedback_cover.find('.feedbacks'),
	feedback_count = feedback_block.length,
	feedback_width = feedback_block.width();

feedback_block.eq(0).addClass('prev');
feedback_block.eq(1).addClass('active');
feedback_block.eq(2).addClass('next');
$(window).on('resize', function(){
	if($(window).width() >= 992) {
		feedback_block.on('click', function(){
			if($(window).width() >= 992) {

				var $this = $(this);
				$this.siblings().removeClass('prev active next');
				
				if($this.hasClass('prev')) {
					$this.removeClass('prev');
					feedback_cover.stop(false, true).animate({left: '+=' + 320});
				} else if($this.hasClass('next')) {
					$this.removeClass('next');
					feedback_cover.stop(false, true).animate({left: '-=' + 320});
				}
			
				$this.addClass('active');
				$this.prev().addClass('prev');
				$this.next().addClass('next');
			}
		});
	}
});
$(window).resize();