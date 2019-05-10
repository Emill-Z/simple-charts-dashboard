'use strict';

const angular = require('angular');

require('./root-menu.scss');

module.exports = angular
  .module('admin.root-menu', [])
  .component('cRootMenu', require('./root-menu.component'))
  .name;