angular.module('logged').component('changePasswordPage', {
  templateUrl: 'src/pages/logged/change-password/change-password.page.html',
  controller: function($window, notyService, config, authService, loginStatusService, $state) {
    return new class {
      constructor() {}

      $onInit() {
        if (!loginStatusService.isLogged()) {
          $state.go('users.home')
        }

        this.model = {
          user: loginStatusService.storage.user,
          pass: "",
          new_pass: "",
        }
        this.errors = {}
      }
      change_password() {
        authService.change_password(this.model).then((res) => {
          if (res) {
            if (res.status == 400) {
              this.errors = res.errors
            } else {
              //quitar errores
              this.errors = {}

              //notificación de bienvenida
              notyService.info("Message", "The password was changed successfully")

              //cambio de estado
              $window.history.back()
            }
          }
        })
      }

      back() {
        $window.history.back()
      }
    }
  }
});