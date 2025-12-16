(function ($) {
    "use strict";
    
    // loader
    var loader = function () {
        setTimeout(function () {
            if ($('#loader').length > 0) {
                $('#loader').removeClass('show');
            }
        }, 1);
    };
    loader();
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    
    // Main carousel
    $(".carousel .owl-carousel").owlCarousel({
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        smartSpeed: 300,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ]
    });
    
    
    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    
    // Causes carousel
    (function(){
        var mobileBreakpoint = 576; // mobile breakpoint: <576px
        var causesIsMobile = $(window).width() < mobileBreakpoint;

        function initCausesCarousel(isMobile){
            // determine how many items are visible at current width
            var width = $(window).width();
            var itemsShown = 1;
            if (width >= 992) itemsShown = 3;
            else if (width >= 768) itemsShown = 2;
            else itemsShown = 1;

            // count real slides and decide playback behavior
            var realSlides = $('.causes-carousel .causes-item').length;
            var shouldLoop = realSlides > itemsShown;
            var shouldAuto = realSlides > 1; // only autoplay when there's more than one slide

            // for mobile use native sliding (no animate.css) for smooth left/right slide
            var opts = {
                autoplay: shouldAuto,
                autoplayTimeout: 3500,
                autoplaySpeed: 800,
                items: 1,
                smartSpeed: isMobile ? 600 : 450,
                dots: false,
                loop: shouldLoop,
                touchDrag: true,
                mouseDrag: true,
                pullDrag: true,
                autoplayHoverPause: true,
                lazyLoad: true,
                responsiveRefreshRate: 100,
                responsive: {
                    0:{
                        items:1,
                        stagePadding: 40,
                        center: true
                    },
                    576:{
                        items:1,
                        stagePadding: 40,
                        center: true
                    },
                    768:{
                        items:2,
                        stagePadding: 0
                    },
                    992:{
                        items:3,
                        stagePadding: 0
                    }
                }
            };

            // When not mobile we keep the subtle vertical animation
            if (!isMobile) {
                opts.animateIn = 'slideInDown';
                opts.animateOut = 'slideOutDown';
            } else {
                // prefer natural horizontal slide on mobile (enter from right / exit left)
                opts.animateIn = false;
                opts.animateOut = false;
            }

            $(".causes-carousel").owlCarousel(opts);

            // hide dots pagination for causes carousel
            $('.causes-carousel').find('.owl-dots').hide();

            // keyboard accessibility: enable left/right keys when carousel focused
            $('.causes-carousel').attr('tabindex', '0').off('keydown.causes').on('keydown.causes', function(e){
                if (e.keyCode === 37) { // left
                    $(this).trigger('prev.owl.carousel');
                } else if (e.keyCode === 39) { // right
                    $(this).trigger('next.owl.carousel');
                }
            });
        }

        initCausesCarousel(causesIsMobile);

        // Re-initialize when crossing mobile breakpoint so options update
        var resizeTimer;
        $(window).on('resize', function(){
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function(){
                var nowMobile = $(window).width() < mobileBreakpoint;
                if (nowMobile !== causesIsMobile) {
                    causesIsMobile = nowMobile;
                    $('.causes-carousel').trigger('destroy.owl.carousel').removeClass('owl-loaded');
                    initCausesCarousel(causesIsMobile);
                }
            }, 200);
        });
    })();
    
    
    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
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
    
    
    // Related post carousel
    $(".related-slider").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
    // Add lazy loading to images that don't have it (skip header logo and images marked .no-lazy)
    $(function(){
        $('img').not('[loading]').each(function(){
            var $img = $(this);
            var src = $img.attr('src') || '';
            if ($img.closest('.navbar').length) return; // skip nav/logo
            if (/Logos\//.test(src)) return; // skip logo images in Logos folder
            if ($img.hasClass('no-lazy')) return; // opt-out
            $img.attr('loading', 'lazy');
        });
    });

})(jQuery);

