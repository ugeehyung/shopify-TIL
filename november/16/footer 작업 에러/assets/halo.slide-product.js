(function ($) {
	var halo = {
	    initSliderFeaturedProducts: function () {
            var featuredProduct = $('[data-featured-products]');

            featuredProduct.each(function () {
                var self = $(this),
                    productGrid = self.find('.products-grid'),
                    gridItemWidth = productGrid.data('row'),
                    hasRightSidebar = $('.halo-product-content .pro-page [data-has-right-sidebar]');
                if (window.innerWidth < 1200) {
                  self.on("afterChange", function(event, slick) {
                    var isElementVisible = function($el, threshold) {
                      var rect = $el[0].getBoundingClientRect();
                      var windowHeight = window.innerHeight || document.documentElement.clientHeight;
                      threshold = threshold ? threshold : 0;

                      return (
                        rect.bottom >= (0 - (threshold / 1.5)) &&
                        rect.right >= 0 &&
                        rect.top <= (windowHeight + threshold) &&
                        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
                      );
                    };

                    $('.product-item[data-product-id]').each(function(i, el){
                      var self = $(this);
                      console.log(isElementVisible($(el), -100));
                      if(isElementVisible($(el), -100)) {
                        var $product = $(this);
                        if( !$product[0].hasAttribute('data-json-product') ) {
                          if( $product.hasClass('json-loading') )
                            return;
                          $product.addClass('json-loading');
                          var handle = $product.find('.product-title').attr('href');

                          var xhr = $.ajax({
                            type: 'GET',
                            url: handle,
                            data: {
                              view: 'get_json'
                            },
                            cache: false,
                            dataType: 'html',
                            success: function (data) {
                              var json = JSON.parse(data);
                              $product.attr('data-json-product', JSON.stringify(json));
                            },
                            complete: function () {
                              $product.removeClass('json-loading');
                            }
                          });
                        }
                      }
                    });
                  });
                }
                if(productGrid.not('.slick-initialized')) {
                    productGrid.slick({
                        get slidesToShow() {
                            if (hasRightSidebar.length) {
                                return this.slidesToShow = 5;
                            } else {
                                return this.slidesToShow = productGrid.data('row');
                            }
                        },

                        get vertical() {
                            if(productGrid.hasClass('verticle')) {
                                return this.vertical = true;
                            }else {
                                return this.vertical = false;
                            }
                        },

                        get slidesToScroll() {
                            if(productGrid.hasClass('verticle')) {
                                return this.slidesToScroll = 1;
                            }else {
                                return this.slidesToScroll = productGrid.data('row');
                            }
                        },

                        speed: 1000,
                        infinite: false,

                        get dots() {
                            if(self.hasClass('has-banner')) {
                                return this.dots = true;
                            }else {
                                return this.dots = false;
                            };
                        },
                        get nextArrow() {
                            if ((window.layout_style == 'layout_style_1170') || (window.layout_style == 'layout_style_flower')) {
                                return this.nextArrow = '<button type="button" class="slick-next"><svg viewBox="0 0 50 50"><path d="M 11.957031 13.988281 C 11.699219 14.003906 11.457031 14.117188 11.28125 14.308594 L 1.015625 25 L 11.28125 35.691406 C 11.527344 35.953125 11.894531 36.0625 12.242188 35.976563 C 12.589844 35.890625 12.867188 35.625 12.964844 35.28125 C 13.066406 34.933594 12.972656 34.5625 12.71875 34.308594 L 4.746094 26 L 48 26 C 48.359375 26.003906 48.695313 25.816406 48.878906 25.503906 C 49.058594 25.191406 49.058594 24.808594 48.878906 24.496094 C 48.695313 24.183594 48.359375 23.996094 48 24 L 4.746094 24 L 12.71875 15.691406 C 13.011719 15.398438 13.09375 14.957031 12.921875 14.582031 C 12.753906 14.203125 12.371094 13.96875 11.957031 13.988281 Z"></path></svg></button>';
                            } else if (window.layout_style == 'layout_style_fullwidth'){
                                return this.nextArrow = '<button type="button" class="slick-next"><svg viewBox="0 0 478.448 478.448" class="icon icon-chevron-right" id="icon-chevron-right"><g><g><polygon points="131.659,0 100.494,32.035 313.804,239.232 100.494,446.373 131.65,478.448 377.954,239.232"></polygon></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>';
                            }
                            else {
                                return this.nextArrow = '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>';
                            }
                        },
                        get prevArrow() {
                            if ((window.layout_style == 'layout_style_1170') || (window.layout_style == 'layout_style_flower')) {
                                return this.prevArrow = '<button type="button" class="slick-prev"><svg viewBox="0 0 50 50"><path d="M 11.957031 13.988281 C 11.699219 14.003906 11.457031 14.117188 11.28125 14.308594 L 1.015625 25 L 11.28125 35.691406 C 11.527344 35.953125 11.894531 36.0625 12.242188 35.976563 C 12.589844 35.890625 12.867188 35.625 12.964844 35.28125 C 13.066406 34.933594 12.972656 34.5625 12.71875 34.308594 L 4.746094 26 L 48 26 C 48.359375 26.003906 48.695313 25.816406 48.878906 25.503906 C 49.058594 25.191406 49.058594 24.808594 48.878906 24.496094 C 48.695313 24.183594 48.359375 23.996094 48 24 L 4.746094 24 L 12.71875 15.691406 C 13.011719 15.398438 13.09375 14.957031 12.921875 14.582031 C 12.753906 14.203125 12.371094 13.96875 11.957031 13.988281 Z"></path></svg></button>';
                            } else if (window.layout_style == 'layout_style_fullwidth'){
                                return this.nextArrow = '<button type="button" class="slick-prev"><svg viewBox="0 0 370.814 370.814" class="icon icon-chevron-left" id="icon-chevron-left"><g><g><polygon points="292.92,24.848 268.781,0 77.895,185.401 268.781,370.814 292.92,345.961 127.638,185.401"></polygon></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>';
                            } 
                            else {
                                return this.prevArrow = '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>';
                            }
                        },
                        responsive: [
                            {
                                breakpoint: 1400,
                                settings: {
                                    get slidesToShow() {
                                        if(self.hasClass('has-banner')) {
                                            return this.slidesToShow = 3;
                                        }else {
                                            if(gridItemWidth > 5) {
                                                return this.slidesToShow = 5;
                                            }
                                            else {
                                                return this.slidesToShow = productGrid.data('row');
                                            }
                                        }
                                    },
                                    get slidesToScroll() {
                                        if (self.hasClass('has-banner')) {
                                            return this.slidesToScroll = 3;
                                        }else {
                                            if(productGrid.hasClass('verticle')) {
                                                return this.slidesToScroll = 1;
                                            }else {
                                                if(gridItemWidth >= 4) {
                                                    return this.slidesToScroll = 4;
                                                }else if(gridItemWidth = 3) {
                                                    return this.slidesToScroll = 3;
                                                }else {
                                                    return this.slidesToScroll = 2;
                                                }
                                            }
                                        };
                                    }
                                }
                            },
                            {
                                breakpoint: 1200,
                                settings: {
                                    dots: true,
                                    arrows: false,
                                    vertical: false,
                                    get slidesToShow() {
                                        if(self.hasClass('has-banner')) {
                                            return this.slidesToShow = 2;
                                        }else {
                                            if(gridItemWidth >= 4) {
                                                return this.slidesToShow = 4;
                                            }else if(gridItemWidth = 3) {
                                                return this.slidesToShow = 3
                                            }else {
                                                return this.slidesToShow = 2
                                            }
                                        }
                                    },
                                    get slidesToScroll() {
                                        if (self.hasClass('has-banner')) {
                                            return this.slidesToScroll = 2;
                                        }else {
                                            if(gridItemWidth >= 4) {
                                                return this.slidesToScroll = 4;
                                            }else if(gridItemWidth = 3) {
                                                return this.slidesToScroll = 3
                                            }else {
                                                return this.slidesToScroll = 2
                                            }
                                        };
                                    }
                                }
                            },
                            {
                                breakpoint: 992,
                                settings: {
                                    dots: true,
                                    arrows: false,
                                    vertical: false,
                                    get slidesToShow() {
                                        if(gridItemWidth >= 3) {
                                            return this.slidesToShow = 3;
                                        }else {
                                            return this.slidesToShow = 2
                                        }
                                    },
                                    get slidesToScroll() {
                                        if(gridItemWidth >= 3) {
                                            return this.slidesToScroll = 3;
                                        }else {
                                            return this.slidesToScroll = 2
                                        }
                                    }
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    arrows: false,
                                    vertical: false,
                                    dots: true
                                }
                            }
                        ]
                    });
                };
            });
        }
	}
	halo.initSliderFeaturedProducts();
})(jQuery);
