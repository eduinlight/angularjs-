angular.module('not_logged').component('loginPage', {
  templateUrl: 'src/pages/not_logged/login/login.page.html',
  controller: function(notyService, config, authService, loginStatusService, $state) {

    this.$onInit = () => {
      if (loginStatusService.isLogged()) {
        $state.go('users.home')
      }

      this.model = {
        user: "",
        pass: "",
      }
      this.errors = {}
    }

    this.login = () => {
      authService.login(this.model.user, this.model.pass).then((res) => {
        if (res) {
          if (res.status == 400) {
            this.errors = res.errors
          } else {
            //quitar errores
            this.errors = {}

            //guardar el estado de la app
            loginStatusService.setStorage({
              access_token: res.data.access_token,
              user_id: res.data.user_id,
              rol: res.data.rol,
              first_name: res.data.first_name,
              last_name: res.data.last_name,
              user: res.data.user,
            })

            //notificación de bienvenida
            notyService.info("Bienvenido", res.data.user)

            //cambio de estado
            $state.go('users.home')
          }
        }
      })
    }
  }
});