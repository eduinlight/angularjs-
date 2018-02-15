angular.module('logged').component('worksListPage', {
  templateUrl: 'src/pages/logged/works/list/works-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    // worksApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.works = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
          title: "Trabajos",
          description: "una descripción",
          path: [{
            state: 'users.home',
            text: "Inicio",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.works',
            text: "Trabajos",
          }]
        })

        // worksApiService.list().then((res) => {
        //   if (res) {
        //     this.works = res.data
        //     this.loading = false
        //   }
        // })
      }

      // delete(index) {
      //   worksApiService.remove(this.works[index].id).then(data => {
      //     if (data) {
      //       this.works.splice(index, 1)
      //       notyService.success('Mensaje', 'El país se eliminó correctamente')
      //     } else {
      //       notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
      //     }
      //   })
      // }
    }
  }
});