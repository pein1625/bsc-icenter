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
  RetirementClass.prototype.getSavingAmount = function () {
    return -PV(this.inflationary / 100 / 12, this.retirementYears * 12, this.monthlyExpenses, 0, 0);
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
    let savePerMonthRadio = Math.round(this.savingAmountPerMonth * 10000 / this.monthlyIncome) / 100;

    debugger;
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
      legend: {
        symbolRadius: 0,
        symbolWidth: 35,
        itemStyle: {
          fontSize: legendFontSize,
          fontWeight: legendFontWeight,
          fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
        }
      },
      tooltip: {
        pointFormat: "{series.name}:<br/> {point.y:,.0f} VND"
      },
      plotOptions: {
        area: {
          pointStart: this.currentAge,
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
          pointStart: this.currentAge
        }
      },
      series: [{
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
      }]
    });
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
});

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
        $stock.val("30");
        $bond.val("30");
        $saving.val("40");
        break;
      case "Cân bằng":
        $stock.val("50");
        $bond.val("35");
        $saving.val("15");
        break;
      case "Tăng trưởng":
        $stock.val("65");
        $bond.val("25");
        $saving.val("10");
        break;
      default:
        $stock.val("30");
        $bond.val("30");
        $saving.val("40");
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

    for (let year = 0; year < this.investmentYears; year++) {
      surplus.push(this.getFutureValue(year + 1) * 1000000);
      accumulate.push(this.paymentPerYear * 1000000);
    }

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
      legend: {
        symbolRadius: 0,
        symbolWidth: 35,
        itemStyle: {
          fontSize: legendFontSize,
          fontWeight: legendFontWeight,
          fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
        }
      },
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
      series: [{
        type: "area",
        color: "#ddd",
        name: "Số dư dự kiến",
        data: surplus
      }, {
        type: "column",
        color: "#F5BE14",
        name: "Tiền tích luỹ hàng năm",
        data: accumulate
      }]
    });
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
});

// Kế hoạch hưu trí
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

    for (let month = 0; month < this.savingMonths; month++) {
      surplus.push(this.getFutureValue(month + 1) * 1000000);
      monthlySavings.push(this.getSavingPerMonth() * 1000000);
    }

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
            fontSize: areaLabelFontSize,
            fontWeight: "400",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        }
      },
      legend: {
        symbolRadius: 0,
        symbolWidth: 35,
        itemStyle: {
          fontSize: legendFontSize,
          fontWeight: legendFontWeight,
          fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
        }
      },
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
      series: [{
        type: "area",
        color: "#ddd",
        name: "Số dư dự kiến",
        data: surplus
      }, {
        type: "column",
        color: "#F5BE14",
        name: "Tiền tích luỹ tháng",
        data: monthlySavings
      }]
    });
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
});

// Kế hoạch tài chính cá nhân