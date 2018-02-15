angular.module('logged').component('placesListPage', {
  templateUrl: 'src/pages/logged/places/list/places-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    // placesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.places = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
          title: "Venues",
          description: "una descripción",
          path: [{
            state: 'users.home',
            text: "Inicio",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.places',
            text: "Venues",
          }]
        })

        // placesApiService.list().then((res) => {
        //   if (res) {
        //     this.places = res.data
        //     this.loading = false
        //   }
        // })
      }

      // delete(index) {
      //   placesApiService.remove(this.places[index].id).then(data => {
      //     if (data) {
      //       this.places.splice(index, 1)
      //       notyService.success('Mensaje', 'El país se eliminó correctamente')
      //     } else {
      //       notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
      //     }
      //   })
      // }
    }
  }
});