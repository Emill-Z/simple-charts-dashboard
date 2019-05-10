'use strict';

module.exports = {
  template: require('./select.html'),
  controller: require('./select.controller'),
  bindings: {
    model: '=',
    options: '<',
    onChange: '&',
  }
};
