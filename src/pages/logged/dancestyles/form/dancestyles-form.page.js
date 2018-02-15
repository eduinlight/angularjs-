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
          dancestyle: "Estilos dansarion",
          description: "una descripción",
          path: [{
            state: 'users.home',
            text: "Inicio",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.dancestyles',
            text: "Estilos dansarios",
          }]
        }

        if ($stateParams.id != undefined) {
          this.action = "Editar"
          this.loading = true
          dancestylesApiService.get($stateParams.id).then((res) => {
            if (res) {
              this.dancestyle = res.data
              basePath.path.push({
                state: 'users.dancestylesEdit',
                text: "Editar " + toTitleBar(this.dancestyle.name),
              })
              titleBarService.setData(basePath)
              this.loading = false
            }
          })
        } else {
          this.action = "Adicionar"
          basePath.path.push({
            state: 'users.dancestylesAdd',
            text: "Adicionar",
          })
          titleBarService.setData(basePath)
        }
      }

      submit() {
        this.submitting = true

        if (this.action == "Editar") {
          dancestylesApiService.edit($stateParams.id, this.dancestyle).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Mensaje', 'El estilo dansario se editó correctamente')
              } else {
                notyService.error('Mensaje', 'Existen errores en los datos')
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
                notyService.success('Mensaje', 'El estilo dansario se adicionó correctamente')
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