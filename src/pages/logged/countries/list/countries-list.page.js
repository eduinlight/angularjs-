angular.module('logged').component('countriesListPage', {
  templateUrl: 'src/pages/logged/countries/list/countries-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    countriesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.countries = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
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
        })

        countriesApiService.list().then((res) => {
          if (res) {
            this.countries = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        countriesApiService.remove(this.countries[index].id).then(data => {
          if (data) {
            this.countries.splice(index, 1)
            notyService.success('Mensaje', 'El país se eliminó correctamente')
          } else {
            notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
          }
        })
      }
    }
  }
});