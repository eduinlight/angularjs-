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
          title: "Countries",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.countries',
            text: "Countries",
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
            notyService.success('Message', 'The country was successfully removed')
          } else {
            notyService.erorr('Message', 'Other data depends from this country')
          }
        })
      }
    }
  }
});