(function ($) {
  var halo = {
    initSlideshow: function () {
        var auto;
        function setAutoslide(action, autoplaySpeed, check_auto) {
          if (check_auto) {
            auto = setInterval(function(){
              action.find('.slick-next').trigger('click');
            },autoplaySpeed);
          } else {
            clearInterval(auto);
          }
        }

        var slickSlideshow = $('.home-slideshow:not(.hasvideo) [data-init-slideshow]');
        if (slickSlideshow.length) {
          var action = $('.slide-action');
          var w_slider = $('.init-slider').outerWidth();
          slickSlideshow.each(function() {
            var _self = $(this),
                dot = _self.data('dots'),
                arrow = _self.data('arrows'),
                autoplay = _self.data('autoplay'),
                autoplaySpeed = _self.data('autoplay-speed'),
                fade = _self.data('fade'),
                auto_playvideo = _self.data('auto-video'),
                hasVideo = _self.find('.item-video').length;

            var h_slider = _self.find('.item.slide-active').outerHeight();
            _self.addClass('active');

            var item_length = _self.find('.item').length;
            var width = w_slider * item_length;
            $(this).css('width', width);
            $(this).find('.item').css('width', w_slider);

            if (fade == true) {
              _self.css({
                  'height': h_slider
              });
              _self.parents('.init-slider').find('.item').each(function(index){
                $(this).css({
                  'transition': 'opacity 500ms ease 0s',
                  'position': 'absolute',
                  'top': '0px',
                  'left': '-' + w_slider * index + 'px'
                })
              })
            } else {
              _self.parents('.init-slider').find('[data-init-slideshow]').css('transform','translate3d(-' + w_slider * (_self.find('.item.slide-active').data('index') - 1) + 'px, 0, 0)');
            }
            if (autoplay) {
              auto = setInterval(function(){
                action.find('.slick-next').trigger('click');
              },autoplaySpeed);
            }
          });
          $('body').off('click.arrows', '.slide-action .slick-arrow').on('click.arrows', '.slide-action .slick-arrow', function (e){
            var _parent = $(this).parents('[data-loader-script]');
            var active = _parent.find('.slide-active');
            var index = active.data('index');
            var last_index = $(this).data('last-index');
            var fade = _parent.find('[data-init-slideshow]').data('fade');
            var autoplaySpeed = _parent.find('[data-init-slideshow]').data('autoplay-speed');
            var autoplay = _parent.find('[data-init-slideshow]').data('autoplay');
            var auto_playvideo = _parent.find('[data-init-slideshow]').data('auto-video');
            if ($(this).hasClass('slick-prev')) {
              if (index > 1) {
                active.removeClass('slide-active');
                active.prev().addClass('slide-active');
                if (fade == false) {
                  active.parents('.init-slider').find('[data-init-slideshow]').css('transform','translate3d(-' + w_slider * (index - 2) + 'px, 0, 0)');
                } else {
                  _parent.find('.slide-active').css('left','0');
                }
                
              } else {
                active.removeClass('slide-active');
                _parent.find('[data-index="' + last_index + '"]').addClass('slide-active');
                if (fade == false) {
                  active.parents('.init-slider').find('[data-init-slideshow]').css('transform','translate3d(-' + w_slider * (last_index - 1) + 'px, 0, 0)');
                } else {
                  _parent.find('.slide-active').css('left','0');
                }
              }
            } else {
              if (index < last_index) {
                active.removeClass('slide-active');
                active.next().addClass('slide-active');
                if (fade == false) {
                  active.parents('.init-slider').find('[data-init-slideshow]').css('transform','translate3d(-' + w_slider * index + 'px, 0, 0)');
                } else {
                  _parent.find('.slide-active').css('left','0');
                }
                
              } else {
                active.removeClass('slide-active');
                _parent.find('[data-index="1"]').addClass('slide-active');
                if (fade == false) {
                  active.parents('.init-slider').find('[data-init-slideshow]').css('transform','translate3d(0, 0, 0)');
                } else {
                  _parent.find('.slide-active').css('left','0');
                }
              }
            }
            var newActive = _parent.find('.slide-active').data('index');
            _parent.find('li[data-dot-index="' + newActive + '"]').addClass('slick-active').siblings().removeClass('slick-active');
            
            if (autoplay) {
              setAutoslide(action, autoplaySpeed, false);
              setAutoslide(action, autoplaySpeed, true);
            }
          });

          $('body').off('click.dots', '.slide-action li').on('click.dots', '.slide-action li', function (e){
            var _parent = $(this).parents('[data-loader-script]');
            var active = _parent.find('.slide-active');
            var index = $(this).data('dot-index');
            var fade = _parent.find('[data-init-slideshow]').data('fade');
            var autoplaySpeed = _parent.find('[data-init-slideshow]').data('autoplay-speed');
            var autoplay = _parent.find('[data-init-slideshow]').data('autoplay');
            var auto_playvideo = _parent.find('[data-init-slideshow]').data('auto-video');
            if ($(this).hasClass('slick-active')) {
              return;
            } else {
              $(this).addClass('slick-active').siblings().removeClass('slick-active');
              _parent.find('.item[data-index="' + index + '"]').addClass('slide-active').siblings().removeClass('slide-active');
              if (fade == false) {
                active.parents('.init-slider').find('[data-init-slideshow]').css('transform','translate3d(-' + w_slider * (index - 1) + 'px, 0, 0)');
              }else {
                _parent.find('.slide-active').css('left','0');
              }
            }
            if (autoplay) {
              setAutoslide(action, autoplaySpeed, false);
              setAutoslide(action, autoplaySpeed, true);
            }
          });
          var left = 0,
              right = 0;
          var swipe = {
              threshold: 100,
              offset: 0
          };
          if (window.innerWidth > 1200) {
            slickSlideshow.find('.item').on('pointerdown', function (e) {
                e.preventDefault();
                e.stopPropagation();
                swipe.offset = e.originalEvent.clientX;
            });
            slickSlideshow.find('.item').on('pointerup', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var check = false;
                var url = $(e.currentTarget).find('a').data('href');
                right = e.originalEvent.clientX;
                const tapped = swipe.offset === right;
                const reachedThreshold = 
                      Math.abs(right - swipe.offset) >= swipe.threshold;
                if (tapped || !reachedThreshold) {
                  window.oncontextmenu = function (){
                      check = true;
                  };
                  window.setTimeout(function(){
                    if (check == false && url != undefined) {
                      window.location.href = url;
                    }
                  },300);
                  return;
                } else {
                  if (right < swipe.offset) $(e.currentTarget).parents('.init-slider').find('.slick-next').trigger('click');
                  else $(e.currentTarget).parents('.init-slider').find('.slick-prev').trigger('click');
                }
            });
          } else {
            slickSlideshow.find('.item').on('touchstart', function (e) {
              swipe.offset = e.originalEvent.changedTouches[0].clientX;
            });
            slickSlideshow.find('.item').on('touchend', function (e) {
              var check = false;
              var url = $(e.currentTarget).find('a').data('href');
              right = e.originalEvent.changedTouches[0].clientX;
              const tapped = swipe.offset === right;
              const reachedThreshold = 
                    Math.abs(right - swipe.offset) >= swipe.threshold;
              if (tapped || !reachedThreshold) {
                window.oncontextmenu = function (){
                    check = true;
                };
                window.setTimeout(function(){
                  if (check == false && url != undefined) {
                    window.location.href = url;
                  }
                },300);
                return;
              } else {
                if (right < swipe.offset) $(e.currentTarget).parents('.init-slider').find('.slick-next').trigger('click');
                else $(e.currentTarget).parents('.init-slider').find('.slick-prev').trigger('click');
              }
            });
          }
        }
    }
  }
  halo.initSlideshow();
  $(window).resize(function(){
    var slickSlideshow = $('.home-slideshow:not(.hasvideo) [data-init-slideshow]');
    if (slickSlideshow.length) {
      var w_slider = $('.init-slider').outerWidth();
      slickSlideshow.each(function() {
        var _self = $(this),
            fade = _self.data('fade');

        var h_slider = _self.find('.item.slide-active').outerHeight();
        _self.addClass('active');

        var item_length = _self.find('.item').length;
        var width = w_slider * item_length;
        $(this).css('width', width);
        $(this).find('.item').css('width', w_slider);

        if (fade == true) {
          _self.css({
              'height': h_slider
          });
          _self.parents('.init-slider').find('.item').each(function(index){
            $(this).css({
              'transition': 'opacity 500ms ease 0s',
              'position': 'absolute',
              'top': '0px',
              'left': '-' + w_slider * index + 'px'
            })
          })
        } else {
          _self.parents('.init-slider').find('[data-init-slideshow]').css('transform','translate3d(-' + w_slider * (_self.find('.item.slide-active').data('index') - 1) + 'px, 0, 0)');
        }
      });
    }
  });

})(jQuery);
