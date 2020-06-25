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

// swiper template
function addSwiper(selector, options = {}) {
  return Array.from(document.querySelectorAll(selector), function (item) {
    var $sliderContainer = $(item),
        $sliderEl = $sliderContainer.find(selector + "__container");

    if (options.navigation) {
      $sliderContainer.addClass("has-nav");
      options.navigation = {
        prevEl: $sliderContainer.find(selector + "__prev"),
        nextEl: $sliderContainer.find(selector + "__next")
      };
    }

    if (options.pagination) {
      $sliderContainer.addClass("has-pagination");
      options.pagination = {
        el: $sliderContainer.find(selector + "__pagination"),
        clickable: true
      };
    }

    return new Swiper($sliderEl, options);
  });
}

$(function () {
  addSwiper(".banner-slider", {
    effect: "fade",
    speed: 1000,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });
});

// quantity input

$(function () {

  const $document = $(document);

  $document.on("focus", ".quantity__input, [data-number-input]", function () {

    const $input = $(this);

    const min = $input.data("min") !== undefined ? parseInt($input.data("min")) : 1;

    if ($input.hasClass("is-binded")) return;

    $input.addClass("is-binded");

    $input.on("change", function () {

      var val = $input.val();

      console.log("changed");

      if (val && parseInt(val) >= min) {

        return;
      }

      $input.val(min);

      $input.trigger("change");
    }).on("keydown", function (e) {

      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {

        return;
      }

      if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {

        e.preventDefault();
      }
    }).on("keyup", function (e) {

      if ($input.val() == "") return;

      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {

        $input.trigger("change");

        return;
      }

      if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {

        return;
      }

      $input.trigger("change");
    }).on("paste", function (e) {

      var paste = e.originalEvent.clipboardData.getData("text");

      var pasteNum = parseInt(paste);

      if (pasteNum > 0) {

        return;
      } else {

        e.preventDefault();
      }
    });
  });

  $document.on("click", ".quantity__btn", function (e) {

    e.preventDefault();

    var $siblingInput = $(this).siblings(".quantity__input");

    var plus = $(this).data("plus");

    var value = $siblingInput.val();

    var newValue = parseInt(value) + plus;

    var min = $siblingInput.data("min") !== undefined ? parseInt($siblingInput.data("min")) : 1;

    if (newValue >= min) {

      $siblingInput.val(newValue);

      $siblingInput.trigger("change");
    }
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

$(function () {
  $(".adjust__input").on("input change", function () {
    var val = $(this).val();
    $(this).closest("tr").find(".adjust__number").html(val);
  });
});