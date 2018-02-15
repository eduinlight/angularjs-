angular.module('logged').component('dancestylesListPage', {
  templateUrl: 'src/pages/logged/dancestyles/list/dancestyles-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    dancestylesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.dancestyles = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
          title: "Estilos dansarios",
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
        })

        dancestylesApiService.list().then((res) => {
          if (res) {
            this.dancestyles = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        dancestylesApiService.remove(this.dancestyles[index].id).then(data => {
          if (data) {
            this.dancestyles.splice(index, 1)
            notyService.success('Mensaje', 'El estilo dansario se eliminó correctamente')
          } else {
            notyService.erorr('Mensaje', 'Otros datos están relacionado a este estilo dansario')
          }
        })
      }
    }
  }
});