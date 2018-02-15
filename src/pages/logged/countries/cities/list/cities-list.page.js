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
        console.log($state)
        countriesApiService.get($stateParams.country_id).then((res) => {

          if (res) {
            this.country = res.data
            titleBarService.setData({
              title: "Cities",
              description: "a description",
              path: [{
                state: 'users.home',
                text: "Home",
                icon: true,
                icon_class: 'fa-home'
              }, {
                state: 'users.countries',
                text: "Countries",
              }, {
                state: '',
                text: toTitleBar(this.country.name),
              }, {
                state: 'users.cities',
                text: "Cities",
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
            notyService.success('Message', 'The city was removed successfully')
          } else {
            notyService.erorr('Message', 'Other data depends from this city')
          }
        })
      }
    }
  }
});