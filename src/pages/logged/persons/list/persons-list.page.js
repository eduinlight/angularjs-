angular.module('logged').component('personsListPage', {
  templateUrl: 'src/pages/logged/persons/list/persons-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    // personsApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.persons = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
          title: "Personas",
          description: "una descripción",
          path: [{
            state: 'users.home',
            text: "Inicio",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.persons',
            text: "Personas",
          }]
        })

        // personsApiService.list().then((res) => {
        //   if (res) {
        //     this.persons = res.data
        //     this.loading = false
        //   }
        // })
      }

      // delete(index) {
      //   personsApiService.remove(this.persons[index].id).then(data => {
      //     if (data) {
      //       this.persons.splice(index, 1)
      //       notyService.success('Mensaje', 'El país se eliminó correctamente')
      //     } else {
      //       notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
      //     }
      //   })
      // }
    }
  }
});