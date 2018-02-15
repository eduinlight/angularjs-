angular.module('dancestyles', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.dancestyles', {
      url: '/dancestyles',
      component: 'dancestylesListPage',
    })
    $stateProvider.state('users.dancestylesAdd', {
      url: '/dancestyles/add',
      component: 'dancestylesFormPage'
    })
    $stateProvider.state('users.dancestylesEdit', {
      url: '/dancestyles/edit/:id',
      component: 'dancestylesFormPage'
    })
    $stateProvider.state('users.dancestylesDetails', {
      url: '/dancestyles/details/:id',
      component: 'dancestylesDetailsPage'
    })
  })