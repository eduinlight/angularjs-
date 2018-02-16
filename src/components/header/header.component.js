angular.module('my-components').component('myHeader', {
  templateUrl: 'src/components/header/header.component.html',
  controller: function(loginStatusService, $state, notyService) {
    return new class {
      constructor() {}

      $onInit = () => {
        this.name = loginStatusService.storage.first_name + " " + loginStatusService.storage.last_name
        this.is_admin = loginStatusService.isAdmin()
      }

      logout = () => {
        loginStatusService.remove()

        notyService.info("Bye", "Have a nice day")

        $state.go('login')
      }

    }
  }
});