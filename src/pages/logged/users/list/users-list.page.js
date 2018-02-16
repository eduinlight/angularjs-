angular.module('logged').component('usersListPage', {
  templateUrl: 'src/pages/logged/users/list/users-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    usersApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.users = []
        this.loading = true
      }

      $onInit() {
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
          }]
        })

        usersApiService.list().then((res) => {
          if (res) {
            this.users = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        usersApiService.remove(this.users[index].id).then(data => {
          if (data) {
            this.users.splice(index, 1)
            notyService.success('Message', 'The title was successfully removed')
          } else {
            notyService.erorr('Message', 'Other data depends from this title')
          }
        })
      }
    }
  }
});