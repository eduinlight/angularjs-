angular.module('logged').component('usersFormPage', {
  templateUrl: 'src/pages/logged/users/form/users-form.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    usersApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.user = {}
        this.errors = {}
        this.action = ""
        this.loading = false
        this.submitting = false
        this.ok = false
      }

      $onInit() {
        let basePath = {
          title: "Users",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.users',
            text: "Users",
          }]
        }

        if ($stateParams.id != undefined) {
          this.action = "Edit"
          this.loading = true
          usersApiService.get($stateParams.id).then((res) => {
            if (res) {
              this.user = res.data
              basePath.path.push({
                state: 'users.usersEdit',
                text: "Edit " + toTitleBar(this.user.first_name + " " + this.user.last_name),
              })
              titleBarService.setData(basePath)
              this.loading = false
            }
          })
        } else {
          this.action = "Add"
          basePath.path.push({
            state: 'users.usersAdd',
            text: "Add",
          })
          titleBarService.setData(basePath)
        }
      }

      submit() {
        this.submitting = true

        if (this.action == "Edit") {
          usersApiService.edit($stateParams.id, this.user).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The title was successfully edited')
                $state.go('users.users')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        } else {
          usersApiService.add(this.user).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The title was successfully added')
                $state.go('users.users')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        }
      }
    }
  }
});