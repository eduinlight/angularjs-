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
          title: "Títulos",
          description: "una descripción",
          path: [{
            state: 'users.home',
            text: "Inicio",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.titles',
            text: "Títulos",
          }]
        }

        if ($stateParams.id != undefined) {
          this.action = "Editar"
          this.loading = true
          titlesApiService.get($stateParams.id).then((res) => {
            if (res) {
              this.title = res.data
              basePath.path.push({
                state: 'users.titlesEdit',
                text: "Editar " + toTitleBar(this.title.name),
              })
              titleBarService.setData(basePath)
              this.loading = false
            }
          })
        } else {
          this.action = "Adicionar"
          basePath.path.push({
            state: 'users.titlesAdd',
            text: "Adicionar",
          })
          titleBarService.setData(basePath)
        }
      }

      submit() {
        this.submitting = true

        if (this.action == "Editar") {
          titlesApiService.edit($stateParams.id, this.title).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Mensaje', 'El título se editó correctamente')
              } else {
                notyService.error('Mensaje', 'Existen errores en los datos')
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
                notyService.success('Mensaje', 'El título se adicionó correctamente')
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