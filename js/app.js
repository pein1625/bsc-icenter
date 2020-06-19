// menu toggle
$(function () {
  $(".menu-toggle").on("click", function () {
    var $toggle = $(this);

    $toggle.toggleClass("active").siblings(".menu-sub").slideToggle();

    $toggle.siblings(".menu-mega").children(".menu-sub").slideToggle();

    $toggle.parent().siblings(".menu-item-group").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-mega").children(".menu-sub").slideUp();

    $toggle.parent().siblings(".menu-item-group").children(".menu-toggle").removeClass("active");
  });
});

// navbar mobile toggle
$(function () {
  var $body = $('html, body');
  var $navbar = $('.js-navbar');
  var $navbarOpen = $('.js-navbar-open');
  var $navbarClose = $('.js-navbar-close');

  $navbarOpen.on('click', function () {
    $navbar.addClass('is-show');
    $body.addClass('overflow-hidden');
  });

  $navbarClose.on('click', function () {
    $navbar.removeClass('is-show');
    $body.removeClass('overflow-hidden');
  });
});

// script for sticky items
$(function () {
  var $moveTop = $('.btn-movetop');
  var $window = $(window);

  if (!$moveTop.length) return;

  $window.on('scroll', function () {
    if ($window.scrollTop() > 150) {
      $moveTop.fadeIn();

      return;
    }

    $moveTop.fadeOut();
  });

  $moveTop.on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 800);
  });
});

// open modal video

$(function () {

  $('.js-video-modal').on('click', function (e) {

    e.preventDefault();

    var youtubeId = $(this).data('youtubeId'),
        modal = $(this).data('modal') || '.md-video';

    $(modal).find('iframe').attr('src', `https://www.youtube.com/embed/${youtubeId}?autoplay=1`);

    $(modal).modal('show');
  });

  $('.md-video').on('hide.bs.modal', function () {

    $(this).find('iframe').attr('src', '');
  });
});

// open video switch

$(function () {

  $('.js-video-switch').on('click', function (e) {

    e.preventDefault();

    var target = $(this).data('target') || '.js-video-switch-target',
        youtubeId = $(this).data('youtubeId');

    $(target).find('iframe').attr('src', `https://www.youtube.com/embed/${youtubeId}?autoplay=1`);
  });
});

// common.js
$(function () {
  $(".js-faq-tab").on("shown.bs.tab", function () {
    $("html, body").animate({
      scrollTop: $(".faq__answers").offset().top - 30
    }, 800);
  });
});

$(".grid").masonry({
  itemSelector: ".grid__col"
});