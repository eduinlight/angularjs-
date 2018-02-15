angular.module('logged').component('personsListPage', {
  templateUrl: 'src/pages/logged/persons/list/persons-list.page.html',
  controller: function(
    $state,
    loginStatusService,
    titleBarService,
    personsApiService,
    notyService
  ) {
    return new class {
      constructor() {
        this.persons = []
        this.loading = true
      }

      $onInit() {
        titleBarService.setData({
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
        })

        personsApiService.list().then((res) => {
          if (res) {
            this.persons = res.data
            this.loading = false
          }
        })
      }

      delete(index) {
        personsApiService.remove(this.persons[index].id).then(data => {
          if (data) {
            this.persons.splice(index, 1)
            notyService.success('Message', 'La persona se eliminó correctamente')
          } else {
            notyService.erorr('Message', 'Otros datos están relacionado a esta persona')
          }
        })
      }
    }
  }
});