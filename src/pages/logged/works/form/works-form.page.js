angular.module('logged').component('worksFormPage', {
  templateUrl: 'src/pages/logged/works/form/works-form.page.html',
  controller: function(
    $state,
    $stateParams,
    loginStatusService,
    titleBarService,
    worksApiService,
    dancestylesApiService,
    companiesApiService,
    venuesApiService,
    personsApiService,
    notyService,
    $filter
  ) {
    return new class {
      constructor() {
        this.work = {}
        this.errors = {}
        this.action = ""
        this.loading = false
        this.submitting = false
        this.ok = false
      }

      $onInit() {
        let promises = []
        promises[promises.push(venuesApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.venues = res.data.map((v) => {
              return { id: v.id, text: v.name }
            })
          }
        });
        promises[promises.push(companiesApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.companies = res.data.map((v) => {
              return { id: v.id, text: v.name }
            })
          }
        });
        promises[promises.push(personsApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.persons = res.data.map((v) => {
              return { id: v.id, text: v.first_name + v.last_name }
            })
          }
        });
        promises[promises.push(dancestylesApiService.list()) - 1].then((res) => {
          if (res && res.status == 200) {
            this.dance_styles = res.data.map((v) => {
              return { id: v.id, text: v.name }
            })
          }
        });

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

        if ($stateParams.id != undefined) {
          this.action = "Edit"
          promises[promises.push(worksApiService.get($stateParams.id)) - 1].then((res) => {
            if (res) {
              if (res.status == 200) {
                res.data._dance_styles = res.data._dance_styles.map(v => v.id)
                res.data._persons = res.data._persons.map(v => v.id)
                res.data._premiere_company = res.data._premiere_company.id
                res.data._premiere_venue = res.data._premiere_venue.id
                this.work = res.data
                basePath.path.push({
                  state: 'users.worksEdit',
                  text: "Edit " + toTitleBar(this.work.name),
                })
                titleBarService.setData(basePath)
              } else {
                $state.go('not_found')
              }
            }
          })
        } else {
          this.action = "Add"
          basePath.path.push({
            state: 'users.worksAdd',
            text: "Add",
          })
          titleBarService.setData(basePath)
        }

        $q.all(promises).then(() => { this.loading = false })
      }

      submit() {
        this.submitting = true

        if (this.action == "Edit") {
          worksApiService.edit($stateParams.id, this.work).then((res) => {
            if (res) {
              if (res.status == 200) {
                notyService.success('Message', 'The work was successfully edited')
                this.ok = true
                $state.go('users.works')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        } else {
          worksApiService.add(this.work).then((res) => {
            if (res) {
              if (res.status == 200) {
                this.ok = true
                notyService.success('Message', 'The work was successfully added')
                $state.go('users.works')
              } else {
                notyService.error('Message', 'Exist some errors in data')
              }
              this.errors = res.errors
              this.submitting = false
            }
          })
        }
      }
    }
  }
});