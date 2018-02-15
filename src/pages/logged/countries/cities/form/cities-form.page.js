angular.module('logged').component('citiesFormPage', {
  templateUrl: 'src/pages/logged/countries/cities/form/cities-form.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    countriesApiService,
    citiesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.city = {}
        this.errors = {}
        this.action = ""
        this.loading = false
        this.submitting = false
        this.ok = false
      }

      $onInit() {
        countriesApiService.get($stateParams.country_id).then((res) => {
          if (res) {
            this.country = res.data
            this.city._country = this.country.id
            titleBarService.setData({
              title: "Cities",
              description: "a description",
              path: [{
                state: 'users.home',
                text: "Home",
                icon: true,
                icon_class: 'fa-home'
              }, {
                state: 'users.countries',
                text: "Countries",
              }, {
                state: '',
                text: toTitleBar(this.country.name),
              }, {
                state: 'users.cities' + "({country_id: " + this.country.id + "})",
                text: "Cities",
              }]
            })

            if ($stateParams.id != undefined) {
              this.action = "Edit"
              this.loading = true
              citiesApiService.get($stateParams.id, "?country_id=" + this.country.id).then((res) => {
                if (res) {
                  if (res.status == 200) {
                    this.city = res.data
                    this.city._country = this.country.id
                    this.loading = false
                    titleBarService.addPath({
                      state: 'users.citiesEdit',
                      text: "Edit " + toTitleBar(this.city.name),
                    })
                  }
                }
              })
            } else {
              this.action = "Add"
              titleBarService.addPath({
                state: 'users.citiesAdd',
                text: "Add ",
              })
            }
          }
        })
      }

      submit() {
        this.submitting = true
        if (this.action == "Edit") {
          citiesApiService.edit($stateParams.id, this.city).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The city was successfully edited')
                $state.go("users.cities", { country_id: this.country.id })
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        } else {
          citiesApiService.add(this.city).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The city was addes successfully')
                $state.go("users.cities", { country_id: this.country.id })
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