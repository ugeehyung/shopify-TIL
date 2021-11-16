(function ($) {
	var halo = {
	    initBrandsSlider2: function() {
	        var brandsSlider = $('[data-brands-slider-style2]');

            brandsSlider.each(function () {
                var self = $(this);

                if (self.not('.slick-initialized')) {
                    self.slick({
                        rows: 2,
                        slidesPerRow: self.data('rows'),
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        speed: 800,
                        arrows: false,
                        responsive: [{
                                breakpoint: 1200,
                                settings: {
                                    slidesPerRow: 1,
                                    slidesToShow: 4,
                                    rows: 2,
                                }
                            },
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesPerRow: 1,
                                    slidesToShow: 3,
                                    rows: 2,
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesPerRow: 1,
                                    slidesToShow: 2,
                                    dots: true,
                                    rows: 2,
                                }
                            }
                        ]
                    });
                }
            });
	    }
	}
	halo.initBrandsSlider2();
})(jQuery);
