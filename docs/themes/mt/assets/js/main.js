(function (window, document, $, undefined) {
    'use strict';

    var doobJs = {
        i: function (e) {
            doobJs.d();
            doobJs.methods();
        },

        d: function (e) {
            this._window = $(window),
                this._document = $(document),
                this._body = $('body'),
                this._html = $('html')

        },

        methods: function (e) {
            doobJs.smothScroll();
            doobJs.backToTopInit();
            doobJs.headerSticky();
            doobJs.salActive();
            doobJs.counterUpActivation();
            doobJs.wowActivation();
            doobJs.headerTopActivation();
            doobJs.onePageNav();
            doobJs.slickSliderActivation();
            doobJs.menuCurrentLink();
        },

        menuCurrentLink: function () {
            var currentPage = location.pathname.split("/"),
            current = currentPage[currentPage.length-1];
            $('.mainmenu li a').each(function(){
                var $this = $(this);
                if($this.attr('href') === current){
                    $this.addClass('active');
                    $this.parents('.has-menu-child-item').addClass('menu-item-open')
                }
            });
        },

        smothScroll: function () {
            $(document).on('click', '.smoth-animation', function (event) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 50
                }, 300);
            });
        },


        lightBoxJs: function () {
            lightGallery(document.getElementById('animated-lightbox'), {
                thumbnail: true,
                animateThumb: false,
                showThumbByDefault: false,
                cssEasing: 'linear'
            });

            lightGallery(document.getElementById('animated-lightbox2'), {
                thumbnail: true,
                animateThumb: false,
                showThumbByDefault: false,
                cssEasing: 'linear'
            });

            lightGallery(document.getElementById('animated-lightbox3'), {
                thumbnail: true,
                animateThumb: false,
                showThumbByDefault: false,
                cssEasing: 'linear'
            });
        },

        slickSliderActivation: function () {
            $('.testimonial-activation').not('.slick-initialized').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                adaptiveHeight: true,
                cssEase: 'linear',
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>'
            });
            $(".product-list-activation")
              .not(".slick-initialized")
              .slick({
                infinite: true,
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                adaptiveHeight: true,
                centerMode: false,
                autoplay: true,
                cssEase: "linear",
                responsive: [
                  {
                    breakpoint: 769,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                    },
                  },
                  {
                    breakpoint: 581,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ],
                prevArrow:
                  '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow:
                  '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
              });
            $('.slider-activation').not('.slick-initialized').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                adaptiveHeight: true,
                cssEase: 'linear',
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>'
            });

            $('.blog-carousel-activation').not('.slick-initialized').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: true,
                arrows: false,
                adaptiveHeight: true,
                cssEase: 'linear',
                responsive: [
                    {
                      breakpoint: 769,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 581,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                  ]
            });

            $('.brand-carousel-activation').not('.slick-initialized').slick({
                infinite: true,
                slidesToShow: 6,
                slidesToScroll: 1,
                dots: true,
                arrows: true,
                adaptiveHeight: true,
                cssEase: 'linear',
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                responsive: [
                    {
                      breakpoint: 769,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 581,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                  ]
            });

            $('.brand-carousel-init').not('.slick-initialized').slick({
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                dots: false,
                arrows: true,
                adaptiveHeight: true,
                autoplay: true,
                cssEase: 'linear',
                prevArrow: '<button class="slide-arrow prev-arrow"><i class="feather-arrow-left"></i></button>',
                nextArrow: '<button class="slide-arrow next-arrow"><i class="feather-arrow-right"></i></button>',
                responsive: [
                    {
                      breakpoint: 769,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 581,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                  ]
            });
        },

        salActive: function () {
            sal({
                threshold: 0.01,
                once: true,
            });
        },

        backToTopInit: function () {
            var scrollTop = $('.rn-back-top');
            $(window).scroll(function () {
                var topPos = $(this).scrollTop();
                if (topPos > 150) {
                    $(scrollTop).css('opacity', '1');
                } else {
                    $(scrollTop).css('opacity', '0');
                }
            });
            $(scrollTop).on('click', function () {
                $('html, body').animate({
                    scrollTop: 0,
                    easingType: 'linear',
                }, 10);
                return false;
            });
        },

        headerSticky: function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 250) {
                    $('.header-sticky').addClass('sticky')
                } else {
                    $('.header-sticky').removeClass('sticky')
                }
            })
        },

        counterUpActivation: function () {
            $('.counter').counterUp({
                delay: 10,
                time: 1000
            });
        },

        wowActivation: function () {
            new WOW().init();
        },

        headerTopActivation: function () {
            $('.bgsection-activation').on('click', function () {
                $('.header-top-news').addClass('deactive')
            })
        },


        contactForm: function () {
          $(".rwt-dynamic-form").on("submit", function (e) {
            e.preventDefault();
            var _self = $(this);
            var __selector = _self.closest("input,textarea");
            _self.closest("div").find("input,textarea").removeAttr("style");
            _self.find(".error-msg").remove();
            _self
              .closest("div")
              .find('button[type="submit"]')
              .attr("disabled", "disabled");
            var data = $(this).serialize();
            $.ajax({
              url: "mail.php",
              type: "post",
              dataType: "json",
              data: data,
              success: function (data) {
                _self
                  .closest("div")
                  .find('button[type="submit"]')
                  .removeAttr("disabled");
                if (data.code == false) {
                  $(".error-section").show();
                  _self.closest("div").find('[name="' + data.field + '"]');
                  _self
                    .find(".error-section")
                    .append(
                      '<div class="error-msg"><p>*' + data.err + "</p></div>"
                    );
                } else {
                  $(".error-msg").hide();
                  $(".error-section").hide();
                  $(".form-group").removeClass("focused");
                  _self
                    .find(".rainbow-btn")
                    .after(
                      '<div class="success-msg"><p>' +
                        data.success +
                        "</p></div>"
                    );
                  _self.closest("div").find("input,textarea").val("");

                  setTimeout(function () {
                    $(".success-msg").fadeOut("slow");
                  }, 5000);
                }
              },
            });
          });
        },

        onePageNav: function () {
            $('.onepagenav').onePageNav({
                currentClass: 'current',
                changeHash: false,
                scrollSpeed: 500,
                scrollThreshold: 0.2,
                filter: '',
                easing: 'swing',
            });
        },



    }
    doobJs.i();

    var open = false;
    $(".hamberger-button").click(function () {
      if (open === false) {
        $("#main").addClass("slide");
        $(".slide-wrapper").addClass("slide-wrapper-active");
        $("#button-icon").addClass("open");
        setTimeout(function () {
          open = true;
        }, 300);
      }
    });

    $("#main, .mainmenu li a").click(function () {
      if (open) {
        setTimeout(function () {
          $("#main").removeClass("slide");
          $(".slide-wrapper").removeClass("slide-wrapper-active");
          $(".hamberger-button #button-icon").toggleClass("open");
          open = false;
        }, 150);
      }
    });

    $('.has-droupdown > a > span').on('click', function (e) {
        $('.has-droupdown .submenu').toggleClass('active');
        e.preventDefault();
    });

})(window, document, jQuery)
