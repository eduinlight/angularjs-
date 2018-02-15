angular.module('logged').component('dancestylesDetailsPage', {
  templateUrl: 'src/pages/logged/dancestyles/details/dancestyles-details.page.html',
  controller: function(
    $stateParams,
    $state,
    loginStatusService,
    titleBarService,
    dancestylesApiService,
  ) {
    return new class {
      constructor() {
        this.dancestyle = {}
        this.action = ""
        this.loading = true
      }

      $onInit() {
        dancestylesApiService.get($stateParams.id).then((res) => {
          if (res) {
            this.dancestyle = res.data
            titleBarService.setData({
              title: "Dance styles",
              description: "a description",
              path: [{
                state: 'users.home',
                text: "Home",
                icon: true,
                icon_class: 'fa-home'
              }, {
                state: 'users.dancestyles',
                text: "Dance styles",
              }, {
                state: 'users.dancestylesDetails',
                text: this.dancestyle.name,
              }]
            })
            this.loading = false
          }
        })
      }
    }
  }
});