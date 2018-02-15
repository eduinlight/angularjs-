angular.module('companies', [

]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('users.companies', {
      url: '/companies',
      component: 'companiesListPage',
    })
    $stateProvider.state('users.companiesAdd', {
      url: '/companies/add',
      component: 'companiesFormPage'
    })
    $stateProvider.state('users.companiesEdit', {
      url: '/companies/edit/:id',
      component: 'companiesFormPage'
    })
    $stateProvider.state('users.companiesDetails', {
      url: '/companies/details/:id',
      component: 'companiesDetailsPage'
    })
  })