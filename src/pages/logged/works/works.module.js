angular.module('works', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.works', {
      url: '/works',
      component: 'worksListPage',
    })
    $stateProvider.state('users.worksAdd', {
      url: '/works/add',
      component: 'worksFormPage'
    })
    $stateProvider.state('users.worksEdit', {
      url: '/works/edit/:id',
      component: 'worksFormPage'
    })
    $stateProvider.state('users.worksDetails', {
      url: '/works/details/:id',
      component: 'worksDetailsPage'
    })
  })