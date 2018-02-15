angular.module('logged').component('companiesListPage', {
  templateUrl: 'src/pages/logged/companies/list/companies-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    companiesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.companies = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
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
        })

        companiesApiService.list().then((res) => {
          if (res) {
            this.companies = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        companiesApiService.remove(this.companies[index].id).then(data => {
          if (data) {
            this.companies.splice(index, 1)
            notyService.success('Message', 'The company was removes successfully')
          } else {
            notyService.erorr('Message', 'Otros datos están relacionados a esta compañía')
          }
        })
      }
    }
  }
});