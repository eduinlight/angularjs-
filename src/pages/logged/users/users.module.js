angular.module('users', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.users', {
      url: '/users',
      component: 'usersListPage',
    })
    $stateProvider.state('users.usersAdd', {
      url: '/users/add',
      component: 'usersFormPage'
    })
    $stateProvider.state('users.usersEdit', {
      url: '/users/edit/:id',
      component: 'usersFormPage'
    })
    $stateProvider.state('users.usersDetails', {
      url: '/users/details/:id',
      component: 'usersDetailsPage'
    })
  })