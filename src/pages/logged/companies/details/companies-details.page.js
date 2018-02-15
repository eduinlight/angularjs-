angular.module('logged').component('companiesDetailsPage', {
  templateUrl: 'src/pages/logged/companies/details/companies-details.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    companiesApiService,
    notyService,
    $filter
  ) {
    return new class {
      constructor() {
        this.company = {}
        this.loading = true
      }

      $onInit() {
        let basePath = {
          title: "Companies",
          description: "a description",
          path: [{
            state: 'users.home',
            text: "Home",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.companies',
            text: "Companies",
          }]
        }

        companiesApiService.get($stateParams.id).then((res) => {
          if (res) {
            if (res.status == 200) {
              this.company = res.data
              basePath.path.push({
                state: 'users.companiesDetails',
                text: "Details " + toTitleBar(this.company.name),
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