angular.module('logged').component('titlesListPage', {
  templateUrl: 'src/pages/logged/titles/list/titles-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    titlesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.titles = []
        this.loading = true
      }

      $onInit() {
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
          }]
        })

        titlesApiService.list().then((res) => {
          if (res) {
            this.titles = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        titlesApiService.remove(this.titles[index].id).then(data => {
          if (data) {
            this.titles.splice(index, 1)
            notyService.success('Message', 'The title was successfully removed')
          } else {
            notyService.erorr('Message', 'Other data depends from this title')
          }
        })
      }
    }
  }
});