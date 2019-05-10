'use strict';

const angular = require('angular');

require('../../node_modules/nvd3/build/nv.d3.css');
require('../assets/styles/styles.scss');

require('../../node_modules/angularjs-color-picker/dist/angularjs-color-picker');
require('../../node_modules/angularjs-color-picker/dist/themes/angularjs-color-picker-bootstrap.css');
require('../../node_modules/angularjs-color-picker/dist/angularjs-color-picker.css');

module.exports = angular
  .module('admin', [
    // dependencies
    require('angular-resource'),
    require('angular-ui-router').default,
    require('angular-nvd3'),
    require('nya-bootstrap-select'),
    'color.picker',
    // components
    require('./dashboard'),
    require('./root-menu'),
    require('./components'),
  ])
  .config(require('./app.config'))
  .component('cApp', require('./app.component'))
  .name;