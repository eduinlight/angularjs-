angular.module('logged').component('worksDetailsPage', {
  templateUrl: 'src/pages/logged/works/details/works-details.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    worksApiService,
    notyService,
    $filter
  ) {
    return new class {
      constructor() {
        this.work = {}
        this.loading = true
      }

      $onInit() {
        let basePath = {
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
        }

        worksApiService.get($stateParams.id).then((res) => {
          if (res) {
            if (res.status == 200) {
              this.work = res.data
              basePath.path.push({
                state: 'users.worksDetails',
                text: "Details " + toTitleBar(this.work.name),
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