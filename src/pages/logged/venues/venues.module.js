angular.module('venues', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.venues', {
      url: '/venues',
      component: 'venuesListPage',
    })
    $stateProvider.state('users.venuesAdd', {
      url: '/venues/add',
      component: 'venuesFormPage'
    })
    $stateProvider.state('users.venuesEdit', {
      url: '/venues/edit/:id',
      component: 'venuesFormPage'
    })
    $stateProvider.state('users.venuesDetails', {
      url: '/venues/details/:id',
      component: 'venuesDetailsPage'
    })
  })