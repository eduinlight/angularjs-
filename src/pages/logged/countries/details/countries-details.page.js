angular.module('logged').component('countriesDetailsPage', {
  templateUrl: 'src/pages/logged/countries/details/countries-details.page.html',
  controller: function(
    $stateParams,
    $state,
    loginStatusService,
    titleBarService,
    countriesApiService,
  ) {
    return new class {
      constructor() {
        this.country = {}
        this.action = ""
        this.loading = true
      }

      $onInit() {
        countriesApiService.get($stateParams.id).then((res) => {
          if (res) {
            this.country = res.data
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
              }, {
                state: 'users.countriesDetails',
                text: this.country.name,
              }]
            })
            this.loading = false
          }
        })
      }
    }
  }
});