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
              title: "Ciudades",
              description: "una descripción",
              path: [{
                state: 'users.home',
                text: "Inicio",
                icon: true,
                icon_class: 'fa-home'
              }, {
                state: 'users.countries',
                text: "Países",
              }, {
                state: '',
                text: toTitleBar(this.country.name),
              }, {
                state: 'users.cities' + "({country_id: " + this.country.id + "})",
                text: "Ciudades",
              }]
            })

            if ($stateParams.id != undefined) {
              this.action = "Editar"
              this.loading = true
              citiesApiService.get($stateParams.id, "?country_id=" + this.country.id).then((res) => {
                if (res) {
                  this.city = res.data
                  this.city._country = this.country.id
                  this.loading = false
                  titleBarService.addPath({
                    state: 'users.citiesEdit',
                    text: "Editar " + toTitleBar(this.city.name),
                  })
                }
              })
            } else {
              this.action = "Adicionar"
              titleBarService.addPath({
                state: 'users.citiesAdd',
                text: "Adicionar ",
              })
            }
          }
        })
      }

      submit() {
        this.submitting = true
        if (this.action == "Editar") {
          citiesApiService.edit($stateParams.id, this.city).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Mensaje', 'La ciudad se editó correctamente')
              } else {
                notyService.error('Mensaje', 'Existen errores en los datos')
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
                notyService.success('Mensaje', 'La ciudad se adicionó correctamente')
              } else {
                notyService.error('Mensaje', 'Existen errores en los datos')
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