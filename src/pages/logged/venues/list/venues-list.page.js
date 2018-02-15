angular.module('logged').component('venuesListPage', {
  templateUrl: 'src/pages/logged/venues/list/venues-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    venuesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.venues = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
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
        })

        venuesApiService.list().then((res) => {
          if (res) {
            this.venues = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        venuesApiService.remove(this.venues[index].id).then(data => {
          if (data) {
            this.venues.splice(index, 1)
            notyService.success('Message', 'The venue was successfully removed')
          } else {
            notyService.erorr('Message', 'Other data depends from this venue')
          }
        })
      }
    }
  }
});