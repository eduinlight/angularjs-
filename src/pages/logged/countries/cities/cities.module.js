angular.module('cities', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.cities', {
      url: '/countries/:country_id/cities',
      component: 'citiesListPage',
      params: {
        country_id: ""
      }
    })
    $stateProvider.state('users.citiesAdd', {
      url: '/countries/:country_id/cities/add',
      component: 'citiesFormPage'
    })
    $stateProvider.state('users.citiesEdit', {
      url: '/countries/:country_id/cities/edit/:id',
      component: 'citiesFormPage'
    })
    $stateProvider.state('users.citiesDetails', {
      url: '/countries/:country_id/cities/details/:id',
      component: 'citiesDetailsPage'
    })
  })