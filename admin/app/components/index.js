'use strict';

const angular = require('angular');

module.exports = angular
  .module('admin.components', [])
  .component('cSelect', require('./select/select.component'))
  .component('cChartIconControllers', require('./chart-icon-controllers/chart-icon-controllers.component'))
  .name;