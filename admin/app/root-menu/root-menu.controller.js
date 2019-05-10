'use strict';

/**
 * @ngInject
 * @constructor
 */
function RootMenuController($state) {
  const ctrl = this;

  ctrl.$onInit = function() {
    ctrl.state = $state;
  }

}
module.exports = RootMenuController;