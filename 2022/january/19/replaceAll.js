$(document).ready(function() {

    $('.btn-cart').click(function () {
        $('.product-add-to-cart-wrap').replaceAll($('.btn-add-to-cart'));
        $('.bottom-fixed-btn').addClass($('.fixed'));
        $('.add-to-cart-product-info').removeClass($('.hidden'));
    });

    $("#btn-cart-popup-close").click(function () {
        $('.btn-add-to-cart').replaceAll($('.product-add-to-cart-wrap'));
        $('.bottom-fixed-btn').addClass($('.fixed'));
    });
});