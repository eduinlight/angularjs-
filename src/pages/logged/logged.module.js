angular.module('logged', [
  'users',
]).config(
  ($stateProvider, $urlServiceProvider) => {
    $urlServiceProvider.config.strictMode(false);
    $stateProvider.state('changePassword', {
      url: '/change_password',
      component: 'changePasswordPage'
    })

    $stateProvider.state('users', {
      url: '/users',
      component: 'usersTemplate',
      onEnter: ($state, loginStatusService) => {
        if (!loginStatusService.isLogged()) {
          $state.go('login')
        }
      }
    })
    $stateProvider.state('users.home', {
      url: '/home',
      component: 'homePage'
    })
  })