angular.module('dance').config((
  $stateProvider,
  $locationProvider,
  $urlRouterProvider,
  $httpProvider,
) => {
  $locationProvider.hashPrefix('!')
  $urlRouterProvider.otherwise('not_found')
})