angular.module('persons', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.persons', {
      url: '/persons',
      component: 'personsListPage',
    })
    $stateProvider.state('users.personsAdd', {
      url: '/persons/add',
      component: 'personsFormPage'
    })
    $stateProvider.state('users.personsEdit', {
      url: '/persons/edit/:id',
      component: 'personsFormPage'
    })
    $stateProvider.state('users.personsDetails', {
      url: '/persons/details/:id',
      component: 'personsDetailsPage'
    })
  })