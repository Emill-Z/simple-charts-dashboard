'use strict';
// https://ui-router.github.io/ng1/tutorial/helloworld

/**
 * @ngInject
 */
function config ($stateProvider) {
  $stateProvider.state('admin', {
    url: '',
    component: 'cDashboard',
  });

  $stateProvider.state('admin.dashboard', {
    url: '/',
    component: 'cDashboard',
  });
}

module.exports = config;
