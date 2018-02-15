angular.module('logged').component('titlesListPage', {
  templateUrl: 'src/pages/logged/titles/list/titles-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    titlesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.titles = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
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
        })

        titlesApiService.list().then((res) => {
          if (res) {
            this.titles = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        titlesApiService.remove(this.titles[index].id).then(data => {
          if (data) {
            this.titles.splice(index, 1)
            notyService.success('Mensaje', 'El título se eliminó correctamente')
          } else {
            notyService.erorr('Mensaje', 'Otros datos están relacionado a este título')
          }
        })
      }
    }
  }
});