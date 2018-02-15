angular.module('logged').component('dancestylesFormPage', {
  templateUrl: 'src/pages/logged/dancestyles/form/dancestyles-form.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    dancestylesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.dancestyle = {}
        this.errors = {}
        this.action = ""
        this.loading = false
        this.submitting = false
        this.ok = false
      }

      $onInit() {
        let basePath = {
          dancestyle: "Dance styles",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.dancestyles',
            text: "Dance styles",
          }]
        }

        if ($stateParams.id != undefined) {
          this.action = "Edit"
          this.loading = true
          dancestylesApiService.get($stateParams.id).then((res) => {
            if (res) {
              this.dancestyle = res.data
              basePath.path.push({
                state: 'users.dancestylesEdit',
                text: "Edit " + toTitleBar(this.dancestyle.name),
              })
              titleBarService.setData(basePath)
              this.loading = false
            }
          })
        } else {
          this.action = "Add"
          basePath.path.push({
            state: 'users.dancestylesAdd',
            text: "Add",
          })
          titleBarService.setData(basePath)
        }
      }

      submit() {
        this.submitting = true

        if (this.action == "Edit") {
          dancestylesApiService.edit($stateParams.id, this.dancestyle).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The dance style was successfully edited')
                $state.go('users.dancestyles')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        } else {
          dancestylesApiService.add(this.dancestyle).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The dance style was successfully added')
                $state.go('users.dancestyles')
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