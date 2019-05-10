'use strict';

/**
 * @ngInject
 * @constructor
 */
function SelectController() {
  const ctrl = this;

  ctrl.$onChange = function () {
    ctrl.onChange({ value: ctrl.model });
  };

}
module.exports = SelectController;