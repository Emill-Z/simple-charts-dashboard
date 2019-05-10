'use strict';

module.exports = {
  template: require('./dashboard-chart.html'),
  controller: require('./dashboard-chart.controller'),
  bindings: {
    name: '@',
    axisLabelX: '@',
    axisLabelY: '@',
    chartData: '<',
    tickFormatXFn: '<',
    tickFormatYFn: '<',
    showSelect: '<',
  }
};
