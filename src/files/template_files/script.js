/* Your scripts go here */
(function ($) {

    /*blur init for header image*/
	if ($(window).width() > 600) {

	    var img = $('.blur'),
	        params = {};

	        params.callBack = function () {
                $('canvas').addClass('visible')
	        }
	       
	        if (img.data('gradient_width')) {
	            params.gradient_width = img.data('gradient_width');
	        }
	        if (img.data('blur_width')) {
	            params.blur_width = img.data('blur_width');
	        }
	        if (img.data('blur_radius')) {
	            params.blur_radius = img.data('blur_radius');
	        }
	        if (img.data('vertical_gradient')) {
	            params.vertical_gradient = img.data('vertical_gradient');
	        }
            if (img.data('blur_page')) {
                params.blur_page = img.data('blur_page');
            }
            if (img.data('blur_page_alfa')) {
                params.blur_page_alfa = img.data('blur_page_alfa');
            }
            $(img).alfablur(params);	   
	} else {
	    $('.blur').attr('src', $('.blur').data('src'));	    
	}

    //Custom Select init 
	$(".service_form select").selectOrDie();

    $('#hash_nav a').click(function () {
        $('#hash_nav a').removeClass('active');
        $(this).addClass('active');
    });
           
    // detect scrolling direction
    // add class to body

    $(function () {
        var body = $('html, body'),
            backToTop = $('.back-to-top'),
            fromBottom = parseInt($(backToTop).css('bottom')),
            windowHeight = $(window).height(),
            footer = $('.allpage--footer'),
            lastScrollTop = 0,
            delta = 5;

        backToTop.click(function () {
            body.animate({ scrollTop: 0 }, 1000);
        });

        $(window).scroll(function (event) {
            var scrolledFromTop = $(this).scrollTop(); //hided scrolled height from document's top

            if (Math.abs(lastScrollTop - scrolledFromTop) <= delta)
                return;

            if (scrolledFromTop > lastScrollTop) {
                // downscroll code
                $("body").removeClass("scrolltop").addClass("scrolldown");
            } else {
                // upscroll code
                $("body").removeClass("scrolldown").addClass("scrolltop");
            }
            lastScrollTop = scrolledFromTop;

            //position for 'back-to-top' button
            if (scrolledFromTop >= 15) {
                var scrollPosition = scrolledFromTop + windowHeight,
                    maxScrollingHeight = ($(document).height() - $(footer).height());

                if (scrollPosition >= maxScrollingHeight) {
                    $(backToTop).css('bottom', fromBottom + (scrollPosition - maxScrollingHeight));
                }
                else {
                    $(backToTop).css('bottom', fromBottom);
                }

                $(backToTop).fadeIn();

            } else {
                $(backToTop).fadeOut();
            }
        });

    });

    // fixed header on mobile
    $(function () {
        var maxScrollTop = 50;
        $(window).scroll(function (event) {
            var st = $(this).scrollTop();

            if (st > maxScrollTop) {
                $("body").addClass("xs-fixed-header");
            } else {
                $("body").removeClass("xs-fixed-header");
            }
        });
    });

    // local navigation
    $(".local-nav")
    .sticky({
        topSpacing: 0,
        wrapperClassName: "hold",
        className: "fixed-local-nav"
    })
    .localScroll({
        offset: -70,
        duration: 500
    });

    //sticky element at bottom of page
    function sticky_relocate() {
        if ($('[data-stick="bottom"]').length > 0) {
            var window_top = $(document).scrollTop(),
            objectTop = (window.innerHeight)*0.5,
            objectDiv = $('[data-stick="bottom"]'),
            objectDivTop = objectDiv.offset().top - $(window).height() + $('.stick--inner').height();

            if (window_top > objectTop) {
                objectDiv.addClass('stick');
                $('.stick--inner > div').addClass('container');
            }

            if ((window_top > objectDivTop) || (window_top < objectTop)) {
                objectDiv.removeClass('stick');
                $('.stick--inner > div').removeClass('container');
            }
        }
    }

    $(function () {
        $(window).scroll(sticky_relocate);
        sticky_relocate();
    });

    $('.navbar--submenulink').localScroll({
        offset: -70,
        duration: 500
    });

    // detecting ios and android to hide unnecessary appstore buttons
    if (bowser.android) {
        $("html").addClass("android");
    } else if (bowser.ios) {
        $("html").addClass("ios");
    }    
    
    /*bnt group */
    if ($('#Recharge').length) {  
        $('#Recharge .btn-group label').click(function () {
            $(this).siblings().removeClass('active');
            $(this).addClass('active');
        });

        $('#Recharge .btn-group input:checked').parent().click()
    }

    if ($('#auto_recharge').length) {
        $('#auto_recharge b').popover()
    }
	
	// Modal Window for dynamically opening videos
    $('a.modal-video').on('click', function(event){

        if (!$('html').hasClass('android') && !$('html').hasClass('ios') && $(window).width() > 768) {

            // Prevent opening of external page
            event.preventDefault();

            var videoLinkID = $(this).attr('href').split('http://youtu.be/')[1];

            // Variables for iFrame code. Width and height from data attributes, else use default.
            var vidTitle = 'Promo video'; // default
            var vidWidth = 640; // default
            var vidHeight = 360; // default
            if ( $(this).attr('data-title') ) { vidTitle = $(this).data('title'); }
            if ( $(this).attr('data-width') ) { vidWidth = parseInt($(this).attr('data-width')); }
            if ( $(this).attr('data-height') ) { vidHeight =  parseInt($(this).attr('data-height')); }
            var iFrameCode = '<iframe width="' + vidWidth + '" height="'+ vidHeight +'" scrolling="no" allowtransparency="true" allowfullscreen="true" src="//www.youtube.com/embed/'+  videoLinkID +'?rel=0&autoplay=1" frameborder="0"></iframe>';
        
		    bootbox.dialog({
			    className: 'modal-media',
			    title: vidTitle,
			    message: iFrameCode
		    });
        }
    });

    if (document.location.hash) {
        $(document).on("ZoneLoadedEvent", function () {
            var sectionName = document.location.hash,
                offset = 0;

                if ($(window).width() < 768) {                    
                    offset = 50;
                }

                
            $('html, body').animate({ scrollTop: $('' + sectionName).offset().top - offset }, '500');
        });        
    }
    

}(jQuery));