(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    /*$(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('top_add').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('top_add').css('top', '-100px');
        }
    });*/




    // Sticky Search 
  
    function fade($ele) {
        $ele.fadeIn(1000).delay(3000).fadeOut(1000, function() {
            var $next = $(this).next('.quote');
            fade($next.length > 0 ? $next : $(this).parent().children().first());
      });
    }
    fade($('.quoteLoop > .quote').first());
  
  
    /* Sticky Search */
  
    $(window).scroll(function() {
  
        if ($(window).scrollTop() > 300) {
            $('.after-main-search').addClass('sticky');
        } else {
            $('.after-main-search').removeClass('sticky');
        }
    });





    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Roadmap carousel
    $(".roadmap-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        loop: true,
        center: true,
        dots: false,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    

    
})(jQuery);

// 좌측 슬라이딩메뉴
function openNav() {
	document.getElementById('mySidenav').style.marginLeft = '0';
	document.getElementById('closebtn').style.display = 'block';
	document.getElementById('openbtn').style.display = 'none';
}

function closeNav() {
	document.getElementById('mySidenav').style.marginLeft = '-295px';
	document.getElementById('closebtn').style.display = 'none';
	document.getElementById('openbtn').style.display = 'block';
}

$('#overlay').click(function () {
	closeNav();
});


