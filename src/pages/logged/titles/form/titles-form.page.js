angular.module('logged').component('titlesFormPage', {
  templateUrl: 'src/pages/logged/titles/form/titles-form.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    titlesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.title = {}
        this.errors = {}
        this.action = ""
        this.loading = false
        this.submitting = false
        this.ok = false
      }

      $onInit() {
        let basePath = {
          title: "Titles",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.titles',
            text: "Titles",
          }]
        }

        if ($stateParams.id != undefined) {
          this.action = "Edit"
          this.loading = true
          titlesApiService.get($stateParams.id).then((res) => {
            if (res) {
              this.title = res.data
              basePath.path.push({
                state: 'users.titlesEdit',
                text: "Edit " + toTitleBar(this.title.name),
              })
              titleBarService.setData(basePath)
              this.loading = false
            }
          })
        } else {
          this.action = "Add"
          basePath.path.push({
            state: 'users.titlesAdd',
            text: "Add",
          })
          titleBarService.setData(basePath)
        }
      }

      submit() {
        this.submitting = true

        if (this.action == "Edit") {
          titlesApiService.edit($stateParams.id, this.title).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The title was successfully edited')
                $state.go('users.titles')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        } else {
          titlesApiService.add(this.title).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The title was successfully added')
                $state.go('users.titles')
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