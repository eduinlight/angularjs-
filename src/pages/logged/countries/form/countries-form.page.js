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
          title: "Países",
          description: "una descripción",
          path: [{
            state: 'users.home',
            text: "Inicio",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.countries',
            text: "Países",
          }]
        }

        if ($stateParams.id != undefined) {
          this.action = "Editar"
          this.loading = true
          countriesApiService.get($stateParams.id).then((res) => {
            if (res) {
              this.country = res.data
              basePath.path.push({
                state: 'users.countriesEdit',
                text: "Editar " + toTitleBar(this.country.name),
              })
              titleBarService.setData(basePath)
              this.loading = false
            }
          })
        } else {
          this.action = "Adicionar"
          basePath.path.push({
            state: 'users.countriesAdd',
            text: "Adicionar",
          })
          titleBarService.setData(basePath)
        }
      }

      submit() {
        this.submitting = true

        if (this.action == "Editar") {
          countriesApiService.edit($stateParams.id, this.country).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Mensaje', 'El país se editó correctamente')
              } else {
                notyService.error('Mensaje', 'Existen errores en los datos')
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
                notyService.success('Mensaje', 'El país se adicionó correctamente')
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