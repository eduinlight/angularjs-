angular.module('logged').component('venuesDetailsPage', {
  templateUrl: 'src/pages/logged/venues/details/venues-details.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    venuesApiService,
    notyService,
    $filter
  ) {
    return new class {
      constructor() {
        this.venue = {}
        this.loading = true
      }

      $onInit() {
        let basePath = {
          title: "Venues",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.venues',
            text: "Venues",
          }]
        }

        venuesApiService.get($stateParams.id).then((res) => {
          if (res) {
            if (res.status == 200) {
              this.venue = res.data
              basePath.path.push({
                state: 'users.venuesDetails',
                text: "Details " + toTitleBar(this.venue.name),
              })
              titleBarService.setData(basePath)
              this.loading = false
            } else {
              $state.go('not_found')
            }
          }
        })
      }
    }
  }
});