angular.module('logged').component('citiesListPage', {
  templateUrl: 'src/pages/logged/countries/cities/list/cities-list.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    citiesApiService,
    countriesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.cities = []
        this.loading = true
        this.country = {}
      }

      $onInit() {
        countriesApiService.get($stateParams.country_id).then((res) => {
          if (res) {
            this.country = res.data
            titleBarService.setData({
              title: "Ciudades",
              description: "una descripción",
              path: [{
                state: 'users.home',
                text: "Inicio",
                icon: true,
                icon_class: 'fa-home'
              }, {
                state: 'users.countries',
                text: "Países",
              }, {
                state: '',
                text: toTitleBar(this.country.name),
              }, {
                state: 'users.cities',
                text: "Ciudades",
              }]
            })

            citiesApiService.list("?country_id=" + this.country.id).then((res) => {
              if (res) {
                this.cities = res.data
                this.loading = false
              }
            })
          }
        })


      }

      delete(index) {
        citiesApiService.remove(this.cities[index].id).then(data => {
          if (data) {
            this.cities.splice(index, 1)
            notyService.success('Mensaje', 'El ciudad se eliminó correctamente')
          } else {
            notyService.erorr('Mensaje', 'Otros datos están relacionado a esta ciudad')
          }
        })
      }
    }
  }
});