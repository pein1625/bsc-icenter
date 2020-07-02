var legendFontSize = "14px";
var legendFontWeight = "700";
var pieLabelFontSize = "10px";
var areaLabelFontSize = "10px";

if ($(window).width() > 1200) {
  legendFontSize = "20px";
  legendFontWeight = "400";
  pieLabelFontSize = "16px";
  areaLabelFontSize = "18px";
}

// Kế hoạch tài chính cá nhân
$(function () {
  if (!$("#ke-hoach-tai-chinh-ca-nhan")[0]) return;

  Highcharts.chart("ke-hoach-tai-chinh-ca-nhan", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: "100%"
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
    legend: {
      symbolRadius: 0,
      symbolWidth: 35,
      itemStyle: {
        fontSize: legendFontSize,
        fontWeight: legendFontWeight,
        fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
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
            fontSize: pieLabelFontSize,
            fontWeight: "400",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Chi phí hàng tháng",
        y: 15
        // sliced: true,
        // selected: true,
      }, {
        name: "Quỹ đầu tư",
        y: 30
      }, {
        name: "Quỹ tiết kiệm",
        y: 27
      }, {
        name: "Quỹ khẩn cấp",
        y: 13
      }, {
        name: "Quỹ bảo hiểm",
        y: 15
      }, {
        name: "Trả nợ",
        y: 10
      }]
    }]
  });
});

// Khẩu vị rủi do hưu trí -- tiết kiệm
$(function () {
  if (!$("#huu-tri-bao-toan")[0]) return;

  Highcharts.chart("huu-tri-tiet-kiem", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: "100%"
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
            fontWeight: "400",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: {
      symbolRadius: 0,
      itemStyle: {
        fontSize: "14px",
        fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
      }
    },
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#aaa",
        y: 100
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
      height: "100%"
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
            fontWeight: "400",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: {
      symbolRadius: 0,
      itemStyle: {
        fontSize: "14px",
        fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
      }
    },
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#aaa",
        y: 40
      }, {
        name: "Trái phiếu",
        color: "#21409a",
        y: 30
      }, {
        name: "Cổ phiếu",
        color: "#f59d1d",
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
      height: "100%"
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
            fontWeight: "400",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: {
      symbolRadius: 0,
      itemStyle: {
        fontSize: "14px",
        fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
      }
    },
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#aaa",
        y: 15
      }, {
        name: "Trái phiếu",
        color: "#21409a",
        y: 35
      }, {
        name: "Cổ phiếu",
        color: "#f59d1d",
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
      height: "100%"
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
            fontWeight: "400",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: {
      symbolRadius: 0,
      itemStyle: {
        fontSize: "14px",
        fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
      }
    },
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#aaa",
        y: 10
      }, {
        name: "Trái phiếu",
        color: "#21409a",
        y: 25
      }, {
        name: "Cổ phiếu",
        color: "#f59d1d",
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
      height: "100%"
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
            fontWeight: "400",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: {
      symbolRadius: 0,
      itemStyle: {
        fontSize: "14px",
        fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
      }
    },
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#aaa",
        y: 40
      }, {
        name: "Trái phiếu",
        color: "#21409a",
        y: 30
      }, {
        name: "Cổ phiếu",
        color: "#f59d1d",
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
      height: "100%"
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
            fontWeight: "400",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: {
      symbolRadius: 0,
      itemStyle: {
        fontSize: "14px",
        fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
      }
    },
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#aaa",
        y: 15
      }, {
        name: "Trái phiếu",
        color: "#21409a",
        y: 35
      }, {
        name: "Cổ phiếu",
        color: "#f59d1d",
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
      height: "100%"
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
            fontWeight: "400",
            fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
          }
        },
        showInLegend: true
      }
    },
    legend: {
      symbolRadius: 0,
      itemStyle: {
        fontSize: "14px",
        fontFamily: 'Muli,Arial,Helvetica,apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"'
      }
    },
    series: [{
      name: "Brands",
      colorByPoint: true,
      innerSize: "80%",
      data: [{
        name: "Tiết kiệm",
        color: "#aaa",
        y: 10
      }, {
        name: "Trái phiếu",
        color: "#21409a",
        y: 25
      }, {
        name: "Cổ phiếu",
        color: "#f59d1d",
        y: 65
      }]
    }]
  });
});