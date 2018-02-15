angular.module('countries', [
  'cities'
]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.countries', {
      url: '/countries',
      component: 'countriesListPage',
    })
    $stateProvider.state('users.countriesAdd', {
      url: '/countries/add',
      component: 'countriesFormPage'
    })
    $stateProvider.state('users.countriesEdit', {
      url: '/countries/edit/:id',
      component: 'countriesFormPage'
    })
    $stateProvider.state('users.countriesDetails', {
      url: '/countries/details/:id',
      component: 'countriesDetailsPage'
    })
  })