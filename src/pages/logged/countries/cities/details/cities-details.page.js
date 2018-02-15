angular.module('logged').component('citiesDetailsPage', {
  templateUrl: 'src/pages/logged/countries/cities/details/cities-details.page.html',
  controller: function(
    $stateParams,
    $state,
    loginStatusService,
    titleBarService,
    citiesApiService,
    countriesApiService,
  ) {
    return new class {
      constructor() {
        this.loading = true
        this.city = {}
      }

      $onInit() {
        countriesApiService.get($stateParams.country_id).then((res) => {
          if (res) {
            this.country = res.data

            citiesApiService.get($stateParams.id).then((res) => {
              if (res) {
                this.city = res.data
                this.loading = false

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
                    state: 'users.cities({country_id: ' + this.country.id + '})',
                    text: "Cities",
                  }, {
                    state: 'users.citiesDetails',
                    text: toTitleBar(this.city.name),
                  }]
                })
              }
            })
          }
        })
      }
    }
  }
});