angular.module('not_logged', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('login', {
      url: '/login',
      component: 'loginPage'
    })
    $stateProvider.state('not_found', {
      url: '/not_found',
      component: 'notFoundPage'
    })
  })