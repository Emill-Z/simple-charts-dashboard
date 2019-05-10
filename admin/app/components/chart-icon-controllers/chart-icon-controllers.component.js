'use strict';

module.exports = {
  template: require('./chart-icon-controllers.html'),
  bindings: {
    isShowFilter: '<',
    isShowCompar: '<',
    isShowClose: '<',
    isShowSettings: '<',
    onClickClose: '&',
    onClickSettings: '&',
    onClickFilter: '&',
    onClickCompar: '&',
  }
};
