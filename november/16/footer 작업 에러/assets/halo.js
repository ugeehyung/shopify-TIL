(function ($) {
    var body = $('body'),
        doc = $(document),
        html = $('html'),
        win = $(window),
        wrapperOverlaySlt = '.wrapper-overlay',
        iconNav,
        dropdownCart,
        miniProductList;
  
    var sidebarCart = $('#sidebar-cart'),
        btnRemove = sidebarCart.find('.btn-remove'),
        sidebarCartNoItems = sidebarCart.find('.cart-empty'),
        sidebarCartHasItems = sidebarCart.find('.mini-products-list'),
        sidebarCartFooter = sidebarCart.find('.cart-footer');

    var wishListsArr = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    var compareArr = localStorage.getItem('compareArr') ? JSON.parse(localStorage.getItem('compareArr')) : [];

    localStorage.setItem('items', JSON.stringify(wishListsArr));
    localStorage.setItem('compareArr', JSON.stringify(compareArr));

    if (wishListsArr.length) {
        wishListsArr = JSON.parse(localStorage.getItem('items'));
    };

    if (compareArr.length) {
        compareArr = JSON.parse(localStorage.getItem('compareArr'));
    };

    doc.ready(function () {
        iconNav = $('[data-menu-mb-toogle]'),
        dropdownCart = $('#dropdown-cart'),
        miniProductList = dropdownCart.find('.mini-products-list');

        doc.ajaxStart(function () {
            ella.isAjaxLoading = true;
        });

        doc.ajaxStop(function () {
            ella.isAjaxLoading = false;
        });

        ella.init();
    });

    var winWidth = win.innerWidth();

    win.off('resize.initMenuMobile').on('resize.initMenuMobile', function() {
        var resizeTimerId;

        clearTimeout(resizeTimerId);

        resizeTimerId = setTimeout(function() {
            var curWinWidth = win.innerWidth();

            if ((curWinWidth < 1200 && winWidth >= 1200) || (curWinWidth >= 1200 && winWidth < 1200)) {
                ella.showHideMenuMobile();
                ella.initToggleMuiltiLangCurrency();
                ella.addTextMuiltiOptionActive($('#lang-switcher'), $('#lang-switcher [data-value].active'), $('[data-language-label]'));
                ella.addTextMuiltiOptionActive($('#currencies'), $('#currencies [data-currency].active'), $('[data-currency-label]'));
                ella.initDropdownColFooter();
                ella.dropdownCart();
                ella.dropdownCustomer();

                ella.stickyFixedTopMenu();
            };
            winWidth = curWinWidth;
        }, 0);
    });

    win.on('resize', function () {
        ella.setActiveViewModeMediaQuery();
    });

    var ella = {
        ellaTimeout: null,
        isSidebarAjaxClick: false,
        isAjaxLoading: false,
        init: function () {
            this.closeHeaderTop();
            this.showHideMenuMobile();
            this.closeAllOnMobile();
            this.initToggleGlobe();
            this.initToggleMuiltiLangCurrency();
            this.addTextMuiltiOptionActive($('#lang-switcher'), $('#lang-switcher [data-value].active'), $('[data-language-label]'));
            this.addTextMuiltiOptionActive($('#currencies'), $('#currencies [data-currency].active'), $('[data-currency-label]'));
            this.initDropdownColFooter();
            this.initScrollTop();
            this.dropdownCart();
            this.initColorSwatchGrid();
            this.initQuickshop();
            this.dropdownCustomer();
            this.initNewsLetterPopup();
            this.addEventShowOptions();
            this.changeQuantityAddToCart();
            this.initAddToCart();
            this.editCart();
            this.beforeYouLeave();
            this.initFreeShippingMessage();
            this._videoPopup();
            // this._addonShareAPI();
            this.initProductReview();
            this.showPopupShare();
            this.copyText();
            this.showPopupStoreAvailability();
            if(!body.hasClass('template-index') && !body.hasClass('template-page')) {
                this.initGroupedAddToCart();
                this.initSliderFeaturedProducts();
            }
            if($('[data-lookbook-icon]').length) {
                this.addEventLookbookModal();
            }

            if($('[data-countdown]').length) {
                this.initCountdown();
            }
            
            this.initCountdownNormal();
            this.checkbox_checkout();
            this.checkbox_submit();
            if(body.hasClass('template-page')) {
                this.collectionProduct();
                this.CollectionMenu();
            }
            if($('[data-menu-tab]').length) {
                this._multiHomepage();
            }else {
                this.menu_ajax();
            }
            this.loaderScript();

            if(body.hasClass('template-index') || body.hasClass('template-page')) {
                this.initInfiniteScrollingHomepage();
                if($('[data-home-product-tabs]').length) {
                    this.clickedActiveProductTabs();
                }
                if($('[data-scroll-down]').length) {
                    this.handleScrollDown();
                }
                this.loaderProductCard();
            }

            if(body.hasClass('template-collection') || body.hasClass('template-search')) {
                this.historyAdapter();
                this.initInfiniteScrolling();
                this.initPaginationPage();
                this.initCompareIcons();
                this.doAddOrRemoveCompare();
                this.initCompareSelected();
            }

            if(body.hasClass('template-collection') || body.hasClass('template-product')) {
                this.loadJsonProductcard();
            }

            if(body.hasClass('template-collection')) {
                this.filterToolbar();
                this.filterSidebar();
                this.toggleVariantsForExpressOrder();
                this.initExpressOrderAddToCart();
                this.hide_filter();
                this.stickySidebar();
                this.initSidebar();
            }
            
            this.initOpenSidebar();
            this.closeSidebar();
            this.initChangeQuantityButtonEvent();
            this.initQuantityInputChangeEvent();
            this.removeCartItem();
            
            this.initQuickView();
            this.stickyFixedTopMenu();
            this.openSearchForm();

            if(body.hasClass('template-product') ) {
                this.initCustomerViewProductShop();
                this.initProductMoreview($('[data-more-view-product] .product-img-box'));
                this.initZoom();
                this.initSoldOutProductShop();
                this.productPageInitProductTabs();
                this.changeSwatch('#add-to-cart-form .swatch :radio');
                this.initStickyForProductFullWidth();
                this.initStickyAddToCart();
                this.wrapTable();
                this._addonCompareColorPopup();
                if($('.frequently-bought-together-block').length > 0){
                    this.initBundleProducts();
                }
                this.productRecomendation();
                this.appendProductRecomendation();
                this.notifyinStock();
                this.initDropdownSubCategoriesAtSidebar();
                if ($('.product-template-slider').length){
                    this._notifySoldoutSlider();
                }
            }

            if( body.hasClass('template-cart') ){
                this.checkBundleProducts();
                this._cartCountDown();
            }
            this.initWishListIcons();
            this.doAddOrRemoveWishlish();

            if(body.hasClass('template-page') && $('.wishlist-page').length) {
                this.initWishLists();
            };
            
            if (win.innerWidth() < 1025) {
               this.initToggleSubMenuMobile();
            }
        },

        showPopupStoreAvailability: function() {
            
            body.off('click.button_store', '.store-availability-information__button').on('click.button_store', '.store-availability-information__button', function (e) {
                body.addClass('show_store_availability');
            });

            body.off('click.close_store', '.store-availabilities-modal__close').on('click.close_store', '.store-availabilities-modal__close', function (e) {
                body.removeClass('show_store_availability');
            });

            body.on('click', function (event) {
                if(($(event.target).closest('.store-availabilities-modal').length === 0) && ($(event.target).closest('.store-availability-information__button').length === 0)){
                    // e.preventDefault();
                    body.removeClass('show_store_availability');
                }
            });
           
        },

        showPopupShare: function() {
            $('.icon-share').click(function() {
                $('.wrapper-social-popup').addClass('active');
            });

            body.on('click', function (event) {
                if(($(event.target).closest('.wrapper-social-popup').length === 0) && ($(event.target).closest('.icon-share').length === 0)){
                    $('.wrapper-social-popup').removeClass('active');
                }
            });

            $('.wrapper-social-popup .title-close svg').on('click', function (event) {
                $('.wrapper-social-popup').removeClass('active');
            });
           
        },

        copyText: function() {
            var check_copy = false;
            body.off('click.copyText', '.social-garment-link').on('click.copyText', '.social-garment-link', function (e) {
                if(check_copy == false) {
                    var copyText = $(this).find('.txt_copy');
                    copyText.select();
                    document.execCommand("Copy");
                    copyText.val('Link copied');
                    check_copy = true;
                }
            });
        },

        notifyinStock: function() {
            $("#soldOut-button").click(function() {
                if ($.cookie('soldOut') != 'closed') {
                    $.cookie('soldOut', 'closed', {expires: 1, path:'/'});
                }
            });
            
            $("#ask_an_expert .actions .btn").click(function() {
                $.cookie('soldOut', '', {expires: -1, path:'/'});
                
            });
        },

        sliderMegaMenu: function(){
          if($('.featuredProductCarousel').length){
            $('.featuredProductCarousel').slick({
                infinite: false,
                slidesToShow: 4,
                slidesToScroll: 4,
                dots: false,
                arrows: true,
                autoplay: false,
                get nextArrow() {
                    if ((window.layout_style == 'layout_style_1170') || (window.layout_style == 'layout_style_flower')) {
                        return this.nextArrow = '<button type="button" class="slick-next"><svg viewBox="0 0 50 50"><path d="M 11.957031 13.988281 C 11.699219 14.003906 11.457031 14.117188 11.28125 14.308594 L 1.015625 25 L 11.28125 35.691406 C 11.527344 35.953125 11.894531 36.0625 12.242188 35.976563 C 12.589844 35.890625 12.867188 35.625 12.964844 35.28125 C 13.066406 34.933594 12.972656 34.5625 12.71875 34.308594 L 4.746094 26 L 48 26 C 48.359375 26.003906 48.695313 25.816406 48.878906 25.503906 C 49.058594 25.191406 49.058594 24.808594 48.878906 24.496094 C 48.695313 24.183594 48.359375 23.996094 48 24 L 4.746094 24 L 12.71875 15.691406 C 13.011719 15.398438 13.09375 14.957031 12.921875 14.582031 C 12.753906 14.203125 12.371094 13.96875 11.957031 13.988281 Z"></path></svg></button>';
                    } else {
                        return this.nextArrow = '<button type="button" class="slick-next"><svg viewBox="0 0 478.448 478.448" class="icon icon-chevron-right" id="icon-chevron-right"><g><g><polygon points="131.659,0 100.494,32.035 313.804,239.232 100.494,446.373 131.65,478.448 377.954,239.232"></polygon></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>';
                    }
                },
                get prevArrow() {
                    if ((window.layout_style == 'layout_style_1170') || (window.layout_style == 'layout_style_flower')) {
                        return this.prevArrow = '<button type="button" class="slick-prev"><svg viewBox="0 0 50 50"><path d="M 11.957031 13.988281 C 11.699219 14.003906 11.457031 14.117188 11.28125 14.308594 L 1.015625 25 L 11.28125 35.691406 C 11.527344 35.953125 11.894531 36.0625 12.242188 35.976563 C 12.589844 35.890625 12.867188 35.625 12.964844 35.28125 C 13.066406 34.933594 12.972656 34.5625 12.71875 34.308594 L 4.746094 26 L 48 26 C 48.359375 26.003906 48.695313 25.816406 48.878906 25.503906 C 49.058594 25.191406 49.058594 24.808594 48.878906 24.496094 C 48.695313 24.183594 48.359375 23.996094 48 24 L 4.746094 24 L 12.71875 15.691406 C 13.011719 15.398438 13.09375 14.957031 12.921875 14.582031 C 12.753906 14.203125 12.371094 13.96875 11.957031 13.988281 Z"></path></svg></button>';
                    } else {
                        return this.prevArrow = '<button type="button" class="slick-prev"><svg viewBox="0 0 370.814 370.814" class="icon icon-chevron-left" id="icon-chevron-left"><g><g><polygon points="292.92,24.848 268.781,0 77.895,185.401 268.781,370.814 292.92,345.961 127.638,185.401"></polygon></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></button>';
                    }
                },
                speed : 1000,
                responsive: [
                   {
                    breakpoint: 1450,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 4,
                      dots: false,
                      arrows: true,
                    }
                  },
                  {
                    breakpoint: 1281,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 4,
                      dots: false,
                      arrows: true,
                    }
                  },
                  {
                    breakpoint: 1025,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      dots: true,
                      arrows: false,
                    }
                  },
                  {
                    breakpoint: 992,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      dots: true,
                      arrows: false,
                    }
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      dots: true,
                      arrows: false,
                    }
                  },
                  {
                    breakpoint: 370,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      dots: true,
                      arrows: false,
                    }
                  }
                ]
            });      
          }  
        },

        productCartslider: function(){
          if($('[data-product-cart-slider]').length && !$('[data-product-cart-slider]').hasClass('slick-slider')){
            $('[data-product-cart-slider]').slick({
                infinite: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                get arrows() {
                    if (window.layout_style == 'layout_style_fullwidth') {
                        return this.arrows = true
        
                    } else {
                        return this.arrows = false
                    }
                },
                get dots() {
                    if (window.layout_style == 'layout_style_fullwidth') {
                        return this.dots = false
        
                    } else {
                        return this.dots = true
                    }
                },
                autoplay: false,
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
                speed : 1000,
            });      
          }  
        },

        closeHeaderTop: function () {
            var headerTopEml = $('.header-top'),
                closeHeaderTopElm = headerTopEml.find('[data-close-header-top]');

            // if (closeHeaderTopElm.length && closeHeaderTopElm.is(':visible')) {
                if ($.cookie('headerTop') == 'closed') {
                    headerTopEml.remove();
                } else {
                    headerTopEml.removeClass('hide');
                };

                closeHeaderTopElm.off('click.closeHeaderTop').on('click.closeHeaderTop', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    headerTopEml.remove();
                    $.cookie('headerTop', 'closed', {
                        expires: 1,
                        path: '/'
                    });
                });
            // };
        },

        showHideMenuMobile: function () {
            if (iconNav.length && iconNav.is(':visible')) {
                iconNav.off('click.showMenuMobile').on('click.showMenuMobile', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    html.toggleClass('translate-overlay');
                    $('.close-menu-mb').toggleClass('menu-open');

                    $('.main-menu.jas-mb-style').css({
                        "overflow": ""
                    });
                    $('.site-nav').find('[data-toggle-menu-mb]').parent().next('.sub-menu-mobile').removeClass('sub-menu-open');
                })
            };
        },

        closeAllOnMobile: function () {
            body.off('click.close', wrapperOverlaySlt).on('click.close', wrapperOverlaySlt, function (e) {
                e.preventDefault();
                e.stopPropagation();

                html.removeClass('translate-overlay cart-show customer-show sidebar-open options-show');
                $('.close-menu-mb').removeClass('menu-open');
                body.removeClass('show_store_availability');

                $('.main-menu.jas-mb-style').css({
                    "overflow": ""
                });
                $('.site-nav').find('[data-toggle-menu-mb]').parent().next('.sub-menu-mobile').removeClass('sub-menu-open');

                if ($('body').hasClass('open_beforeYouLeave') && 
                    ($(e.target).closest('#before-you-leave').length === 0)  && 
                    ($(e.target).closest('.search-form-wrapper').length === 0) ) {
                    $('body').removeClass('open_beforeYouLeave');
                }
            });
        },

        initToggleGlobe: function () {
            var $item_globe = $('.wrapper-icon');
            $item_globe.on('click', function (e) {
               
                $(this).parent().toggleClass('active');

                $('.lang-currency-groups').slideUp(400);

                if($('.item-location').hasClass('active')){
                    $('.lang-currency-groups').slideDown(400);
                }
                ella.initToggleMuiltiLangCurrency();
              
            });

            body.on('click', function (e) {
                if(($('.item-location').hasClass('active')) && ($(event.target).closest('.item-location').length === 0)){
                    e.preventDefault();
                    $('.item-location').removeClass('active');
                    $('.lang-currency-groups').slideUp(400);
                }
            });

        },

        initToggleMuiltiLangCurrency: function () {
            var langCurrencyGroups = $('.lang-currency-groups'),
                dropdownGroup = langCurrencyGroups.find('.btn-group'),
                dropdownLabel = dropdownGroup.find('.dropdown-label');

            if (dropdownLabel.length && dropdownLabel.is(':visible')) {
                dropdownLabel.off('click.toggleMuiltiOption').on('click.toggleMuiltiOption', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var selfNextDropdown = $(this).next();

                    if (!selfNextDropdown.is(':visible')) {
                        dropdownLabel.next('.dropdown-menu').hide();
                        selfNextDropdown.slideDown(300);
                    } else {
                        selfNextDropdown.slideUp(300);
                    }
                });

                ella.hideMuiltiLangCurrency();
            } else {
                dropdownLabel.next('.dropdown-menu').css({
                    'display': ''
                });
            };
        },

        hideMuiltiLangCurrency: function () {
            doc.off('click.hideMuiltiLangCurrency').on('click.hideMuiltiLangCurrency', function (e) {
                var muiltiDropdown = $('.lang-currency-groups .dropdown-menu');

                if (!muiltiDropdown.is(e.target) && !muiltiDropdown.has(e.target).length) {
                    muiltiDropdown.slideUp(300);
                }
            });
        },

        addTextMuiltiOptionActive: function (SltId, dataSlt, label) {
            if (label.length && label.is(':visible')) {
                var item = dataSlt.html();

                SltId.prev(label).html(item);
            };
        },

        initInfiniteScrollingHomepage: function () {
          var newArrivalsProduct = $('[data-new-arrivals-product]');

          newArrivalsProduct.each(function () {
            var self = $(this);
            var infiniteScrolling = self.find('.infinite-scrolling-homepage');
            var infiniteScrollingLinkSlt = self.find('.infinite-scrolling-homepage a');
            

            if (infiniteScrolling.length) {
              infiniteScrollingLinkSlt.off('click.showMoreProduct').on('click.showMoreProduct', function (e) {
                if (!$(this).hasClass('view-all-collection')) {
                    e.preventDefault();
                    e.stopPropagation();
                    if($(this).hasClass('ajax-loading') )
                      return false;
                    $(this).addClass('ajax-loading');
                    var url = $(this).attr('data-collection'),
                        limit = $(this).attr('data-limit'),
                        totalProduct = $(this).attr('data-total-products'),
                        page = parseInt($(this).attr('data-page'));

                    if (!$(this).hasClass('disabled')) {
                      ella.doAjaxInfiniteScrollingGetContentSection(totalProduct,url,limit,page,e,self);
                    };
                }
              });
            }
          });
          
        },
      
        doAjaxInfiniteScrollingGetContentSection(totalProduct,url,limit,page,e,self) {
          $.ajax({
            type: "get",
            url: window.router + '/collections/' + url,
            cache: false,
            data: {
              view: 'sorting',
              constraint: 'limit=' + limit + '+page=' + page
            },

            beforeSend: function () {
              ella.showLoading();
            },
            success: function (data) {
              
                self.find('.products-grid').append(data);
                var length = self.find('.products-grid').find('.grid-item').length;
                if( $(data).length == limit && length < 50){
                    $(e.currentTarget).attr('data-page', page + 1);
                }
                else{
                    if (totalProduct > 50) {
                        $(e.currentTarget).text(window.inventory_text.view_all_collection).attr('href',window.router + '/collections/' + url).addClass('view-all-collection');
                    } else {
                        $(e.currentTarget).remove();
                    }
                }
              
                if (ella.checkNeedToConvertCurrency()) {
                    Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
                };
                if ($('.shopify-product-reviews-badge').length && $('.spr-badge').length) {
                    return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                };

            },
            complete: function () {
              ella.hideLoading();
              $(e.currentTarget).removeClass('ajax-loading');
            }
          });
        },

        initSliderFeaturedProducts: function () {
            var featuredProduct = $('[data-featured-products]');

            featuredProduct.each(function () {
                var self = $(this),
                    productGrid = self.find('.products-grid'),
                    gridItemWidth = productGrid.data('row'),
                    hasRightSidebar = $('.halo-product-content .pro-page [data-has-right-sidebar]');

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
                            if(productGrid.hasClass('verticle') && $('.relate-verticle').length) {
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
                                                return this.slidesToShow = 2;
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
        },

        loaderProductCard: function () {
            var isAjaxLoading = false;
            $(document).ajaxStart(function () {
                isAjaxLoading = true;
            });

            $(document).ajaxStop(function () {
                isAjaxLoading = false;
            });
            var element = $('[data-loader-product]');
            var load = function(){
                element.each(function(){
                    var top = this.getBoundingClientRect().top;
                    var self = $(this);
                    if (!self.hasClass('ajax-loaded')) {
                        var url = self.data('collection'),
                            limit = self.data('limit'),
                            grid = self.data('grid'),
                            layout = self.data('layout'),
                            sectionId = self.attr('sectionId');
                        if (top < window.innerHeight && top < 400) {
                            $.ajax({
                                type: "get",
                                url: window.router + '/collections/' + url,
                                cache: false,
                                data: {
                                    view: 'list_product',
                                    constraint: 'limit=' + limit + '+layout=' + layout + '+grid=' + grid + '+sectionId=' + sectionId
                                },
                                beforeSend: function () {
                                    self.addClass('ajax-loaded');
                                },
                                success: function (data) {
                                    if (url != '') {
                                        self.find('.products-grid').html(data);
                                    }
                                    $('[data-toggle="tooltip"]').tooltip();
                                },
                                complete: function () {
                                    if (self.attr('data-featured-products') == undefined) {
                                        return;
                                    }
                                    if (layout == 'carousel') {
                                        var productGrid = self.find('.products-grid'),
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
                                                                    if(self.hasClass('layout_style_4')) {
                                                                        return this.slidesToShow = 2;
                                                                    } else {
                                                                        return this.slidesToShow = 3;
                                                                    }
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
                                                                    if(self.hasClass('layout_style_5')) {
                                                                        return this.slidesToShow = 2;
                                                                    } else {
                                                                        return this.slidesToShow = 3;
                                                                    }
                                                                }else {
                                                                    return this.slidesToShow = 2
                                                                }
                                                            },
                                                            get slidesToScroll() {
                                                                if(gridItemWidth >= 3) {
                                                                    if(self.hasClass('layout_style_5')) {
                                                                        return this.slidesToScroll = 2;
                                                                    } else {
                                                                        return this.slidesToScroll = 3;
                                                                    }
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
                                    }

                                    if (ella.checkNeedToConvertCurrency()) {
                                        Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
                                    };
                                    if ($('.shopify-product-reviews-badge').length && $('.spr-badge').length) {
                                        return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                                    };
                                }
                            });
                        }
                    }
                })
            }
            window.addEventListener('load', function loaderPostload() {
                load();
                window.addEventListener('scroll', load);
            });
        },

        collectionProduct: function() {
            var collectionSlider = $('[data-collection-product] .products-grid');

            collectionSlider.each(function () {
                var self = $(this);

                if (self.not('.slick-initialized')) {
                    self.slick({
                        rows: 2,
                        slidesToShow: 2,
                        infinite: false,
                        dots: true,
                        speed: 800,
                        arrows: false,
                        responsive: [{
                                breakpoint: 1200,
                                settings: {
                                    slidesPerRow: 1,
                                    slidesToShow: 2,
                                    rows: 2,
                                }
                            },
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesPerRow: 1,
                                    slidesToShow: 2,
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
        },

        CollectionMenu: function() {
            var brandsSlider = $('[data-collection-menu-slider]');

            brandsSlider.each(function () {
                var self = $(this);

                if (self.not('.slick-initialized')) {
                    self.slick({
                        slidesToShow: self.data('rows'),
                        slidesToScroll: 1,
                        dots: false,
                        infinite: false,
                        speed: 800,
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
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 6,
                                    slidesToScroll: 6,
                                }
                            },
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 5,
                                    slidesToScroll: 5,
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4,
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                }
                            }
                        ]
                    });
                }
            });
        },

        initDropdownColFooter: function () {
            var footerTitle = $('.site-footer .dropdow-mb');

            if (window.innerWidth < 768) {
                if (footerTitle.length) {
                    footerTitle.off('click.slideToggle').on('click.slideToggle', function () {
                        $(this).next().slideToggle();
                        $(this).toggleClass('open');
                    });
                }
            } else {
                footerTitle.next().css({
                    "display": ""
                });
            }
        },

        initScrollTop: function () {
            var backToTop = $('#back-top');

            win.scroll(function () {
                if ($(this).scrollTop() > 220) {
                    backToTop.fadeIn(400);
                } else {
                    backToTop.fadeOut(400);
                };
            });

            backToTop.off('click.scrollTop').on('click.scrollTop', function (e) {
                e.preventDefault();
                e.stopPropagation();

                $('html, body').animate({
                    scrollTop: 0
                }, 400);
                return false;
            });
        },

        dropdownCustomer: function () {
            this.initDropdownCustomerTranslate($('[data-user-mobile-toggle]'), 'customer-show');
            this.initDropdownCustomerTranslate($('.header-05 .customer-links'), 'customer-show');

            if (window.innerWidth >= 1200) {
                this.initDropdownCustomerTranslate($('[data-user-pc-translate]'), 'customer-show');
            };

            this.closeDropdownCustomerTranslate();
            this.initDropdownCustomer();
        },

        initDropdownCustomerTranslate: function (iconUser, sltShowUser) {
            if (iconUser.length && iconUser.is(':visible')) {
                iconUser.off('click.dropdownCustomerMobile').on('click.dropdownCustomerMobile', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    html.addClass(sltShowUser);
                });
            };
        },

        closeTranslate: function (closeElm, classRemove) {
            if ($(closeElm).length) {
                body.off('click.closeCustomer', closeElm).on('click.closeCustomer', closeElm, function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    html.removeClass(classRemove);
                });
            };
        },

        closeDropdownCustomerTranslate: function () {
            ella.closeTranslate('#dropdown-customer .close-customer', 'customer-show');
        },

        appendCustomerForPCHeaderDefault: function () {
            var customerLink = $('.header-default .header-panel-bt .customer-links'),
                dropdowCustomer = $('#dropdown-customer');

            if (window.innerWidth >= 1200) {
                dropdowCustomer.appendTo(customerLink);
            } else {
                dropdowCustomer.appendTo(body);
            }
        },

        appendCustomerForPCHeader05: function () {
            var customerLink = $('.header-05 .header-panel-bt .customer-links'),
                dropdowCustomer = $('#dropdown-customer');
            dropdowCustomer.appendTo(body);
        },

        appendCustomerForPCHeader07: function () {
            var customerLink = $('.header-07 .header-panel-bt .customer-links'),
                dropdowCustomer = $('#dropdown-customer');
            dropdowCustomer.appendTo(body);
        },

        doDropdownCustomerPCHeaderDefault: function () {
            var customerLoginLink = $('[data-dropdown-user]');

            if(window.innerWidth >= 1200) {
                customerLoginLink.off('click.toogleCustomer').on('click.toogleCustomer', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    $(this).siblings('#dropdown-customer').slideToggle();
                });

            }
        },

        doDropdownCustomerPCHeader05: function () {
            var customerLoginLink = $('[data-dropdown-user]');

            customerLoginLink.off('click.toogleCustomer').on('click.toogleCustomer', function (e) {
                e.preventDefault();
                e.stopPropagation();

                $(this).siblings('#dropdown-customer').slideToggle();
            });
        },

        doDropdownCustomerPCHeader07: function () {
            var customerLoginLink = $('[data-dropdown-user]');

            customerLoginLink.off('click.toogleCustomer').on('click.toogleCustomer', function (e) {
                e.preventDefault();
                e.stopPropagation();

                $(this).siblings('#dropdown-customer').slideToggle();
            });
        },

        initDropdownCustomer: function () {
            var siteHeader = $('.site-header');

            if (siteHeader.hasClass('header-default')) {
                this.appendCustomerForPCHeaderDefault();
                this.doDropdownCustomerPCHeaderDefault();
            }
            if (siteHeader.hasClass('header-05')) {
                this.appendCustomerForPCHeader05();
                this.doDropdownCustomerPCHeader05();
            }
            if (siteHeader.hasClass('header-07')) {
                this.appendCustomerForPCHeader07();
                this.doDropdownCustomerPCHeader07();
            }

        },

        dropdownCart: function () {
            this.closeDropdownCartTranslate();
            this.initDropdownCartMobile();
            this.initDropdownCartDesktop();
            this.checkItemsInDropdownCart();
            this.removeItemDropdownCart();
        },

        appendDropdownCartForMobile: function () {
            var wrapperTopCart = $('.wrapper-top-cart');

            if (window.innerWidth < 1200) {
                dropdownCart.appendTo(body);
            } else {
                dropdownCart.appendTo(wrapperTopCart);
            }
        },

        closeDropdownCartTranslate: function () {
            ella.closeTranslate('#dropdown-cart .close-cart', 'cart-show', '#reload_page');
        },

        initDropdownCartMobile: function () {
            var headerMb = $('.header-mb, [data-cart-header-parallax], [data-cart-header-02], [data-cart-header-04], [data-cart-header-05], [data-cart-header-supermarket], [data-cart-sidebar]'),
                cartIcon = headerMb.find('[data-cart-toggle]');

                if ($('body.template-cart').length) {
                    cartIcon.off('click.toogleDropdownCart').on('click.toogleDropdownCart', function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        $([document.documentElement, document.body]).animate({
                            scrollTop: $(".wrapper-cart-template").offset().top - $('.main-menu').outerHeight()
                        }, 500);
                    });
                } else {
                    cartIcon.off('click.initDropdownCartMobile').on('click.initDropdownCartMobile', function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        html.toggleClass('cart-show');

                        ella.productCartslider();
                    });
                }
        },

        initDropdownCartDesktop: function () {
            var siteHeader = $('.site-header');

            if (siteHeader.hasClass('header-default-cart')) {
                ella.appendDropdownCartForMobile();
                ella.initDropdownCartForHeaderDefault();
            }
        },

        addEventShowOptions: function() {
            var optionsIconSlt = '[data-show-options]';

            doc.off('click.showOptions', optionsIconSlt).on('click.showOptions', optionsIconSlt, function(e) {
                e.preventDefault();
                e.stopPropagation();

                html.toggleClass('options-show');
            });

            ella.closeTranslate('.lang-currency-groups .close-option', 'options-show');
        },

        initDropdownCartForHeaderDefault: function () {
            var wrapperTopCart = $('.wrapper-top-cart'),
                cartIcon = wrapperTopCart.find('[data-cart-toggle]');

            if (cartIcon.length && cartIcon.is(':visible')) {
                if ($('body.template-cart').length) {
                    
                    cartIcon.off('click.toogleDropdownCart').on('click.toogleDropdownCart', function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        $([document.documentElement, document.body]).animate({
                            scrollTop: $(".wrapper-cart-template").offset().top - $('.main-menu').outerHeight()
                        }, 1000);
                    });
                } else {
                    if (window.dropdowncart_type == 'click') {
                        cartIcon.off('click.toogleDropdownCart').on('click.toogleDropdownCart', function (e) {
                            e.preventDefault();
                            e.stopPropagation();

                            wrapperTopCart.toggleClass('is-open');
                            dropdownCart.slideToggle();
                        });
                    } else {
                        cartIcon.hover(function () {
                            var customer = $('#dropdown-customer');

                            if (customer.is(':visible')) {
                                customer.hide();
                            };

                            if (!wrapperTopCart.hasClass('is-open')) {
                                wrapperTopCart.addClass('is-open');
                                dropdownCart.slideDown();
                            }
                        });

                        wrapperTopCart.mouseleave(function () {
                            if (wrapperTopCart.hasClass('is-open')) {
                                wrapperTopCart.removeClass('is-open');
                                dropdownCart.slideUp();
                            };
                        });
                    }
                }
                
            } else {
                dropdownCart.css("display", "");
            }
        },

        checkItemsInDropdownCart: function () {
            var cartNoItems = dropdownCart.find('.no-items'),
                cartHasItems = dropdownCart.find('.has-items');
          
            

            if (miniProductList.children().length) {
                cartHasItems.show();
                cartNoItems.hide();
              
                sidebarCartNoItems.hide();
                sidebarCartHasItems.show();
                sidebarCartFooter.show();
            } else {
                cartHasItems.hide();
                cartNoItems.show();
              
                sidebarCartNoItems.show();
                sidebarCartHasItems.hide();
                sidebarCartFooter.hide();
            };
        },

        removeItemDropdownCart: function (cart) {
            var btnRemove = dropdownCart.find('.btn-remove');
            var btnUpdate = dropdownCart.find('.item-quantity');

            btnRemove.off('click.removeCartItem').on('click.removeCartItem', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var productId = $(this).parents('.item').attr('id');
                productId = productId.match(/\d+/g);

                Shopify.removeItem(productId, function (cart) {
                    $("#cart-item-"+productId).remove();
                    $("#sidebar-cart-item-"+productId).remove();
                    ella.doUpdateDropdownCart(cart);
                    ella.checkBundleProducts();
                });
            });
            btnUpdate.off('change.addCartItem').on('change.addCartItem', function (e) {
                e.preventDefault();
                e.stopPropagation();
                var btn = $(this);
                var id = btn.closest("[data-product-id]").data("product-id");
                var quantity = parseInt(btn.val());
                $(this).parents('.item').addClass('cur--change');
                ella.doAjaxUpdatePopupCart(quantity, id);
            });
        },

        updateDropdownCart: function () {
            Shopify.getCart(function (cart) {
                ella.doUpdateDropdownCart(cart);
            });
        },

        doUpdateDropdownCart: function (cart) {
            var template = '<li class="item" id="cart-item-{ID}" data-product-id="{ID}"><a href="{URL}" class="product-image"><img src="{IMAGE}" alt="{TITLE}"></a><div class="product-details"><a class="product-name" href="{URL}">{TITLE}</a><div class="option"><small>{VARIANT}</small><a href="JavaScript:void(0);" class="product-details__edit" data-cart-edit aria-label="link" data-url="{URL}&view=cart_edit" data-id="{ID}" data-quantity="{QUANTITY}"><svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 48 48" width="144px" height="144px"><path d="M 10.5 6 C 7.468 6 5 8.468 5 11.5 L 5 36 C 5 39.309 7.691 42 11 42 L 22.605469 42 C 22.858469 41.042 23.225516 39.759 23.728516 38 L 11 38 C 9.897 38 9 37.103 9 36 L 9 16 L 39 16 L 39 22.521484 C 39.427 22.340484 39.8615 22.188422 40.3125 22.107422 C 40.7065 22.036422 41.102859 21.992953 41.505859 22.001953 C 42.015859 22.001953 42.515 22.067641 43 22.181641 L 43 11.5 C 43 8.468 40.532 6 37.5 6 L 10.5 6 z M 13.5 20 A 1.50015 1.50015 0 1 0 13.5 23 L 15.5 23 A 1.50015 1.50015 0 1 0 15.5 20 L 13.5 20 z M 21.5 20 C 20.672 20 20 20.671 20 21.5 C 20 22.329 20.672 23 21.5 23 L 34.5 23 C 35.328 23 36 22.329 36 21.5 C 36 20.671 35.328 20 34.5 20 L 21.5 20 z M 41.498047 24 C 41.224047 24.001 40.946969 24.025172 40.667969 24.076172 C 39.783969 24.235172 38.939563 24.696156 38.226562 25.410156 L 26.427734 37.208984 C 26.070734 37.565984 25.807969 38.011141 25.667969 38.494141 L 24.097656 43.974609 C 24.025656 44.164609 23.993 44.365406 24 44.566406 C 24.013 44.929406 24.155594 45.288406 24.433594 45.566406 C 24.710594 45.843406 25.067688 45.986 25.429688 46 C 25.630688 46.007 25.834391 45.975344 26.025391 45.902344 L 31.505859 44.332031 C 31.988859 44.192031 32.431062 43.930266 32.789062 43.572266 L 44.589844 31.773438 C 45.303844 31.060437 45.764828 30.216031 45.923828 29.332031 C 45.973828 29.053031 45.997047 28.775953 45.998047 28.501953 C 46.001047 27.307953 45.540687 26.179312 44.679688 25.320312 C 43.820687 24.460313 42.692047 23.998 41.498047 24 z M 13.5 26 A 1.50015 1.50015 0 1 0 13.5 29 L 15.5 29 A 1.50015 1.50015 0 1 0 15.5 26 L 13.5 26 z M 21.5 26 C 20.672 26 20 26.671 20 27.5 C 20 28.329 20.672 29 21.5 29 L 31.808594 29 L 34.779297 26.027344 C 34.688297 26.010344 34.596 26 34.5 26 L 21.5 26 z M 13.5 32 A 1.50015 1.50015 0 1 0 13.5 35 L 15.5 35 A 1.50015 1.50015 0 1 0 15.5 32 L 13.5 32 z M 21.5 32 C 20.672 32 20 32.671 20 33.5 C 20 34.329 20.672 35 21.5 35 L 25.808594 35 L 28.808594 32 L 21.5 32 z"/></svg></a></div><div class="cart-collateral"><span class="price">{PRICE}</span></div><div class="quantity"><input class="item-quantity" name="quantity" id="updates_{ID}" data-qtt-id1="quantity_{ID}" value="{QUANTITY}" type="number" /><span class="error-message-input"></span></div></div><a href="javascript:void(0)" title="Remove This Item" class="btn-remove"><svg aria-hidden="true" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="svg-inline--fa fa-times fa-w-10 fa-2x"><path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" class=""></path></svg></a></li>';

            $('[data-cart-count]').text(cart.item_count);
            $('.wrapper-cartCount').show();
            dropdownCart.find('.summary .price').html(Shopify.formatMoney(cart.total_price, window.money_format));
            $('#sidebar-cart').find('.cart-footer .notranslate').html(Shopify.formatMoney(cart.total_price, window.money_format));

            if (cart.item_count > 0) {
                var item_id = $('.item.cur--change').data('product-id');
                var line_item = parseInt($('.item.cur--change').find('input[name="quantity"]').data('line'));
                var quantity = parseInt($('.item.cur--change').find('input[name="quantity"]').val());
                for (var i = 0; i < cart.items.length; i++) {
                    var item = template;
                    var cur_id = cart.items[i].id;
                    var arr = [];

                    if (i == 0) {
                        miniProductList.html('');
                    }
                    
                    item = item.replace(/\{ID\}/g, cart.items[i].id);
                    item = item.replace(/\{URL\}/g, cart.items[i].url);
                    item = item.replace(/\{TITLE\}/g, ella.translateText(cart.items[i].product_title));
                    item = item.replace(/\{VARIANT\}/g, cart.items[i].variant_title || '');
                    item = item.replace(/\{QUANTITY\}/g, cart.items[i].quantity);
                    item = item.replace(/\{IMAGE\}/g, Shopify.resizeImage(cart.items[i].image, '160x'));
                    if (cart.cart_level_discount_applications.length > 0) {
                      item = item.replace(/\{PRICE\}/g, Shopify.formatMoney(cart.items[i].discounted_price, window.money_format));
                    } else {
                      item = item.replace(/\{PRICE\}/g, Shopify.formatMoney(cart.items[i].price, window.money_format));
                    }
                    miniProductList.append(item);

                    if (quantity > line_item && line_item > 0 ) {
                        $('#dropdown-cart [data-product-id="' + item_id + '"]').find('.error-message-input').html('<i class="fa fa-exclamation-circle"></i>' + window.inventory_text.warning_quantity + ': ' + line_item);
                    } else {
                        $('#dropdown-cart [data-product-id="' + item_id + '"]').find('.error-message-input').text('');
                    }
                    
                    $.ajax({
                        url: "/products/" + cart.items[i].handle + "?view=cart_edit",
                        success: function(data){
                            var json = $(data).find('.get_script_content').data('array_json');
                            arr = json.filter(function(cur){
                                return parseInt(cur.id) === cur_id
                            });
                            if (arr.length) {
                                $('#dropdown-cart [data-product-id="' + cur_id + '"]').find('[name="quantity"]').attr('data-line', arr[0].value);
                            }
                        }
                    });
                }
                $('.cart-sidebar-products').show();
                ella.removeItemDropdownCart(cart);

                if (ella.checkNeedToConvertCurrency()) {
                    Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), '#sidebar-cart span.money', 'money_format');
                    Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), '#dropdown-cart span.money', 'money_format');
                }
            } else {
                $('.cart-sidebar-products').hide();
                $('.wrapper-cartCount').hide();
            }
            ella.initFreeShippingMessage();
            ella.editCart();
            ella.checkItemsInDropdownCart();
        },

        translateText: function (str) {
            if (!window.multi_lang || str.indexOf("|") < 0)
                return str;

            if (window.multi_lang) {
                var textArr = str.split("|");

                if (translator.isLang2())
                    return textArr[1];
                return textArr[0];
            };
        },

        checkNeedToConvertCurrency: function () {
            return (window.show_multiple_currencies && Currency.currentCurrency != shopCurrency) || window.show_auto_currency;
        },

        loadJsonProductcard: function () {
            if (window.innerWidth > 1024) {
                $(document).off('mouseover', '.product-item[data-product-id]').on('mouseover', '.product-item[data-product-id]', function(e) {
                    e.preventDefault();
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
                })
            } else {
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
                
                $(window).scroll(function () {
                    $('.product-item[data-product-id]').each(function(i, el){
                      var self = $(this);
                      if(isElementVisible($(el), - 100)) {
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
        },

        changeSwatchQs: function () {
            $('.product-card__variant--popup--content .single-option-selector').on('change', function(){
                var _self = $(this);
                var productItem = $(this).parents('.product-item');
                var get_json = productItem.data('json-product');
                var variantList = get_json.variants;
                var option_color = productItem.find('.option-color').data('option-position');
                var optionIdx = _self.closest('[data-option-index]').data('option-index');
                var swatches = productItem.find('.swatch-element');
                var thisVal = _self.val();
                var selectedVariant;
                // debugger;
                var productInput = productItem.find('[name=id]');
                var selectedSwatchOpt1 = productItem.find('.selector-wrapper-1').find('input:checked').val();
                var selectedSwatchOpt2 = productItem.find('.selector-wrapper-2').find('input:checked').val();
                var selectedSwatchOpt3 = productItem.find('.selector-wrapper-3').find('input:checked').val();
                swatches.removeClass('soldout');
                swatches.find(':radio').prop('disabled',false);
                switch (optionIdx){
                    case 0:

                        var availableVariants = variantList.find(function(variant){
                            if (option_color == 1) {
                                return variant.option2 == thisVal && variant.option1 == selectedSwatchOpt2;
                            } else {
                              if (option_color == 2) {
                                return variant.option3 == thisVal && variant.option1 == selectedSwatchOpt2;
                              } else {
                                return variant.option1 == thisVal && variant.option2 == selectedSwatchOpt2;
                              }
                            }
                        })

                        if(availableVariants != undefined){
                            selectedVariant =  availableVariants;
                        }else{
                             // variant was sold out, so auto select other available variant
                            var altAvailableVariants = variantList.find(function(variant){
                                if (option_color == 1) {
                                    return variant.option2 == thisVal;
                                } else {
                                    if (option_color == 2) {
                                      return variant.option3 == thisVal;
                                    } else {
                                      return variant.option1 == thisVal;
                                    }
                                }
                            })
                            selectedVariant =  altAvailableVariants;
                        };
                        break;
                    case 1:
                    
                        var availableVariants = variantList.find(function(variant){
                            if (option_color == 1) {
                                return variant.option2 == selectedSwatchOpt1 && variant.option1 == thisVal && variant.option3 == selectedSwatchOpt3;
                            } else {
                                if (option_color == 2) {
                                  return variant.option3 == selectedSwatchOpt1 && variant.option1 == thisVal && variant.option2 == selectedSwatchOpt3;
                                } else {
                                  return variant.option1 == selectedSwatchOpt1 && variant.option2 == thisVal && variant.option3 == selectedSwatchOpt3;
                                }
                            }
                            
                        })
                        if(availableVariants != undefined){
                            selectedVariant =  availableVariants;
                        } else {
                            var altAvailableVariants = variantList.find(function(variant){
                                if (option_color == 1) {
                                return variant.option2 == selectedSwatchOpt1 && variant.option1 == thisVal;
                            } else {
                                if (option_color == 2) {
                                  return variant.option3 == selectedSwatchOpt1 && variant.option1 == thisVal;
                                } else {
                                  return variant.option1 == selectedSwatchOpt1 && variant.option2 == thisVal;
                                }
                            }
                            })
                            selectedVariant =  altAvailableVariants;
                        };
                        break;
                    case 2:
                        var availableVariants = variantList.find(function(variant){
                            
                            if (option_color == 1) {
                                return variant.option2 == selectedSwatchOpt1 && variant.option1 == selectedSwatchOpt2 && variant.option3 == thisVal;
                            } else {
                                if (option_color == 2) {
                                  return variant.option3 == selectedSwatchOpt1 && variant.option1 == selectedSwatchOpt2 && variant.option2 == thisVal;
                                } else {
                                  return variant.option1 == selectedSwatchOpt1 && variant.option2 == selectedSwatchOpt2 && variant.option3 == thisVal;
                                }
                                
                            }
                        })
                        if(availableVariants != undefined){
                           selectedVariant =  availableVariants;
                        }
                        break;
                }
                if (selectedVariant == undefined) return;
                productInput.val(selectedVariant.id);
                var value = $(this).val();
                if (selectedVariant.compare_at_price > selectedVariant.price) {
                    productItem.find('[data-compare-price-grid]').html(Shopify.formatMoney(selectedVariant.compare_at_price, window.money_format));
                } else {
                    productItem.find('[data-compare-price-grid]').html('');
                }
                productItem.find('[data-price-grid]').html(Shopify.formatMoney(selectedVariant.price, window.money_format));
                $(this).parents('.selector-wrapper').find('.form-label span').text(value);
                ella.checkStatusSwatchQs(productItem);
            })
        },

        checkStatusSwatchQs: function (productItem) {
            if (window.use_color_swatch) {
                var get_json = productItem.data('json-product');
                var variantList = get_json.variants;
                var options = productItem.find('[data-option-index]');
                var option_color = productItem.find('.option-color').data('option-position');
                var selectedSwatchOpt1 = productItem.find('[data-option-index="0"]').find('input:checked').val();
                var selectedSwatchOpt2 = productItem.find('[data-option-index="1"]').find('input:checked').val();
                var selectedSwatchOpt3 = productItem.find('[data-option-index="2"]').find('input:checked').val();

                options.each(function(){
                    var optionIndex = $(this).data('option-index');
                    var swatch = $(this).find('.swatch-element');
                    switch (optionIndex) {
                        case 0:
                        // loop through all swatchs in option 1 anh filter sold out swatch
                        swatch.each(function(){
                            var swatchVal = $(this).data('value');
                            var opt1Soldout = variantList.find(function(variant){
                                if (option_color == 1) {
                                    return variant.option2 == swatchVal && variant.available;
                                } else {
                                    if (option_color == 2) {
                                      return variant.option3 == swatchVal && variant.available;
                                    } else {
                                      return variant.option1 == swatchVal && variant.available;
                                    }
                                    
                                }
                            });
                            var optionUnavailable = variantList.find(function(variant){
                                if (option_color == 1) {
                                    return variant.option2 == swatchVal;
                                } else {
                                    if (option_color == 2) {
                                      return variant.option3 == swatchVal;
                                    } else {
                                      return variant.option1 == swatchVal;
                                    }
                                    
                                }
                            });
                            if(opt1Soldout == undefined){
                                if (optionUnavailable == undefined) {
                                    $(this).addClass('unavailable');
                                    $(this).removeClass('soldout');
                                    $(this).removeClass('available');
                                    $(this).find(':radio').prop('checked',false);
                                } else {
                                    $(this).addClass('soldout');
                                    $(this).removeClass('unavailable');
                                    $(this).removeClass('available');
                                    $(this).find(':radio').prop('disabled',false);
                                    productItem.find('[data-btn-addtocart]').addClass('unavailable').attr('disable');
                                }
                            } else {
                                $(this).removeClass('soldout');
                                $(this).removeClass('unavailable');
                                $(this).addClass('available');
                                $(this).find(':radio').prop('disabled',false);
                                productItem.find('[data-btn-addtocart]').removeClass('unavailable').removeAttr('disable');
                            }
                        })
                        break;
                        case 1:
                        swatch.each(function(){
                            var swatchVal = $(this).data('value');
                            var opt1Soldout = variantList.find(function(variant){
                                if (option_color == 1) {
                                    return variant.option2 == selectedSwatchOpt1 && variant.option1 == swatchVal && variant.available;
                                } else {
                                    if (option_color == 2) {
                                      return variant.option3 == selectedSwatchOpt1 && variant.option1 == swatchVal && variant.available;
                                    } else {
                                      return variant.option1 == selectedSwatchOpt1 && variant.option2 == swatchVal && variant.available;
                                    }
                                    
                                }
                            });
                            var optionUnavailable = variantList.find(function(variant){
                                if (option_color == 1) {
                                    return variant.option2 == selectedSwatchOpt1 && variant.option1 == swatchVal;
                                } else {
                                    if (option_color == 2) {
                                      return variant.option3 == selectedSwatchOpt1 && variant.option1 == swatchVal;
                                    } else {
                                      return variant.option1 == selectedSwatchOpt1 && variant.option2 == swatchVal;
                                    }
                                    
                                }
                            });
                            if(opt1Soldout == undefined){
                                if (optionUnavailable == undefined) {
                                    $(this).addClass('unavailable');
                                    $(this).removeClass('soldout');
                                    $(this).removeClass('available');
                                    $(this).find(':radio').prop('checked',false);
                                } else {
                                    $(this).addClass('soldout');
                                    $(this).removeClass('unavailable');
                                    $(this).removeClass('available');
                                    $(this).find(':radio').prop('disabled',false);
                                    // $(this).find(':radio').prop('checked',true);
                                    productItem.find('[data-btn-addtocart]').addClass('unavailable').attr('disable');
                                }
                            } else {
                                $(this).removeClass('soldout');
                                $(this).removeClass('unavailable');
                                $(this).addClass('available');
                                $(this).find(':radio').prop('disabled',false);
                                productItem.find('[data-btn-addtocart]').removeClass('unavailable').removeAttr('disable');
                            }
                            
                        })
                        break;
                        case 2:
                        // loop through all swatchs in option 3 anh filter sold out swatch
                        swatch.each(function(){
                            var swatchVal = $(this).data('value');
                            var opt1Soldout = variantList.find(function(variant){
                                if (option_color == 1) {
                                    return variant.option2 == selectedSwatchOpt1 && variant.option1 == selectedSwatchOpt2 && variant.option3 == swatchVal && variant.available;
                                } else {
                                    if (option_color == 2) {
                                      return variant.option3 == selectedSwatchOpt1 && variant.option1 == selectedSwatchOpt2 && variant.option2 == swatchVal && variant.available;
                                    } else {
                                      return variant.option1 == selectedSwatchOpt1 && variant.option2 == selectedSwatchOpt2 && variant.option3 == swatchVal && variant.available;
                                    }
                                    
                                }
                                
                            });
                            var optionUnavailable = variantList.find(function(variant){
                                if (option_color == 1) {
                                    return variant.option2 == selectedSwatchOpt1 && variant.option1 == selectedSwatchOpt2 && variant.option3 == swatchVal;
                                } else {
                                    if (option_color == 2) {
                                      return variant.option3 == selectedSwatchOpt1 && variant.option1 == selectedSwatchOpt2 && variant.option2 == swatchVal;
                                    } else {
                                      return variant.option1 == selectedSwatchOpt1 && variant.option2 == selectedSwatchOpt2 && variant.option3 == swatchVal;
                                    }
                                    
                                }
                            });
                            if(opt1Soldout == undefined){
                                if (optionUnavailable == undefined) {
                                    $(this).addClass('unavailable');
                                    $(this).removeClass('soldout');
                                    $(this).removeClass('available');
                                    $(this).find(':radio').prop('checked',false);
                                } else {
                                    $(this).addClass('soldout');
                                    $(this).removeClass('unavailable');
                                    $(this).removeClass('available');
                                    $(this).find(':radio').prop('disabled',false);
                                    // $(this).find(':radio').prop('checked',true);
                                    productItem.find('[data-btn-addtocart]').addClass('unavailable').attr('disable');
                                }
                            } else {
                                $(this).removeClass('soldout');
                                $(this).removeClass('unavailable');
                                $(this).addClass('available');
                                $(this).find(':radio').prop('disabled',false);
                                productItem.find('[data-btn-addtocart]').removeClass('unavailable').removeAttr('disable');
                            }
                        })
                        break;
                    }
                });
                if (productItem.find('.swatch-element.soldout').find('input:checked').length) {
                    productItem.find('[data-btn-addtocart]').addClass('disabled').attr('disabled', true);
                } else {
                    productItem.find('[data-btn-addtocart]').removeClass('disabled').removeAttr('disabled');
                }
                productItem.find('.product-top').find('.selector-wrapper:not(.option-color)').each(function(){
                    if ($(this).find('.swatch-element').find('input:checked').length < 1) {
                        if ($(this).find('.swatch-element.available').length) {
                            $(this).find('.swatch-element.available').eq('0').find('label').trigger('click');
                        } else {
                            $(this).find('.swatch-element.soldout').eq('0').find('label').trigger('click');
                        }
                    }
                });
            } else {

                var get_json = productItem.data('json-product');
                var variantList = get_json.variants;
                var options = productItem.find('.product-card__variant--popup--content [data-option]');
                var option_color = productItem.find('.option-color').data('option-position');
                var selectedSwatchOpt1 = productItem.find('.product-card__variant--popup--content [data-option="option1"]').val();
                var selectedSwatchOpt2 = productItem.find('.product-card__variant--popup--content [data-option="option2"]').val();
                var selectedSwatchOpt3 = productItem.find('.product-card__variant--popup--content [data-option="option3"]').val();

                options.each(function(){
                    var optionIndex = $(this).data('option-index');
                    var swatch = $(this).find('option');
                    switch (optionIndex) {
                        case 0:
                        // loop through all swatchs in option 1 anh filter sold out swatch
                        swatch.each(function(){
                            var swatchVal = $(this).val();
                            var opt1Soldout = variantList.find(function(variant){

                                // if (option_color == 1) {
                                //     return variant.option2 == swatchVal && variant.available;
                                // } else {
                                    return variant.option1 == swatchVal && variant.available;
                                // }
                            });
                            if(opt1Soldout == undefined){
                                var optionUnavailable = variantList.find(function(variant){
                                    return variant.option1 == swatchVal;
                                });
                                if (optionUnavailable == undefined) {
                                    $(this).addClass('unavailable');
                                    $(this).removeClass('soldOut');
                                    $(this).attr('disabled','disabled');
                                } else {
                                    $(this).addClass('soldOut');
                                    $(this).removeClass('unavailable');
                                    $(this).removeAttr('disabled','disabled');
                                }
                            } else {
                                $(this).removeAttr('disabled','disabled');
                                $(this).removeClass('soldOut');
                                $(this).removeClass('unavailable');
                            }
                        })
                        break;
                        case 1:
                        // loop through all swatchs in option 2 anh filter sold out swatch
                        swatch.each(function(){
                            var swatchVal = $(this).val();
                            var opt1Soldout = variantList.find(function(variant){
                              return variant.option1 == selectedSwatchOpt1 && variant.option2 == swatchVal && variant.available;
                            });
                            if(opt1Soldout == undefined){
                                var optionUnavailable = variantList.find(function(variant){
                                    return variant.option1 == selectedSwatchOpt1 && variant.option2 == swatchVal;
                                });
                                if (optionUnavailable == undefined) {
                                    $(this).addClass('unavailable');
                                    $(this).removeClass('soldOut');
                                    $(this).attr('disabled','disabled');
                                } else {
                                    $(this).addClass('soldOut');
                                    $(this).removeClass('unavailable');
                                    $(this).removeAttr('disabled','disabled');
                                }
                            } else {
                                $(this).removeAttr('disabled','disabled');
                                $(this).removeClass('soldOut');
                                $(this).removeClass('unavailable');
                            }
                            
                        })
                        break;
                        case 2:
                        // loop through all swatchs in option 3 anh filter sold out swatch
                        swatch.each(function(){
                            var swatchVal = $(this).val();
                            var opt1Soldout = variantList.find(function(variant){
                                return variant.option1 == selectedSwatchOpt1 && variant.option2 == selectedSwatchOpt2 && variant.option3 == swatchVal && variant.available;
                            });
                            if(opt1Soldout == undefined){
                                var optionUnavailable = variantList.find(function(variant){
                                    return variant.option1 == selectedSwatchOpt1 && variant.option2 == selectedSwatchOpt2 && variant.option3 == swatchVal;
                                });
                                if (optionUnavailable == undefined) {
                                    $(this).addClass('unavailable');
                                    $(this).removeClass('soldOut');
                                    $(this).attr('disabled','disabled');
                                } else {
                                    $(this).addClass('soldOut');
                                    $(this).removeClass('unavailable');
                                    $(this).removeAttr('disabled','disabled');
                                }
                            } else {
                                $(this).removeAttr('disabled','disabled');
                                $(this).removeClass('soldOut');
                                $(this).removeClass('unavailable');
                            }
                        })
                        break;
                    }
                });
                if (productItem.find('.product-card__variant--popup--content .single-option-selector').find('option.soldOut:selected').length) {
                    productItem.find('[data-btn-addtocart]').addClass('disabled').attr('disabled', true);
                } else {
                    productItem.find('[data-btn-addtocart]').removeClass('disabled').removeAttr('disabled');
                }
            }
        },

        initQuickshop: function () {
            var btnQuickshop = '[data-init-quickshop]';
            var cancelQuickshop = '[data-cancel-swatch-qs]';
            
            body.off('click.quickshop').on('click.quickshop', btnQuickshop, function (e) {
                e.preventDefault();
                e.stopPropagation();
                var _self = $(this);
                    productItem = _self.parents('.product-item');
                var option_color = productItem.find('.option-color');

                _self.parents('.action').addClass('show-popup-qs');

                ella.changeSwatchQs();
                var get_json = productItem.data('json-product');

                ella.checkStatusSwatchQs(productItem);

                _self.parents('.action').find('.selector-wrapper:not(.option-color)').each(function(){
                    $(this).find('.swatch-element:not(.soldout):not(.unavailable)').eq('0').find('label').trigger('click');
                })

                ella.stickySidebar();
                
                
            });

            body.off('click.cancelquickshop').on('click.cancelquickshop', cancelQuickshop, function () {
                $(this).parents('.action').removeClass('show-popup-qs');
            });
        },

        initColorSwatchGrid: function () {
            var itemSwatchSlt = '.item-swatch li label';

            body.off('click.toggleClass').on('click.toggleClass', itemSwatchSlt, function () {
                $(this).parents('.inner-top').find('.action').removeClass('show-popup-qs');
                var self = $(this),
                    title = self.attr('title').replace(/^\s+|\s+$/g, ''),
                    productItemElm = self.closest('.grid-item'),
                    sidebarWidgetProduct = productItemElm.closest('.sidebar-widget-product');

                self.parents('.item-swatch').find('li label').removeClass('active');
                self.addClass('active');
                var get_json = $(this).parents('.product-item').data('json-product');
                var list_cur_media = [];

                (productItemElm.find('.product-title').hasClass('change-text')) ? 
                productItemElm.find('.product-title').find('[data-change-title]').text(' - ' + title) :
                productItemElm.find('.product-title').addClass('change-text').append('<span data-change-title> - ' + title + '</span>');

                if (self.data('with-one-option') != undefined) {
                    var quantity = self.data('quantity');
                    productItemElm.find('[name="id"]').val(self.data('with-one-option'));
                    if (quantity > 0) {
                        productItemElm.find('[data-btn-addtocart]').removeClass('disabled').removeAttr('disabled');
                    } else {
                        productItemElm.find('[data-btn-addtocart]').addClass('disabled').attr('disabled', 'disabled');
                    }
                } else {
                    if (get_json != undefined) {
                        ella.checkStatusSwatchQs($(this).parents('.product-item'));
                    }
                    productItemElm.find('[data-value="' + title + '"]').find('label').trigger('click');
                }

                if (get_json != undefined) {
                    var list_cur_media = get_json.media.filter(function(cur) {
                        return cur.alt === title;
                    });
                }

                if (list_cur_media.length > 0 && window.color_swatch_style == 'variant_grouped') {
                    if (list_cur_media.length > 1) {
                        var length = 2;
                    } else {
                        var length = list_cur_media.length
                    }
                    for (var i = 0; i < length; i ++) {
                        productItemElm.find('picture[data-index="' + i + '"] > *').attr('srcset', list_cur_media[i].src);
                    } 
                } else {
                    var newImage = self.data('img');
                    if (sidebarWidgetProduct.length) {
                        newImage = newImage.replace('800x', 'large');
                    }
                    if (newImage) {
                        productItemElm.find('.product-grid-image > picture > *, .product-grid-image > img').attr({
                            "srcset": newImage
                        });
                        return false;
                    }
                }
                  
            });
            body.off('click.showmore').on('click.showmore', '.item-swatch-more a', function () {
            // $('.item-swatch-more a').off('click').on('click', function() {
                $(this).parents('.item-swatch').toggleClass('show--more');
                ($(this).parents('.item-swatch').hasClass('show--more')) ? $(this).children().text('-') : $(this).children().text('+');
            });
        },

        showLoading: function () {
            $('.loading-modal').show();
        },

        hideLoading: function () {
            $('.loading-modal').hide();
        },

        showModal: function (selector) {
            $(selector).fadeIn(500);

            ella.ellaTimeout = setTimeout(function () {
                $(selector).fadeOut(500);
            }, 5000);
        },

        translateBlock: function (blockSelector) {
            if (window.multi_lang && translator.isLang2()) {
                translator.doTranslate(blockSelector);
            }
        },

        closeLookbookModal: function () {
            $('.ajax-lookbook-modal').fadeOut(500);
        },

        addEventLookbookModal: function () {
            body.off('click.addEvenLookbookModal touchstart.addEvenLookbookModal', '[data-lookbook-icon]').on('click.addEvenLookbookModal touchstart.addEvenLookbookModal', '[data-lookbook-icon]', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var handle = $(this).data('handle'),
                    position = $(this);

                ella.doAjaxAddLookbookModal(handle, position);

                doc.off('click.closeLookbookModal').on('click.closeLookbookModal', '[data-close-lookbook-modal], .ajax-lookbook-modal .overlay', function () {
                    ella.closeLookbookModal();
                    return false;
                });
            });
        },

        doAjaxAddLookbookModal: function (handle, position) {
            var offSet = $(position).offset(),
                top = offSet.top,
                left = offSet.left,
                iconWidth = position.innerWidth(),
                innerLookbookModal = $('.ajax-lookbook-modal').innerWidth(),
                str3 = iconWidth + "px",
                str4 = innerLookbookModal + "px",
                newtop,
                newleft;

            if (window.innerWidth > 767) {
                if (left > (innerLookbookModal + 31)) {
                    newleft = "calc(" + left + "px" + " - " + str4 + " + " + "2px" + ")";
                } else {
                    newleft = "calc(" + left + "px" + " + " + str3 + " - " + "2px" + ")";
                }

                newtop = top - (innerLookbookModal / 2) + "px";
            } else {
                newleft = 0;
                newtop = top - 30 + "px";
            };

            if (ella.isAjaxLoading) return;

            $.ajax({
                type: "get",
                url: window.router + '/products/' + handle + '?view=json',

                success: function (data) {
                    $('.ajax-lookbook-modal').css({
                        'left': newleft,
                        'top': newtop
                    });

                    $('.ajax-lookbook-modal .lookbook-content').html(data);

                    ella.translateBlock('.lookbook-content');
                    $('.ajax-lookbook-modal').fadeIn(500);
                },

                error: function (xhr, text) {
                    $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);

                    ella.showModal('.ajax-error-modal');
                }
            });
        },

        clickedActiveProductTabs: function () {
            var productTabsSection = $('[data-home-product-tabs]');

            productTabsSection.each(function () {
                var self = $(this),
                    listTabs = self.find('.list-product-tabs'),
                    tabLink = listTabs.find('[data-product-tabTop]'),
                    tabContent = self.find('[data-product-TabContent]');

                var linkActive = self.find('.list-product-tabs .tab-links.active'),
                    activeTab = self.find('.product-tabs-content .tab-content.active');

                ella.doAjaxProductTabs(linkActive.data('href'), activeTab.find('.loading'), activeTab.find('.products-grid'), self.attr('sectionid'));

                tabLink.off('click').on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if($(this).hasClass('active')) {
                        return;
                    }

                    if (!$(this).hasClass('active')) {
                        var curTab = $(this),
                            curTabContent = $(curTab.data('target'));

                        tabLink.removeClass('active');
                        tabContent.removeClass('active');

                        if (!curTabContent.find('.products-grid').hasClass('slick-initialized')) {
                            ella.doAjaxProductTabs(curTab.data('href'), curTabContent.find('.loading'), curTabContent.find('.products-grid'), self.attr('sectionid'));
                        }

                        curTab.addClass('active');
                        curTabContent.addClass('active');
                    };
                });
            });
        },

        doAjaxProductTabs: function (handle, loadingElm, curTabContent, sectionId) {
            // if (ella.isAjaxLoading) return;
            var productTabsSection = $('[data-home-product-tabs]');

            $.ajax({
                type: "get",
                url: handle,
                data: {
                    constraint: 'sectionId=' + sectionId
                },

                beforeSend: function () {
                    loadingElm.text('Loading ... please wait ...');
                },

                success: function (data) {
                    loadingElm.hide();

                    if (handle == '/collections/?view=json') {
                        loadingElm.text('Please link to collections').show();
                    } else {
                        curTabContent.html($(data).find('.grid-items').html());

                        if (!curTabContent.hasClass('slick-initialized')) {
                            ella.initProductTabsSlider(curTabContent.parent());
                        };

                        if (ella.checkNeedToConvertCurrency()) {
                            Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
                        };

                        ella.translateBlock('[data-home-product-tabs]');
                        ella.initColorSwatchGrid();
                        ella.initWishListIcons();

                        ella.ellaTimeout = setTimeout(function () {
                            if ($('.shopify-product-reviews-badge').length && $('.spr-badge').length) {
                                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                            };
                        }, 1000);
                    };
                },

                error: function (xhr, text) {
                    loadingElm.text('Sorry, there are no products in this collection').show();
                }
            });
        },

        initProductTabsSlider: function (slt) {
            slt.each(function () {
                var self = $(this),
                    productGrid = self.find('.products-grid'),
                    gridItemWidth = productGrid.data('row');

                if (productGrid.not('.slick-initialized') && productGrid.find('.grid-item').length) {
                    productGrid.slick({
                        slidesToShow: productGrid.data('row'),
                        slidesToScroll: productGrid.data('row'),
                        dots: false,
                        infinite: false,
                        speed: 1000,
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
                                breakpoint: 1200,
                                settings: {
                                    dots: true,
                                    arrows: false,
                                    get slidesToShow() {
                                        if(self.hasClass('sections-has-banner')) {
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
                                        if (self.hasClass('sections-has-banner')) {
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
                                    get slidesToShow() {
                                        if(self.hasClass('sections-has-banner')) {
                                            return this.slidesToShow = 2;
                                        }else {
                                            if (gridItemWidth >= 3) {
                                                return this.slidesToShow = 3;
                                            } else {
                                                this.slidesToShow = 2
                                            }
                                        }
                                    },
                                    get slidesToScroll() {
                                        if (self.hasClass('sections-has-banner')) {
                                            return this.slidesToScroll = 2;
                                        }else {
                                            if(gridItemWidth >= 3) {
                                                return this.slidesToScroll = 3;
                                            }else {
                                                return this.slidesToScroll = 2
                                            }
                                        };
                                    }
                                }
                            },
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    arrows: false,
                                    dots: true
                                }
                            }
                        ]
                    });
                }
            });
        },

        initProductReview: function () {
            setInterval(function(){
                if (!$('.spr-reviews').hasClass('slick-initialized') && $('.product-template-skin-1').length) {
                    if (!$('.spr-reviews').find('.spr-review').length) {
                        return;
                    }
                    var self = $('.spr-reviews');
                    self.slick({
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        get arrows() {
                            if (window.layout_style == 'layout_style_fullwidth') {
                                return this.arrows = true
                
                            } else {
                                return this.arrows = false
                            }
                        },
                        get dots() {
                            if (window.layout_style == 'layout_style_fullwidth') {
                                return this.dots = false
                
                            } else {
                                return this.dots = true
                            }
                        },
                        infinite: true,
                        speed: 1000,
                        get centerMode() {
                            if (window.layout_style == 'layout_style_flower') {
                                return this.centerMode = false
                
                            } else {
                                return this.centerMode = true
                            }
                        },
                        centerPadding: '20%',
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
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 2
                                }
                            },
                            {
                                breakpoint: 992,
                                settings: {
                                    slidesToShow: 1
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    centerMode: false,
                                }
                            }
                        ]
                    });
                    self.find('.spr-review').each(function(){
                        $(this).find('.spr-review-header-byline').appendTo($(this).find('.spr-review-footer'));
                        self.find('.spr-pagination').remove();
                    })
                }
            })
        
        },

        initCountdown: function () {
            var countdownElm = $('[data-countdown]');

            countdownElm.each(function () {
                var self = $(this),
                    countdownValue = self.data('countdown-value');

                self.countdown(countdownValue, function (event) {
                    $(this).html(event.strftime('' +
                        '<div class="clock-item"><span class="num">%D</span><span>' + window.inventory_text.days + '</span></div>' +
                        '<div class="clock-item"><span class="num">%H</span><span>' + window.inventory_text.hours + '</span></div>' +
                        '<div class="clock-item"><span class="num">%M</span><span>' + window.inventory_text.mins + '</span></div>' +
                        '<div class="clock-item"><span class="num">%S</span><span>' + window.inventory_text.secs + '</span></div>'));
                });
            });
        },

        initCountdownNormal: function () {
            var countdownElm = $('[data-countdown-normal]');

            countdownElm.each(function () {
                var self = $(this),
                    countdownValue = self.data('countdown-value');

                if(self.hasClass('countdown-suppermarket')) {
                    self.countdown(countdownValue, function (event) {
                        $(this).html(event.strftime('' +
                            '<div class="clock-item"><span class="num">%D</span><span>d</span></div>' +
                            '<div class="clock-item"><span class="num">%H</span>&nbsp;:</div>' +
                            '<div class="clock-item"><span class="num">%M</span>&nbsp;:</div>' +
                            '<div class="clock-item"><span class="num">%S</span></div>'));
                    });
                } else {
                    self.countdown(countdownValue, function (event) {
                        $(this).html(event.strftime('' +
                            '<div class="clock-item"><span class="num">%D</span><span>D</span>:</div>' +
                            '<div class="clock-item"><span class="num">%H</span><span>H</span>:</div>' +
                            '<div class="clock-item"><span class="num">%M</span><span>M</span>:</div>' +
                            '<div class="clock-item"><span class="num">%S</span><span>S</span></div>'));
                    });
                }
            });
        },

        initToggleSubMenuMobile: function () {
            var mainMenu = $('.main-menu.jas-mb-style'),
                siteNav = $('.site-nav'),
                iconDropdown = siteNav.find('[data-toggle-menu-mb]');

            iconDropdown.off('click.dropdownMenu').on('click.dropdownMenu', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var curParent = $(this).parent(),
                    curMenu = curParent.next('.sub-menu-mobile');

                if (curMenu.hasClass('sub-menu-open')) {
                    curMenu.removeClass('sub-menu-open');
                } else {
                    curMenu.addClass('sub-menu-open').css({
                        "overflow": ""
                    });
                    mainMenu.animate({
                        scrollTop: 0
                    }, 0);
                    mainMenu.css({
                        "overflow": "hidden"
                    });
                };
            });

            ella.linkClickToggleSubMenuMobile(mainMenu);
        },

        linkClickToggleSubMenuMobile: function (mainMenu) {
            var menuMobile = $('.site-nav .dropdown'),
                iconDropdown = menuMobile.find('[data-toggle-menu-mb]'),
                menuMobileLabel = $('.sub-menu-mobile .menu-mb-title');

            if (iconDropdown.length) {
                body.off('click.current').on('click.current', '.site-nav .dropdown', function (e) {
                    e.stopPropagation();

                    $(this).children('.sub-menu-mobile').addClass('sub-menu-open').css({
                        "overflow": ""
                    });
                    mainMenu.animate({
                        scrollTop: 0
                    }, 0);
                    mainMenu.css({
                        "overflow": "hidden"
                    });
                });

                menuMobile.find('.menu__moblie').on('click', function (e) {
                    e.stopPropagation();
                });

                body.off('click.closeMenu').on('click.closeMenu', '.sub-menu-mobile .menu-mb-title', function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if($(this).parent().hasClass('bg')) {
                        $(this).parent().parent().removeClass('sub-menu-open');
                    }else {
                        $(this).parent().removeClass('sub-menu-open');
                    };

                    if (!$(this).closest('.menu-lv-2').length) {
                        mainMenu.css({
                            "overflow": ""
                        });
                    };
                })
            };
        },

        openEmailModalWindow: function (newsletterWrapper) {
            newsletterWrapper.fadeIn(1000);
        },

        closeEmailModalWindow: function (newsletterWrapper,expire) {
            newsletterWrapper.fadeOut(1000);
            var inputChecked = newsletterWrapper.find('input[name="dismiss"]').prop('checked');
            if (inputChecked || !newsletterWrapper.find('input[name="dismiss"]').length)
                $.cookie('emailSubcribeModal', 'closed', {
                    expires: expire,
                    path: '/'
                });
        },

        initNewsLetterPopup: function () {
            if (window.newsletter_popup) {
                var newsletterWrapper = $('[data-newsletter]'),
                    closeWindow = newsletterWrapper.find('.close-window'),
                    delay = newsletterWrapper.data('delay'),
                    expire = newsletterWrapper.data('expire'),
                    modalContent = newsletterWrapper.find('.halo-modal-content');

                if ($.cookie('emailSubcribeModal') != 'closed' && window.hidden_newsletter == false) {
                    ella.ellaTimeout = setTimeout(function () {
                        ella.openEmailModalWindow(newsletterWrapper);
                    }, delay);
                };

                if ($('[data-toolbar-newsletter]').length) {
                    $('[data-modal-newsletter]').on('click', function(){
                        ella.openEmailModalWindow(newsletterWrapper);
                    })
                }

                closeWindow.click(function (e) {
                    e.preventDefault();

                    ella.closeEmailModalWindow(newsletterWrapper,expire);
                });

                newsletterWrapper.on('click', function (e) {
                    if (!modalContent.is(e.target) && !modalContent.has(e.target).length) {
                        ella.closeEmailModalWindow(newsletterWrapper,expire);
                    };
                });

                $('#mc_embed_signup form').submit(function () {
                    if ($('#mc_embed_signup .email').val() != '') {
                        ella.closeEmailModalWindow(newsletterWrapper,expire);
                    };
                });
            };
        },

        initSidebarProductSlider: function () {
            var sidebarWidgetProduct = $('[data-sidebar-product]');

            sidebarWidgetProduct.each(function () {
                var self = $(this),
                    productGrid = self.find('.products-grid');

                if (productGrid.not('.slick-initialized')) {
                    productGrid.slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false,
                        speed: 800,
                        get dots() {
                            if ((window.layout_style == 'layout_style_1170') || (window.layout_style == 'layout_style_flower')) {
                                return this.dots = true;
                            } else {
                                return this.dots = false;
                            }
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
                    });
                }
            });
        },

        initOpenSidebar: function () {
            var sidebarLabelSlt = '.sidebar-label',
                sidebarLabelElm = $(sidebarLabelSlt);

            if (sidebarLabelElm.length) {
                body.off('click.openSidebar').on('click.openSidebar', sidebarLabelSlt, function () {
                    html.addClass('sidebar-open');
                })
            }
        },

        closeSidebar: function () {
            ella.closeTranslate('.sidebar .close-sidebar', 'sidebar-open');
        },

        initSidebar: function () {
            this.initSidebarProductSlider();
            this.initOpenSidebar();
            this.closeSidebar();
            this.initDropdownSubCategoriesAtSidebar();
            this.initToggleWidgetTitleSidebarFilter();
        },

        initDropdownSubCategoriesAtSidebar: function () {
            var iconDropdownSlt = '.sidebar-links li.dropdown';
            var linkDropdownSlt = '.sidebar-links li.dropdown a';

            body.off('click.toggleSubCategories').on('click.toggleSubCategories', iconDropdownSlt, function (e) {
                e.stopPropagation();

                var self = $(this),
                    dropdown = self.find('> .dropdown-cat');

                if (self.hasClass('open')) {
                    self.removeClass('open');
                    dropdown.slideUp();
                } else {
                    self.addClass('open');
                    dropdown.slideDown();
                };
            })

            body.off('click.linktoCollection').on('click.linktoCollection', linkDropdownSlt, function (e) {
                e.stopPropagation();
            })
        },

        historyAdapter: function () {
            var collTpl = $('[data-section-type="collection-template"]');

            if (collTpl.length) {
                History.Adapter.bind(window, 'statechange', function () {
                    var State = History.getState();

                    if (!ella.isSidebarAjaxClick) {
                        ella.queryParams();

                        var newurl = ella.ajaxCreateUrl();

                        ella.doAjaxToolbarGetContent(newurl);
                        ella.doAjaxSidebarGetContent(newurl);
                    }

                    ella.isSidebarAjaxClick = false;
                });
            };
        },

        queryParams: function () {
            Shopify.queryParams = {};

            if (location.search.length) {
                for (var aKeyValue, i = 0, aCouples = location.search.substr(1).split('&'); i < aCouples.length; i++) {
                    aKeyValue = aCouples[i].split('=');

                    if (aKeyValue.length > 1) {
                        Shopify.queryParams[decodeURIComponent(aKeyValue[0])] = decodeURIComponent(aKeyValue[1]);
                    }
                }
            };
        },

        filterAjaxClick: function (baseLink) {
            delete Shopify.queryParams.page;

            var newurl = ella.ajaxCreateUrl(baseLink);

            ella.isSidebarAjaxClick = true;

            History.pushState({
                param: Shopify.queryParams
            }, newurl, newurl);
        },

        ajaxCreateUrl: function (baseLink) {
            var newQuery = $.param(Shopify.queryParams).replace(/%2B/g, '+');

            if (baseLink) {
                if (newQuery != "")
                    return baseLink + "?" + newQuery;
                else
                    return baseLink;
            }
            return location.pathname + "?" + newQuery;
        },

        filterToolbar: function () {
            this.queryParams();
            this.setTextForSortbyFilter();
            this.setTextForLimitedFilter();
            this.ajaxFilterSortby();
            this.ajaxFilterLimit();
            this.addEventViewModeLayout();
        },

        setTextForSortbyFilter: function () {
            var filterSortby = $('[data-sortby]'),
                labelTab = filterSortby.find('.label-tab'),
                labelText = labelTab.find('.label-text'),
                sortbyLinkActive = labelTab.next().find('li.active'),
                text = sortbyLinkActive.text();

            labelText.text(text);

            if (Shopify.queryParams.sort_by) {
                var sortBy = Shopify.queryParams.sort_by,
                    sortByLinkActive = filterSortby.find('span[data-href="' + sortBy + '"]'),
                    sortByText = sortByLinkActive.text();

                labelText.text(sortByText);
                labelTab.next().find('li').removeClass('active');
                sortByLinkActive.parent().addClass('active');
            };
        },

        setTextForLimitedFilter: function () {
            var filterLimited = $('[data-limited-view]'),
                labelTab = filterLimited.find('.label-tab'),
                labelText = labelTab.find('.label-text'),
                limitedLinkActive = labelTab.next().find('li.active'),
                text = limitedLinkActive.text();

            labelText.text(text);

            if (filterLimited.length) {
                var limited = filterLimited.find('li.active span').data('value'),
                    limitedActive = filterLimited.find('span[data-value="' + limited + '"]'),
                    limitedText = limitedActive.text();

                labelText.text(limitedText);
                labelTab.next().find('li').removeClass('active');
                limitedActive.parent().addClass('active');
            };
        },

        ajaxFilterSortby: function () {
            var sortbyFilterSlt = '[data-sortby] li span',
                sortbyFilter = $(sortbyFilterSlt);

            body.off('click.sortBy', sortbyFilterSlt).on('click.sortBy', sortbyFilterSlt, function (e) {
                e.preventDefault();
                e.stopPropagation();

                var self = $(this),
                    parent = self.parent();

                if (!parent.hasClass('active')) {
                    Shopify.queryParams.sort_by = $(this).attr('data-href');

                    ella.filterAjaxClick();

                    var newurl = ella.ajaxCreateUrl();

                    ella.doAjaxToolbarGetContent(newurl);
                };

                sortbyFilter.closest('.dropdown-menu').prev().trigger('click');
            });
        },

        ajaxFilterLimit: function () {
            var limitFilterSlt = '[data-limited-view] li span',
                limitFilter = $(limitFilterSlt);

            body.off('click.sortBy', limitFilterSlt).on('click.sortBy', limitFilterSlt, function (e) {
                e.preventDefault();
                e.stopPropagation();

                var self = $(this),
                    parent = self.parent();

                if (!parent.hasClass('active')) {
                    var dataValue = self.data('value'),
                        value = "" + dataValue + "";

                    $('[data-limited-view] .label-tab .label-text').text(value);

                    ella.doAjaxLimitGetContent(value);
                };

                limitFilter.closest('.dropdown-menu').prev().trigger('click');
            });
        },

        doAjaxLimitGetContent: function (value) {
            if (ella.isAjaxLoading) return;

            $.ajax({
                type: "Post",
                url: '/cart.js',
                data: {
                    "attributes[pagination]": value
                },

                success: function (data) {
                    window.location.reload();
                },

                error: function (xhr, text) {
                    $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
                    ella.showModal('.ajax-error-modal');
                },
                dataType: 'json'
            });
        },

        doAjaxToolbarGetContent: function (newurl) {
            if (ella.isAjaxLoading) return;

            $.ajax({
                type: "get",
                url: newurl,

                beforeSend: function () {
                    ella.showLoading();
                },

                success: function (data) {
                    ella.ajaxMapData(data);
                    ella.initColorSwatchGrid();
                    ella.setTextForSortbyFilter();

                    ella.initSidebarProductSlider();
                    ella.initCountdownNormal();
                },

                error: function (xhr, text) {
                    $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
                    ella.showModal('.ajax-error-modal');
                },

                complete: function () {
                    ella.hideLoading();
                }
            });
        },

        filterSidebar: function () {
            this.queryParams();
            this.ajaxFilterTags();
            this.ajaxFilterClearTags();
            this.ajaxFilterClearAll();
        },

        ajaxFilterTags: function () {
            body.off('click.filterTags').on('click.filterTags', '.sidebar-tags .list-tags a, .sidebar-tags .list-tags label, .refined .selected-tag', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var newTags = [];

                if (Shopify.queryParams.constraint) {
                    newTags = Shopify.queryParams.constraint.split('+');
                };

                //one selection or multi selection
                if (!window.enable_sidebar_multiple_choice && !$(this).prev().is(':checked')) {
                    //remove other selection first
                    var otherTag = $(this).closest('.sidebar-tags, .refined-widgets').find('input:checked');

                    if (otherTag.length) {
                        var tagName = otherTag.val();

                        if (tagName) {
                            var tagPos = newTags.indexOf(tagName);

                            if (tagPos >= 0) {
                                //remove tag
                                newTags.splice(tagPos, 1);
                            }
                        }
                    };
                };

                var tagName = $(this).prev().val();

                if (tagName) {
                    var tagPos = newTags.indexOf(tagName);

                    if (tagPos >= 0) {
                        newTags.splice(tagPos, 1);
                    } else {
                        newTags.push(tagName);
                    };
                };

                if (newTags.length) {
                    Shopify.queryParams.constraint = newTags.join('+');
                } else {
                    delete Shopify.queryParams.constraint;
                };

                ella.filterAjaxClick();

                var newurl = ella.ajaxCreateUrl();

                ella.doAjaxSidebarGetContent(newurl);
            });
        },

        ajaxFilterClearTags: function () {
            var sidebarTag = $('.sidebar-tags');

            sidebarTag.each(function () {
                var sidebarTag = $(this);

                if (sidebarTag.find('input:checked').length) {
                    //has active tag
                    sidebarTag.find('.clear').show().click(function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        var currentTags = [];

                        if (Shopify.queryParams.constraint) {
                            currentTags = Shopify.queryParams.constraint.split('+');
                        };

                        sidebarTag.find("input:checked").each(function () {
                            var selectedTag = $(this);
                            var tagName = selectedTag.val();

                            if (tagName) {
                                var tagPos = currentTags.indexOf(tagName);
                                if (tagPos >= 0) {
                                    //remove tag
                                    currentTags.splice(tagPos, 1);
                                };
                            };
                        });

                        if (currentTags.length) {
                            Shopify.queryParams.constraint = currentTags.join('+');
                        } else {
                            delete Shopify.queryParams.constraint;
                        };

                        ella.filterAjaxClick();

                        var newurl = ella.ajaxCreateUrl();

                        ella.doAjaxSidebarGetContent(newurl);
                    });
                }
            });
        },

        ajaxFilterClearAll: function () {
            var clearAllSlt = '.refined-widgets a.clear-all';
            var clearAllElm = $(clearAllSlt);

            body.off('click.clearAllTags', clearAllSlt).on('click.clearAllTags', clearAllSlt, function (e) {
                e.preventDefault();
                e.stopPropagation();

                delete Shopify.queryParams.constraint;

                ella.filterAjaxClick();

                var newurl = ella.ajaxCreateUrl();

                ella.doAjaxSidebarGetContent(newurl);
            });
        },

        doAjaxSidebarGetContent: function (newurl) {
            if (ella.isAjaxLoading) return;

            $.ajax({
                type: "get",
                url: newurl,

                beforeSend: function () {
                    ella.showLoading();
                },

                success: function (data) {
                    ella.ajaxMapData(data);
                    ella.initColorSwatchGrid();
                    ella.ajaxFilterClearTags();

                    ella.initSidebarProductSlider();
                    ella.initCountdownNormal();
                },

                error: function (xhr, text) {
                    $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
                    ella.showModal('.ajax-error-modal');
                },

                complete: function () {
                    ella.hideLoading();
                }
            });
        },

        ajaxMapData: function (data) {
            var curCollTemplate = $('.collection-template'),
                curBreadcrumb = curCollTemplate.find('.breadcrumb'),
                curSidebar = curCollTemplate.find('.sidebar'),
                curCollHeader = curCollTemplate.find('.collection-header'),
                curProColl = curCollTemplate.find('.product-collection'),
                curPadding = curCollTemplate.find('.padding'),
                curToolbar = curCollTemplate.find('.append--toolbar'),

                newCollTemplate = $(data).find('.collection-template'),
                newBreadcrumb = newCollTemplate.find('.breadcrumb'),
                newSidebar = newCollTemplate.find('.sidebar'),
                newCollHeader = newCollTemplate.find('.collection-header'),
                newProColl = newCollTemplate.find('.product-collection'),
                newPadding = newCollTemplate.find('.padding');

            curBreadcrumb.replaceWith(newBreadcrumb);
            curSidebar.replaceWith(newSidebar);
            curCollHeader.replaceWith(newCollHeader);
            curProColl.replaceWith(newProColl);

            if (curPadding.length > 0) {
                curPadding.replaceWith(newPadding);
            } else {
                if(curCollTemplate.find('.col-main').length) {
                    curCollTemplate.find('.col-main').append(newPadding);
                } else {
                    curCollTemplate.find('.col-no-sidebar').append(newPadding);
                }

            };

            if (curToolbar.length > 0 && curToolbar.html() != '') {
                $('.sidebar .append--toolbar').replaceWith(curToolbar);
            }

            ella.translateBlock('.collection-template');
          
            ella.hide_filter();

            ella.initWishListIcons();

            if ($('[data-view-as]').length) {
                ella.viewModeLayout();
            };

            if (ella.checkNeedToConvertCurrency()) {
                Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
            };

            if ($('.shopify-product-reviews-badge').length && $('.spr-badge').length) {
                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
            };
        },

        initToggleWidgetTitleSidebarFilter: function () {
            var widgetTitleSlt = '[data-has-collapse] .widget-title';
            var sidebarLabelDesktop = '.sidebar-label-desktop';
            var viewMore = '[data-list-filter]';

            body.off('click.toggleWidgetContent').on('click.toggleWidgetContent', widgetTitleSlt, function () {
                $(this).toggleClass('open');
                $(this).next().slideToggle();
            });

            var widgetTitleSltCollNoSidebar = '[data-has-collapse-no-sidebar] .widget-title';
            var wrapper =  $('.toolbar');

            if(win.innerWidth() < 1200) {
                body.off('click.toggleWidgetContent2').on('click.toggleWidgetContent2', widgetTitleSltCollNoSidebar, function () {
                    $(this).toggleClass('open');
                    $(this).next().slideToggle();
                });
                if (win.innerWidth() < 992) {
                    $('.filters-toolbar__sortby').insertAfter('.column-left .sidebar-label');
                } else {
                    $('.filters-toolbar__sortby').appendTo('.toolbar .column-right');
                }
                var h_wrapper = wrapper.outerHeight() + 30;
                var top = wrapper.offset().top;
                $(window).scroll(function () {
                    var h = $('.sticky-wrapper.is-sticky').outerHeight();
                    if ($(this).scrollTop() > top) {
                        $('[data-section-type="collection-template"]').css('padding-top', h_wrapper);
                        wrapper.addClass("toolbar-fix");
                        wrapper.css('top', h);
                    }
                    else {
                        $('[data-section-type="collection-template"]').css('padding-top', 0);
                        wrapper.removeClass("toolbar-fix");
                        wrapper.css('top', 0);
                    }
                });
            } else {
                $('.filters-toolbar__sortby').appendTo('.toolbar .column-right');
                $('[data-section-type="collection-template"]').css('padding-top', 0);
                wrapper.removeClass("toolbar-fix");
                wrapper.css('top', 0);
                if ($('.collection-template-skin-1').length) {
                    $('.toolbar').appendTo('.appendTo-toolbar .container');
                    body.off('click.toggleSidebar').on('click.toggleSidebar', sidebarLabelDesktop, function () {
                        $(this).parents('.halo-collection-content').toggleClass('remove-sidebar');
                    });
                }
                if ($('.toolbar').length && !$('.toolbar').hasClass('different-toolbar')) {
                    $('.toolbar').appendTo('.append--toolbar');
                }
            };

            win.resize(function(){
                if(win.innerWidth() < 1200) {
                    body.off('click.toggleWidgetContent2').on('click.toggleWidgetContent2', widgetTitleSltCollNoSidebar, function () {
                        $(this).toggleClass('open');
                        $(this).next().slideToggle();
                    });
                    if (win.innerWidth() < 992) {
                        $('.filters-toolbar__sortby').insertAfter('.column-left .sidebar-label');
                    } else {
                        $('.filters-toolbar__sortby').appendTo('.toolbar .column-right');
                    }
                    
                    var h_wrapper = wrapper.outerHeight() + 30;
                    var top = wrapper.offset().top;
                    $(window).scroll(function () {
                        var h = $('.sticky-wrapper.is-sticky').outerHeight();
                        if ($(this).scrollTop() > top) {
                            $('[data-section-type="collection-template"]').css('padding-top', h_wrapper);
                            wrapper.addClass("toolbar-fix");
                            wrapper.css('top', h);
                        }
                        else {
                            $('[data-section-type="collection-template"]').css('padding-top', 0);
                            wrapper.removeClass("toolbar-fix");
                            wrapper.css('top', 0);
                        }
                    });
                } else {
                    $('.filters-toolbar__sortby').appendTo('.toolbar .column-right');
                    $('[data-section-type="collection-template"]').css('padding-top', 0);
                    wrapper.removeClass("toolbar-fix");
                    wrapper.css('top', 0);
                    $(window).scroll(function () {
                        wrapper.removeClass("toolbar-fix");
                    });
                    if ($('.collection-template-skin-1').length) {
                        $('.toolbar').appendTo('.appendTo-toolbar .container');
                        body.off('click.toggleSidebar').on('click.toggleSidebar', sidebarLabelDesktop, function () {
                            $(this).parents('.halo-collection-content').toggleClass('remove-sidebar');
                        });
                    }
                    if ($('.toolbar').length && !$('.toolbar').hasClass('different-toolbar')) {
                        $('.toolbar').appendTo('.append--toolbar');
                    }
                };
            })

            body.off('click.viewMoreFilter').on('click.viewMoreFilter', viewMore, function () {
                var last = $(this).parents('.list-tags').find('.last');
                if ($(this).parents('.list-tags').hasClass('show-all')) {
                    last.hide();
                    $(this).text(window.inventory_text.view_more);
                } else {
                    last.show();
                    $(this).text(window.inventory_text.view_less);
                }
                $(this).parents('.list-tags').toggleClass('show-all');
            });

        },

        initInfiniteScrolling: function () {
            var infiniteScrolling = $('.infinite-scrolling');
            var infiniteScrollingLinkSlt = '.infinite-scrolling a';

            if (infiniteScrolling.length) {

                body.off('click.initInfiniteScrolling', infiniteScrollingLinkSlt).on('click.initInfiniteScrolling', infiniteScrollingLinkSlt, function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!$(this).hasClass('disabled')) {
                        var url = $(this).data('href');

                        ella.doAjaxInfiniteScrollingGetContent(url);

                    };

     
                });

                if (window.infinity_scroll_feature) {
                    $(window).scroll(function () {
                        if (ella.isAjaxLoading) return;

                        var collectionTplElm = $('[data-section-type="collection-template"]');

                        if (!collectionTplElm.length) {
                            collectionTplElm = $('[data-search-page]');
                        };

                        var collectionTop = collectionTplElm.offset().top;
                        var collectionHeight = collectionTplElm.outerHeight();
                        var posTop = collectionTop + collectionHeight - $(window).height();

                        if ($(this).scrollTop() > posTop && $(this).scrollTop() < (posTop + 200)) {
                            var button = $(infiniteScrollingLinkSlt);

                            if (button.length && !button.hasClass('disabled')) {
                                var url = button.data('href');

                                ella.doAjaxInfiniteScrollingGetContent(url);
                            };
                        };
                    });
                };
            }
        },

        doAjaxInfiniteScrollingGetContent: function (url) {
            if (ella.isAjaxLoading) return;

            $.ajax({
                type: "get",
                url: url,

                beforeSend: function () {
                    ella.showLoading();
                },

                success: function (data) {
                    ella.ajaxInfiniteScrollingMapData(data);
                    ella.initColorSwatchGrid();
                    if ($('[data-view-as]').length) {
                        ella.viewModeLayout();
                    };
                    ella.initCountdownNormal();
                    ella.stickySidebar();

                    

                   
                },

                error: function (xhr, text) {
                    $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
                    ella.showModal('.ajax-error-modal');
                },

                complete: function () {
                    ella.hideLoading();
                    var number_count = 0;
                    var number_label_new = $('.product-collection .grid-item .product-label').data('label-new-number');
                     $('.product-collection .grid-item').each(function(index){
                        if($(this).find('.new-label').length){
                            number_count ++;
                        }
                        if(number_count > number_label_new){
                            $(this).find('.new-label').hide();
                            $(this).find('.new-label+br').hide();
                        }
                    });
                }
            });
        },

        ajaxInfiniteScrollingMapData: function (data) {
            var collectionTemplate = $('.collection-template'),
                currentProductColl = collectionTemplate.find('.product-collection'),
                currentProductCount = collectionTemplate.find('.padding'),
                newCollectionTemplate = $(data).find('.collection-template'),
                newProductColl = newCollectionTemplate.find('.product-collection'),
                newProductCount = newCollectionTemplate.find('.padding'),
                newProductItem = newProductColl.children('.grid-item').not('.banner-img');

            var showMoreButton = $('.infinite-scrolling a');
            currentProductCount.replaceWith(newProductCount);

            if (newProductColl.length) {
                currentProductColl.append(newProductItem);

                if ($('.collection-template .product-collection[data-layout]').length) {
                    ella.ellaTimeout = setTimeout(function () {
                        currentProductColl.isotope('appended', newProductItem).isotope('layout');
                    }, 700);
                }

                ella.translateBlock('.product-collection');

                if (ella.checkNeedToConvertCurrency()) {
                    Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
                };

                if ($('.shopify-product-reviews-badge').length && $('.spr-badge').length) {
                    return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                };
            };

        },

        addEventViewModeLayout: function () {
            ella.setActiveViewModeMediaQuery();

            body.on('click', '.view-mode .icon-mode', function (e) {
                e.preventDefault();

                var self = $(this),
                    col = self.data('col'),
                    parents = self.closest('[data-view-as]');

                if (!self.hasClass('active')) {
                    parents.find('.icon-mode').removeClass('active');
                    self.addClass('active');

                    ella.viewModeLayout();

                    if (window.innerWidth > 767) {
                        $('.product-collection').find('img').removeClass('lazyautosizes ls-is-cached lazyloaded').addClass('lazyload');
                    }
                };

            });
        },

        viewModeLayout: function () {
            var viewMode = $('[data-view-as]'),
                viewModeActive = viewMode.find('.icon-mode.active'),
                col = viewModeActive.data('col'),
                products = $('.collection-template .product-collection'),
                gridItem = products.find('.grid-item'),
                strClass = 'col-12 col-6 col-md-4 col-lg-3 col5',
                gridClass = 'grid-2 grid-3 grid-4 grid-5 products-grid products-list';

            switch (col) {
                case 1:
                    if(gridItem.hasClass('grid-item-mansory')) {
                        products.removeClass(gridClass).addClass('products-list');
                    } else {
                        products.removeClass('products-grid').addClass('products-list');
                    }

                    gridItem.removeClass(strClass).addClass('col-12');
                    break;

                default:
                    switch (col) {
                        case 2:
                            if(gridItem.hasClass('grid-item-mansory')) {
                                products.removeClass(gridClass).addClass('products-grid');
                            } else {
                                products.removeClass('products-list').addClass('products-grid');
                            }
                            gridItem.removeClass(strClass).addClass('col-6');
                            break;

                        case 3:
                            if(gridItem.hasClass('grid-item-mansory')) {
                                products.removeClass(gridClass).addClass('products-grid');
                            } else {
                                products.removeClass('products-list').addClass('products-grid');
                            }
                            gridItem.removeClass(strClass).addClass('col-6 col-md-4');
                            break;

                        case 4:
                            if(gridItem.hasClass('grid-item-mansory')) {
                                products.removeClass(gridClass).addClass('products-grid');
                            } else {
                                products.removeClass('products-list').addClass('products-grid');
                            }
                            gridItem.removeClass(strClass).addClass('col-6 col-md-4 col-lg-3');
                            break;

                        case 5:
                            if(gridItem.hasClass('grid-item-mansory')) {
                                products.removeClass(gridClass).addClass('products-grid');
                            } else {
                                products.removeClass('products-list').addClass('products-grid');
                            }
                            gridItem.removeClass(strClass).addClass('col-6 col-md-4 col-lg-3 col5');
                            break;
                    }
            };
        },

        setActiveViewModeMediaQuery: function () {
            var viewMode = $('[data-view-as]'),
                viewModeActive = viewMode.find('.icon-mode.active'),
                col = viewModeActive.data('col'),
                windowWidth = window.innerWidth;

            if (windowWidth < 768) {
                if (col === 3 || col == 4 || col == 5) {
                    viewModeActive.removeClass('active');
                    $('[data-col="2"]').addClass('active');
                }
            } else if (windowWidth < 992 && windowWidth >= 768) {
                if (col == 4 || col == 5) {
                    viewModeActive.removeClass('active');
                    $('[data-col="3"]').addClass('active');
                }
            } else if (windowWidth < 1200 && windowWidth >= 992) {
                if (col == 5) {
                    viewModeActive.removeClass('active');
                    $('[data-col="4"]').addClass('active');
                }
            }

            if (viewMode.length) {
                ella.viewModeLayout();
            }
        },

        initPaginationPage: function () {
            var paginationSlt = '.pagination-page a';

            body.off('click', paginationSlt).on('click', paginationSlt, function (e) {
                if(Shopify.queryParams){
                    e.preventDefault();

                var page = $(this).attr('href').match(/page=\d+/g);

                if (page) {
                    Shopify.queryParams.page = parseInt(page[0].match(/\d+/g));

                    if (Shopify.queryParams.page) {
                        var newurl = ella.ajaxCreateUrl();

                        ella.isSidebarAjaxClick = true;

                        History.pushState({
                            param: Shopify.queryParams
                        }, newurl, newurl);

                        ella.doAjaxToolbarGetContent(newurl);

                        var elm = $('[data-section-type="collection-template"]');

                        if (!elm.length) {
                            elm = $('[data-search-page]');
                        }

                        var top = elm.offset().top;

                        $('body,html').animate({
                            scrollTop: top
                        }, 600);
                    };
                };
                }


            });
        },

        changeSwatchEditCart: function() {
            $('[data-template-cart-edit] .swatch :radio').on('change', function(e){
                var _self = $(this);
                var productItem = $(this).parents('.product-edit');
                var handle = productItem.data('product-handle');
                var src_img = $(this).data('image');
                var productId = productItem.data('cart-edit-id');
                var variantList = window.productVariants[productId];
                var optionIdx = _self.closest('[data-option-index]').data('option-index');
                var swatches = productItem.find('.swatch-element');
                var thisVal = _self.val();
                var selectedVariant;
                var productInput = productItem.find('[name=id]');
                var selectedSwatchOpt1 = productItem.find('[data-option-index="0"]').find('input:checked').val();
                var selectedSwatchOpt2 = productItem.find('[data-option-index="1"]').find('input:checked').val();
                var selectedSwatchOpt3 = productItem.find('[data-option-index="2"]').find('input:checked').val();
                swatches.removeClass('soldout');
                swatches.find(':radio').prop('disabled',false);
                switch (optionIdx){
                    case 0:
                        var availableVariants = variantList.find(function(variant){
                            return variant.option1 == thisVal && variant.option2 == selectedSwatchOpt2 && variant.available;
                        })
                        // console.log(selectedSwatchOpt2);

                        if(availableVariants != undefined){
                            selectedVariant =  availableVariants;
                        }else{
                             // variant was sold out, so auto select other available variant
                            var altAvailableVariants = variantList.find(function(variant){
                                return variant.option1 == thisVal && variant.available;
                            })
                            selectedVariant =  altAvailableVariants;
                        };
                        break;
                    case 1:
                        var availableVariants = variantList.find(function(variant){
                            return variant.option1 == selectedSwatchOpt1 && variant.option2 == thisVal && variant.available;
                        })
                        if(availableVariants != undefined){
                            selectedVariant =  availableVariants;
                        };
                        break;
                    case 2:
                        var availableVariants = variantList.find(function(variant){
                            return variant.option1 == selectedSwatchOpt1 && variant.option2 == selectedSwatchOpt2 && variant.option3 == thisVal && variant.available;
                        })
                        if(availableVariants != undefined){
                           selectedVariant =  availableVariants;
                        }else{
                            // Something went wrong, if correct, never meet this
                            console.log('Bundle Error: variant was soldout, on option selection #3')
                        };
                        break;
                }
                productInput.val(selectedVariant.id);

                productItem.find('.option').text(selectedVariant.public_title);

                productItem.find('.price').html(Shopify.formatMoney(selectedVariant.price, window.money_format));

                if (selectedVariant.compare_at_price > selectedVariant.price) {
                    productItem.find('.prices').addClass('special-price');
                    productItem.find('.compare-price').html(Shopify.formatMoney(selectedVariant.compare_at_price, window.money_format)).show();
                }
                else {
                    productItem.find('.compare-price').hide();
                    productItem.find('.prices').removeClass('special-price');
                }

                if (ella.checkNeedToConvertCurrency()) {
                    Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
                }

                ella.disableSoldoutSwatchEdit(productItem);

                if (selectedVariant.featured_image) {
                    productItem.find('#product-featured-image').attr('src', selectedVariant.featured_image.src);
                }
                var value = $(this).val();
                $(this).parents('.swatch').find('[data-header-option]').text(value);

                $.ajax({
                    url: "/products/" + handle + "?view=cart_edit",
                    success: function(data){
                        var json = $(data).find('.get_script_content').data('array_json');
                        var arr = json.filter(function(cur){
                            return parseInt(cur.id) === selectedVariant.id
                        });
                        productItem.find('[name="quantity"]').attr('data-line', arr[0].value);
                    }
                });
                $('.error-message-input').text('');
            });

            $('[data-template-cart-edit] .single-option-selector').on('change', function(){
                var _self = $(this);
                var productItem = $(this).parents('.product-edit');
                var handle = productItem.data('product-handle');
                var productId = productItem.data('cart-edit-id');
                var variantList = window.productVariants[productId];
                var optionIdx = _self.data('option');
                var thisVal = _self.val();
                var selectedVariant;
                var productInput = productItem.find('[name=id]');
                var selectedSwatchOpt1 = productItem.find('[data-option="option1"]').val();
                var selectedSwatchOpt2 = productItem.find('[data-option="option2"]').val();
                var selectedSwatchOpt3 = productItem.find('[data-option="option3"]').val();
                switch (optionIdx){
                    case 'option1':
                        var availableVariants = variantList.find(function(variant){
                            return variant.option1 == thisVal && variant.option2 == selectedSwatchOpt2 && variant.available;
                        })
                        if(availableVariants != undefined){
                            selectedVariant =  availableVariants;
                        }else{
                             // variant was sold out, so auto select other available variant
                            var altAvailableVariants = variantList.find(function(variant){
                                return variant.option1 == thisVal && variant.available;
                            })
                            selectedVariant =  altAvailableVariants;
                        };
                        break;
                    case 'option2':
                        var availableVariants = variantList.find(function(variant){
                            return variant.option1 == selectedSwatchOpt1 && variant.option2 == thisVal && variant.available;
                        })
                        if(availableVariants != undefined){
                            selectedVariant =  availableVariants;
                        };
                        break;
                    case 'option3':
                        var availableVariants = variantList.find(function(variant){
                            return variant.option1 == selectedSwatchOpt1 && variant.option2 == selectedSwatchOpt2 && variant.option3 == thisVal && variant.available;
                        })
                        if(availableVariants != undefined){
                           selectedVariant =  availableVariants;
                        };
                        break;
                }
                productInput.val(selectedVariant.id);



                productItem.find('.price').html(Shopify.formatMoney(selectedVariant.price, window.money_format));

                if (selectedVariant.compare_at_price > selectedVariant.price) {
                    productItem.find('.prices').addClass('special-price');
                    productItem.find('.compare-price').html(Shopify.formatMoney(selectedVariant.compare_at_price, window.money_format)).show();
                }
                else {
                    productItem.find('.compare-price').hide();
                    productItem.find('.prices').removeClass('special-price');
                }

                if (ella.checkNeedToConvertCurrency()) {
                    Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
                }

                productItem.find('.option').text(selectedVariant.public_title);

                if (selectedVariant.featured_image) {
                    productItem.find('#product-featured-image').attr('src', selectedVariant.featured_image.src);
                }

                $.ajax({
                    url: "/products/" + handle + "?view=cart_edit",
                    success: function(data){
                        var json = $(data).find('.get_script_content').data('array_json');
                        var arr = json.filter(function(cur){
                            return parseInt(cur.id) === selectedVariant.id
                        });
                        productItem.find('[name="quantity"]').attr('data-line', arr[0].value);
                    }
                });
                $('.error-message-input').text('');
            })
        },

        editCart: function() {
            if (ella.isAjaxLoading) return;
            body.off('click.editcart').on('click.editcart', '[data-cart-edit]', function (e) {
                var url = $(this).data('url'),
                    idVariant = $(this).data('id'),
                    quantity = $(this).data('quantity');
                $.ajax({
                    type: "get",
                    url: url,
                    cache: false,
                    dataType: 'html',
                    beforeSend: function() {
                        ella.showLoading();
                        html.css({
                            "overflow": "hidden"
                        });
                    },
                    success: function(data) {
                        var cartEditTemplate = $('[data-cart-edit-modal]'),
                            modalContent = cartEditTemplate.find('.halo-modal-body');
                        modalContent.html(data);
                        $('#product-edit').find('input[name="quantity"]').val(quantity);
                        setTimeout(function () {
                            ella.translateBlock('[data-template-cart-edit]');
                            ella.updateCartEdit(idVariant);
                            ella.addMoreCart();
                            ella.closeSuccessModal();
                            ella.changeSwatchEditCart();

                        }, 500);
                        $('.product-edit .swatch').each(function(){
                            var value = $(this).find('input:checked').val();
                            $(this).find('[data-header-option]').text(value);
                        });
                        ella.hideLoading();
                        cartEditTemplate.fadeIn(600);
                    },
                    error: function(xhr, text) {
                        ella.hideLoading();
                    }
                });
                
            })
        },

        addMoreCart: function(){
            var addMore = $('[data-addmore]');
            var removeItem = '[data-remove-cart]';
            $(addMore).off('click').on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                $('.error-message-input').text('');
                var first = $('.product-edit:eq(1)').clone();
                var length = $('.product-edit').length;

                first[0].id = 'product-edit-' + length;

                $(first).find('.swatch-element').each(function(){
                    var option_1 = $(this).find('[name="option-0"]').attr('id'),
                        option_2 = $(this).find('[name="option-1"]').attr('id'),
                        option_3 = $(this).find('[name="option-2"]').attr('id');
                    $(this).find('[name="option-0"]').attr('name', 'list-' + length + '-option-0').attr('id', 'list-' + length + '-' + option_1);
                    $(this).find('[name="option-1"]').attr('name', 'list-' + length + '-option-1').attr('id', 'list-' + length + '-' + option_2);
                    $(this).find('[name="option-2"]').attr('name', 'list-' + length + '-option-2').attr('id', 'list-' + length + '-' + option_3);

                    $(this).find('[data-label="swatch-edit-cart-0"]').attr('for', 'list-' + length + '-' + option_1);
                    $(this).find('[data-label="swatch-edit-cart-1"]').attr('for', 'list-' + length + '-' + option_2);
                    $(this).find('[data-label="swatch-edit-cart-2"]').attr('for', 'list-' + length + '-' + option_3);
                });

                $(first).insertBefore('[data-template-cart-edit] form .cart-meta--action');

                $('#product-edit-' + length).find('input[name="quantity"]').val(1);

                $('#product-edit-' + length + ' .swatch').each(function(){
                    var value = $(this).find('input:checked').val();
                    $(this).find('[data-header-option]').text(value);
                });

                ella.changeSwatchEditCart();

                if (window.use_color_swatch == false) {
                    Shopify.linkOptionSelectors(window._json, '#product-edit-' + length, true);
                }
            });
            body.off('click.removeItemCart', removeItem).on('click.removeItemCart', removeItem, function (e) {
                $(this).parents('.product-edit').remove();
            })
        },

        updateCartEdit: function(idVariant) {

            var btnAddToCartSlt = $('[data-update-cart-edit]');
            $(btnAddToCartSlt).off('click').on('click', function(e){
                e.preventDefault();
                e.stopPropagation();

                var self = $(this);

                if (self.attr('disabled') !== "disabled") {
                    var sectionsProduct = self.closest('[data-template-cart-edit]');

                    var form = sectionsProduct.find('form'),
                        groupedProduct = form.find('.product-edit');

                    var ajax_calls  = [],
                        ajax_caller = function(data) {
                            return $.ajax(data);
                        }
                    var check = false;
                    groupedProduct.not('.first').each(function() {
                        var variantId = $(this).find('[name="id"]').val(),
                        quantity = parseInt($(this).find('input[name="quantity"]').val()),
                        line = parseInt($(this).find('input[name="quantity"]').data('line'));

                        if (quantity > line && line > 0) {
                            check = true;
                            $(this).find('.error-message-input').html('<i class="fa fa-exclamation-circle"></i>' + window.inventory_text.warning_quantity + ': ' + line);
                        } else {
                            $(this).find('.error-message-input').text('');
                        }
                    });

                    if (check == false) {
                        groupedProduct.each(function() {
                            var variantId = $(this).find('[name="id"]').val(),
                            quantity = parseInt($(this).find('input[name="quantity"]').val()),
                            line = parseInt($(this).find('input[name="quantity"]').data('line'));

                            var url = '';
                            if (quantity < 1) {
                                url = window.router + '/cart/change.js';
                            } else {
                                url = window.router + '/cart/add.js';
                            }
                            if (line < quantity && line > 0) {
                                quantity = line;
                              
                            }
                            
                            ajax_calls.push(ajax_caller({
                                type: "post",
                                url: url,
                                data: 'quantity=' + quantity + '&id=' + variantId,
                                dataType: 'json',
                                async: false
                            }));
                        });

                        if(ajax_calls.length) {
                            $.when.apply(this, ajax_calls).done(function(e) {
                                ella.updateDropdownCart();
                                if (body.hasClass('template-cart')) {
                                    window.location.reload();
                                } else {
                                    $('[data-cart-edit-modal] .close-modal').trigger('click');
                                }
                            });
                        }
                        ella.getPopupShoppingCart(false,undefined);
                    }
                };
            });
        },

        disableSoldoutSwatchEdit: function(productItem){
            var productId = productItem.data('cart-edit-id');
            var variantList = window.productVariants[productId];
            var options = productItem.find('[data-option-index]');
            var selectedSwatchOpt1 = productItem.find('[data-option-index="0"]').find('input:checked').val();
            var selectedSwatchOpt2 = productItem.find('[data-option-index="1"]').find('input:checked').val();
            var selectedSwatchOpt3 = productItem.find('[data-option-index="2"]').find('input:checked').val();

            options.each(function(){
                var optionIndex = $(this).data('option-index');
                var swatch = $(this).find('.swatch-element');
                switch (optionIndex) {
                    case 0:
                    // loop through all swatchs in option 1 anh filter sold out swatch
                    swatch.each(function(){
                        var swatchVal = $(this).data('value');
                        var opt1Soldout = variantList.find(function(variant){
                            return variant.option1 == swatchVal && variant.available;
                        });
                        if(opt1Soldout == undefined){
                            $(this).addClass('soldout');
                            $(this).find(':radio').prop('disabled',true);
                        } else {
                            $(this).removeClass('soldout');
                            $(this).find(':radio').prop('disabled',false);
                        }
                    })
                    break;
                    case 1:
                    // loop through all swatchs in option 2 anh filter sold out swatch
                    swatch.each(function(){
                        var swatchVal = $(this).data('value');
                        var opt1Soldout = variantList.find(function(variant){
                            return variant.option1 == selectedSwatchOpt1 && variant.option2 == swatchVal && variant.available;
                        });
                        if(opt1Soldout == undefined){
                            $(this).addClass('soldout');
                            $(this).find(':radio').prop('disabled',true);
                        } else {
                            $(this).removeClass('soldout');
                            $(this).find(':radio').prop('disabled',false);
                        }
                        
                    })
                    break;
                    case 2:
                    // loop through all swatchs in option 3 anh filter sold out swatch
                    swatch.each(function(){
                        var swatchVal = $(this).data('value');
                        var opt1Soldout = variantList.find(function(variant){
                            return variant.option1 == selectedSwatchOpt1 && variant.option2 == selectedSwatchOpt2 && variant.option3 == swatchVal && variant.available;
                        });
                        if(opt1Soldout == undefined){
                            $(this).addClass('soldout');
                            $(this).find(':radio').prop('disabled',true);
                        } else {
                            $(this).removeClass('soldout');
                            $(this).find(':radio').prop('disabled',false);
                        }
                    })
                    break;
                }
            });

            if (productItem.find('[data-option-index="1"]').find('input:checked').parents('.swatch-element').hasClass('soldout')) {
                productItem.find('[data-option-index="1"]').find('.available:not(.soldout)').eq('0').find('label').trigger('click');
                productItem.find('[data-option-index="1"]').find('.available:not(.soldout)').eq('0').find('input').prop('checked',true);
            }
        },

        changeQuantityAddToCart: function () {
            var buttonSlt = '[data-minus-quantity], [data-plus-quantity]',
                buttonElm = $(buttonSlt),
                inputQ = $('.update-cart--template');

            doc.on('click', buttonSlt, function (e) {
                e.preventDefault();
                e.stopPropagation();

                var self = $(this),
                    input = self.siblings('input[name="quantity"]').length > 0 ? self.siblings('input[name="quantity"]') : self.siblings('input[name="group_quantity"]');


                var id = self.closest("[data-item-id]").data("item-id");
                if (input.length < 1) {
                    input = self.siblings('input[name="updates[]"]');
                }
                var val = parseInt(input.val());
                switch (true) {
                    case (self.hasClass('plus')):
                        {
                            val +=1;
                            break;
                        }
                    case (self.hasClass('minus') && val > 0):
                        {
                            val -=1;
                            break;
                        }
                }
                input.val(val);
                self.parent().find('[type="number"]').trigger('change');
            });
            inputQ.on('change', function(){
                var self = $(this);
                var productItem = self.parents('.cart-product-item'),
                    line = self.data('line'),
                    val = self.val(),
                    productId = $(productItem).data('item-id');
                var Price = productItem.find('.price');

                if (line < val) {
                    self.parent().css('border-color', 'red');
                } else {
                    self.parent().css('border-color', '#cdcdcd');
                    ella.doAjaxUpdateCart(productId, val, line, Price, productItem);
                }
            });

            $('.cart-form .remove ').on('click', function(event) {
                event.preventDefault();
                var productItem = $(this).parents('.cart-product-item'),
                    productId = $(productItem).data('item-id');
                Shopify.removeItem(productId, function(cart) {

                    ella.doUpdateDropdownCart(cart);
                    ella.initFreeShippingMessage();

                    $(productItem).remove();

                    $('.total .price').html(Shopify.formatMoney(cart.total_price, window.money_format));

                    if (ella.checkNeedToConvertCurrency()) {
                        Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
                    }

                    if ($('.cart_items ul li').children().length > 0) {
                        $('.no-item-cart').hide();
                        $('.wrapper-cart-template').show();
                    } else {      
                        $('.wrapper-cart-template').hide();
                        $('.no-item-cart').show();
                    }
                });
            });
        },

        initFreeShippingMessage: function () {
            jQuery.getJSON('/cart.js', function(cart){
                ella.FreeShippingMessage(cart);
            });
        },

        FreeShippingMessage: function (cart) {
            var freeshipEligible = 0;

            var freeshipText = window.free_shipping_text.free_shipping_message_1;
            var freeshipText2 = window.free_shipping_text.free_shipping_message_2;
            var freeshipText3 = window.free_shipping_text.free_shipping_message_3;
            var freeshipText4 = window.free_shipping_text.free_shipping_message_4;
            var extraPrice = 0;
            var shipVal = window.free_shipping_text.free_shipping_1;
            // 
            var color1 = window.free_shipping_color1;
            var color2 = window.free_shipping_color2;
            var color3 = window.free_shipping_color3;

            var freeshipPrice = parseInt(window.free_shipping_price);

            if (window.multi_lang && translator.isLang2()) {
                freeshipText = window.lang2.cart.general.free_shipping_message_1;
                freeshipText2 = window.lang2.cart.general.free_shipping_message_2;
                freeshipText3 = window.lang2.cart.general.free_shipping_message_3;
                shipVal = window.lang2.cart.general.free_shipping_1;
            }

            var cartTotalPrice =  parseInt(cart.total_price) / 100;
            var freeshipBar = Math.round((cartTotalPrice * 100)/freeshipPrice) ;

            if (cartTotalPrice >= freeshipPrice) {
                freeshipEligible = 1;
            } else {
                extraPrice = parseInt(freeshipPrice - cartTotalPrice);
                freeshipText = freeshipText2 + ' ' + Shopify.formatMoney(extraPrice * 100, window.money_format) + ' ' + freeshipText3 + '<b>  ' + freeshipText4 + ' </b>';
                shipVal = window.free_shipping_text.free_shipping_2;
            }

            if(freeshipBar >= 100 ){
                freeshipBar = 100;
            }

            if(freeshipBar == 0){
                ella.checkItemsInDropdownCart();
            }

            var color = color3;
            if(freeshipBar <= 30 ) {
                color = color1;
            }
            else if( freeshipBar <= 60) {
                color = color2;
            }
            else if( freeshipBar == 100 ){
                   
            }

            var progress = '<div class="progress_shipping" role="progressbar" style="height: 15px; margin-top: 10px; margin-bottom: 10px;background-color: #e1dfd6;-webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);box-shadow: inset 0 1px 2px rgba(0,0,0,.1);">\
            <div class="progress-meter" style="position: relative;display: block;height: 100%;background-color: '+color+';text-align: center; line-height: 15px;color: #ffffff;width: '+freeshipBar+'%; -webkit-animation: 2s linear 0s normal none infinite running progress-bar-stripes;animation: 2s linear 0s normal none infinite running progress-bar-stripes;background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,rgba(0,0,0,0) 25%,rgba(0,0,0,0) 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,rgba(0,0,0,0) 75%,rgba(0,0,0,0)); background-size: 40px 40px; transition: 0.9s linear; transition-property: width, background-color;">'+freeshipBar+'%</div>\
            </div>';

            $('.free_shipping_progress').html(progress);

            $('.free_shipping_massage1').html(freeshipText);
            $('#dropdown-cart .summary .free_shipping .text').html(shipVal);
          
            if (ella.checkNeedToConvertCurrency()) {
              Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
            }
        },

        doAjaxUpdateCart: function(productId, quantity, cartButton, Price, productItem){
            var checkInv = $(cartButton).data('line'),
                price = parseFloat( Price.data('price') )*quantity,
                price2 = parseFloat( Price.data('price') )*checkInv;

            $.ajax({
                type: "post",
                url: "/cart/change.js",
                data: 'quantity=' + quantity + '&id=' + productId,
                dataType: 'json',
                beforeSend: function() {
                    ella.showLoading();
                },
                success: function(cart) {
                    if(quantity == 0){
                        productItem.remove();
                    }

                    if (cart.item_count < 1) {
                        $('.wrapper-cart-template').hide();
                        $('.no-item-cart').show();
                    }

                    Price.html(Shopify.formatMoney(price, window.money_format));  
                    $('.total .price').html(Shopify.formatMoney(cart.total_price, window.money_format));

                    ella.updateDropdownCart();
                    ella.initFreeShippingMessage();
                    ella.hideLoading();

                },
                error: function(xhr) {          
                    ella.hideLoading();
                }
            });
        },

        toggleVariantsForExpressOrder: function () {
            var toggleVariant = '[data-toggle-variant]';

            doc.on('click', toggleVariant, function (e) {
                e.preventDefault();
                e.stopPropagation();

                var self = $(this),
                    curVariants = self.data('target');

                if(self.hasClass('show-options-btn')) {
                    self.text(window.inventory_text.hide_options);
                    $(curVariants).slideDown(700, function () {
                        self.addClass('hide-options-btn').removeClass('show-options-btn');
                    });
                }
                else {
                    self.text(window.inventory_text.show_options);
                    $(curVariants).slideUp(700, function () {
                        self.addClass('show-options-btn').removeClass('hide-options-btn');
                    });
                };
            })
        },

        initExpressOrderAddToCart: function() {
            var addToCartSlt = '[data-express-addtocart]';

            doc.off('click.addToCartExpress', addToCartSlt).on('click.addToCartExpress', addToCartSlt, function (e) {
                e.preventDefault();

                var self = $(this);

                if (self.attr('disabled') != 'disabled') {
                    var productItem = self.closest('.product-item');

                    if(productItem.length == 0) {
                        productItem = self.closest('.col-options');
                    }

                    var form = productItem.find('form');
                    var variant_id = form.find('select[name=id]').val();

                    if (!variant_id) {
                        variant_id = form.find('input[name=id]').val();
                    };

                    var quantityElm = productItem.find('input[name=quantity]');

                    if(quantityElm.length == 0) {
                        quantityElm = productItem.siblings('.col-qtt').find('input[name=quantity]');
                    }

                    var quantity = quantityElm.val();
                    if (!quantity) {
                        quantity = 1;
                    };

                    if(parseInt(quantity) !== 0) {
                        if (window.ajax_cart == 'none') {
                            form.submit();
                        } else {
                            ella.expressAjaxAddToCart(variant_id, quantity, self, form);
                            form.next('.feedback-text').show();
                        }
                    }
                    else {
                        form.next('.feedback-text').text('Quantity cannot be blank').show();
                    }
                }
                return false;
            });
        },

        expressAjaxAddToCart: function(variant_id, quantity, cartBtn, form) {
            $.ajax({
                type: "post",
                url: "/cart/add.js",
                data: 'quantity=' + quantity + '&id=' + variant_id,
                dataType: 'json',

                beforeSend: function() {
                    window.setTimeout(function() {
                        cartBtn.text(window.inventory_text.adding +"...");
                    }, 100);
                },

                success: function(msg) {
                    window.setTimeout(function() {
                        cartBtn.text(window.inventory_text.thank_you);
                    }, 600);
                    window.setTimeout(function() {
                        cartBtn.text(window.inventory_text.add_more + "...");
                    }, 1000);

                    ella.updateDropdownCart();

                    cartBtn.addClass('add_more');
                    form.next('.feedback-text').text(window.inventory_text.cart_feedback);
                },

                error: function(xhr, text) {
                    $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
                    ella.showModal('.ajax-error-modal');
                    window.setTimeout(function() {
                        cartBtn.text(window.inventory_text.add_to_cart);
                    }, 400);
                }
            });
        },

        initAddToCart: function () {
            var btnAddToCartSlt = '[data-btn-addToCart]';

            doc.off('click.addToCart', btnAddToCartSlt).on('click.addToCart', btnAddToCartSlt, function (e) {
                e.preventDefault();
                e.stopPropagation();
                var self = $(this);
                var thisForm = $(self.data('form-id'));
                
                var data = thisForm.serialize();

                if (self.attr('disabled') !== "disabled") {
                    var productItem = self.closest('.product-item');

                    if (productItem.length < 1) {
                        var sectionsProduct = self.closest('[data-section-type="product"]');

                        if (!sectionsProduct.length) {
                            sectionsProduct = self.closest('.quickview-tpl');
                        }

                        productItem = sectionsProduct.find('.product-shop');
                    };

                    var form = self.closest('form'),
                        handle = productItem.find('.product-grid-image').data('collections-related') || sectionsProduct.data('collections-related');

                    switch (window.ajax_cart) {
                        case "none":
                            form.submit();
                            break;

                        case "normal":
                            var title = productItem.find('.product-title').html();
                            var image = productItem.find('.product-grid-image img').attr('data-srcset');

                            if(!image) {
                                image = productItem.siblings('.product-photos').find('.slick-current img[id|="product-featured-image"]').attr('src') || productItem.siblings('.product-photos').find('.slick-current img[id|="qv-product-featured-image"]').attr('src');
                            }

                            ella.doAjaxAddToCartNormal(data, title, image);
                            $('[data-compare-modal]').hide();
                            break;

                        case "upsell":
                            ella.doAjaxAddToCart(data, handle);
                            $('[data-compare-modal]').hide();
                            break;
                    };

                }
                return false;
            });

            ella.closeSuccessModal();
        },

        initGroupedAddToCart: function() {
            var btnAddToCartSlt = '[data-grouped-addToCart]';

            ella.changeVariantSelectOption();

            doc.off('click.GroupedAddToCart', btnAddToCartSlt).on('click.GroupedAddToCart', btnAddToCartSlt, function (e) {
                e.preventDefault();
                e.stopPropagation();

                var self = $(this);
                var formData = $(self.data('form-id'));
                var data = formData.serialize();

                if (self.attr('disabled') !== "disabled") {
                    var sectionsProduct = self.closest('[data-section-type="product"]'),
                        productItem = sectionsProduct.find('.product-shop');

                    var form = productItem.find('form[action="/cart/add"]'),
                        handle = sectionsProduct.data('collections-related'),
                        groupedProduct = form.find('.grouped-product');

                    Shopify.queue = [];

                    groupedProduct.each(function() {
                        variantId = $(this).find('input[type=hidden]').attr('value'),
                        quantity = parseInt($(this).find('input[name=group_quantity]').val());

                        if(quantity > 0 && variantId !== '') {
                            Shopify.queue.push( {
                                variantId: variantId,
                                quantity: parseInt(quantity, 10) || 0
                            });
                        };
                    });

                    Shopify.moveAlong = function() {
                        if (Shopify.queue.length) {
                            var request = Shopify.queue.shift();

                            Shopify.addItem(request.variantId, request.quantity, Shopify.moveAlong);
                        }

                        else {

                            switch (window.ajax_cart) {
                                case "none":
                                  form.submit();
                                  break;

                                case "normal":
                                    var title = productItem.find('.product-title').html();
                                    var image = productItem.find('.product-grid-image img').attr('src');

                                    if(!image) {
                                        image = productItem.siblings('.product-photos').find('.slick-current img[id|="product-featured-image"]').attr('src') || productItem.siblings('.product-photos').find('.slick-current img[id|="qv-product-featured-image"]').attr('src');
                                    }
                                    ella.doAjaxAddToCartNormal(data, title, image);
                                    break;

                                case "upsell":
                                    ella.doAjaxAddToCart(data, handle);
                                    break;
                            };
                            return false;
                        };
                    }

                    Shopify.moveAlong();
                };
            });

            ella.closeSuccessModal();
        },

        changeVariantSelectOption: function() {
            var selectSlt = '[data-select-change-variant]';

            doc.on('change', selectSlt, function() {
                var value = $(this).val(),
                    dataImg = $(this).find('option:selected').data('img'),
                    dataPrice = $(this).find('option:selected').data('price'),
                    parent = $(this).closest('.grouped-product');

                parent.find('input[type=hidden]').val(value);
                parent.find('.product-img img').attr({ src: dataImg });
                parent.find('[data-price-change]').html(Shopify.formatMoney(dataPrice, window.money_format));

                if (ella.checkNeedToConvertCurrency()) {
                    Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), '.grouped-product span.money', 'money_format');
                }
            });
        },

        closeSuccessModal: function () {
            var ajaxCartModal = $('[data-ajax-cart-success], [data-quickview-modal], [data-compare-modal], [data-compare-message-modal]'),
                editCart = $('[data-cart-edit-modal]'),
                closeWindow = ajaxCartModal.find('.close-modal, .continue-shopping'),
                modalContent = ajaxCartModal.find('.halo-modal-content'),
                closeEdit = editCart.find('.close-modal'),
                modalContentEdit = editCart.find('.halo-modal-content');

            closeWindow.click(function (e) {
                e.preventDefault();
                ajaxCartModal.fadeOut(500, function () {
                    html.removeClass('halo-modal-open');
                    html.css({
                        "overflow": ""
                    });

                    if (body.hasClass('template-cart')) {
                        window.location.reload();
                    }
                });
            });

            ajaxCartModal.on('click', function (e) {
                if (!modalContent.is(e.target) && !modalContent.has(e.target).length) {
                    ajaxCartModal.fadeOut(500, function () {
                        html.removeClass('halo-modal-open');
                        html.css({
                            "overflow": ""
                        });

                        if (body.hasClass('template-cart')) {
                            window.location.reload();
                        }
                    });
                };
            });
            closeEdit.on('click', function (e) {
                e.preventDefault();
                editCart.fadeOut(500, function () {
                    html.removeClass('halo-modal-open');
                    html.css({
                        "overflow": ""
                    });
                });
            });

            editCart.on('click', function (e) {
                if (!modalContentEdit.is(e.target) && !modalContentEdit.has(e.target).length) {
                    editCart.fadeOut(500, function () {
                        html.removeClass('halo-modal-open');
                        html.css({
                            "overflow": ""
                        });
                    });
                };
            });
        },

        doAjaxAddToCartNormal: function(data, title, image) {
            $.ajax({
                type: "POST",
                url: "/cart/add.js",
                data: data,
                dataType: "json",

                beforeSend: function () {
                    ella.showLoading();
                },

                success: function () {
                    var ajaxCartModal = $('[data-ajax-cart-success]'),
                        modalContent = ajaxCartModal.find('.cart-modal-content');

                    modalContent.find('.ajax-product-title').html(ella.translateText(title));
                    modalContent.find('.ajax-product-image').attr('src', image);
                    modalContent.find('.message-added-cart').show();

                    ajaxCartModal.fadeIn(600, function () {
                        // html.addClass('halo-modal-open'); 

                        if ($('[data-quickview-modal]').is(':visible')) {
                            $('[data-quickview-modal]').hide();
                        }

                        ella.closeLookbookModal();
                    });
                    ella.updateDropdownCart();
                },

                error: function (xhr) {
                    $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
                    ella.showModal('.ajax-error-modal');
                },

                complete: function () {
                    ella.hideLoading();
                }
            });
        },

        doAjaxAddToCart: function (data, handle,nojax) {
            $.ajax({
                type: "POST",
                url: "/cart/add.js",
                data: data,
                dataType: "json",
                async: false,
                beforeSend: function () {
                    ella.showLoading();
                },

                success: function (data) {
                  if(!nojax){
                    ella.getPopupShoppingCart(true,handle);
                    
                  }else{
        
                    var discount_code = "FBT-BUNDLE-"+ meta.product.id;
                    ella.apply_discount( discount_code );
                    window.location.href = '/cart';
                    ella.showloading();
                    
                  }
                },

                error: function (xhr) {
                    $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
                    ella.showModal('.ajax-error-modal');
                },

                complete: function () {
                    ella.hideLoading();
                }
            });
        },

        getPopupShoppingCart: function (shouldShowModel, handle) {
            
            var ajaxCartModal = $('[data-ajax-cart-success]'),
                modalContent = ajaxCartModal.find('.cart-popup-content'),
                collUpsell = ajaxCartModal.find('.cart-popup-coll-related');

            $.get(window.router + "/cart?view=json", function (data) {
                modalContent.html(data);
                if (handle != undefined) {
                  var _handle = handle.split('/collections')[0];
                  var _handle1 = _handle + '/collections/?view=related';
                  if (shouldShowModel) {
                    if (handle != _handle1) {
                      collUpsell.load('' + handle + '');
                    } else {
                      collUpsell.load(_handle + '/collections/all?view=related');
                    };
                    $( document ).ajaxComplete(function( event, xhr, settings ) {
                      if ( settings.url === "/collections/all?view=related" || settings.url === '' + handle + '') {
                        try{
                          if (ella.checkNeedToConvertCurrency()) {
                            Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), '[data-ajax-cart-success] span.money', 'money_format');
                          }
                        }
                        catch(e){
                          console.log(e)
                        }
                      }
                    });
                  }
                }
            }).always(function () {
                ella.updateDropdownCart();

                ella.ellaTimeout = setTimeout(function () {
                    ella.translateBlock('[data-ajax-cart-success]');

                    if ($('.shopify-product-reviews-badge').length && $('.spr-badge').length) {
                        return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                    };
                }, 1000);

                if (ella.checkNeedToConvertCurrency()) {
                    Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), '[data-ajax-cart-success] span.money', 'money_format');
                }

                if (shouldShowModel) {
                    ajaxCartModal.fadeIn(600, function () {
                        // html.addClass('halo-modal-open');

                        if ($('[data-quickview-modal]').is(':visible')) {
                            $('[data-quickview-modal]').hide();
                        }

                        ella.closeLookbookModal();
                    });
                }
            });
        },

        doAjaxUpdatePopupCart: function (quantity, id) {
            $.ajax({
                type: 'POST',
                url: '/cart/change.js',
                data: {
                    id: id,
                    quantity: quantity
                },
                dataType: 'json',

                beforeSend: function () {
                    ella.showLoading();
                },

                success: function (result) {
                    ella.getPopupShoppingCart(false);
                    ella.checkBundleProducts();
                },

                error: function (xhr) {
                    $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
                    ella.showModal('.ajax-error-modal');
                },

                complete: function () {
                    ella.hideLoading();
                }
            });
        },

        initChangeQuantityButtonEvent: function () {
            var buttonSlt = '[data-minus-quantity-cart], [data-plus-quantity-cart]',
                buttonElm = $(buttonSlt);

            doc.off('click.updateCart').on('click.updateCart', buttonSlt, function (e) {
                e.preventDefault();
                e.stopPropagation();

                var btn = $(this);
                var id = btn.closest("[data-product-id]").data("product-id");
                var quantity = parseInt(btn.siblings('input[name="quantity"]').val());

                if (btn.hasClass('plus')) {
                    quantity += 1;
                } else {
                    quantity -= 1;
                };

                ella.doAjaxUpdatePopupCart(quantity, id);

            });
        },

        initQuantityInputChangeEvent: function () {
            var quantityIptSlt = '[data-quantity-input]';

            doc.on('change', quantityIptSlt, function () {
                var id = $(this).closest("[data-product-id]").data("product-id"),
                    quantity = parseInt($(this).val());

                ella.doAjaxUpdatePopupCart(quantity, id);
            });
        },

        removeCartItem: function () {
            var removeSlt = '.cart-remove';

            doc.on('click', removeSlt, function (e) {
                e.preventDefault();
                e.stopPropagation();

                var id = $(this).closest("[data-product-id]").data("product-id");

                ella.doAjaxUpdatePopupCart(0, id);
            });
        },

        initSoldOutProductShop: function () {
            var soldProduct = $('.product-shop [data-soldOut-product]');

            if (soldProduct.length) {
                soldProduct.each(function () {
                    var self = $(this);

                    var items = self.data('items').toString().split(","),
                        hours = self.data('hours').toString().split(","),
                        i = Math.floor(Math.random() * items.length),
                        j = Math.floor(Math.random() * hours.length);

                    self.find('.items-count').text(items[i]);
                    self.find('.hours-num').text(hours[j]);
                });
            }
        },

        initCustomerViewProductShop: function () {
            var customerView = $('.product-shop [data-customer-view]');

            if (customerView.length) {
                customerView.each(function () {
                    var self = $(this);

                    setInterval(function () {
                        var views = self.data('customer-view').split(","),
                            i = Math.floor(Math.random() * views.length);

                        self.find('label').text(views[i]);
                    }, 5000);
                });
            }
        },

        initProductMoreview: function (productMoreview) {
            var sliderFor = productMoreview.find('.slider-for'),
                sliderNav = productMoreview.find('.slider-nav'),
                vertical = sliderNav.data('vertical');

            if (!sliderFor.hasClass('slick-initialized') && !sliderNav.hasClass('slick-initialized')) {
                sliderFor.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    fade: true,
                    asNavFor: sliderNav,
                  	draggable: false,
                    adaptiveHeight:false,
                    get arrows() {
                        if (window.product_style == 'skin_1') {
                            return this.arrows = true;
                        } else {
                            return this.arrows = false;
                        }
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
                });

                sliderNav.slick({
                    infinite: true,
                    slidesToShow: sliderNav.data('rows'),
                    vertical: vertical,
                    slidesToScroll: 1,
                    asNavFor: sliderFor,
                    focusOnSelect: true,
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
                            breakpoint: 1200,
                            settings: {
                                get dots() {
                                    if (vertical == true) {
                                        return dots = true;
                                    }
                                },
                            }
                        },
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1,
                                get dots() {
                                    if (vertical == true) {
                                        return dots = true;
                                    }
                                },
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1,
                                get dots() {
                                    if (vertical == true) {
                                        return dots = true;
                                    }
                                },
                            }
                        },
                        {
                            breakpoint: 360,
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 1,
                                get dots() {
                                    if (vertical == true) {
                                        return dots = true;
                                    }
                                },
                            }
                        }
                    ]
                });
            };

            if(window.color_swatch_style === "variant_grouped" && window.use_color_swatch) {
                var swatch = productMoreview.closest('[data-more-view-product]').siblings('.product-shop').find('.swatch'),
                    swatchColor = swatch.find('.swatch-element.color'),
                    inputChecked = swatchColor.find(':radio:checked');

                if(inputChecked.length) {
                    var className = inputChecked.data('filter');

                    if(className !== undefined) {
                        sliderNav.slick('slickUnfilter');
                        sliderFor.slick('slickUnfilter');

                        if(sliderNav.find(className).length && sliderFor.find(className).length) {
                            sliderNav.slick('slickFilter', className).slick('refresh');
                            sliderFor.slick('slickFilter', className).slick('refresh');
                        }
                    };
                };
            }
        },

        changeSwatch: function (swatchSlt) {
            doc.on('change', swatchSlt, function () {
                var className = $(this).data('filter');
                var optionIndex = $(this).closest('.swatch').attr('data-option-index');
                var optionValue = $(this).val();

                $(this)
                    .closest('form')
                    .find('.single-option-selector')
                    .eq(optionIndex)
                    .val(optionValue)
                    .trigger('change');
              
              	if (className == undefined) {
                  if ($('input[data-filter]').is(':checked')) {
                    var checked = $('input[data-filter]:checked').data('filter');
                    className = checked;
                  }
                }

                if(window.color_swatch_style === "variant_grouped" && window.use_color_swatch && className !== undefined) {
                    var productShop = $(swatchSlt).closest('.product-shop');

                    if(productShop.closest('.product-slider').length) {
                        var productImgs = productShop.closest('.product-slider').find('[data-moreview-product-slider]'),
                            sliderFor = productImgs.find('.slider-for');

                        sliderFor.slick('slickUnfilter');

                        if(sliderFor.find(className).length) {
                            sliderFor.slick('slickFilter', className).slick('refresh');
                        }
                      	ella.initZoom();
                    }else {
                        var productImgs = productShop.prev('[data-more-view-product]');

                        if(productImgs.length) {
                            var sliderNav = productImgs.find('.slider-nav'),
                                sliderFor = productImgs.find('.slider-for');

                            sliderNav.slick('slickUnfilter');
                            sliderFor.slick('slickUnfilter');

                            if(sliderNav.find(className).length && sliderFor.find(className).length) {
                                sliderNav.slick('slickFilter', className).slick('refresh');
                                sliderFor.slick('slickFilter', className).slick('refresh');
                            }
                        }
                      	ella.initZoom();
                    }

                }
            });
        },

        productPageInitProductTabs: function () {
            var listTabs = $('.tabs__product-page'),
                tabLink = listTabs.find('[data-tapTop]'),
                tabContent = listTabs.find('[data-TabContent]');

            if ($('.product-template-skin-1').length) {
                listTabs = $('.product-review');
            }

            tabLink.off('click').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var curTab = $(this),
                    curTabContent = $(curTab.data('target')),
                    ulElm = curTab.closest('.list-tabs');

                if (ulElm.length) {
                    if (!$(this).hasClass('active')) {
                        tabLink.removeClass('active');
                        tabContent.removeClass('active');

                        curTab.addClass('active');
                        ulElm.next().find(curTab.data('target')).addClass('active');
                    }
                } else {
                    if($('.product-template-full-width').length) {
                        if (!$(this).hasClass('active')) {
                            curTab.addClass('active');

                            curTabContent.show(0, function() {
                                $(document.body).trigger("sticky_kit:recalc");
                            });
                        } else {
                            curTab.removeClass('active');

                            curTabContent.hide(0, function() {
                                $(document.body).trigger("sticky_kit:recalc");
                            });
                        };
                    } else if($('.has-sticky-product-img').length) {
                        if (!$(this).hasClass('active')) {
                            curTab.addClass('active');
                            curTabContent.show();
                        } else {
                            curTab.removeClass('active');
                            curTabContent.hide();
                        };
                    } else {
                        if (!$(this).hasClass('active')) {
                            curTab.addClass('active');
                            curTabContent.slideDown();
                        } else {
                            curTab.removeClass('active');
                            curTabContent.slideUp();
                        };
                    }

                };
            });

            var sprBadge = '.product-shop .spr-badge',
                btnReviewSlt = '.product-template-full-width .spr-summary-actions-newreview';

            doc.on('click.triggerTabsReviews', sprBadge, function () {
                if (listTabs.length) {
                    $('html,body').animate({
                        scrollTop: listTabs.offset().top
                    }, 400);

                    if (!$('.product-template-skin-1').length) {
                      var activeTab = listTabs.find('[data-target="#collapse-tab2"]');
                      if (!activeTab.hasClass('active')) {
                          activeTab.trigger('click');
                      }
                    }
                };
            });

            if($('.product-template-full-width').length) {
                doc.on('click', btnReviewSlt, function() {
                    $(document.body).trigger("sticky_kit:recalc");
                });
            };
        },

        initStickyForProductFullWidth: function() {
            var productTplFullWidth = $('.product-template-full-width'),
                winWidth = win.innerWidth(),
                stickyElm1 = productTplFullWidth.find('[data-sticky-1]'),
                stickyElm2 = productTplFullWidth.find('[data-sticky-2]'),
                stickyElm3 = productTplFullWidth.find('[data-sticky-3]'),

                stickyResizeTimerId,

            destroySticky = function() {
                stickyElm1.trigger("sticky_kit:detach");
                stickyElm3.trigger("sticky_kit:detach");
                stickyElm2.trigger("sticky_kit:detach");
            },

            initSticky = function() {
                stickyElm1.stick_in_parent({
                    offset_top: 70,
                    inner_scrolling: false,
                });
                stickyElm3.stick_in_parent({
                    offset_top: 68
                });
                stickyElm2.stick_in_parent({
                    offset_top: 50
                }).on('sticky_kit:bottom', function() {
                        stickyElm2.addClass('sticky-on-bottom');
                    })
                    .on('sticky_kit:unbottom', function() {
                        stickyElm2.removeClass('sticky-on-bottom')
                    });
            };

            if(productTplFullWidth.length) {
                if (winWidth >= 1200) {
                    initSticky();
                }

                win.off('resize.sticky').on('resize.sticky', function() {
                    clearTimeout(stickyResizeTimerId);

                    stickyResizeTimerId = setTimeout(function() {
                        var curWinWidth = win.innerWidth();

                        if (curWinWidth < 1200 && winWidth >= 1200) {
                            destroySticky();
                        }
                        else if(curWinWidth >= 1200 && winWidth < 1200) {
                            initSticky();
                        }

                        winWidth = curWinWidth;
                    }, 0);
                });
            };
        },

        initQuickView: function () {
            body.off('click.initQuickView', '.quickview-button').on('click.initQuickView', '.quickview-button', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var href = $(this).attr('id');

                ella.doAjaxShowQuickView(href);

                ella.closeSuccessModal();
            });
        },

        doAjaxShowQuickView: function (href) {
            if (ella.isAjaxLoading) return;

            $.ajax({
                type: "get",
                url: window.router + '/products/' + href + '?view=quickview',

                beforeSend: function () {
                    ella.showLoading();

                    html.css({
                        "overflow": "hidden"
                    });
                },

                success: function (data) {
                    var quickviewModal = $('[data-quickview-modal]'),
                        modalContent = quickviewModal.find('.halo-modal-body');

                    modalContent.html(data);

                    setTimeout(function () {
                        ella.translateBlock('[data-quickview-modal]');
                        ella.initProductMoreview($('[data-more-view-product-qv] .product-img-box'));
                        ella.initSoldOutProductShop();
                        ella.initCustomerViewProductShop();
                        ella.changeSwatch('.quickview-tpl .swatch :radio');
                        ella.initCountdownNormal();
                        ella.initZoom();
                        ella.setAddedForWishlistIcon(href);

                        $.getScript("https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-595b0ea2fb9c5869")
                            .done(function() {
                                if(typeof addthis !== 'undefined') {
                                    addthis.init();
                                    addthis.layers.refresh();
                                }
                            })

                        if ($('.shopify-product-reviews-badge').length && $('.spr-badge').length) {
                            return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                        };
                    }, 500);

                    ella.hideLoading();

                    quickviewModal.fadeIn(600, function () {
                        // html.addClass('halo-modal-open');

                        if ($('[data-ajax-cart-success]').is(':visible')) {
                            $('[data-ajax-cart-success]').hide();
                        }
                    });
                },

                error: function (xhr, text) {
                    $('.ajax-error-message').text($.parseJSON(xhr.responseText).description);
                    ella.hideLoading();
                    ella.showModal('.ajax-error-modal');
                }
            });
        },

        initZoom: function () {
            var zoomElm = $('.product-img-box [data-zoom]');

            if (win.width() >= 1200) {
                zoomElm.zoom();
            } else {
                zoomElm.trigger('zoom.destroy');
            };
        },

        openSearchForm: function () {
            var iconSearchSlt = '[data-search-mobile-toggle]',
                wrapperHeader = $('.wrapper-header'),
                formSearch = wrapperHeader.find('.search-form');

            doc.off('click.toggleSearch', iconSearchSlt).on('click.toggleSearch', iconSearchSlt, function(e) {
                e.preventDefault();
                e.stopPropagation();
                html.addClass('search-open');
            });


            doc.off('click.hideSearch').on('click.hideSearch', function (e) {
                var searchForm = $('.wrapper-header .search-form .search-bar');
                var searchProduct = $('.wrapper-header .header-search__product');
                var searchTrending = $('.wrapper-header .header-search__trending');
                var overlay = $('.wrapper-overlay');
                var iconSearchSlt = $('[data-search-mobile-toggle]');
                var slideshow = $('.home-slideshow .slide-action');

                if (!searchForm.is(e.target) && !iconSearchSlt.is(e.target) && !slideshow.has(e.target).length && !searchForm.has(e.target).length && !searchProduct.has(e.target).length && !searchTrending.has(e.target).length && !overlay.has(e.target).length) {
                    html.removeClass('search-open');
                    $('.quickSearchResultsWrap').hide();
                }
               
            });
        },

        stickyFixedTopMenu: function() {
            if(window.fixtop_menu) {
                if(window.innerWidth >= 1200) {
                    $('[data-sticky-mb]').unstick();

                    setTimeout(
                        function() {
                            $('.site-header').css('height', '');
                            $('[data-sticky-pc]').sticky({
                                zIndex: 4
                            });

                            $('[data-sticky-pc]').on('sticky-start', function() {
                                body.addClass('has_sticky');
                            });

                            $('[data-sticky-pc]').on('sticky-end', function() {
                                body.removeClass('has_sticky');
                            });
                        }, 100
                    );
                } else {
                    $('[data-sticky-pc]').unstick();

                    setTimeout(
                        function() {
                            $('.site-header').css('height', '');
                            $('[data-sticky-mb]').sticky({
                                zIndex: 4
                            });
                        }, 100
                    );
                };
            };
        },

        handleScrollDown: function() {
            var iconSrollDownSlt = '[data-scroll-down]',
                iconSrollDown = $(iconSrollDownSlt);

            iconSrollDown.each(function() {
                var self = $(this);
                var target = self.closest('.shopify-section').next('.shopify-section').attr('id');

                self.attr('href', '#'+ target +'');

                doc.off('click.handleScrollDown', iconSrollDownSlt).on('click.handleScrollDown', iconSrollDownSlt, function(e) {
                    e.preventDefault();

                    var scroll = $(this.getAttribute('href'));

                    if( scroll.length ) {
                        $('html, body').stop().animate({
                            scrollTop: scroll.offset().top
                        }, 500);
                    };
                });
            });
        },

        initStickyAddToCart: function() {
            var blockSticky = $('[data-sticky-add-to-cart]'),
                sltVariantActive = blockSticky.find('.pr-active'),
                variantElm = blockSticky.find('.pr-swatch');

            if(blockSticky.length) {
                var showHideVariantsOptions = function() {
                    sltVariantActive.off('click.showListVariant').on('click.showListVariant', function(e) {
                        e.preventDefault();

                        blockSticky.toggleClass('open-sticky');
                    });

                    doc.off('click.hideVariantsOption').on('click.hideVariantsOption', function(e) {
                        if (!sltVariantActive.is(e.target) && sltVariantActive.has(e.target).length === 0){
                            blockSticky.removeClass('open-sticky');
                        };
                    })
                };

                var handleActiveVariant = function() {
                    variantElm.off('click.activeVar').on('click.activeVar', function(e) {
                        var self = $(this),
                            text = self.text(),
                            value = self.data('value'),
                            newImage = self.data('img');

                        variantElm.removeClass('active');
                        self.addClass('active');
                        blockSticky.toggleClass('open-sticky');

                        blockSticky.find('.action input[type=hidden]').val(value);
                        sltVariantActive.attr('data-value', value).text(text);

                        var swatchNameValue = $('#add-to-cart-form [data-value-sticky="'+value+'"]');

                        swatchNameValue.each(function() {
                            var slt = $(this).data('value');

                            $('[data-value="'+slt+'"]').closest('.swatch').find('#'+slt+'').click();
                        });

                        if(self.hasClass('sold-out')) {
                            blockSticky.find('.sticky-add-to-cart').val(window.inventory_text.sold_out).addClass('disabled').attr('disabled', 'disabled');
                        }else {
                            blockSticky.find('.sticky-add-to-cart').removeClass('disabled').removeAttr('disabled').val(window.inventory_text.add_to_cart);
                        };

                        $('.pr-img img').attr({ src: newImage });

                        return false;
                    });
                };

                var stickyAddToCart = function() {
                    doc.on('click', '[data-sticky-btn-addToCart]', function(e) {
                        e.preventDefault();

                        if($('#add-to-cart-form [data-btn-addToCart]').length) {
                            $('#add-to-cart-form [data-btn-addToCart]').click();
                        } else if($('#add-to-cart-form [data-grouped-addToCart]').length) {
                            $('#add-to-cart-form [data-grouped-addToCart]').click();
                        };

                        return false;
                    });
                };

                var activeVariantSelected = function() {
                    var optionSelected = $('#product-selectors option:selected'),
                        value = optionSelected.val(),
                        stickyActive = blockSticky.find('.pr-swatch[data-value="'+value+'"]'),
                        stickyText = stickyActive.html();

                    sltVariantActive.html(stickyText);
                    stickyActive.addClass('active');

                    var str = stickyActive.data('img');

                    $('.pr-img img').attr({ src: str });

                    $(".swatch .swatch-element").each(function(e) {
                        var idVariant = $(this).find('input:radio').attr('id');

                        $('.swatch input.text[data-value="'+idVariant+'"]').appendTo($(this));
                    });

                    $('.selector-wrapper').change(function() {
                        var n = $("#product-selectors").val();

                        $('.sticky_form .pr-selectors li').each(function(e) {
                            var t = $(this).find('a').data('value');

                            if(t == n){
                                $(this).find('a').addClass('active')
                            } else{
                                $(this).find('a').removeClass('active')
                            }
                        });

                        $("#product-selectors").change(function() {
                            var str = "";

                            $("#product-selectors option:selected").each(function() {
                                str += $(this).data('imge');
                            });

                            $('.pr-img img').attr({ src: str });
                        }).trigger("change");

                        if(variantElm.hasClass('active')) {
                            var h = $('.sticky_form .pr-swatch.active').html();

                            $('.sticky_form .action input[type=hidden]').val(n);
                            sltVariantActive.html(h);
                            sltVariantActive.attr('data-value', n);
                        };
                    });
                };

                var offSetTop = $('#add-to-cart-form .groups-btn').offset().top;

                $(window).scroll(function () {
                    var scrollTop = $(this).scrollTop();

                    if (scrollTop > offSetTop) {
                        body.addClass('show_sticky');
                    }
                    else {
                        body.removeClass('show_sticky');
                    }
                });

                showHideVariantsOptions();
                handleActiveVariant();
                stickyAddToCart();
                activeVariantSelected();
            };
        },

        createWishListTplItem: function(ProductHandle) {
            var wishListCotainer = $('[data-wishlist-container]');

            jQuery.getJSON(window.router + '/products/'+ProductHandle+'.js', function(product) {
                var productHTML = '',
                    price_min = Shopify.formatMoney(product.price_min, window.money_format);

                productHTML += '<div class="grid-item" data-wishlist-added="wishlist-'+product.id+'">';
                productHTML += '<div class="inner product-item" data-product-id="product-'+product.handle+'">';
                productHTML += '<div class="column col-img"><div class="product-image">';
                productHTML +='<a href="'+product.url+'" class="product-grid-image" data-collections-related="/collections/all?view=related">';
                if (product.featured_image) {
                    productHTML += '<img src="'+product.featured_image+'" alt="'+product.featured_image.alt+'">';
                }
                productHTML += '</a></div></div>';
                productHTML += '<div class="column col-prod">';
                productHTML += '<a class="product-title" href="'+product.url+'" title="'+product.title+'">'+product.title+'</a>';
                productHTML += '<div class="product-vendor">';
                productHTML += '<a href="' + window.router + '/collections/vendors?q='+product.vendor+'" title="'+product.vendor+'">'+product.vendor+'</a></div></div>';
                productHTML += '<div class="column col-price text-center"><div class="price-box">'+ price_min +'</div></div>';
                productHTML += '<div class="column col-options text-center">';
                productHTML += '<form action="/cart/add" method="post" class="variants" id="wishlist-product-form-' + product.id +'" data-id="product-actions-'+product.id+'" enctype="multipart/form-data">';

                if (product.available) {
                    if (product.variants.length == 1) {
                        productHTML += '<button data-btn-addToCart class="btn add-to-cart-btn" data-form-id="#wishlist-product-form-' + product.id +'" type="submit">'+window.inventory_text.add_to_cart+'</button><input type="hidden" name="id" value="'+ product.variants[0].id +'" />';
                    }
                    if (product.variants.length > 1){
                        productHTML += '<a class="btn" title="'+product.title+'" href="' + product.url +'">'+window.inventory_text.select_options+'</a>';
                    }
                } else {
                    productHTML += '<button class="btn add-to-cart-btn" type="submit" disabled="disabled">'+window.inventory_text.unavailable+'</button>';
                }

                productHTML += '</form></div>';
                productHTML += '<div class="column col-remove text-center"><a class="whislist-added" href="#" data-product-handle="'+ product.handle +'" data-icon-wishlist data-id="'+ product.id +'"><svg class="closemnu" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 357 357" xml:space="preserve"><g><g><polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5"></polygon></g></g></svg></a></div>';
                productHTML += '</div></div>';

                wishListCotainer.append(productHTML);
                var regex = /(<([^>]+)>)/ig;
                var href = $('.wrapper-wishlist a.share').attr("href");
                href += encodeURIComponent( product.title + '\nPrice: ' + price_min.replace(regex, "") + '\nLink: ' + window.location.protocol + '//' + window.location.hostname + product.url +'\n\n');
                $('.wrapper-wishlist a.share').attr("href", href );
            });
        },

        initWishListPagging: function() {
            var data = JSON.parse(localStorage.getItem('items'));

            var wlpaggingContainer = $('#wishlist-paginate');
            var paggingTpl = '<li class="text disabled prev"><a href="#" title="'+window.inventory_text.previous+'"><i class="fa fa-angle-left" aria-hidden="true"></i><span>'+window.inventory_text.previous+'</span></a></li>';
            var wishListCotainer = $('[data-wishlist-container]');

            wlpaggingContainer.children().remove();

            var totalPages = Math.ceil(data.length / 3);

            if (totalPages <= 1) {
                wishListCotainer.children().show();
                return;
            }

            for (var i = 0; i < totalPages; i++) {
                var pageNum = i + 1;
                if (i === 0) paggingTpl += '<li class="active"><a data-page="' + pageNum + '" href="'+ pageNum +'" title="'+ pageNum +'">' + pageNum + '</a></li>'
                else paggingTpl += '<li><a data-page="' + pageNum + '" href="'+ pageNum +'" title="'+ pageNum +'">' + pageNum + '</a></li>'
            }

            paggingTpl += '<li class="text next"><a href="#" title="'+window.inventory_text.next+'"><span>'+window.inventory_text.next+'</span><i class="fa fa-angle-right" aria-hidden="true"></i></a></li>';

            wlpaggingContainer.append(paggingTpl);

            wishListCotainer.children().each(function(idx, elm) {
                if (idx >= 0 && idx < 3) {
                    $(elm).show();
                }
                else {
                    $(elm).hide();
                }
            });

            wlpaggingContainer.off('click.wl-pagging').on('click.wl-pagging', 'li a', function(e) {
                e.preventDefault();

                var isPrev = $(this).parent().hasClass('prev');
                var isNext = $(this).parent().hasClass('next');
                var pageNumber = $(this).data('page');

                if (isPrev) {
                    var curPage = parseInt($(this).parent().siblings('.active').children().data('page'));
                    pageNumber = curPage - 1;
                }

                if (isNext) {
                    var curPage = parseInt($(this).parent().siblings('.active').children().data('page'));
                    pageNumber = curPage + 1;
                }

                wishListCotainer.children().each(function(idx, elm) {
                    if (idx >= (pageNumber - 1) * 3 && idx < pageNumber * 3) {
                        $(elm).show();
                    }
                    else {
                        $(elm).hide();
                    }
                });

                if (pageNumber === 1) {
                    wlpaggingContainer.find('.prev').addClass('disabled');
                    wlpaggingContainer.find('.next').removeClass('disabled');
                }
                else if (pageNumber === totalPages) {
                    wlpaggingContainer.find('.next').addClass('disabled');
                    wlpaggingContainer.find('.prev').removeClass('disabled');
                }
                else {
                    wlpaggingContainer.find('.prev').removeClass('disabled');
                    wlpaggingContainer.find('.next').removeClass('disabled');
                }

                $(this).parent().siblings('.active').removeClass('active');
                wlpaggingContainer.find('[data-page="' + pageNumber + '"]').parent().addClass('active');

            });
        },

        initWishLists: function() {
            if (typeof(Storage) !== 'undefined') {
                var data = JSON.parse(localStorage.getItem('items'));

                if (data.length <= 0) {
                    return;
                }

                data.forEach(function(item) {
                    ella.createWishListTplItem(item);
                });

                this.initWishListPagging();
                this.translateBlock('.wishlist-page');

            } else {
                alert('Sorry! No web storage support..');
            }
        },

        setAddedForWishlistIcon: function(ProductHandle) {
            var wishlistElm = $('[data-product-handle="'+ ProductHandle +'"]'),
                idxArr = wishListsArr.indexOf(ProductHandle);

            if(idxArr >= 0) {
                wishlistElm.addClass('whislist-added');
                if($('.style_product_grid_3').length) {
                    wishlistElm.find('.wishlist-text').text(window.inventory_text.remove_wishlist_1); 
                } else {
                    wishlistElm.find('.wishlist-text').text(window.inventory_text.remove_wishlist); 
                }
            }
            else {
                wishlistElm.removeClass('whislist-added');
                if($('.style_product_grid_3').length) {
                    wishlistElm.find('.wishlist-text').text(window.inventory_text.add_wishlist_1);
                } else {
                    wishlistElm.find('.wishlist-text').text(window.inventory_text.add_wishlist);
                }
            };
        },

        doAddOrRemoveWishlish: function() {
            var iconWishListsSlt = '[data-icon-wishlist]';

            doc.off('click.addOrRemoveWishlist', iconWishListsSlt).on('click.addOrRemoveWishlist', iconWishListsSlt, function(e) {
                e.preventDefault();

                var self = $(this),
                    productId = self.data('id'),
                    ProductHandle = self.data('product-handle'),
                    idxArr = wishListsArr.indexOf(ProductHandle);

                if(!self.hasClass('whislist-added')) {
                    self.addClass('whislist-added');
                    if($('.style_product_grid_3').length) {
                        self.find('.wishlist-text').text(window.inventory_text.remove_wishlist_1);
                    } else {
                        self.find('.wishlist-text').text(window.inventory_text.remove_wishlist);
                    }

                    if($('[data-wishlist-container]').length) {
                        ella.createWishListTplItem(ProductHandle);
                    };

                    wishListsArr.push(ProductHandle);
                    localStorage.setItem('items', JSON.stringify(wishListsArr));
                } else {
                    self.removeClass('whislist-added');
                    if($('.style_product_grid_3').length) {
                        self.find('.wishlist-text').text(window.inventory_text.add_wishlist_1);
                    } else {
                        self.find('.wishlist-text').text(window.inventory_text.add_wishlist);
                    }
                    
                    if($('[data-wishlist-added="wishlist-'+productId+'"]').length) {
                        $('[data-wishlist-added="wishlist-'+productId+'"]').remove();
                    }

                    wishListsArr.splice(idxArr, 1);
                    localStorage.setItem('items', JSON.stringify(wishListsArr));

                    if($('[data-wishlist-container]').length) {
                        ella.initWishListPagging();
                    };
                };

                ella.setAddedForWishlistIcon(ProductHandle);
            });
        },

        initWishListIcons: function() {
            var wishListItems = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

            if (!wishListItems.length) {
                return;
            }

            for (var i = 0; i < wishListItems.length; i++) {
                var icon = $('[data-product-handle="'+ wishListItems[i] +'"]');
                icon.addClass('whislist-added');

                if($('.style_product_grid_3').length) {
                    icon.find('.wishlist-text').text(window.inventory_text.remove_wishlist_1);
                } else {
                    icon.find('.wishlist-text').text(window.inventory_text.remove_wishlist);
                }


            };
        },

        setAddedForCompareIcon: function(ProductHandle) {    
            var compareElm = $('[data-compare-product-handle="'+ ProductHandle +'"]'),
                idxArr = compareArr.indexOf(ProductHandle),
                compareCountNum = $('[data-compare-count]');

                compareItems = localStorage.getItem('compareArr') ? JSON.parse(localStorage.getItem('compareArr')) : [];
                totalProduct = Math.ceil(compareItems.length);

            if(idxArr >= 0) {
                compareElm.addClass('compare-added');
                compareElm.find('[data-change-text-compare]').text(window.inventory_text.remove_compare);
            }
            else {
                compareElm.removeClass('compare-added');
                compareElm.find('[data-change-text-compare]').text(window.inventory_text.add_compare);
            };

            if ($('.l'))

            compareCountNum.text(totalProduct);

            if(totalProduct >=2){
                $('.compare-link').addClass('open');
            }else{
                $('.compare-link').removeClass('open');
            }
        },

        doAddOrRemoveCompare: function() {            
            var iconCompare = '[data-icon-compare]';

            doc.off('click.doAddOrRemoveCompare', iconCompare).on('click.doAddOrRemoveCompare', iconCompare, function(e) {
                e.preventDefault();

                var self = $(this),
                    productId = self.data('id'),
                    ProductHandle = self.data('compare-product-handle'),
                    idxArr = compareArr.indexOf(ProductHandle);
                if(!self.hasClass('compare-added')) {
                    // self.find('.compare-text').text(window.inventory_text.remove_compare);


                    compareArr.push(ProductHandle);
                    localStorage.setItem('compareArr', JSON.stringify(compareArr));

                    ella.createCompareItem(ProductHandle);
                    self.addClass('compare-added');

                } else {
                    self.removeClass('compare-added');
                    // self.find('.compare-text').text(window.inventory_text.add_to_compare);
                    if($('[data-compare-added="compare-'+productId+'"]').length) {
                        $('[data-compare-added="compare-'+productId+'"]').remove();
                    }

                    compareArr.splice(idxArr, 1);
                    localStorage.setItem('compareArr', JSON.stringify(compareArr));
                };

                ella.setAddedForCompareIcon(ProductHandle);
            });
        },

        initCompareIcons: function() {       
            
            var compareCountNum = $('[data-compare-count]');
                
                totalProduct = Math.ceil(compareArr.length);
                compareCountNum.text(totalProduct);

            if (!compareArr.length) {
                return;
            } else {

                for (var i = 0; i < compareArr.length; i++) {
                    var icon = $('[data-compare-product-handle="'+ compareArr[i] +'"]');
                    icon.addClass('compare-added');
                    // icon.find('.compare-text').text(window.inventory_text.remove_compare);
                };

                if (typeof(Storage) !== 'undefined') {        
                    
                    if (compareArr.length <= 0) {
                        return;
                    }

                    setTimeout(function() {
                        compareArr.forEach(function(item) {
                            ella.createCompareItem(item);
                            ella.setAddedForCompareIcon(item);      
                        });
                    },1500);
                    

                } else {
                    alert('Sorry! No web storage support..');
                }

            }
        },

        initCompareSelected: function() {
            var iconCompareSelected = '[data-compare-selected]';
                compareModal = $('[data-compare-modal]');
                compareModalProduct = compareModal.find('.product-grid');
                compareModalMessage = $('[data-compare-message-modal]');

            doc.off('click.compareSelected', iconCompareSelected).on('click.compareSelected', iconCompareSelected, function(e) {
                e.preventDefault();
                e.stopPropagation();                

                if (typeof(Storage) !== 'undefined') {        
                    
                    if (compareArr.length <= 1) {
                        compareModalMessage.find('.halo-modal-body').text(window.inventory_text.message_compare);
                        compareModalMessage.fadeIn(500, function () {
                            html.addClass('halo-modal-open');
                        });

                        body.addClass('has-popup');

                    } else {
                        compareArr.forEach(function(item) {
                            ella.removeCompareItem(item);
                        });

                        compareModal.fadeIn(600, function () {
                            html.addClass('halo-modal-open');
                        });

                        ella.removeAllCompareItem();
                    }                    

                } else {
                    alert('Sorry! No web storage support..');
                }

                ella.closeSuccessModal();
                ella.translateBlock('.ajax-compare');
                ella.translateBlock('.compare-message-modal');
            });
        },

        createCompareItem: function(ProductHandle) {
            var compareProduct = $('[data-compare-modal]').find('.halo-modal-body .compare-content .product-grid'),
                compareRating = $('[data-compare-modal]').find('.halo-modal-body .compare-content .rating'),
                compareDescription = $('[data-compare-modal]').find('.halo-modal-body .compare-content .description'),
                compareCollection = $('[data-compare-modal]').find('.halo-modal-body .compare-content .collection'),
                compareAvailability = $('[data-compare-modal]').find('.halo-modal-body .compare-content .availability'),
                compareProductType = $('[data-compare-modal]').find('.halo-modal-body .compare-content .product-type'),

                compareSKU = $('[data-compare-modal]').find('.halo-modal-body .compare-content .product-sku'),
                compareOption1 = $('[data-compare-modal]').find('.option1'),
                compareOption2 = $('[data-compare-modal]').find('.option2'),
                compareOption3 = $('[data-compare-modal]').find('.option3');


            jQuery.getJSON('/products/'+ProductHandle+'.js', function(product) {
                var productHTML = '',
                    priceHTML = '',
                    productLabelHTML = '',
                    ratingHTML = '',
                    descriptionHTML = '',
                    collectionHTML = '',
                    availabilityHTML = '',
                    productTypeHTML = '',
                    skuHTML = '',
                    optionValueHTML = '',
                    optionValueHTML2 = '',
                    price_min = Shopify.formatMoney(product.price_min, window.money_format);

                var productIDCompare = product.id;
                    
               // Rating
               var rating = '<span class="shopify-product-reviews-badge" data-id="'+productIDCompare+'"></span>';
               // Description
               var desc =  product.description.substring(0,100) + '...',
               domparser = new DOMParser(),
               descriptionHTML = domparser.parseFromString(desc, "text/html");
               // Label
               var labelSale = (( product.compare_at_price - product.price )/ product.compare_at_price) * 100,
               arrayTags = product.tags,
               percentDiscount = Math.floor(labelSale);



                // Option
            var productOptions = product.options;
          
            $.each(productOptions, function(index, opt) {
                var optPosition = opt.position,
                    optName = opt.name.toLowerCase(),
                    optValue = opt.values,
                    optValueText = '';

                optValue.forEach(function(value, index) {
                    if (value) {
                        if (index > 0) {
                            optValueText += ', '
                        }
                        optValueText += value;
                    }
                })

                optionValueHTML2 += '<div class="col-xl-3" data-compare-added="compare-'+product.id+'">-</div>';

                if (optValueText == '' || optValueText == 'Default Title') {
                    optionValueHTML += '<div class="col-xl-3" data-compare-added="compare-'+product.id+'">-</div>';
                } else {
                    optionValueHTML += '<div class="col-xl-3" data-compare-added="compare-'+product.id+'">'+optValueText+'</div>';
                }

                var optionOneValue = window.option_ptoduct1,
                    optionTwoValue = window.option_ptoduct2;
                    optionThreeValue = window.option_ptoduct3;
                if (optPosition == 1) {
                    if (optName == optionOneValue) {
                        compareOption1.append(optionValueHTML);
                        compareOption2.append(optionValueHTML2);
                        compareOption3.append(optionValueHTML2);
                    } else if (optName == optionTwoValue) {
                        compareOption1.append(optionValueHTML2);
                        compareOption2.append(optionValueHTML);
                        compareOption3.append(optionValueHTML2);
                    } else if (optName == 'title') {
                        compareOption1.append(optionValueHTML2);
                        compareOption2.append(optionValueHTML2);
                        compareOption3.append(optionValueHTML2);
                    } else {
                        compareOption1.append(optionValueHTML2);
                        compareOption2.append(optionValueHTML2);
                        compareOption3.append(optionValueHTML);
                    }
                }
                if (optPosition == 2) {
                    if (optName == optionOneValue) {
                        compareOption1.find('[data-compare-added="compare-'+product.id+'"]').html(optValueText);
                    } else  if (optName == optionTwoValue) {
                        compareOption2.find('[data-compare-added="compare-'+product.id+'"]').html(optValueText);
                    } else {
                        compareOption3.find('[data-compare-added="compare-'+product.id+'"]').html(optValueText);
                    }
                }
                if (optPosition == 3) {
                    if (optName == optionOneValue) {
                        compareOption1.find('[data-compare-added="compare-'+product.id+'"]').html(optValueText);
                    } else  if (optName == optionTwoValue) {
                        compareOption2.find('[data-compare-added="compare-'+product.id+'"]').html(optValueText);
                    } else {
                        compareOption3.find('[data-compare-added="compare-'+product.id+'"]').html(optValueText);
                    }
                }
            });

                
                if (rating == '' || rating == undefined) {
                    ratingHTML += '<div class="col-xl-3" data-compare-added="compare-'+product.id+'"></div>';
                } else {
                    ratingHTML += '<div class="col-xl-3" data-compare-added="compare-'+product.id+'">'+rating+'</div>';
                }                        
                compareRating.append(ratingHTML);
               
               
               if (desc == '' || desc == undefined ) {
                    descriptionHTML += '<div class="col-xl-3" data-compare-added="compare-'+product.id+'">-</div>';
                
               } else {
                    descriptionHTML += '<div class="col-xl-3" data-compare-added="compare-'+product.id+'">'+desc+'</div>';
               }
               compareDescription.append(descriptionHTML);


               var sku = product.variants;

               if (sku.length > 1) {
                    $.each( sku, function( key, value ) {
                        if(key == 0){
                            skuValue = value.sku;
                            if(skuValue == ""){
                               skuValueHTML = '<div class="col-xl-3" data-compare-added="compare-'+product.id+'">-</div>';
                               skuHTML += skuValueHTML;
                            }
                            else{
                                skuValueHTML = '<div class="col-xl-3" data-compare-added="compare-'+product.id+'">'+skuValue+'</div>';
                                skuHTML += skuValueHTML;
                            }
                        }
                    });
               } else {
                skuHTML += '<div class="col-xl-3" data-compare-added="compare-'+product.id+'">-</div>';
               }

               compareSKU.append(skuHTML);
              
                       

                productHTML += '<div class="grid-item col-xl-3 product-item" data-compare-added="compare-'+product.id+'">';
                productHTML += '<div class="inner" data-product-id="product-'+product.handle+'"><div class="inner-top"';
                productHTML += '<div class="product-top"><div class="product-image">';
                productHTML +='<a href="'+product.url+'" class="product-grid-image" data-collections-related="/collections/all?view=related">';
                if (product.featured_image) {
                    productHTML += '<img src="'+product.featured_image+'" alt="'+product.featured_image.alt+'">';
                }
                productHTML += '</a></div>';

                productHTML += '<div class="product-label">';
                if(product.compare_at_price > product.price){
                    if(window.label_sale == 'label_sale'){
                        productHTML += '<strong class="label sale-label">'+ window.inventory_text.salelabel +' </strong>';
                        productHTML += '<br>';
                    }else{
                        productHTML += '<strong class="label sale-label">- '+percentDiscount+'% </strong>';
                        productHTML += '<br>';
                    }
                }
                if (product.available == false) {
                    productHTML += '<strong class="label sold-out-label">'+ window.inventory_text.soldoutlabel +' </strong>';
                    productHTML += '<br>';
                }
                
                arrayTags.forEach(function(element){
                    if(element == 'new'){
                      productHTML += '<strong class="label new-label">'+ window.inventory_text.newlabel +' </strong>';
                      productHTML += '<br>';
                    }
                    if(element == 'Custom Label'){
                      productHTML += '<strong class="label custom-label">'+ window.inventory_text.customlabel +' </strong>';
                      productHTML += '<br>';
                    }
                    if(element == 'bundle') {
                      productHTML += '<strong class="label bundle-label">'+ window.inventory_text.bundlelabel +' </strong>';
                      productHTML += '<br>';
                    }
                })

                productHTML += '</div></div></div>';
                productHTML += '<div class="product-bottom">';
                productHTML += '<div class="product-vendor">';
                productHTML += '<a href="/collections/vendors?q='+product.vendor+'" title="'+product.vendor+'">'+product.vendor+'</a></div>';
                productHTML += '<a class="product-title" href="'+product.url+'" title="'+product.title+'">'+product.title+'</a>';
                productHTML += '<div class="column col-price text-center"><div class="price-box">';
                if(product.compare_at_price > product.price){
                  productHTML += '<span class="price-sale">';
                    productHTML += '<span class="old-price">' + Shopify.formatMoney(product.variants[0].compare_at_price  , window.money_format) + '</span>';
                    productHTML += '<span class="price special-price" itemprop="price"> '+ Shopify.formatMoney(product.price, window.money_format)+'</span>';
                    productHTML +='</span>';
                }else{
                    productHTML += '<span> '+ Shopify.formatMoney(product.price, window.money_format)+'</span>';
                }
                productHTML += '</div></div>';
                
                productHTML += '<div class="column col-options text-center">';
                productHTML += '<form action="/cart/add" method="post" class="variants" id="-'+product.id+'" data-id="product-actions-'+product.id+'" enctype="multipart/form-data">';

                if (product.available) {
                    if (product.variants.length == 1) {
                        productHTML += '<button data-btn-addToCart class="btn add-to-cart-btn" type="submit" data-form-id="#-'+product.id+'" >'+window.inventory_text.add_to_cart+'</button><input type="hidden" name="id" value="'+ product.variants[0].id +'" />'; 
                    } 
                    if (product.variants.length > 1){
                        productHTML += '<a class="btn" title="'+product.title+'" href="'+product.url +'">'+window.inventory_text.select_options+'</a>';
                    }
                    availabilityHTML += '<div class="col-xl-3 in-stock" data-compare-added="compare-'+product.id+'">'+window.inventory_text.in_stock+'</div>';
                } else { 
                    productHTML += '<button data-btn-addToCart class="btn add-to-cart-btn" type="submit" disabled="disabled">'+window.inventory_text.unavailable+'</button>';
                    availabilityHTML += '<div class="col-xl-3 unavailable" data-compare-added="compare-'+product.id+'">'+window.inventory_text.unavailable+'</div>';
                }

                productHTML += '</form></div>';
                productHTML += '<div class="column col-remove text-center"><a class="compare-added" href="#" data-icon-compare-added data-compare-product-handle="'+ product.handle +'" data-id="'+ product.id +'">'+window.inventory_text.remove+'</a></div></div>';
                
                productHTML += '</div></div></div>';

                compareProduct.append(productHTML);

                productTypeHTML += '<div class="col-xl-3" data-compare-added="compare-'+product.id+'">'+product.type+'</div>';    

                compareAvailability.append(availabilityHTML);
                compareProductType.append(productTypeHTML);
                if ($(".spr-badge").length > 0) {
                  return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
                }     
            });
        },

        removeCompareItem: function(ProductHandle) {
            var iconCompareRemove = '[data-icon-compare-added]';

            doc.off('click.removeCompareItem', iconCompareRemove).on('click.removeCompareItem', iconCompareRemove, function(e) {
                e.preventDefault();
                e.stopPropagation();

                var self = $(this),
                    productId = self.data('id'),
                    ProductHandle = self.data('compare-product-handle'),
                    idxArr = compareArr.indexOf(ProductHandle);
                
                if($('[data-compare-added="compare-'+productId+'"]').length) {
                    $('[data-compare-added="compare-'+productId+'"]').remove();

                }

                compareArr.splice(idxArr, 1);
                localStorage.setItem('compareArr', JSON.stringify(compareArr));

                ella.setAddedForCompareIcon(ProductHandle);
            });
        },

        removeAllCompareItem: function(ProductHandle) {
            var compareRemoveAll = '[data-compare-remove-all]';
                compareCountNum = $('[data-compare-count]');
                compareElm = $('[data-icon-compare]');

            doc.off('click.removeAllCompareItem', compareRemoveAll).on('click.removeAllCompareItem', compareRemoveAll, function(e) {
                e.preventDefault();
                e.stopPropagation();

                 $('[data-compare-added]').remove();

                 compareArr.splice(0,compareArr.length);
                 localStorage.setItem('compareArr', JSON.stringify(compareArr));

                 if (compareElm.hasClass('compare-added')) {
                    compareElm.removeClass('compare-added');
                    // compareElm.find('.compare-text').text(window.inventory_text.add_compare);
                 }

                 $('.compare-link').removeClass('open');

                 totalProduct = Math.ceil(compareArr.length);
                 compareCountNum.text(totalProduct);
            })
        },

        wrapTable: function(){
            var table = $('.tab-content').find('table');
            if(table.length){
                table.each(function(){
                    $(this).wrap('<div class="table-wrapper"></div>')
                })
            }
        },

        initBundleProducts: function() {

            var btnAddToCartSlt = '[data-bundle-addToCart]',
                bundleImagesSlide = $('[data-bundle-images-slider]'),
                btnToggleOptionsSlt = '.fbt-toogle-options',
                bundlePrice = $('.products-grouped-action .bundle-price'),
                bundleCheckbox = '.bundle-checkbox';

            var replaceDiscountRate = function(){
                if(bundlePrice.length > 0){
                    var discountRate = bundlePrice.data('discount-rate')*100;
                    var discountText = $('.products-grouped-action .discount-text span');
                    if(discountText.length > 0){
                        discountText.each(function(){
                            $(this).text($(this).text().replace('[discount]',discountRate)).parent().show();
                        })
                    }

                }
            }

            var bundleSlider = function() {
                if(bundleImagesSlide.length && bundleImagesSlide.not('.slick-initialized')) {
                    if ((window.layout_style == 'layout_style_1170') || (window.layout_style == 'layout_style_fullwidth') || (window.layout_style == 'layout_style_flower')) {
                        if(window.product_style == 'skin_1') {
                            var images = 3;
                        } else {
                            var images = bundleImagesSlide.data('rows');
                        }
                    } else {
                        var images = bundleImagesSlide.data('rows');
                    }

                    bundleImagesSlide.slick({
                        get slidesToShow() {
                            if(images >= 5) {
                                return this.slidesToShow = 5;
                            }
                            else {
                                return this.slidesToShow = images;
                            }
                        },
                        slidesToScroll: 1,
                        dots: false,
                        infinite: false,
                        speed: 800,
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
                                breakpoint: 992,
                                settings: {
                                    get slidesToShow() {
                                        if(images >= 4) {
                                            return this.slidesToShow = 4;
                                        }
                                        else {
                                            return this.slidesToShow = images;
                                        }
                                    },
                                }
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    get slidesToShow() {
                                        if ((window.layout_style == 'layout_style_1170') || (window.layout_style == 'layout_style_fullwidth')) {
                                            return this.slidesToShow = 2;
                                        } else {
                                            if(images > 3) {
                                                return this.slidesToShow = 3;
                                            }
                                            else {
                                                return this.slidesToShow = images;
                                            }
                                        }
                                        
                                    }
                                }
                            }
                        ]
                    });
                }
            };

            var toggleVariantOptions = function() {
                body.off('click.toggleVariantOptions', btnToggleOptionsSlt).on('click.toggleVariantOptions', btnToggleOptionsSlt, function(e) {
                    e.preventDefault();

                    $(this).next().slideToggle();
                })
            };

            var toggleVariantOptions_layout_1170 = function() {
                body.off('click.toggleVariantOptions', btnToggleOptionsSlt).on('click.toggleVariantOptions', btnToggleOptionsSlt, function(e) {
                    e.preventDefault();
                    var id = $(this).data('product-id');
                    $('body').addClass('show_bundle_variant');
                    $(this).parents('.fbt-product-item').find('.product-options').prependTo('.product-review_variant');
                    $('.product-review_variant').find('[data-fbt-pro-id=' + id + ']').show();
                    disableSoldoutSwatchBundle($('[data-fbt-pro-id=' + id + ']'));
                });
                
                $(document).off('click', '.close-options, .overplay_bundle').on('click', '.close-options, .overplay_bundle', function(e) {
                    e.preventDefault();
                    $('body').removeClass('show_bundle_variant');
                    $('.product-review_variant .product-options').hide();
                })
            };

            var handleCheckedProduct = function() {
                // check all checkbox on loadpage
                $('.fbt-checkbox input').prop('checked',true);

                body.off('click.checkedProduct', bundleCheckbox).on('click.checkedProduct', bundleCheckbox, function(e) {
                    e.preventDefault();

                    var self = $(this),
                        ipt = self.prev(),
                        dataId = self.closest('.fbt-product-item').data('bundle-product-id');

                    if(!ipt.prop('checked')) {
                        ipt.prop('checked', true);
                        $('[data-bundle-product-id="'+ dataId +'"]').addClass('isChecked');
                    } else {
                        ipt.prop('checked', false);

                        $('[data-bundle-product-id="'+ dataId +'"]').removeClass('isChecked');
                    };
                    updateTotalPrice();
                })
            };

            var initSelectedSwatch = function() {
                $('.fbt-product-item').each(function() {
                    var self = $(this);
                    var productId = self.data('bundle-product-id');
                    var selectedVariantId = $(this).find('[name="group_id"]').val();
                    var productOpts = self.find('.swatch');
                    var variantArr = window.productVariants[productId];

                    if (!variantArr) {
                        return;
                    }
                    // Get selected variant
                    var selectedVariant = variantArr.find(function(variant){
                        return variant.id == selectedVariantId
                    });

                    // Check selected swatch
                    productOpts.each(function(index){
                        var optionIndex = 'option' + (index + 1);
                        var selectedSwatch = $(this).find('.swatch-element[data-value="'+selectedVariant[optionIndex]+'"]');

                        selectedSwatch.find('input').prop('checked', true);
                    })

                });

            }

            var updateTotalPrice = function() {
                var bundleProItem = $('.fbt-product-item.isChecked');
                var bundlePrice = $('.products-grouped-action .bundle-price');
                var oldPrice = $('.products-grouped-action .old-price');
                var discountRate = bundlePrice.data('discount-rate');
                var totalPrice = 0;
                var checkedProductLength = $('.fbt-product-item.isChecked').length;
                var maxProduct = $('.fbt-product-item').length;

                bundleProItem.each(function() {
                    var selectElm = $(this).find('select[name=group_id]'),
                        inputElm = $(this).find('input[name=group_id]');

                    if(selectElm.length) {
                        var price = selectElm.find(':selected').data('price');
                    } else {
                      if (inputElm.length) {
                        var price = $(this).find('input[name=group_id]').data('price');
                      } else {
                        var price = $(this).find('input[name=id]').data('price');
                      }
                    }

                    if(price) {
                        totalPrice += price;

                        if(bundlePrice.length > 0 && oldPrice.length > 0){
                            oldPrice.html(Shopify.formatMoney(totalPrice, window.money_format));
                            bundlePrice.html(Shopify.formatMoney(totalPrice*(1 - discountRate), window.money_format));
                             if(checkedProductLength == maxProduct){
                                window.bundleMatch = true;
                                bundlePrice.show();
                                oldPrice.show();
                                $('.products-grouped-action .price').hide();
                            }else{
                                window.bundleMatch = false;
                                bundlePrice.hide();
                                oldPrice.hide();
                                $('.products-grouped-action .price').show();
                            }
                        }

                        $('.products-grouped-action .total .price').html(Shopify.formatMoney(totalPrice, window.money_format));


                    };
                })
                if (ella.checkNeedToConvertCurrency()) {
                  Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
                }
            };

            var disableSoldoutSwatchAllBundles = function(){
                var productItem = $('.fbt-product-item');
                productItem.each(function(){
                    var self = $(this);
                    disableSoldoutSwatchBundle(self);
                })
                // var productItem = $('.product-review_variant').find('[data-fbt-pro-id]');

                // disableSoldoutSwatchBundle(productItem);
            };

            var disableSoldoutSwatchBundle = function(productItem){
                var productId = productItem.data('bundle-product-id');
                if (productId == undefined) {
                  productId = productItem.data('fbt-pro-id');
                }
                // var productId = productItem.find('[data-popup-bundle-product-id]').data('popup-bundle-product-id');
                var variantList = window.productVariants[productId];
                var options = productItem.find('[data-option-idx]');
                var selectedSwatchOpt1 = productItem.find('[data-option-idx="0"]').find('input:checked').val();
                var selectedSwatchOpt2 = productItem.find('[data-option-idx="1"]').find('input:checked').val();
                var selectedSwatchOpt3 = productItem.find('[data-option-idx="2"]').find('input:checked').val();

                options.each(function(){
                    var optionIndex = $(this).data('option-idx');
                    var swatch = $(this).find('.swatch-element');
                    switch (optionIndex) {
                        case 0:
                        // loop through all swatchs in option 1 anh filter sold out swatch
                        swatch.each(function(){
                            var swatchVal = $(this).data('value');
                            var opt1Soldout = variantList.find(function(variant){
                                return variant.option1 == swatchVal && variant.available;
                            });
                            if(opt1Soldout == undefined){
                                $(this).addClass('soldout');
                                $(this).find(':radio').prop('disabled',true);
                            }
                        })
                        break;
                        case 1:
                        // loop through all swatchs in option 2 anh filter sold out swatch
                        swatch.each(function(){
                            var swatchVal = $(this).data('value');
                            var opt1Soldout = variantList.find(function(variant){
                                return variant.option1 == selectedSwatchOpt1 && variant.option2 == swatchVal && variant.available;
                            });
                            if(opt1Soldout == undefined){
                                $(this).addClass('soldout');
                                $(this).find(':radio').prop('disabled',true);
                            }
                        })
                        break;
                        case 2:
                        // loop through all swatchs in option 3 anh filter sold out swatch
                        swatch.each(function(){
                            var swatchVal = $(this).data('value');
                            var opt1Soldout = variantList.find(function(variant){
                                return variant.option1 == selectedSwatchOpt1 && variant.option2 == selectedSwatchOpt2 && variant.option3 == swatchVal && variant.available;
                            });
                            if(opt1Soldout == undefined){
                                $(this).addClass('soldout');
                                $(this).find(':radio').prop('disabled',true);
                            }
                        })
                        break;
                    }
                });
            };

            var changeSwatchProductBundle = function() {
                var swatchSlt = '.fbt-product-item .swatch :radio, .product-review_variant .swatch :radio';

                doc.off('change.changeBundleSwatch', swatchSlt).on('change.changeBundleSwatch', swatchSlt, function(e) {
                    var self = $(this);
                    if (self.prop('checked')) {
                        var productItem = $(this).closest('[data-fbt-pro-id]');
                        var productId = $(this).parent().data('popup-bundle-product-id');
                        var variantList = window.productVariants[productId];
                        var optionIdx = self.closest('[data-option-idx]').data('option-idx');
                        var swatches = productItem.find('.swatch-element');
                        var thisVal = self.val();
                        var selectedVariant;
                        var fbtPrice = $('[data-bundle-product-id="' + productId + '"]').find('.fbt-prices'),
                            priceSale = fbtPrice.find('.price-sale'),
                            productPrice = fbtPrice.find('[data-fbt-price-change]');
                        var productInput = $('[data-bundle-product-id="' + productId + '"]').find('[name=group_id]');
                        // Get selected swatches
                        var selectedSwatchOpt1 = productItem.find('[data-option-idx="0"]').find('input:checked').val();
                        var selectedSwatchOpt2 = productItem.find('[data-option-idx="1"]').find('input:checked').val();
                        var selectedSwatchOpt3 = productItem.find('[data-option-idx="2"]').find('input:checked').val();
                        // Re-active all swatches
                        swatches.removeClass('soldout');
                        swatches.find(':radio').prop('disabled',false);
                        // Auto get first available variant
                        switch (optionIdx){
                            case 0:
                                var availableVariants = variantList.find(function(variant){
                                    return variant.option1 == thisVal && variant.option2 == selectedSwatchOpt2 && variant.available;
                                })
                                if(availableVariants != undefined){
                                    selectedVariant =  availableVariants;
                                }else{
                                     // variant was sold out, so auto select other available variant
                                    var altAvailableVariants = variantList.find(function(variant){
                                        return variant.option1 == thisVal && variant.available;
                                    })
                                    selectedVariant =  altAvailableVariants;
                                };
                                break;
                            case 1:
                                var availableVariants = variantList.find(function(variant){
                                    return variant.option1 == selectedSwatchOpt1 && variant.option2 == thisVal && variant.available;
                                })
                                if(availableVariants != undefined){
                                    selectedVariant =  availableVariants;
                                }else{
                                    // Something went wrong, if correct, never meet this
                                    console.log('Bundle Error: variant was soldout, on option selection #2')
                                };
                                break;
                            case 2:
                                var availableVariants = variantList.find(function(variant){
                                    return variant.option1 == selectedSwatchOpt1 && variant.option2 == selectedSwatchOpt2 && variant.option3 == thisVal && variant.available;
                                })
                                if(availableVariants != undefined){
                                   selectedVariant =  availableVariants;
                                }else{
                                    // Something went wrong, if correct, never meet this
                                    console.log('Bundle Error: variant was soldout, on option selection #3')
                                };
                                break;
                        }

                        productInput.val(selectedVariant.id);

                        // Check new swatch input
                        initSelectedSwatch();
                        // Disable sold out swatches base on new checked inputs
                        disableSoldoutSwatchBundle(productItem);

                        // Do select callback function
                         productPrice.html(Shopify.formatMoney(selectedVariant.price, window.money_format));

                         // change variant id of main product for adding to cart
                         productItem.find('input[name=id][type=hidden]').val(selectedVariant.id)

                            if (selectedVariant.compare_at_price > selectedVariant.price) {
                                priceSale.find('[data-fbt-price-change]').addClass('special-price');
                                priceSale.find('.old-price').html(Shopify.formatMoney(selectedVariant.compare_at_price, window.money_format)).show();
                            }
                            else {
                                priceSale.find('.old-price').hide();
                                priceSale.find('[data-fbt-price-change]').removeClass('special-price');
                            }

                            productItem.find('select').val(selectedVariant.id).trigger('change');

                            updateTotalPrice();
        
                            if (ella.checkNeedToConvertCurrency()) {
                                Currency.convertAll(window.shop_currency, $('#currencies .active').attr('data-currency'), 'span.money', 'money_format');
                            }

                            // Change product image
                            var newImage = productInput.find('option:selected',this).attr('data-image');
                            if(newImage != undefined){
                                var productImage = $('.fbt-image-item[data-bundle-product-id="'+productId+'"]').find('img');
                                productImage.attr('src',newImage)
                            }

                            $(this).parents('.product-options').find('.swatch').each(function(){
                              if ($(this).find('input:checked').parents('.swatch-element').hasClass('soldout')) {
                                $(this).find('.swatch-element').not('.soldout').find('input').prop('checked', true);
                              }
                              $(this).find('[data-option-select]').text($(this).find('input:checked').val());
                            })

                    }
                });
            };



            var initBundleAddToCart = function() {

                doc.off('click.bundleAddToCart', btnAddToCartSlt).on('click.bundleAddToCart', btnAddToCartSlt, function(e) {
                    e.preventDefault();

                    var self = $(this),
                        form = self.closest('form'),
                        curPro = form.find('[data-collections-related]'),
                        handle = curPro.data('collections-related'),
                        bundleProduct = form.find('[data-grouped-product-item].isChecked'),
                        title = $('h1.product-title').text(),
                        image = $('[id^="product-featured-image"]').first().attr('src');

                    if(self.attr('disabled') !== "disabled") {
                        ella.showLoading();
                        Shopify.queue = [];
                        var i = 0;
                        bundleProduct.each(function() {
                            var variantId = $(this).find('[name=group_id]').val();

                            if(variantId) {
                                Shopify.queue.push( {
                                    variantId: variantId,
                                    quantity: 1
                                });

                            };
                        });

                        Shopify.moveAlong = function() {
                            if (Shopify.queue.length) {
                                var request = Shopify.queue.shift();
                                ella.showLoading();
                                Shopify.addItem(request.variantId, request.quantity, Shopify.moveAlong);
                                ella.ellaTimeout = setTimeout(function(){
                                    ella.hideLoading();
                                },5000)
                            }
                            else {
                                ella.hideLoading();
                                var variant_id = curPro.find('[name=id]').val();
                                var formData = $(self.data('form-id'));
                                var data = formData.serialize();
                                var quantity = 1;
                                switch (window.ajax_cart) {
                                    case "none":
                                      form.submit();
                                      break;

                                    case "normal":
                                    	form.submit();
                                        break;

                                    case "upsell":
                                    	form.submit();
                                        break;
                                };
                             
                                // add discount code first
                                try{
                                    var discount_code = "FBT-BUNDLE-"+ meta.product.id;
                                    ella.apply_discount( discount_code );
                                }
                                catch(e){
                                    console.log(e)
                                }
                                return false;
                            };
                        }

                        Shopify.moveAlong();

                    }

                });

                 
            };
            replaceDiscountRate();
            bundleSlider();
            if(($('.layout_style_1170 ').length) || ($('.layout_style_fullwidth.product_layout_skin_1').length) || ($('.layout_style_flower.product_layout_skin_1').length) ){
                toggleVariantOptions_layout_1170();
            } else {
                toggleVariantOptions();
            }
            handleCheckedProduct();
            initSelectedSwatch();
            if(!$('.layout_style_1170 ').length){
                disableSoldoutSwatchAllBundles();
            }
            changeSwatchProductBundle();
            updateTotalPrice();
            initBundleAddToCart();
        },
        apply_discount: function( discount_code ){
            if(window.bundleMatch){
                $.ajax({
                    url: "/discount/" + discount_code + "?redirect=/cart",
                    success: function(response){
                      window.location.href = '/discount/' + discount_code + '?redirect=/cart';
                      console.log('Discount code added');
                    }
                });
            }
        },
        checkBundleProducts: function() {
          var discount_code = $.cookie('discount_code');
          if( discount_code != "" && discount_code != null ){
            var mainProduct = discount_code.replace('FBT-BUNDLE-', '');
            if( mainProduct != '')
                getShoppingCart();
          }

            function getShoppingCart () {

                if( $('ul.cart-list li').length > 0 ) {
                var check = false;
                var cart = [];
                $('ul.cart-list li').each(function(i, el) {
                  var product_id = $(el).data('product_id');
                  if( product_id == mainProduct){
                    check = true;
                  }
                  if(cart.indexOf( product_id ) == -1)
                    cart.push( product_id );
                });

                if( check == true ){
                  $.ajax({
                    url: "/collections/bundle-" + mainProduct + "?view=bundle-json",
                    success: function(response){
                      var myBundle = JSON.parse(response);
                      if(cart.length >= myBundle.results.length) {
                        checkProductInCart(cart, myBundle.results);
                      }
                      else
                        remove_discount();
                    }
                  });
                }
                else 
                  remove_discount();
              }
          }

          function checkProductInCart(cart, collection){
            var i = 0;
            collection.forEach(function(el) {
              if(cart.indexOf(el.id) != -1) {
                i++;
              }
            });
            if( i != collection.length)
              remove_discount();
          }

          function remove_discount(){
            $.ajax({
              url: "/checkout?discount=%20",
              success: function(response){
                // $.cookie('discount_code', '');
                console.log('Discount code removed')
              }
            });
          }
        },

        hide_filter: function(){
          $(".sidebar-tags .widget-content ul").each(function() {   
            if ($(this).children('li').length > 0) {
              $(this).parents('.sidebar-tags').show();
            } else { 
              $(this).parents('.sidebar-tags').hide();
            }
          });
        },

        stickySidebar: function(){
            // if ($('.collection-template-default').length || $('.collection-template-skin-1').length){
            //     var h_main = $('[data-section-type="collection-template"]').outerHeight() - 100,
            //         h_sidedbar = $('.sidebar').outerHeight();
            //     if (window.innerWidth > 1200 && h_sidedbar < h_main) {
            //         var sidebar = new StickySidebar('.sidebar', {
            //             bottomSpacing: 20,
            //             topSpacing: 60,
            //             containerSelector: false
            //         });
            //     }
            // }
        },

        productRecomendation: function() {
          var $container = $('.js-product-recomendation');
          var productId = $container.data('productId');
          var template = $container.data('template');
          var sectionId = $container.data('sectionId');
          var limit = $container.data('limit');
          var productRecommendationsUrlAndContainerClass =
              window.router + '/recommendations/products?&section_id='+ sectionId +'&limit=' + limit + '&product_id=' + productId + ' .product-recommendations';
          $container.parent().load(productRecommendationsUrlAndContainerClass, function(){
            if (template != '') {
              $('.js-product-recomendation .products-grid').addClass('verticle');
            }
            $('[data-toggle="tooltip"]').tooltip();
            ella.initSliderFeaturedProducts();
            ella.translateBlock('#product-recommendations');
            if ($('.shopify-product-reviews-badge').length && $('.spr-badge').length) {
                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
            };
            
          });
        },

        appendProductRecomendation: function(){
          var ProductRecomendation = $('#product-recommendations'),
              appenRecomendation = $('.template-product .product .product_bottom');
              appenRecomendation1 = $('.template-product .product .product_bottom .relate-verticle');
              appenRecomendation2 = $('.template-product .product .relate-verticle').find('[data-sticky-3]');
              ProductRecomendation.appendTo(appenRecomendation);
              ProductRecomendation.appendTo(appenRecomendation1);
              ProductRecomendation.appendTo(appenRecomendation2);

          
        },

        checkbox_checkout: function(){
            var inputWrapper = $('.checkbox-group label');  

            var checkBox = $('.checkbox-group input[type="checkbox"]');
          
            setTimeout(function(){
              checkBox.each(function(){
                if ($(this).is(':checked')) {
                  $(this).parent().parent().find('.btn-checkout').removeClass('show');
                } else {
                  $(this).parent().parent().find('.btn-checkout').addClass('show');
                }
              });
            },300);

            inputWrapper.off('click').on('click', function (e) {
              var inputTrigger= $(this).parent().find('.conditions'),
                  divAddClassbtn = $(this).parent().parent().find('.btn-checkout');

              if (!inputTrigger.is(':checked')) {
                divAddClassbtn.removeClass('show');
                inputTrigger.prop('checked', true);
              } else {
                divAddClassbtn.addClass('show');
                inputTrigger.prop('checked', false);
              }

            });
        },
      
        menu_ajax: function() {

          if (!$('.site-nav').length)
              return;
            if (win.innerWidth() < 1025) {
                var chk = false;
                window.addEventListener('load', function(){ // on page load
                    document.body.addEventListener('touchstart', function(e){
                        if (chk == false) {
                            chk = true;
                            $.ajax({
                                url: window.router + '/search?view=mega',
                                beforeSend: function () {
                                    // theme.HaloAddOn.loadingPopup();
                                },
                                success: function (data) {
                                    var curMega = $('.site-nav'),
                                        newMega = $(data).find('.site-nav');
                                        if ($('.wrapper_header_supermarket').length && $('.vertical-menu').length){
                                            curMega = $('.horizontal-menu .nav-bar');
                                            newMega = $(data).find('.horizontal-menu .nav-bar');
                                        }
                                        $(curMega).replaceWith(newMega);
                                    ella.initToggleSubMenuMobile();
                                    ella.sliderMegaMenu();
                                },

                                error: function (xhr, text) {
                                    alert($.parseJSON(xhr.responseText).description);
                                },

                                complete: function () {
                                    // theme.HaloAddOn.removeLoadingPopup();
                                }
                            })
                        }
                    }, false)
                }, false);
                $('[data-menu-mb-toogle]').on('click', function(event) {
                    if (chk == false) {
                        chk = true;
                        $.ajax({
                            url: window.router + '/search?view=mega',
                            beforeSend: function () {
                                // theme.HaloAddOn.loadingPopup();
                            },
                            success: function (data) {
                                var curMega = $('.site-nav'),
                                    newMega = $(data).find('.site-nav');
                                    if ($('.wrapper_header_supermarket').length && $('.vertical-menu').length){
                                        curMega = $('.horizontal-menu .nav-bar');
                                        newMega = $(data).find('.horizontal-menu .nav-bar');
                                    }
                                    $(curMega).replaceWith(newMega);
                              ella.initToggleSubMenuMobile();
                              ella.sliderMegaMenu();
                            },

                            error: function (xhr, text) {
                                alert($.parseJSON(xhr.responseText).description);
                            },

                            complete: function () {
                                // theme.HaloAddOn.removeLoadingPopup();
                            }
                        })
                    }
                })
            } else {
                var chk = false;
                // $('#site-nav, body').on('mouseleave').on('mouseenter', function(){
                doc.mousemove(function(){
                    if (chk == false) {
                        chk = true;
                        $.ajax({
                            url: window.router + '/search?view=mega',
                            beforeSend: function () {
                                // theme.HaloAddOn.loadingPopup();
                            },
                            success: function (data) {
                                var curMega = $('.site-nav'),
                                    newMega = $(data).find('.site-nav');
                                    if ($('.wrapper_header_supermarket').length && $('.vertical-menu').length){
                                        curMega = $('.mb-area');
                                        newMega = $(data).find('.mb-area');
                                    }
                                    curMega.replaceWith(newMega);
                                    setTimeout(function(){
                                        ella.sliderMegaMenu();
                                    },1000);
                              	ella.initToggleSubMenuMobile();
                            },

                            error: function (xhr, text) {
                                alert($.parseJSON(xhr.responseText).description);
                            },

                            complete: function () {
                                // theme.HaloAddOn.removeLoadingPopup();
                                if ($('[data-masonry]').length) {
                                    $('.site-nav-dropdown [data-masonry]').masonry({
                                        columnWidth: '.grid-sizer',
                                        itemSelector: '[data-gridItem]'
                                    });
                                }
                            }
                        })
                    }
                });
            }
        },

        loaderScript: function() {
            var load = function(){
                var script = $('[data-loader-script]');
                if (script.length) {
                    script.each(function(){
                        var _this = $(this),
                            link = _this.data('loader-script'),
                            top = this.getBoundingClientRect().top;
                        if (!_this.hasClass('is-load')) {
                            if (top < window.innerHeight + 100) {
                                ella.buildScript(link);
                                $('[data-loader-script="' + link + '"]').addClass('is-load');
                            }
                        }
                    })
                }
            }
            window.addEventListener('load', function loaderPostload() {
                load();
                window.addEventListener('scroll', load);
            });
        },

        buildScript: function(name) {
            var loadScript = document.createElement("script");
            loadScript.src = name;
            document.body.appendChild(loadScript);
        },

        beforeYouLeave: function() {
            var $beforeYouLeave = '#before-you-leave',
                $beforeYouLeave_close = $($beforeYouLeave).find('.close'),
                $beforeYouLeave_close2 = $($beforeYouLeave).find('.before-you-leave__bg #reload_page'),
                $beforeYouLeave_search = $($beforeYouLeave).find('.search'),
                $beforeYouLeave_time = $($beforeYouLeave).find('.before-you-leave__wrapper').data('time');

            if (!$($beforeYouLeave).length) {
                return;
            }

            var idleTime = 0;

            $(document).ready(function () {
                var idleInterval = setInterval(timerIncrement, $beforeYouLeave_time);
            });

            $(document)
            .on('mousemove', resetTimer)
            .on('keydown', resetTimer)
            .on('scroll', resetTimer);

            function timerIncrement() {
                idleTime = idleTime + 1;
                if (idleTime >= 1 && !$('body.open_beforeYouLeave').length ) {
                    $('body').addClass('open_beforeYouLeave');
                }
                $(window).unbind('click');
            }

            function resetTimer() {
                idleTime = 0;
            }

            $beforeYouLeave_close2.on('click', function(event) {
                event.preventDefault();
                $('body').removeClass('open_beforeYouLeave');
            });

            $beforeYouLeave_close.on('click', function(event) {
                event.preventDefault();
                $('body').removeClass('open_beforeYouLeave');
            });
        },

        modal_open: function(modal, name) {
            var classes = {
                open: 'open_' + name,
                openClass: 'modal--is-active'
            };

            $(modal).fadeIn('fast');
            $(modal).addClass(classes.openClass);
            $('body').addClass(classes.open);
        },

        modal_close: function(modal, name) {
            var classes = {
                open: 'open_' + name,
                openClass: 'modal--is-active'
            };

            $(modal).fadeOut('fast');
            $(modal).removeClass(classes.openClass);
            $('body').removeClass(classes.open);
        },

        _addonShareAPI: function() {
            // $('.share-button').click(function(){
                const title = $('.share_toolbox').attr('title');
                const url = $('.share_toolbox').data('href');
                if (navigator.share) {
                    navigator.share({
                    title: title,
                    url: url
                }).then(() => {
                    console.log('Thank for sharing!');
                })
                .cath(console.error);
                } else { 
                    $('.share_toolbox .txt_copy').val(url);
                    $('.share_toolbox .button').attr('data-url',url).attr('data-title',title);
                    $('.share_toolbox .modal-title-text').text(title);
                };
            // });
            $('.close-button').click(function(){
                $('.share-modal').removeClass('show-share');
                $('.pen-url').removeClass('share-success');
            });

            $('.copy-link').click(function(){
                var copyText = $(this).prev('.txt_copy');
                $('.pen-url').addClass('share-success');
                copyText.select();
                document.execCommand("copy");
            });
        },

        _addonCompareColorPopup: function() {
            if(!$('.compareColor-link').length) {
                return;
            }

            $(document).on('click', '.compareColor-link', function(event) {
                event.preventDefault();
                var $compareColorModal = '#compareColor-modal',
                    $Close = $($compareColorModal).find('.close'),
                    $compareColorModalContent = $($compareColorModal).find('.modal-content');

                if (!$($compareColorModal).length) {
                    return;
                }

                $($compareColorModal).addClass('modal--is-active').fadeIn('fast');

                $Close.on('click', function (event) {
                    event.preventDefault();
                    $($compareColorModal).removeClass('modal--is-active').fadeOut('fast');
                });

                $($compareColorModal).on('click', function (event) {
                    if (($($compareColorModal).hasClass('modal--is-active')) && ($(event.target).closest($compareColorModalContent).length === 0)){
                        event.preventDefault();
                        $($compareColorModal).removeClass('modal--is-active').fadeOut('fast');
                    }
                });
            })

            $(document).on('click', '.compareColor-swatch label', function(event) {
                event.preventDefault();

                $('.compareColor-swatch label').removeClass('disabled2')

                var self = $(this),
                    $ipt = self.prev(),
                    $image = self.data('image');
                    $value = self.data('value');
                    $value2 = self.html();
                    $limit = 0;

                if(!$ipt.prop('checked')) {
                    $ipt.prop('checked', true);
                    self.parents('#compareColor-modal').find('.show-img').append('<div class="item text-center ' + $value + '"><img srcset="' + $image + '" alt="" /><p>' + $value2 + '</p></div>');
                    $limit = $('#compareColor-modal .show-img .item').length;
                } else {
                    $ipt.prop('checked', false);
                    self.parents('#compareColor-modal').find('.show-img ' + '.' + $value).remove();
                    $limit = $('#compareColor-modal .show-img .item').length;
                };

                
                if ($limit < 5 ) {
                    $('.compareColor-swatch label').removeClass('disabled2')
                } else {
                    $('.compareColor-swatch label').addClass('disabled2')
                }
            });
        },

        _cartCountDown: function() {
            if (!$('.cart__count_down').length)
                return;

            var timer,
                elCountDown = $('.cart__count_down .count_down'),
                minute = elCountDown.data('time');

            function startTimer(duration, display) {
                timer = duration;
                var minutes, seconds;
                setInterval(function() {
                    minutes = parseInt(timer / 60, 10)
                    seconds = parseInt(timer % 60, 10);

                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    display.textContent = minutes + ":" + seconds;

                    if (--timer < 0) {
                        timer = duration;
                    }
                }, 1000);
            }

            function resetTimer() {
                timer = 60 * minute;
            }

            $( document ).ready(function() {
                fiveMinutes = 60 * minute,
                display = document.querySelector('#time');
                startTimer(fiveMinutes, display);
            })
        },

        _videoPopup: function (){
            if ($(".video-open-popup ").length) {
            } else {return}
            $('.video-open-popup a').off('click').on('click',function(){
                var video_id = $(this).attr('data-id'),
                    video_src = $(this).attr('data-src'),
                    modal = $('[data-popup-video]');
                    
                    const $content = '<div class="fluid-width-video-wrapper"><iframe\
                                        id="player"\
                                        type="text/html"\
                                        width="100%"\
                                        frameborder="0"\
                                        webkitAllowFullScreen\
                                        mozallowfullscreen\
                                        allowFullScreen\
                                        src="https://www.youtube.com/embed/'+video_src+'?autoplay=1&mute=1"\
                                        data-video-player>\
                                    </iframe></div>';
                modal.find('.halo-modal-body').html($content);

                modal.fadeIn(600, function () {
                    if ($('[data-ajax-cart-success]').is(':visible')) {
                        $('[data-ajax-cart-success]').hide();
                    }
                });
            });

            $('[data-popup-video], [data-popup-video] .close-modal').on('click', function (e) {
                var modalContent = $('[data-popup-video] .halo-modal-body');
                if (!modalContent.is(e.target) && !modalContent.has(e.target).length) {
                    $('[data-popup-video]').fadeOut(500, function () {
                        $('[data-popup-video] iframe').remove();
                        html.removeClass('halo-modal-open');
                        html.css({
                            "overflow": ""
                        });
                    });
                };
            });
        },

        _multiHomepage: function (){
            $('[data-menu-tab] li').on('click', function(){
                var active = $(this).data('load-page');
                var href= $(this).attr('href');
                $.cookie('page-url', active, {
                    expires: 1,
                    path: '/'
                });
            });
            
            var canonical = $('[canonical-shop-url]').attr('canonical-shop-url');
            if (document.URL != canonical) {
                $('[data-load-page=' + $.cookie('page-url') + ']').addClass('active').siblings().removeClass('active');
            }
            var active = $('[data-menu-tab] li.active').data('load-page');
            $.ajax({
                url: window.router + '/search?type=product&q=' + active + '&view=mega',
                beforeSend: function () {
                    // theme.HaloAddOn.loadingPopup();
                },
                success: function (data) {
                    // console.log(data);
                    var curMega = $('.site-nav'),
                        newMega = $(data).find('.site-nav');
                        if ($('.wrapper_header_supermarket').length){
                            curMega = $('.mb-area');
                            newMega = $(data).find('.mb-area');
                        }
                        curMega.replaceWith(newMega);

                },

                error: function (xhr, text) {
                    alert($.parseJSON(xhr.responseText).description);
                },

                complete: function () {
                    doc.mousemove(function(){
                        if(!$('.featuredProductCarousel').hasClass('slick-initialized')) {
                            ella.sliderMegaMenu();
                        }
                    });
                    if ($('[data-masonry]').length) {
                        $('.site-nav-dropdown [data-masonry]').masonry({
                            columnWidth: '.grid-sizer',
                            itemSelector: '[data-gridItem]'
                        });
                    }
                }
            })
        },

        checkbox_submit: function (){
            var check_submit = $('.newsletter-des #check_newsletter');
            var check = false;
            check_submit.off('click').on('click', function(e){
                if ($(this).is(':checked')) {
                    $('.footer-newsletter .block-content').find('.btn').addClass('show');
                } else {
                    check = true;
                    $('.footer-newsletter .block-content').find('.btn').removeClass('show');
                }
            });
            $(".footer-newsletter .input-group-field").keypress(function(e){ 
                if(e.keyCode==13 && check == false)
                    e.preventDefault();
            });
        },

        _notifySoldoutSlider: function(){
            $('a#soldOut-button1').off('click').on('click', function(e){
                e.preventDefault();
                var value = $(this).prev().val();
                $('#nofify_sold-out').find('#contactFormEmail').val(value);
                $('#soldOut-button').trigger('click');
            })
        }
    };

})(jQuery);
