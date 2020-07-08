var legendFontSize = "14px";
var legendFontWeight = "700";
var pieLabelFontSize = "10px";
var areaLabelFontSize = "10px";

if ($(window).width() > 1200) {
  legendFontSize = "20px";
  legendFontWeight = "400";
  areaLabelFontSize = "18px";
}

// Khẩu vị rủi do hưu trí -- tiết kiệm
$(function () {
  if (!$("#huu-tri-tiet-kiem")[0]) return;

  Highcharts.chart("huu-tri-tiet-kiem", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: "90%"
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
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            fontSize: "12px",
            fontWeight: "700",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: false,
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#F59D1E",
        y: 100
      }, {
        name: "Trái phiếu",
        color: "#192852",
        y: 0
      }, {
        name: "Cổ phiếu",
        color: "#E7E7E7",
        y: 0
      }]
    }]
  });
});

// Khẩu vị rủi do hưu trí -- bảo toàn
$(function () {
  if (!$("#huu-tri-bao-toan")[0]) return;

  Highcharts.chart("huu-tri-bao-toan", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: "90%"
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
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            fontSize: "12px",
            fontWeight: "700",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: false,
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#F59D1E",
        y: 40
      }, {
        name: "Trái phiếu",
        color: "#192852",
        y: 30
      }, {
        name: "Cổ phiếu",
        color: "#E7E7E7",
        y: 30
      }]
    }]
  });
});

// Khẩu vị rủi do hưu trí -- cân bằng
$(function () {
  if (!$("#huu-tri-can-bang")[0]) return;

  Highcharts.chart("huu-tri-can-bang", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: "90%"
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
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            fontSize: "12px",
            fontWeight: "700",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: false,
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#F59D1E",
        y: 15
      }, {
        name: "Trái phiếu",
        color: "#192852",
        y: 35
      }, {
        name: "Cổ phiếu",
        color: "#E7E7E7",
        y: 50
      }]
    }]
  });
});

// Khẩu vị rủi do hưu-trí -- tăng trưởng
$(function () {
  if (!$("#huu-tri-tang-truong")[0]) return;

  Highcharts.chart("huu-tri-tang-truong", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: "90%"
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
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            fontSize: "12px",
            fontWeight: "700",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: false,
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#F59D1E",
        y: 10
      }, {
        name: "Trái phiếu",
        color: "#192852",
        y: 25
      }, {
        name: "Cổ phiếu",
        color: "#E7E7E7",
        y: 65
      }]
    }]
  });
});

// Khẩu vị rủi do đầu tư -- bảo toàn
$(function () {
  if (!$("#dau-tu-bao-toan")[0]) return;

  Highcharts.chart("dau-tu-bao-toan", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: "90%"
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
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            fontSize: "12px",
            fontWeight: "700",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: false,
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#F59D1E",
        y: 40
      }, {
        name: "Trái phiếu",
        color: "#192852",
        y: 30
      }, {
        name: "Cổ phiếu",
        color: "#E7E7E7",
        y: 30
      }]
    }]
  });
});

// Khẩu vị rủi do đầu tư -- cân bằng
$(function () {
  if (!$("#dau-tu-can-bang")[0]) return;

  Highcharts.chart("dau-tu-can-bang", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: "90%"
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
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            fontSize: "12px",
            fontWeight: "700",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: false,
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#F59D1E",
        y: 15
      }, {
        name: "Trái phiếu",
        color: "#192852",
        y: 35
      }, {
        name: "Cổ phiếu",
        color: "#E7E7E7",
        y: 50
      }]
    }]
  });
});

// Khẩu vị rủi do đầu tư -- tăng trưởng
$(function () {
  if (!$("#dau-tu-tang-truong")[0]) return;

  Highcharts.chart("dau-tu-tang-truong", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: "90%"
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
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.1f} %",
          style: {
            fontSize: "12px",
            fontWeight: "700",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: false,
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#F59D1E",
        y: 10
      }, {
        name: "Trái phiếu",
        color: "#192852",
        y: 25
      }, {
        name: "Cổ phiếu",
        color: "#E7E7E7",
        y: 65
      }]
    }]
  });
});