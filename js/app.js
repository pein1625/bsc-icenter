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
    pagination: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    }
  });
});

// art slider
$(function () {
  addSwiper(".art-slider", {
    navigation: true,
    loop: true,
    speed: 600,
    autoHeight: true,
    autoplay: {
      delay: 4000
    }
  });
});

// PV(rate, nper, pmt, fv, type)

function PV(rate, nper, pmt, fv, type) {

  nper = parseFloat(nper);

  pmt = parseFloat(pmt);

  fv = parseFloat(fv);

  // if (pmt == 0 || nper == 0) {

  //   alert("Why do you want to test me with zeros?");


  //   return 0;

  // }


  if (rate == 0) {

    // Interest rate is 0


    pv_value = -(fv + pmt * nper);
  } else {

    x = Math.pow(1 + rate, -nper);

    y = Math.pow(1 + rate, nper);

    pv_value = -(x * (fv * rate - pmt + y * pmt)) / rate;
  }

  pv_value = conv_number(pv_value, 2);

  return pv_value;
}

function conv_number(expr, decplaces) {

  // This function is from David Goodman's Javascript Bible.


  var str = "" + Math.round(eval(expr) * Math.pow(10, decplaces));

  while (str.length <= decplaces) {

    str = "0" + str;
  }

  var decpoint = str.length - decplaces;

  return str.substring(0, decpoint) + "." + str.substring(decpoint, str.length);
}

function FV(rate, nper, pmt, pv) {

  nper = parseFloat(nper);

  pmt = parseFloat(pmt);

  pv = parseFloat(pv);

  if (pmt == 0 || nper == 0) {

    alert("Why do you want to test me with zeros?");

    return 0;
  }

  if (rate == 0) {

    // Interest rate is 0


    fv_value = -(pv + pmt * nper);
  } else {

    x = Math.pow(1 + rate, nper);

    // y = Math.pow(1 + rate, nper);


    fv_value = -(-pmt + x * pmt + rate * x * pv) / rate;
  }

  fv_value = conv_number(fv_value, 2);

  return fv_value;
}

/**

 * Copy of Excel's PMT function.

 * Credit: http://stackoverflow.com/questions/2094967/excel-pmt-function-in-js

 *

 * @param rate_per_period       The interest rate for the loan.

 * @param number_of_payments    The total number of payments for the loan in months.

 * @param present_value         The present value, or the total amount that a series of future payments is worth now;

 *                              Also known as the principal.

 * @param future_value          The future value, or a cash balance you want to attain after the last payment is made.

 *                              If fv is omitted, it is assumed to be 0 (zero), that is, the future value of a loan is 0.

 * @param type                  Optional, defaults to 0. The number 0 (zero) or 1 and indicates when payments are due.

 *                              0 = At the end of period

 *                              1 = At the beginning of the period

 * @returns {number}

 */

function PMT(rate_per_period, number_of_payments, present_value, future_value, type) {

  future_value = typeof future_value !== "undefined" ? future_value : 0;

  type = typeof type !== "undefined" ? type : 0;

  if (rate_per_period != 0.0) {

    // Interest rate exists

    var q = Math.pow(1 + rate_per_period, number_of_payments);

    return -(rate_per_period * (future_value + q * present_value)) / ((-1 + q) * (1 + rate_per_period * type));
  } else if (number_of_payments != 0.0) {

    // No interest rate, but number of payments exists

    return -(future_value + present_value) / number_of_payments;
  }

  return 0;
}

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

      if (val && parseInt(val) >= min) {
        return;
      }

      $input.val(min);
      $input.trigger("change");
    }).on("keydown", function (e) {
      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39 || e.keyCode === 190 && $input.val().search(/\./) < 0) {
        return;
      }
      if ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    }).on("keyup", function (e) {
      if ($input.val() == "") return;

      if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 || e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true) || e.keyCode >= 35 && e.keyCode <= 39) {
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

$(function () {
  if (sessionStorage.visited) {
    return;
  }

  sessionStorage.visited = true;

  $(".popup").modal("show");
});

$(function () {
  $inputs = $(".input-progress").find("input");

  $inputs.on("input change", function () {
    updateRange(this);
  });

  $inputs.each(function () {
    updateRange(this);
  });

  function updateRange(input) {
    var min = input.min,
        max = input.max,
        val = input.value;

    width = (val - min) * 100 / (max - min) + "%";

    $(input).siblings(".input-progress__track").children(".input-progress__inner").css({
      width: (val - min) * 100 / (max - min) + "%"
    });
  }
});

$(function () {
  $("[data-percent]").on("focus", function () {
    $(this).val($(this).val().replace("%", ""));
  }).on("blur", function () {
    $(this).val($(this).val() + "%");
  });
});

// Kế hoạch hưu trí
const Retirement = function () {
  const RetirementClass = function () {};

  // Số tuổi hiện tại
  RetirementClass.prototype.currentAge = 30; // Ages

  // Số tuổi nghỉ hưu
  RetirementClass.prototype.retirementAge = 60; // Ages

  // Số năm nghỉ hưu
  RetirementClass.prototype.retirementYears = 25; // Years

  // Thu nhập hiện tại hàng tháng
  RetirementClass.prototype.monthlyIncome = 25; // Millions VND

  // Chi phí sinh hoạt hàng tháng
  RetirementClass.prototype.monthlyExpenses = 15; // Millions VND

  // Số tiền đầu tư ban đầu
  RetirementClass.prototype.initialInvestmentAmount = 300; // Millions VND

  // Số năm đầu tư trước khi nghỉ hưu
  RetirementClass.prototype.investmentYears = 30; // years

  // Lạm phát điều chỉnh
  RetirementClass.prototype.inflationary = 3; // %

  // Khẩu vị rủi do: Bảo toàn, cân bằng, tăng trưởng, tiết kiệm
  RetirementClass.prototype.riskApetite = 7; // %

  // Tính số năm đầu tư
  RetirementClass.prototype.updateInterestYears = function () {
    this.investmentYears = this.retirementAge - this.currentAge;
    $(".js-investment-years").val(this.investmentYears);
  };

  // Lãi suất dự kiến
  RetirementClass.prototype.getInterestRate = function () {
    switch (this.riskApetite) {
      case "Tiết kiệm":
        return 7;
        break;
      case "Bảo toàn":
        return 10;
        break;
      case "Cân bằng":
        return 12;
        break;
      case "Tăng trưởng":
        return 13;
        break;
      default:
        return 7;
    }
  };

  // Số tiền cần khi nghỉ hưu
  RetirementClass.prototype.getSavingAmount = function (years = this.retirementYears) {
    return -PV(this.inflationary / 100 / 12, years * 12, this.monthlyExpenses, 0, 0);
  };

  RetirementClass.prototype.getSavingAmountByAge = function (age) {
    let fv = -FV(this.getInterestRate() / 100 / 12, (age - this.currentAge) * 12, this.getSavingAmountPerMonth(), this.initialInvestmentAmount, 0);

    return fv;
  };

  // Số tiền cần tiết kiệm mỗi tháng trước khi nghỉ hưu
  RetirementClass.prototype.getSavingAmountPerMonth = function () {
    return -PMT(this.getInterestRate() / 100 / 12, this.investmentYears * 12, -this.initialInvestmentAmount, this.getSavingAmount(), 0);
  };

  RetirementClass.prototype.updateResult = function () {
    let result = `
<div class="adjust-result__body bg-light">
  <div class="adjust-result__label">KẾT QUẢ :</div>
  <div class="adjust-result__content">
    <div>Để có mức chi tiêu là <span class="text-danger font-weight-bold">${this.monthlyExpenses}</span> triệu một tháng trong <span class="text-danger font-weight-bold">${this.investmentYears}</span> năm sau khi nghỉ hưu</div>
    <div>Với lãi suất đầu tư dự kiến là <span class="text-danger font-weight-bold">${this.interestRate}</span> % một năm</div>
    <div>Thì số tiền anh / chị cần tích lũy hàng tháng là <span class="text-danger font-weight-bold">${this.savingAmountPerMonth}</span> triệu,</div>
    <div>Tương ứng <span class="text-danger font-weight-bold">12</span>% Thu nhập hàng tháng.</div>
    <div>Với số vốn đầu tư ban đầu là <span class="text-danger font-weight-bold">${this.initialInvestmentAmount}</span> triệu và thời gian đầu tư là <span class="text-danger font-weight-bold">${this.investmentYears}</span> năm.</div>
  </div>
</div>`;

    $(".js-planning-result").html(result);
  };

  RetirementClass.prototype.updateChart = function () {
    // Số dư dự kiến
    let surplus = [this.initialInvestmentAmount * 1000000];

    // Tiền tích trữ hàng năm
    let accumulate = [0];

    // Chi tiêu
    let expenses = [0];

    for (let age = this.currentAge; age < this.retirementAge; age++) {
      surplus.push(this.getSavingAmountByAge(age + 1) * 1000000);
      accumulate.push(this.savingAmountPerMonth * 12 * 1000000);
      expenses.push(this.monthlyExpenses * 12 * 1000000);
    }

    for (let years = this.retirementYears - 1; years > 0; years--) {
      surplus.push(this.getSavingAmount(years) * 1000000);
      accumulate.push(0);
      expenses.push(this.monthlyExpenses * 12 * 1000000);
    }

    surplus.push(0);
    accumulate.push(0);
    expenses.push(0);

    let series = [{
      type: "area",
      color: "#ddd",
      name: "Số dư dự kiến",
      data: surplus
    }, {
      type: "column",
      color: "#F5BE14",
      name: "Tiền tích luỹ hàng năm",
      data: accumulate
    }, {
      type: "column",
      color: "#182A54",
      name: "Chi tiêu",
      data: expenses
    }];

    console.log(JSON.stringify(series));

    showRetirementPlanningChart(series, this.currentAge);
  };

  // Tính kết quả và ghi ra màn hình
  RetirementClass.prototype.calcResult = function () {
    let interestRate = this.getInterestRate();
    let savingAmount = Math.round(this.getSavingAmount());
    let savingAmountPerMonth = Math.round(this.getSavingAmountPerMonth() * 100) / 100;

    this.interestRate = interestRate;
    this.savingAmount = savingAmount;
    this.savingAmountPerMonth = savingAmountPerMonth;

    $(".js-interest-rate").val(interestRate + "%");
    $(".js-saving-amount").val(savingAmount.toLocaleString("en"));
    $(".js-saving-amount-per-month").val(savingAmountPerMonth.toLocaleString("en"));

    this.updateChart();
    this.updateResult();
  };

  return new RetirementClass();
}();

$(function () {
  const $retirementPlanning = $("#retirement-planning");

  if ($retirementPlanning.length === 0) return;

  $(".js-planning-input").on("change", function () {
    let value = $(this).val();
    let role = $(this).data("role");

    if (role === "riskApetite") {
      Retirement[role] = value;
      return;
    }

    Retirement[role] = parseInt(value);

    if (role === "currentAge" || role === "retirementAge") {
      Retirement.updateInterestYears();
    }
  });

  $(".js-planning-submit").on("click", function (e) {
    e.preventDefault();

    Retirement.calcResult();

    $("html, body").animate({
      scrollTop: $(".js-planning-scroll-to").offset().top
    }, 800);
  });

  showRetirementPlanningChart();
});

function showRetirementPlanningChart(series, currentAge = 30) {
  if (!$("#ke-hoach-huu-tri")[0]) return;

  series = series || [{
    type: "area",
    color: "#ddd",
    name: "Số dư dự kiến",
    data: [300000000, 329080000, 360270000, 393710000, 429570000, 468020000, 509250000, 553460000, 600870000, 651700000, 706210000, 764660000, 827340000, 894540000, 966610000, 1043880000.0000001, 1126740000, 1215590000, 1310860000, 1413020000, 1522560000, 1640030000, 1765980000, 1901040000, 2045860000, 2201160000, 2367680000, 2546230000, 2737700000, 2943000000, 3163150000, 3076860000, 2987950000, 2896340000, 2801940000, 2704660000, 2604430000, 2501150000, 2394730000, 2285080000, 2172080000, 2055650000, 1935680000, 1812060000, 1684680000, 1553430000, 1418180000, 1278820000, 1135220000, 987250000, 834790000, 677680000, 515799999.99999994, 348990000, 177110000, 0]
  }, {
    type: "column",
    color: "#F5BE14",
    name: "Tiền tích luỹ hàng năm",
    data: [0, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 7199999.999999999, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }, {
    type: "column",
    color: "#182A54",
    name: "Chi tiêu",
    data: [0, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 180000000, 0]
  }];

  Highcharts.chart("ke-hoach-huu-tri", {
    chart: {
      type: "areaspline"
    },
    title: "",
    yAxis: {
      title: {
        text: ""
      },
      labels: {
        formatter: function () {
          return this.value.toLocaleString("en");
        },
        style: {
          fontSize: areaLabelFontSize,
          fontWeight: "400",
          fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
        }
      }
    },
    legend: false,
    tooltip: {
      pointFormat: "{series.name}:<br/> {point.y:,.0f} VND"
    },
    plotOptions: {
      area: {
        pointStart: currentAge,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      },
      column: {
        pointStart: currentAge
      }
    },
    series: series
  });
}

// Kế hoạch đầu tư
const Investment = function () {
  const InvestmentClass = function () {};

  // Số tiền hiện có
  InvestmentClass.prototype.presentValue = 500; // Milliions VND

  // Số tiền đầu tư định kỳ
  InvestmentClass.prototype.paymentPerYear = 50; // Milliions VND

  // Thời gian đầu tư dự kiến
  InvestmentClass.prototype.investmentYears = 5; // Years

  // Khẩu vị rủi do: Bảo toàn, cân bằng, tăng trưởng
  InvestmentClass.prototype.riskApetite = "Bảo toàn"; // %

  // Update tỉ lệ đầu tư: stock-bond-saving ra màn hình
  InvestmentClass.prototype.updateRiskApetiteRatio = function () {
    const $stock = $(".js-stock-ratio");
    const $bond = $(".js-bond-ratio");
    const $saving = $(".js-saving-ratio");

    switch (this.riskApetite) {
      case "Bảo toàn":
        $stock.val("30").trigger("change");
        $bond.val("30").trigger("change");
        $saving.val("40").trigger("change");
        break;
      case "Cân bằng":
        $stock.val("50").trigger("change");
        $bond.val("35").trigger("change");
        $saving.val("15").trigger("change");
        break;
      case "Tăng trưởng":
        $stock.val("65").trigger("change");
        $bond.val("25").trigger("change");
        $saving.val("10").trigger("change");
        break;
      default:
        $stock.val("30").trigger("change");
        $bond.val("30").trigger("change");
        $saving.val("40").trigger("change");
    }

    $stock.trigger("change");
    $bond.trigger("change");
    $saving.trigger("change");
  };

  // Lãi suất dự kiến
  InvestmentClass.prototype.getInterestRate = function () {
    switch (this.ristApetite) {
      case "Bảo toàn":
        return 10;
        break;
      case "Cân bằng":
        return 12;
        break;
      case "Tăng trưởng":
        return 13;
        break;
      default:
        return 10;
    }
  };

  // Số dư dự kiến
  InvestmentClass.prototype.getFutureValue = function (years = this.investmentYears) {
    return -FV(this.getInterestRate() / 100, years, this.paymentPerYear, this.presentValue);
  };

  // Hiển thị kết quả
  InvestmentClass.prototype.updateResult = function () {
    let result = `
<div class="adjust-result__body bg-light">
  <div class="adjust-result__label">KẾT QUẢ :</div>
  <div class="adjust-result__content">
    <div>Với số tiền đầu tư ban đầu là <span class="text-danger font-weight-bold">${this.presentValue}</span> triệu,</div>
    <div>và tích lũy định kỳ hàng năm là <span class="text-danger font-weight-bold">${this.paymentPerYear}</span> triệu trong <span class="text-danger font-weight-bold">${this.investmentYears}</span> năm,</div>
    <div>Số tiền dự kiến đạt được là <span class="text-danger font-weight-bold">${this.futureValue}</span> triệu.</div>
  </div>
</div>
    `;

    $(".js-planning-result").html(result);
  };

  // Hiển thị biểu đồ
  InvestmentClass.prototype.updateChart = function () {
    // Số dư dự kiến
    let surplus = [this.presentValue * 1000000];

    // Tiền tích trữ hàng năm
    let accumulate = [0];

    // Chi tiêu
    let expenses = [0];

    for (let year = 0; year < this.investmentYears; year++) {
      surplus.push(this.getFutureValue(year + 1) * 1000000);
      accumulate.push(this.paymentPerYear * 1000000);
      expenses.push(0);
    }

    let series = [{
      type: "area",
      color: "#E7E7E7",
      name: "SỐ DƯ DỰ KIẾN",
      data: surplus
    }, {
      type: "column",
      color: "#F59D1E",
      name: "TIỀN TÍCH LUỸ HÀNG NĂM",
      data: accumulate
    }, {
      type: "column",
      color: "#192852",
      name: "CHI TIÊU",
      data: expenses
    }];

    showInvestmentPlanningChart(series);
  };

  // Tính kết quả và ghi ra màn hình
  InvestmentClass.prototype.calcResult = function () {
    let interestRate = this.getInterestRate();
    let futureValue = this.getFutureValue();

    this.interestRate = interestRate;
    this.futureValue = futureValue;

    this.updateChart();
    this.updateResult();
  };

  return new InvestmentClass();
}();

$(function () {
  const $investmentPlanning = $("#investment-planning");

  if ($investmentPlanning.length === 0) return;

  $(".js-planning-input").on("change", function () {
    let value = $(this).val();
    let role = $(this).data("role");

    Investment[role] = parseInt(value);

    if (role === "riskApetite") {
      Investment[role] = value;
      Investment.updateRiskApetiteRatio();
    } else {
      Investment[role] = parseInt(value);
    }
  });

  $(".js-planning-submit").on("click", function (e) {
    e.preventDefault();

    Investment.calcResult();

    $("html, body").animate({
      scrollTop: $(".js-planning-scroll-to").offset().top
    }, 800);
  });

  showInvestmentPlanningChart();
});

function showInvestmentPlanningChart(series) {
  if (!$("#ke-hoach-dau-tu")[0]) return;

  series = series || [{
    type: "area",
    color: "#E7E7E7",
    name: "SỐ DƯ DỰ KIẾN",
    data: [500000000, 600000000, 710000000, 831000000, 964100000, 1110510000]
  }, {
    type: "column",
    color: "#F59D1E",
    name: "TIỀN TÍCH LUỸ HÀNG NĂM",
    data: [0, 50000000, 50000000, 50000000, 50000000, 50000000]
  }, {
    type: "column",
    color: "#192852",
    name: "CHI TIÊU",
    data: [0, 0, 0, 0, 0, 0]
  }];

  Highcharts.chart("ke-hoach-dau-tu", {
    chart: {
      type: "areaspline"
    },
    title: "",
    yAxis: {
      title: {
        text: ""
      },
      labels: {
        formatter: function () {
          return this.value.toLocaleString("en");
        },
        style: {
          fontSize: areaLabelFontSize,
          fontWeight: "400",
          fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
        }
      }
    },
    legend: false,
    tooltip: {
      pointFormat: "{series.name}:<br/> {point.y:,.0f} VND"
    },
    plotOptions: {
      area: {
        pointStart: 0,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      },
      column: {
        pointStart: 0
      }
    },
    series: series
  });
}

// Kế hoạch tiết kiệm
const Saving = function () {
  const SavingClass = function () {};

  // Số tiền hiện có
  SavingClass.prototype.presentValue = 50; // Millions VND

  // Thời gian tiết kiệm dự kiến
  SavingClass.prototype.savingMonths = 10;

  // Lãi suất dự kiến
  SavingClass.prototype.interestRate = 7; // %

  // Số tiền mục tiêu
  SavingClass.prototype.futureValue = 150; // Millions VND

  // Tính số tiền phải bỏ ra hàng tháng
  SavingClass.prototype.getSavingPerMonth = function () {
    return -PMT(this.interestRate / 100 / 12, this.savingMonths, -this.presentValue, this.futureValue, 0);
  };

  // Tính số dư dự kiến
  SavingClass.prototype.getFutureValue = function (nper = this.savingMonths) {
    return -FV(this.interestRate / 100 / 12, nper, this.getSavingPerMonth(), this.presentValue);
  };

  // Cập nhật kết quả
  SavingClass.prototype.updateResult = function () {
    let result = `
<div class="adjust-result__body">
  <div class="adjust-result__label">KẾT QUẢ:</div>
  <div class="adjust-result__content">
      <div>Nếu tích lũy <span class="text-danger font-weight-bold">${this.savingPerMonth}</span> đồng/ tháng</div>
      <div>Sau <span class="text-danger font-weight-bold">${this.savingMonths}</span> tháng bạn có <span class="text-danger font-weight-bold">${this.futureValue}</span> triệu để đáp ứng nhu cầu</div>
  </div>
</div>`;

    $(".js-planning-result").html(result);
  };

  // Cập nhật biểu đồ
  SavingClass.prototype.updateChart = function () {
    // Số dư dự kiến
    let surplus = [this.presentValue * 1000000];

    // Tiền tiết kiệm hàng tháng
    let monthlySavings = [0];

    // Chi tiêu
    let expenses = [0];

    for (let month = 0; month < this.savingMonths; month++) {
      surplus.push(this.getFutureValue(month + 1) * 1000000);
      monthlySavings.push(this.getSavingPerMonth() * 1000000);
      expenses.push(0);
    }

    let series = [{
      type: "area",
      color: "#E7E7E7",
      name: "SỐ DƯ DỰ KIẾN",
      data: surplus
    }, {
      type: "column",
      color: "#F59D1E",
      name: "TIỀN TÍCH LUỸ HÀNG THÁNG",
      data: monthlySavings
    }, {
      type: "column",
      color: "#ADADAD",
      name: "CHI TIÊU",
      data: expenses
    }];

    showSavingPlanningChart(series);
  };

  // Tính kết quả và ghi ra màn hình
  SavingClass.prototype.calcResult = function () {
    this.savingPerMonth = Math.round(this.getSavingPerMonth() * 1000000).toLocaleString("en");

    this.updateChart();
    this.updateResult();
  };

  return new SavingClass();
}();

$(function () {
  const $savingPlanning = $("#saving-planning");

  if ($savingPlanning.length === 0) return;

  $(".js-planning-input").on("change", function () {
    let value = $(this).val();
    let role = $(this).data("role");

    Saving[role] = parseInt(value);
  });

  $(".js-planning-submit").on("click", function (e) {
    e.preventDefault();

    Saving.calcResult();

    $("html, body").animate({
      scrollTop: $(".js-planning-scroll-to").offset().top
    }, 800);
  });

  showSavingPlanningChart();
});

function showSavingPlanningChart(series) {
  if (!$("#ke-hoach-tiet-kiem")[0]) return;

  series = series || [{
    type: "area",
    color: "#E7E7E7",
    name: "SỐ DƯ DỰ KIẾN",
    data: [50000000, 59740000, 69540000, 79390000, 89300000, 99270000, 109300000, 119390000, 129530000, 139740000, 150000000]
  }, {
    type: "column",
    color: "#F59D1E",
    name: "TIỀN TÍCH LUỸ HÀNG THÁNG",
    data: [0, 9448632.309377654, 9448632.309377654, 9448632.309377654, 9448632.309377654, 9448632.309377654, 9448632.309377654, 9448632.309377654, 9448632.309377654, 9448632.309377654, 9448632.309377654]
  }, {
    type: "column",
    color: "#ADADAD",
    name: "CHI TIÊU",
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }];

  Highcharts.chart("ke-hoach-tiet-kiem", {
    chart: {
      type: "areaspline"
    },
    title: "",
    yAxis: {
      title: {
        text: ""
      },
      labels: {
        formatter: function () {
          return this.value.toLocaleString("en");
        },
        style: {
          color: "#F59D1E",
          fontSize: areaLabelFontSize,
          fontWeight: "400",
          fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
        }
      }
    },
    legend: false,
    tooltip: {
      pointFormat: "{series.name}:<br/> {point.y:,.0f} VND"
    },
    plotOptions: {
      area: {
        pointStart: 0,
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true
            }
          }
        }
      },
      column: {
        pointStart: 0
      }
    },
    series: series
  });
}

// Kế hoạch tài chính cá nhân

const PersonalFinancial = function () {
  const PersonalFinancialClass = function () {};

  // Thu nhập (Triệu VND)
  PersonalFinancialClass.prototype.totalIncome = 50;
  PersonalFinancialClass.prototype.salary = 30;
  PersonalFinancialClass.prototype.commission = 10;
  PersonalFinancialClass.prototype.bonus = 5;
  PersonalFinancialClass.prototype.fixedAssetsIncome = 0;
  PersonalFinancialClass.prototype.propertySale = 3;
  PersonalFinancialClass.prototype.otherIncome = 2;

  // Tính tổng thu nhập (Triệu VND)
  PersonalFinancialClass.prototype.calcTotalIncome = function () {
    return this.totalIncome = this.salary + this.commission + this.bonus + this.fixedAssetsIncome + this.propertySale + this.otherIncome;
  };

  // Tổng chi phí
  PersonalFinancialClass.prototype.totalExpenses = 39;

  // Phân bổ chi phí (%)
  PersonalFinancialClass.prototype.personalLivingRatio = 30;
  PersonalFinancialClass.prototype.travelRatio = 6;
  PersonalFinancialClass.prototype.foodRatio = 12;
  PersonalFinancialClass.prototype.relationshipsRatio = 10;
  PersonalFinancialClass.prototype.entertainmentRatio = 4;
  PersonalFinancialClass.prototype.beautyAndHealthRatio = 4;
  PersonalFinancialClass.prototype.educationRatio = 6;
  PersonalFinancialClass.prototype.otherExpensesRatio = 6;

  // Tính tổng chi phí (Triệu VND)
  PersonalFinancialClass.prototype.calcTotalExpenses = function () {
    return this.totalExpenses = (this.personalLivingRatio + this.travelRatio + this.foodRatio + this.relationshipsRatio + this.entertainmentRatio + this.beautyAndHealthRatio + this.educationRatio + this.otherExpensesRatio) * this.totalIncome / 100;
  };

  // Phân bổ đầu tư (Nghìn VND)
  PersonalFinancialClass.prototype.totalSurplus = 11;
  PersonalFinancialClass.prototype.investmentFundRatio = 6;
  PersonalFinancialClass.prototype.savingFundRatio = 12;
  PersonalFinancialClass.prototype.emergencyFundRatio = 4;
  PersonalFinancialClass.prototype.isuranceFundRatio = 0;
  PersonalFinancialClass.prototype.payRatio = 0;

  // Tính tổng thặng dư
  PersonalFinancialClass.prototype.calcTotalSurplus = function () {
    this.totalSurplus = (this.investmentFundRatio + this.savingFundRatio + this.emergencyFundRatio + this.isuranceFundRatio + this.payRatio) * this.totalIncome / 100;

    $(".js-total-surplus").val(this.totalSurplus);
  };

  // Cập nhật kết quả
  PersonalFinancialClass.prototype.updateResult = function () {
    let result = `
<div class="adjust-result__body bg-light">
    <div class="adjust-result__label">KẾT QUẢ:</div>
    <div class="adjust-result__content">
        <div>Tài sản còn lại: <span class="text-danger font-weight-bold">${this.cashOnHand}</span> triệu</div>
    </div>
</div>`;

    $(".js-planning-result").html(result);
  };

  // Cập nhật biểu đồ
  PersonalFinancialClass.prototype.updateChart = function () {
    let investmentFund = this.investmentFundRatio * this.totalIncome / 100;
    let savingFund = this.savingFundRatio * this.totalIncome / 100;
    let emergencyFund = this.emergencyFundRatio * this.totalIncome / 100;
    let isuranceFund = this.isuranceFundRatio * this.totalIncome / 100;
    let pay = this.payRatio * this.totalIncome / 100;

    series = [{
      name: "Brands",
      innerSize: "80%",
      data: [{
        name: "CHI PHÍ HÀNG THÁNG",
        color: "#E7E7E7",
        y: this.totalExpenses
      }, {
        name: "QUỸ ĐẦU TƯ",
        color: "#E2C5A1",
        y: investmentFund
      }, {
        name: "QUỸ TIẾT KIỆM",
        color: "#B29E46",
        y: savingFund
      }, {
        name: "QUỸ KHẨN CẤP",
        color: "#394C5F",
        y: emergencyFund
      }, {
        name: "QUỸ BẢO HIỂM",
        color: "#F7BB17",
        y: isuranceFund
      }, {
        name: "TRẢ NỢ",
        color: "#192852",
        y: pay
      }]
    }];

    showPersonalFinancialChart(series);
  };

  // Tính kết quả và ghi ra màn hình
  PersonalFinancialClass.prototype.calcResult = function () {
    let cashOnHand = Math.round(this.totalIncome - this.totalExpenses - this.totalSurplus);

    this.cashOnHand = cashOnHand === 0 ? cashOnHand.toLocaleString("en") : cashOnHand;

    this.updateChart();
    this.updateResult();
  };

  return new PersonalFinancialClass();
}();

$(function () {
  const $personalFinancialPlanning = $("#personal-financial-planning");

  if ($personalFinancialPlanning.length === 0) return;

  $(".js-planning-input").on("change", function () {
    let value = $(this).val();
    let role = $(this).data("role");

    PersonalFinancial[role] = parseFloat(value);

    if (role === "salary" || role === "commission" || role === "bonus" || role === "fixedAssetsIncome" || role === "propertySale" || role === "otherIncome") {
      let totalIncome = PersonalFinancial.calcTotalIncome();

      $(".js-total-income").val(totalIncome);
    }

    if (role === "personalLivingRatio" || role === "travelRatio" || role === "foodRatio" || role === "relationshipsRatio" || role === "entertainmentRatio" || role === "beautyAndHealthRatio" || role === "educationRatio" || role === "otherExpensesRatio" || role === "investmentFundRatio" || role === "savingFundRatio" || role === "emergencyFundRatio" || role === "isuranceFundRatio" || role === "payRatio") {
      PersonalFinancial.calcTotalExpenses();
      PersonalFinancial.calcTotalSurplus();

      let totalIncome = PersonalFinancial.totalIncome;
      let amount = parseFloat(value) * totalIncome / 100;

      $(this).parent().siblings("[data-amount]").find("input").val(amount);
    }
  });

  $(".js-planning-submit").on("click", function (e) {
    e.preventDefault();

    PersonalFinancial.calcResult();

    $("html, body").animate({
      scrollTop: $(".js-planning-scroll-to").offset().top
    }, 800);
  });
});

// INITIAL CHART
// Kế hoạch tài chính cá nhân
$(function () {
  showPersonalFinancialChart();
});

function showPersonalFinancialChart(series) {
  if (!$("#ke-hoach-tai-chinh-ca-nhan")[0]) return;

  let vw = $(window).width();
  let chartHeight = "50%";
  let labelFontSize = "16px";

  if (vw < 1200) {
    labelFontSize = "10px";
  }

  if (vw < 767) {
    chartHeight = "80%";
  }

  if (vw < 575) {
    chartHeight = "100%";
  }

  series = series || [{
    name: "Brands",
    colorByPoint: true,
    innerSize: "80%",
    data: [{
      name: "CHI PHÍ HÀNG THÁNG",
      color: "#E7E7E7",
      y: 1240
    }, {
      name: "QUỸ ĐẦU TƯ",
      color: "#E2C5A1",
      y: 200
    }, {
      name: "QUỸ TIẾT KIỆM",
      color: "#B29E46",
      y: 500
    }, {
      name: "QUỸ KHẨN CẤP",
      color: "#394C5F",
      y: 60
    }, {
      name: "QUỸ BẢO HIỂM",
      color: "#F7BB17",
      y: 0
    }, {
      name: "TRẢ NỢ",
      color: "#192852",
      y: 0
    }]
  }];

  Highcharts.chart("ke-hoach-tai-chinh-ca-nhan", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: chartHeight
    },
    title: {
      text: ""
    },
    tooltip: {
      pointFormat: "{point.percentage:.1f}%</b>"
    },
    accessibility: {
      point: {
        valueSuffix: "%"
      }
    },
    legend: false,
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            fontSize: labelFontSize,
            lineHeight: "1.5",
            fontWeight: "400",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    series: series
  });
}