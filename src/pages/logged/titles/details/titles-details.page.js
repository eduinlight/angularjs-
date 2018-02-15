angular.module('logged').component('titlesDetailsPage', {
  templateUrl: 'src/pages/logged/titles/details/titles-details.page.html',
  controller: function(
    $stateParams,
    $state,
    loginStatusService,
    titleBarService,
    titlesApiService,
  ) {
    return new class {
      constructor() {
        this.title = {}
        this.action = ""
        this.loading = true
      }

      $onInit() {
        titlesApiService.get($stateParams.id).then((res) => {
          if (res) {
            this.title = res.data
            titleBarService.setData({
              title: "Titles",
              description: "a description",
              path: [{
                state: 'users.home',
                text: "Home",
                icon: true,
                icon_class: 'fa-home'
              }, {
                state: 'users.titles',
                text: "Titles",
              }, {
                state: 'users.titlesDetails',
                text: this.title.name,
              }]
            })
            this.loading = false
          }
        })
      }
    }
  }
});