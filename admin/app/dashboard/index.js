'use strict';

const angular = require('angular');

module.exports = angular
  .module('admin.dashboard', [])
  .factory('Weather', require('./services/weather.service'))
  .factory('ChartService', require('./dashboard-chart/services/dashboard-chart.service'))
  .component('cDashboard', require('./dashboard.component'))
  .component('cDashboardChart', require('./dashboard-chart/dashboard-chart.component'))
  .name;