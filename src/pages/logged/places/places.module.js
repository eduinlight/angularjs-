angular.module('places', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.places', {
        url: '/places',
        component: 'placesListPage',
      })
      // $stateProvider.state('users.placesAdd', {
      //   url: '/places/add',
      //   component: 'placesFormPage'
      // })
      // $stateProvider.state('users.placesEdit', {
      //   url: '/places/edit/:id',
      //   component: 'placesFormPage'
      // })
      // $stateProvider.state('users.placesDetails', {
      //   url: '/places/details/:id',
      //   component: 'placesDetailsPage'
      // })
  })