angular.module('logged').component('worksListPage', {
  templateUrl: 'src/pages/logged/works/list/works-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    worksApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.works = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
          title: "Works",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.works',
            text: "Works",
          }]
        })

        worksApiService.list().then((res) => {
          if (res) {
            this.works = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        worksApiService.remove(this.works[index].id).then(data => {
          if (data) {
            this.works.splice(index, 1)
            notyService.success('Message', 'The work was successfully removed')
          } else {
            notyService.erorr('Message', 'Other data depends from this work')
          }
        })
      }
    }
  }
});