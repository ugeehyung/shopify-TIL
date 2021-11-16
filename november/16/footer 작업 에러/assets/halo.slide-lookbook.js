(function ($) {
	var halo = {
	    initSlideshow: function () {
            var slickSlideshow = $('[data-init-slideshow]');

            if (slickSlideshow.length) {
                slickSlideshow.each(function () {
                    var self = $(this),
                        auto_playvideo = self.data('auto-video');

                    if(auto_playvideo) {
                        // POST commands to YouTube or Vimeo API
                        function postMessageToPlayer(player, command) {
                            if (player == null || command == null) return;
                            player.contentWindow.postMessage(JSON.stringify(command), "*");
                        }

                        // When the slide is changing
                        function playPauseVideo(slick, control) {
                            var currentSlide, player, video;

                            currentSlide = slick.find('.slick-current .item ');
                            player = currentSlide.find("iframe").get(0);

                            if (currentSlide.hasClass('slide-youtube')) {
               
                               var id = currentSlide.find('iframe').attr('id');
                               var video_id = currentSlide.find('iframe').data('video-id');
                               if (control === "play"){
                                    postMessageToPlayer(player, {
                                     "event": "command",
                                     "func": "playVideo"
                                   });
                                  self.slick('slickPause');
                                   $(player).on('ended', function() {
                                     self.slick('slickPlay');
                                     self.slick('next');
                                   });
                                }
                               else {
                                  postMessageToPlayer(player, {
                                     "event": "command",
                                     "func": "pauseVideo"
                                   });
                               }
                               
                               
                               var player1;
                               function onPlayerReady(event) {
                                 event.target.playVideo();
                               }

                                // when video ends
                               function onPlayerStateChange(event) { 
                                 if(event.data === 0) {            
                                   self.slick('slickPlay');
                                   self.slick('next');
                                 }
                               }
                               function onYouTubePlayerAPIReady() {
                                    player1 = new YT.Player(id, {
                                      videoId: video_id,
                                      events: {
                                        'onReady': onPlayerReady,
                                        'onStateChange': onPlayerStateChange
                                      }
                                    });
                               }
                               
                               onYouTubePlayerAPIReady();

                            } else if (currentSlide.hasClass('slide-video')) {
                               video = currentSlide.find("video").get(0);

                               if (video != null) {
                                 if (control === "play"){
                                   video.play();

                                   self.slick('slickPause');
                                   $(video).on('ended', function() {
                                     self.slick('slickPlay');
                                     self.slick('next');
                                   });

                                 } else {
                                   video.pause();
                                 }
                               }
                            };
                        };

                        self.on('init', function(slick) {
                            slick = $(slick.currentTarget);

                            setTimeout(function(){
                                playPauseVideo(slick,"play");
                            }, 1000);
                        });

                        self.on("beforeChange", function(event, slick) {
                            slick = $(slick.$slider);
                            playPauseVideo(slick,"pause");

                            self.on("mouseenter focus", function (event, slick) {
                                $('.home-slideshow .slideshow').addClass('over_hover');
                            });
                        });

                        self.on("afterChange", function(event, slick) {
                            $('.item.slick-slide:not(.slick-current) .fluid-width-video-wrapper .video').css('display', 'none');
                            $('.slick-current .fluid-width-video-wrapper .video').css('display', 'block');
                            slick = $(slick.$slider);
                            playPauseVideo(slick,"play");
                            if( $("video").prop('muted') ) {
                                $("video").prop('muted', true);
                            } else {
                                $("video").prop('muted', true);
                            }
                        });
                    };

                    if (self.not('.slick-initialized')) {
                        self.slick({
                            dots: self.data('dots'),
                            slidesToScroll: 1,
                            verticalSwiping: false,
                            fade: self.data('fade'),
                            cssEase: "ease",
                            adaptiveHeight: true,
                            autoplay: self.data('autoplay'),
                            autoplaySpeed: self.data('autoplay-speed'),
                            arrows: self.data('arrows'),
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
                            responsive: [{
                                breakpoint: 1280,
                                settings: {
                                    arrows: false,
                                    dots: self.data('dots'),
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    arrows: false,
                                    dots: true
                                }
                            }
                            ]
                        });
                    };
                });
            };
        }
	}
	halo.initSlideshow();
})(jQuery);
