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
              title: "Títulos",
              description: "una descripción",
              path: [{
                state: 'users.home',
                text: "Inicio",
                icon: true,
                icon_class: 'fa-home'
              }, {
                state: 'users.titles',
                text: "Títulos",
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