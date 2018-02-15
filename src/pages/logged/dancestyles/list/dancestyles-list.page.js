angular.module('logged').component('dancestylesListPage', {
  templateUrl: 'src/pages/logged/dancestyles/list/dancestyles-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    dancestylesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.dancestyles = []
        this.loading = true
      }

      $onInit() {
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
          }]
        })

        dancestylesApiService.list().then((res) => {
          if (res) {
            this.dancestyles = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        dancestylesApiService.remove(this.dancestyles[index].id).then(data => {
          if (data) {
            this.dancestyles.splice(index, 1)
            notyService.success('Message', 'The dance style was successfully removed')
          } else {
            notyService.erorr('Message', 'Other data depends from this dance style')
          }
        })
      }
    }
  }
});