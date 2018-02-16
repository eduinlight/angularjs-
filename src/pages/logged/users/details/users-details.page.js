angular.module('logged').component('usersDetailsPage', {
  templateUrl: 'src/pages/logged/users/details/users-details.page.html',
  controller: function(
    $stateParams,
    $state,
    loginStatusService,
    titleBarService,
    usersApiService,
  ) {
    return new class {
      constructor() {
        this.user = {}
        this.action = ""
        this.loading = true
      }

      $onInit() {
        usersApiService.get($stateParams.id).then((res) => {
          if (res) {
            this.user = res.data
            titleBarService.setData({
              title: "Users",
              description: "a description",
              path: [{
                state: 'users.home',
                text: "Home",
                icon: true,
                icon_class: 'fa-home'
              }, {
                state: 'users.users',
                text: "Users",
              }, {
                state: 'users.usersDetails',
                text: this.user.name,
              }]
            })
            this.loading = false
          }
        })
      }
    }
  }
});