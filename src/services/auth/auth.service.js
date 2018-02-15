angular.module('my-services').service('authService',
  function(myHttpService, config, notyService, debugService) {
    return new class {
      login(user, pass) {
        return myHttpService.post('/auth/login', { user: user, pass: pass }).then(
          (res) => {
            return res
          }
        )
      }

      change_password(data) {
        return myHttpService.post('/changepassword', data).then(
          (res) => {
            return res
          }
        )
      }
    }
  })