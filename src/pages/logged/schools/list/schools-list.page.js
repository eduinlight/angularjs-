angular.module('logged').component('schoolsListPage', {
  templateUrl: 'src/pages/logged/schools/list/schools-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    // schoolsApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.schools = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
          title: "Escuelas",
          description: "una descripción",
          path: [{
            state: 'users.home',
            text: "Inicio",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.schools',
            text: "Escuelas",
          }]
        })

        // schoolsApiService.list().then((res) => {
        //   if (res) {
        //     this.schools = res.data
        //     this.loading = false
        //   }
        // })
      }

      // delete(index) {
      //   schoolsApiService.remove(this.schools[index].id).then(data => {
      //     if (data) {
      //       this.schools.splice(index, 1)
      //       notyService.success('Mensaje', 'El país se eliminó correctamente')
      //     } else {
      //       notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
      //     }
      //   })
      // }
    }
  }
});