angular.module('logged').component('companiesListPage', {
  templateUrl: 'src/pages/logged/companies/list/companies-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    // companiesApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.companies = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
          title: "Compañías",
          description: "una descripción",
          path: [{
            state: 'users.home',
            text: "Inicio",
            icon: true,
            icon_class: 'fa-home'
          }, {
            state: 'users.companies',
            text: "Compañías",
          }]
        })

        // companiesApiService.list().then((res) => {
        //   if (res) {
        //     this.companies = res.data
        //     this.loading = false
        //   }
        // })
      }

      // delete(index) {
      //   companiesApiService.remove(this.companies[index].id).then(data => {
      //     if (data) {
      //       this.companies.splice(index, 1)
      //       notyService.success('Mensaje', 'El país se eliminó correctamente')
      //     } else {
      //       notyService.erorr('Mensaje', 'Otros datos están relacionado a este país')
      //     }
      //   })
      // }
    }
  }
});