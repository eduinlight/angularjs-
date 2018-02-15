angular.module('logged').component('schoolsDetailsPage', {
  templateUrl: 'src/pages/logged/schools/details/schools-details.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    schoolsApiService,
    notyService,
    $filter
  ) {
    return new class {
      constructor() {
        this.school = {}
        this.loading = true
      }

      $onInit() {
        let basePath = {
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
        }

        schoolsApiService.get($stateParams.id).then((res) => {
          if (res) {
            if (res.status == 200) {
              this.school = res.data
              basePath.path.push({
                state: 'users.schoolsDetails',
                text: "Details " + toTitleBar(this.school.name),
              })
              titleBarService.setData(basePath)
              this.loading = false
            } else {
              $state.go('not_found')
            }
          }
        })
      }
    }
  }
});