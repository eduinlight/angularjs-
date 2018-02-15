angular.module('titles', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.titles', {
      url: '/titles',
      component: 'titlesListPage',
    })
    $stateProvider.state('users.titlesAdd', {
      url: '/titles/add',
      component: 'titlesFormPage'
    })
    $stateProvider.state('users.titlesEdit', {
      url: '/titles/edit/:id',
      component: 'titlesFormPage'
    })
    $stateProvider.state('users.titlesDetails', {
      url: '/titles/details/:id',
      component: 'titlesDetailsPage'
    })
  })