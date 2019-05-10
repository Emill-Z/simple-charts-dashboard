'use strict';

/**
 * @ngInject
 * @constructor
 */
function RootMenuController($state) {
  const ctrl = this;

  ctrl.$onInit = function() {
    console.log('ROOT_MENU')
    ctrl.state = $state;
  }

}
module.exports = RootMenuController;