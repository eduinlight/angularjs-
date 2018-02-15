angular.module('logged').component('countriesFormPage', {
  templateUrl: 'src/pages/logged/countries/form/countries-form.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    countriesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.country = {}
        this.errors = {}
        this.action = ""
        this.loading = false
        this.submitting = false
        this.ok = false
      }

      $onInit() {
        let basePath = {
          title: "Countries",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.countries',
            text: "Countries",
          }]
        }

        if ($stateParams.id != undefined) {
          this.action = "Edit"
          this.loading = true
          countriesApiService.get($stateParams.id).then((res) => {
            if (res) {
              this.country = res.data
              basePath.path.push({
                state: 'users.countriesEdit',
                text: "Edit " + toTitleBar(this.country.name),
              })
              titleBarService.setData(basePath)
              this.loading = false
            }
          })
        } else {
          this.action = "Add"
          basePath.path.push({
            state: 'users.countriesAdd',
            text: "Add",
          })
          titleBarService.setData(basePath)
        }
      }

      submit() {
        this.submitting = true

        if (this.action == "Edit") {
          countriesApiService.edit($stateParams.id, this.country).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The country was successfully edited')
                $state.go('users.countries')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        } else {
          countriesApiService.add(this.country).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The country was successfully added')
                $state.go('users.countries')
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