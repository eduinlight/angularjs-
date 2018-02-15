angular.module('logged').component('personsDetailsPage', {
  templateUrl: 'src/pages/logged/persons/details/persons-details.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    personsApiService,
    notyService,
    $filter
  ) {
    return new class {
      constructor() {
        this.person = {}
        this.loading = true
      }

      $onInit() {
        let basePath = {
          title: "Persons",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.persons',
            text: "Persons",
          }]
        }

        personsApiService.get($stateParams.id).then((res) => {
          if (res) {
            if (res.status == 200) {
              this.person = res.data
              basePath.path.push({
                state: 'users.personsDetails',
                text: "Details " + toTitleBar(this.person.first_name),
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