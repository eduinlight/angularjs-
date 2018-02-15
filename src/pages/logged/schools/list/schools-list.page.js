angular.module('logged').component('schoolsListPage', {
  templateUrl: 'src/pages/logged/schools/list/schools-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    schoolsApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.schools = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
          title: "Schools",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.schools',
            text: "Schools",
          }]
        })

        schoolsApiService.list().then((res) => {
          if (res) {
            this.schools = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        schoolsApiService.remove(this.schools[index].id).then(data => {
          if (data) {
            this.schools.splice(index, 1)
            notyService.success('Message', 'The school was successfully removed')
          } else {
            notyService.erorr('Message', 'Other data depends from this school')
          }
        })
      }
    }
  }
});