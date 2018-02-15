angular.module('schools', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.schools', {
      url: '/schools',
      component: 'schoolsListPage',
    })
    $stateProvider.state('users.schoolsAdd', {
      url: '/schools/add',
      component: 'schoolsFormPage'
    })
    $stateProvider.state('users.schoolsEdit', {
      url: '/schools/edit/:id',
      component: 'schoolsFormPage'
    })
    $stateProvider.state('users.schoolsDetails', {
      url: '/schools/details/:id',
      component: 'schoolsDetailsPage'
    })
  })